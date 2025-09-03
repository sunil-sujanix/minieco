from celery import shared_task
from django.core.mail import send_mail

@shared_task
def send_order_confirmation_email(email, order_id):
    subject = "Your order confirmation"
    message = f"Thanks! Your order #{order_id} has been placed."
    send_mail(subject, message, None, [email], fail_silently=True)
    return f"sent:{order_id}"
