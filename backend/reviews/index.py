import os
import json
import base64
import boto3
import psycopg2
import uuid
from datetime import datetime

SCHEMA = 't_p85157327_biogumus_landing_pro'

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def to_punycode(email: str) -> str:
    local, domain = email.rsplit('@', 1)
    return local + '@' + domain.encode('idna').decode('ascii')

def send_email_notification(author_name: str, text: str):
    import smtplib
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart

    smtp_host = os.environ['SMTP_HOST']
    smtp_port = int(os.environ['SMTP_PORT'])
    smtp_user = os.environ['SMTP_USER']
    smtp_password = os.environ['SMTP_PASSWORD']
    recipient = 'operator@биотехнология68.рф'

    smtp_user_ascii = to_punycode(smtp_user)
    recipient_ascii = to_punycode(recipient)

    html = f"""
    <h2>Новый отзыв ожидает модерации</h2>
    <p><b>Автор:</b> {author_name}</p>
    <p><b>Текст:</b> {text}</p>
    <p>Перейдите в панель модерации для публикации или отклонения.</p>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новый отзыв от {author_name}'
    msg['From'] = smtp_user_ascii
    msg['To'] = recipient_ascii
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.ehlo()
        server.login(smtp_user_ascii, smtp_password)
        server.sendmail(smtp_user_ascii, recipient_ascii, msg.as_bytes())

def handler(event: dict, context) -> dict:
    """Управление отзывами: получить опубликованные, добавить новый, модерация."""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    path = event.get('path', '/')
    admin_token = event.get('headers', {}).get('X-Admin-Token', '')
    is_admin = admin_token == os.environ.get('ADMIN_TOKEN', '')

    # GET /reviews — публичные отзывы
    if method == 'GET' and not path.endswith('/admin'):
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, author_name, author_role, text, rating, media_url, media_type, created_at "
            f"FROM {SCHEMA}.reviews WHERE published = TRUE ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        conn.close()
        data = [
            {
                'id': r[0], 'author_name': r[1], 'author_role': r[2],
                'text': r[3], 'rating': r[4], 'media_url': r[5],
                'media_type': r[6], 'created_at': r[7].isoformat()
            }
            for r in rows
        ]
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'reviews': data})}

    # GET /reviews/admin — все отзывы для модерации
    if method == 'GET' and path.endswith('/admin'):
        if not is_admin:
            return {'statusCode': 403, 'headers': CORS, 'body': json.dumps({'error': 'Forbidden'})}
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, author_name, author_role, text, rating, media_url, media_type, published, created_at "
            f"FROM {SCHEMA}.reviews ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        conn.close()
        data = [
            {
                'id': r[0], 'author_name': r[1], 'author_role': r[2],
                'text': r[3], 'rating': r[4], 'media_url': r[5],
                'media_type': r[6], 'published': r[7], 'created_at': r[8].isoformat()
            }
            for r in rows
        ]
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'reviews': data})}

    # POST /reviews — добавить отзыв
    if method == 'POST' and not path.endswith('/admin'):
        body = json.loads(event.get('body') or '{}')
        author_name = body.get('author_name', '').strip()
        author_role = body.get('author_role', '').strip()
        text = body.get('text', '').strip()
        rating = int(body.get('rating', 5))
        media_b64 = body.get('media_b64')
        media_type = body.get('media_type')

        if not author_name or not text:
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'author_name and text required'})}

        media_url = None
        if media_b64 and media_type:
            s3 = boto3.client(
                's3',
                endpoint_url='https://bucket.poehali.dev',
                aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
            )
            ext = 'jpg' if 'image' in media_type else 'mp4'
            key = f"reviews/{uuid.uuid4()}.{ext}"
            data = base64.b64decode(media_b64)
            s3.put_object(Bucket='files', Key=key, Body=data, ContentType=media_type)
            media_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"
            media_type_short = 'image' if 'image' in media_type else 'video'
        else:
            media_type_short = None

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {SCHEMA}.reviews (author_name, author_role, text, rating, media_url, media_type) "
            f"VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
            (author_name, author_role, text, rating, media_url, media_type_short)
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()

        try:
            send_email_notification(author_name, text)
        except Exception:
            pass

        return {'statusCode': 201, 'headers': CORS, 'body': json.dumps({'ok': True, 'id': new_id})}

    # PUT /reviews/admin — опубликовать/скрыть
    if method == 'PUT' and path.endswith('/admin'):
        if not is_admin:
            return {'statusCode': 403, 'headers': CORS, 'body': json.dumps({'error': 'Forbidden'})}
        body = json.loads(event.get('body') or '{}')
        review_id = body.get('id')
        published = bool(body.get('published'))
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"UPDATE {SCHEMA}.reviews SET published = %s WHERE id = %s", (published, review_id))
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

    # DELETE /reviews/admin
    if method == 'DELETE' and path.endswith('/admin'):
        if not is_admin:
            return {'statusCode': 403, 'headers': CORS, 'body': json.dumps({'error': 'Forbidden'})}
        body = json.loads(event.get('body') or '{}')
        review_id = body.get('id')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"DELETE FROM {SCHEMA}.reviews WHERE id = %s", (review_id,))
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

    return {'statusCode': 404, 'headers': CORS, 'body': json.dumps({'error': 'Not found'})}
