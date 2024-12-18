import aiosmtplib
from email.message import EmailMessage
import asyncio


async def send_email_async(receiver_email, info):
    """
    Sends an email asynchronously with an HTML body.

    :param sender_email: Email address of the sender
    :param password: Password or app-specific password of the sender
    :param receiver_email: Email address of the receiver
    :param subject: Subject of the email
    :param html_template: HTML content for the email body
    """
    html_template = f"""
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Forest Alert - Immediate Action Required</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td align="center" style="padding: 0;">
                        <table role="presentation" style="width: 600px; border-collapse: collapse; border: 0; border-spacing: 0; background-color: #ffffff;">
                            <!-- Header -->
                            <tr>
                                <td align="center" style="padding: 40px 0 30px 0; background-color: #4C9F4C;">
                                    <img src="https://drive.google.com/uc?id=1NiewS3WPYHKagvL29DTn4W5_fO5p7hzO" alt="Forest IoT Logo" width="80" style="height: auto; display: block;" />
                                    <h1 style="font-size: 24px; margin: 20px 0 0 0; color: #ffffff;">Guardian Alert System</h1>
                                </td>
                            </tr>
                            <!-- Main Content -->
                            <tr>
                                <td style="padding: 36px 30px 42px 30px;">
                                    <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0;">
                                        <tr>
                                            <td style="padding: 0 0 36px 0; color: #153643;">
                                                <h2 style="font-size: 24px; margin: 0 0 20px 0; color: #333333;">Urgent: Forest Danger Detected</h2>
                                                <p style="margin: 0 0 12px 0; font-size: 16px; line-height: 24px;">Our IoT sensors have detected a potentially dangerous situation in your monitored forest area. Immediate attention is required.</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 0;">
                                                <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0;">
                                                    <tr>
                                                        <td style="width: 260px; padding: 0; vertical-align: top; color: #153643;">
                                                            <p style="margin: 0 0 25px 0; font-size: 16px; line-height: 24px;">
                                                                <strong>Alert Details:</strong><br>
                                                                {info}
                                                            </p>
                                                        </td>
                                                        <td style="width: 20px; padding: 0; font-size: 0; line-height: 0;">&nbsp;</td>
                                                        <td style="width: 260px; padding: 0; vertical-align: top; color: #153643;">
                                                            <img src="https://drive.google.com/uc?id=1owC-KdH4nXNyJX4DjVPpqxhMhwxhcDmq" alt="Forest Image" width="260" style="height: auto; display: block;" />
                                                            <p style="margin: 0 0 25px 0; font-size: 16px; line-height: 24px;">
                                                                11.4084633°N, 107.4159107°E<br>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <!-- Call to Action -->
                            <tr>
                                <td style="padding: 30px; background-color: #f8f9fa;">
                                    <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0;">
                                        <tr>
                                            <td style="color: #153643; padding: 0;">
                                                <h2 style="font-size: 18px; margin: 0 0 20px 0; color: #333333;">Recommended Actions:</h2>
                                                <ol style="font-size: 16px; line-height: 24px; margin: 0 0 20px 24px; padding: 0;">
                                                    <li>Access the IoT dashboard for detailed information</li>
                                                    <li>Contact local authorities if immediate intervention is necessary</li>
                                                    <li>Prepare response teams for potential deployment</li>
                                                </ol>
                                                <p style="margin: 0; font-size: 16px;">
                                                    <a href="http://localhost:5173/login" style="color: #ffffff; text-decoration: none; background-color: #4C9F4C; padding: 10px 20px; border-radius: 5px; font-weight: bold;">View Dashboard</a>
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <!-- Footer -->
                            <tr>
                                <td style="padding: 30px; background-color: #4C9F4C;">
                                    <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0;">
                                        <tr>
                                            <td style="padding: 0; color: #ffffff;">
                                                <p style="margin: 0; font-size: 14px; line-height: 20px;">
                                                    &copy; 2024 Guardian - Forest IoT Monitoring System<br/>
                                                    Faculty of Information Technology<br/>
                                                    University of Science, VNU-HCM<br/>
                                                    <a href="http://localhost:5173/login" style="color: #ffffff; text-decoration: underline;">Visit Our Website</a>
                                                </p>
                                            </td>
                                            <td style="padding: 5; width: 150px;">
                                                <table role="presentation" style="border-collapse: collapse; border: 0; border-spacing: 0;">
                                                    <tr>
                                                        <td style="padding: 0 0 0 10px; width: 38px;">
                                                            <a href="http://localhost:5173/login" style="color: #ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height: auto; display: block; border: 0;" /></a>
                                                        </td>
                                                        <td style="padding: 0 0 0 10px; width: 38px;">
                                                            <a href="http://localhost:5173/login" style="color: #ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height: auto; display: block; border: 0;" /></a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>"""

    password = 'jlzg cjsx wndn jyxp'
    sender_email = 'guardianiot.project@gmail.com'
    subject = 'Urgent: Forest Danger Detected!'
    # Create the EmailMessage object
    em = EmailMessage()
    em['Subject'] = subject
    em['From'] = sender_email
    em['To'] = receiver_email
    em.set_content("This email requires an HTML-capable client to view the content.")
    em.add_alternative(html_template, subtype='html')

    # Connect to the SMTP server and send the email
    try:
        await aiosmtplib.send(
            em,
            hostname="smtp.gmail.com",
            port=465,
            username=sender_email,
            password=password,
            use_tls=True,
        )
        print("Email sent successfully!")
    except Exception as e:
        print(f"Error sending email: {e}")

# # Example Usage
# async def main():
#     sensor_data = {
#         "2023-12-17T15:00:00Z": {
#             "timestamp": "2023-12-17T15:00:00Z",
#             "temperature": 72,
#             "air_moisture": 45,
#             "co_concentration": 0.03,
#             "distance": 120,
#             "light_intensity": 300,
#             "moving_magnitude": 1.2,
#             "soil_moisture": 20
#         },
#         "2023-12-17T16:00:00Z": {
#             "timestamp": "2023-12-17T16:00:00Z",
#             "temperature": 100,
#             "air_moisture": 100,
#             "co_concentration": 100,
#             "distance": 115,
#             "light_intensity": 350,
#             "moving_magnitude": 100,
#             "soil_moisture": 25
#         }
#     }



#     await notify_latest_data_danger_level(sensor_data)

# # Run the asyncio event loop
# asyncio.run(main())
