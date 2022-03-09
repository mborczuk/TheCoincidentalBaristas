from flask import Flask, render_template #Q0: What happens if you remove render_template from this line?
app = Flask(__name__)

@app.route("/")
def hello_world():
    return "No hablo queso!"

@app.route("/my_foist_template") #Q1: Can all of your teammates confidently predict the URL to use to load this page?
def test_tmplt():
    return render_template('game.html') #Q2: What is the significance of each argument?

if __name__ == "__main__":
    app.debug = True
    app.run()
