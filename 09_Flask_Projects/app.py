from flask import Flask, render_template, request, jsonify
import qrcode, base64, io
app=Flask(__name__)
@app.route("/")
def home(): return render_template("index.html")
@app.route("/marksheet")
def marksheet(): return render_template("marksheet.html")
@app.route("/certificate")
def certificate(): return render_template("certificate.html")
@app.route("/resume")
def resume(): return render_template("resume.html")
@app.post("/generate_qr")
def generate_qr():
    data=request.form.get("qr_data","Certificate")
    qr=qrcode.make(data); buf=io.BytesIO(); qr.save(buf,"PNG")
    return jsonify(qr="data:image/png;base64,"+base64.b64encode(buf.getvalue()).decode())
if __name__=="__main__": app.run(debug=True)
