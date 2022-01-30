from flask import Blueprint, render_template, request, current_app
from flask_httpauth import HTTPBasicAuth

import base64
import requests
import os


index = Blueprint("index", __name__, template_folder="templates")
auth = HTTPBasicAuth()

@auth.get_password
def get_pw(id):
   if id == os.environ.get("USER_ID"):
      return os.environ.get("PASSWORD")
   return None

@index.route("/")
@auth.login_required
def show_index():
    return render_template("index.html")
    
@index.route("/send_message", methods=["GET", "POST"])
def send_message():
    if request.method == "GET":
        return render_template("index.html")
    
    # LINEに通知する
    token = os.environ.get("LINE_API")
    line_notify_api = "https://notify-api.line.me/api/notify"
    headers = {"Authorization": f"Bearer {token}"}
    data = {"message": "おうちに帰ったよ"}
    
    files = {"imageFile":base64.b64decode(request.form["image"])} #base64で送られてきた写真データをバイナリにデコード
    requests.post(line_notify_api, headers=headers, data=data, files=files)
    
    
    return render_template("result.html")