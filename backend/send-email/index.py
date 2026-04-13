import os
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на почту оператора."""

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

    name = body.get('name', '—')
    phone = body.get('phone', '—')
    company = body.get('company', '—')
    waste_type = body.get('type', '—')
    volume = body.get('volume', '—')
    comment = body.get('comment', '—')

    smtp_host = os.environ['SMTP_HOST']
    smtp_port = int(os.environ['SMTP_PORT'])
    smtp_user = os.environ['SMTP_USER']
    smtp_password = os.environ['SMTP_PASSWORD']
    recipient = 'operator@биотехнология68.рф'

    html = f"""
    <h2>Новая заявка с сайта</h2>
    <table cellpadding="8" style="border-collapse:collapse;font-size:15px;">
      <tr><td><b>Имя:</b></td><td>{name}</td></tr>
      <tr><td><b>Телефон:</b></td><td>{phone}</td></tr>
      <tr><td><b>Компания:</b></td><td>{company}</td></tr>
      <tr><td><b>Тип отходов:</b></td><td>{waste_type}</td></tr>
      <tr><td><b>Объём:</b></td><td>{volume}</td></tr>
      <tr><td><b>Комментарий:</b></td><td>{comment}</td></tr>
    </table>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Заявка от {name} — {phone}'
    msg['From'] = smtp_user
    msg['To'] = recipient
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, recipient, msg.as_bytes())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
