import os, sys, json
from flask_cors import CORS
from flask import Flask, request, Response, jsonify, send_from_directory
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

STOP_CODE = {
    0: 'emergency stop',
    1: 'collision',
    2: 'position limit',
    3: 'velocity limit',
    4: 'motor state error',
    5: 'torque limit',
    6: 'connection lost',
    7: 'position error',
    8: 'end-tool stop',
    9: 'singular',
    10: 'over-current',
    12: 'position limit closed',
    13: 'velocity limit closed',
    14: 'singular closed',
    15: 'torque limit closed',
    61: 'computation time limit',
    62: 'control task time limit',
    90: 'reset',
    91: 'reset hard',
    94: 'reset failed',
    95: 'reset special',
    99: 'unknown'
}


def get_robot_code_description(code):
    if code in STOP_CODE:
        return STOP_CODE[code]
    return 'undefined'



