import aiohttp

# Asynchronous function to send push notification
async def send_push_notification(private_key_pushsafer, message):
    pushsafer_url = 'https://www.pushsafer.com/api'
    data = {
        'k': private_key_pushsafer,  # Private key
        'm': message,
        't': 'Guardian Alert',
        's': '2',  # Sound ID (2 = siren)
        'v': '2',  # Vibration (2 = long)
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(pushsafer_url, data=data) as response:
            if response.status == 200:
                print("Push notification sent successfully!")
            else:
                print(f"Failed to send push notification: {response.text}")
    return