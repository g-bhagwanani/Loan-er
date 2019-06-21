from flask import Flask, redirect, url_for, request ,render_template
app = Flask(__name__)

otp = '4151'
number = '0'

@app.route('/')
def login():
    return render_template('login.html')

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

@app.route('/enter-otp')
def get_otp():
    return render_template('verify.html')

@app.route('/login', methods = ['GET', 'POST'])
def send_otp():
    global number
    if request.method == 'POST':
        number = request.form['num']
        #send otp to the Number
        return redirect(url_for('get_otp'))

if __name__ == '__main__':
    app.run(debug = True)
