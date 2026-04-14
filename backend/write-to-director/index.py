import os
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def to_punycode(email: str) -> str:
    local, domain = email.rsplit('@', 1)
    return local + '@' + domain.encode('idna').decode('ascii')


def handler(event: dict, context) -> dict:
    """Отправка письма директору с сайта."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '—').strip()
    contact = body.get('contact', '—').strip()
    message = body.get('message', '').strip()

    if not message:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'message required'})
        }

    smtp_host = os.environ['SMTP_HOST']
    smtp_port = int(os.environ['SMTP_PORT'])
    smtp_user = os.environ['SMTP_USER']
    smtp_password = os.environ['SMTP_PASSWORD']
    recipient = 'operator@биотехнология68.рф'

    smtp_user_ascii = to_punycode(smtp_user)
    recipient_ascii = to_punycode(recipient)

    html = f"""
    <h2>Письмо директору с сайта</h2>
    <table cellpadding="8" style="border-collapse:collapse;font-size:15px;">
      <tr><td><b>Имя:</b></td><td>{name}</td></tr>
      <tr><td><b>Телефон / Email:</b></td><td>{contact}</td></tr>
      <tr><td><b>Сообщение:</b></td><td style="white-space:pre-wrap">{message}</td></tr>
    </table>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Письмо директору от {name}'
    msg['From'] = smtp_user_ascii
    msg['To'] = recipient_ascii
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.ehlo()
        server.login(smtp_user_ascii, smtp_password)
        server.sendmail(smtp_user_ascii, recipient_ascii, msg.as_bytes())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
