import requests

url = "https://www.fast2sms.com/dev/wallet"

headers = {
    'authorization': "mqgKX7nlZpIvJPdhMF42tr5bz1RTBe8VEiwoH9CWUAYQSG6kOc0ubQ3Hd8z5xIkpGrnvlgwj1DoEJKX9",
    }

response = requests.request("POST", url, headers=headers)

print(response.text)
