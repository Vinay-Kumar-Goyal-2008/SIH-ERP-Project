from flask import Flask,jsonify,request
import base64
import io
import matplotlib
import matplotlib.pyplot as plt
matplotlib.use('Agg')
app=Flask(__name__)

@app.route("/gengraph", methods=["POST"])
def graph():
    data=request.json
    x=list(data.keys())
    y=list(data.values())
    plt.figure(figsize=(5,5))
    plt.plot(x,y)
    plt.title("Attendance v/s subject graph of student")
    plt.xlabel("Subject")
    plt.ylabel("Attendance")
    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    plt.close()
    buf.seek(0)
    img_base64 = base64.b64encode(buf.getvalue()).decode()
    return jsonify({"graph": img_base64})
app.run(port=5001,debug=True,host='localhost')