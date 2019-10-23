from utils import *
from login import User, login_user, current_user, LoginRequired


@app.route('/', methods=["GET", "POST"])
def home():
    if request.method == "GET":
        print(current_user.is_authenticated)
    if request.method == "POST":
        print(current_user.is_authenticated)
        if User.check_user(request.json['email'], request.json['pwd']):
            user = User(request.json['email'])
            login_user(user)
            print("> Login : ", user.id)

            # Todo : 권한에 따른 페이지를 위한 Prams 전달.
            if user.permission == 'user':
                print(current_user.is_authenticated)
                return jsonify('Hello World!')
            else:
                return jsonify("Fuck")

        if not current_user.is_authenticated:
            return jsonify("Fuck")


@app.route("/test", methods=['GET'])
@LoginRequired("user")
def test():

    return "H2O"





