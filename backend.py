from flask import Flask,jsonify,request
import base64
import io
import matplotlib
import matplotlib.pyplot as plt
# import os
# import requests


# api_key = ''

# GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateText"

# def get_llm_response(prompt):
#     headers = {
#         "Authorization": f"Bearer {api_key}",
#         "Content-Type": "application/json"
#     }

#     data = {
#         "contents": [
#             {
#                 "text": prompt
#             }
#         ]
#     }

#     response = requests.post(GEMINI_URL, headers=headers, json=data)

#     if response.status_code == 200:
#         result = response.json()
#         return result.get('candidates', [{}])[0].get('content', '')
#     else:
#         return f"Error {response.status_code}: {response.text}"
matplotlib.use('Agg')
app=Flask(__name__)

@app.route("/gengraph", methods=["POST"])
def graph():
    data=request.json
    x=list(data.keys())
    y=list(data.values())
    plt.figure(figsize=(5,5))
    plt.scatter(x,y,marker='o',c=['green' if i > 75 else 'red' for i in y])
    plt.title("Attendance v/s subject graph of student")
    plt.xlabel("Subject")
    plt.ylabel("Attendance")
    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    plt.close()
    buf.seek(0)
    img_base64 = base64.b64encode(buf.getvalue()).decode()
    return jsonify({"graph": img_base64})
# @app.route('/askchat',methods=["POST"])
# def ansbot():
#     data = request.get_json()
#     prompt = data.get('prompt', '')
#     student = data.get('student', {})
    
#     ans = get_llm_response(f"{prompt}, the data of student is as follows {student}")
    
#     return jsonify({"ans": ans})
app.run(port=5001,debug=True,host='localhost')