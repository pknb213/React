from utils import *
from login import User, login_user, current_user


@app.route('/', methods=["POST"])
def home():
    print(request.json, type(request.json))
    if request.json['email'] == 'abc':
        user = User(request.json['email'])
        login_user(user)
        print(user.email, user.password)

    if not current_user.is_authenticated:
        return jsonify("Fuck")

    return 'Hello World!'


@app.route("/test", methods=['POST'])
def test():

    return "H2O"





