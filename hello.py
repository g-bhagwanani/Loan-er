from flask import Flask, redirect, url_for, request ,render_template
import urllib.request
import urllib.parse
import random

app = Flask(__name__)

otp = '0'
number = '0'

url = "https://www.fast2sms.com/dev/bulk"

headers = {
    'cache-control': "no-cache"
}

#method to send otp
@app.route('/resend-otp')
def sendSMS():
    apikey = 'pIyBJ6pdYX8-bGlGy8HXMOL0FG6RGYRo4jZ6W1A0Qf'
    numbers = '91' + number
    global otp
    otp = str(random.randint(1000, 9999))
    #send otp to the Number
    data =  urllib.parse.urlencode({'apikey': apikey, 'numbers': numbers,
        'message' : "Your ABFL OTP is " + otp})
    data = data.encode('utf-8')
    request = urllib.request.Request("https://api.textlocal.in/send/?")
    f = urllib.request.urlopen(request, data)
    fr = f.read()
    #console.log(fr)

    return redirect(url_for('get_otp'))

#login page on startup
@app.route('/')
def login():
    return render_template('login.html')

#to trigger the sending of otp to the mobile number typed by the user
@app.route('/login', methods = ['GET', 'POST'])
def send_otp():
    global number
    if request.method == 'POST':
        number = request.form['num']
    sendSMS()
    return redirect(url_for('get_otp'))

#to direct user to enter the otp sent to this phone
@app.route('/enter-otp')
def get_otp():
    return render_template('verify.html')

#to verify the otp typed in by the user
@app.route('/verify', methods = ['GET', 'POST'])
def verify_otp():
    if request.method == 'POST':
        otp1 = request.form['otp-1']
        otp2 = request.form['otp-2']
        otp3 = request.form['otp-3']
        otp4 = request.form['otp-4']
        otpp = otp1 + otp2 + otp3 + otp4
        if otpp == otp:
            return 'Successfully registered with number %s' % number
        else:
            return 'Incorrect otp'

if __name__ == '__main__':
    app.run(debug = True)
