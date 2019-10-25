import os, sys
from flask_cors import CORS
from flask import Flask, request, Response, jsonify
from flask_session import Session
from dbs import REDIS_URL, MySQL, cache
from datetime import datetime, timedelta
from pytz import timezone

sys.path.append(os.getcwd())
sys.path.append(os.getcwd() + os.path.sep + 'python')
print(os.getcwd())

app = Flask(__name__, template_folder=os.getcwd() + '/templates', static_folder=os.getcwd() + '/static')
app.config['SESSION_TYPE'] = 'memcached'
app.secret_key = "super secret key"
sess = Session()
app.config.update(
    DEBUG=False,
    REDIS_URL="redis://%s" % REDIS_URL
    #SCREATE_KEY='super secret key',
)
CORS(app)

KST = timezone('Asia/Seoul')
fmtAll = '%Y-%m-%d %H:%M:%S'
fmt = '%Y-%m-%d'

