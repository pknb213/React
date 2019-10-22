from utils import *
from views import *

if __name__ == '__main__':
    app.run(threaded=True, host="0.0.0.0", port=4000)
    sess.init_app(app)






