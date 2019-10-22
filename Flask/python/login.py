from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from utils import app
import functools

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"


class User(UserMixin):
    def __init__(self, email):
        self.id = email
        self.email = email
        self.password = 1234
        self.permission = 'A'


class LoginRequired:
    def __init__(self, param=''):
        self.allowed = []
        self.unallowed = []
        if param == '': return
        for arg in param.split(','):
            if arg[0] == '-':
                self.unallowed.append(arg[1:])
            else:
                self.allowed.append(arg)

    def __call__(self, fn):
        @functools.wraps(fn)
        def decorated(*args, **kwargs):
            if not current_user.is_authenticated:
                return "NOT LOGGED"
            if current_user.permission in self.unallowed:
                return "FORBIDDEN"
            if len(self.allowed) == 0 or current_user.permission in self.allowed:
                return fn(*args, **kwargs)
            else:
                return "NOT ALLOWED"

        return decorated
