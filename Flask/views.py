from utils import *
from login import User, login_user, current_user, LoginRequired


@app.route('/', methods=["POST"])
def home():
    if User.check_user(request.json['email'], request.json['pwd']):
        user = User(request.json['email'])
        login_user(user)
        print("> Login : ", user.id)

        # Todo : 권한에 따른 페이지를 위한 Prams 전달.
        if user.permission == 'user':
            return jsonify('ok')
        else:
            return jsonify("Fuck")

    if not current_user.is_authenticated:
        return jsonify("Fuck")


@app.route("/test", methods=['GET'])
@LoginRequired("user")
def test():
    print(current_user.is_authenticated)
    print(current_user.id)
    return jsonify("Fuck")





