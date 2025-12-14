from flask import Flask, render_template

app = Flask(__name__)

PAYLOAD = "z3nshell"

@app.route("/domxss")
def home():
    return render_template("domxss.html")

@app.route("/refleced-xss")
def reflected_xss():
    return f"<ul>{PAYLOAD}</ul>"

@app.route("/payload")
def payload():
    return PAYLOAD

if __name__ == "__main__":
    app.run(debug=True)