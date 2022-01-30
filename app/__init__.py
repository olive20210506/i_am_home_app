from flask import Flask
from os.path import join
from dotenv import load_dotenv

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    # 非公開設定ファイル読み込み
    dotenv_path = join("instance/config/", '.env')
    load_dotenv(dotenv_path)
    
    from .views.index import index

    app.register_blueprint(index, url_prefix="/")

    return app