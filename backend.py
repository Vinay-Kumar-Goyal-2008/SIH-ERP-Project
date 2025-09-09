from flask import Flask,jsonify,request
import base64
import io
import matplotlib
import matplotlib.pyplot as plt
# import os
# from dotenv import load_dotenv
# from openai import OpenAI
# load_dotenv('.env', override=True)
# openai_api_key = os.getenv('OPENAI_API_KEY')
# client = OpenAI(api_key = openai_api_key)
# def get_llm_response(prompt):
#     completion = client.chat.completions.create(
#         model="gpt-4o-mini",
#         messages=[
#             {
#                 "role": "system",
#                 "content": "You are an AI assistant.",
#             },
#             {"role": "user", "content": prompt},
#         ],
#         temperature=0.0,
#     )
#     response = completion.choices[0].message.content
#     return response
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