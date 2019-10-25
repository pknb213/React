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


@app.route("/datatable/robots/<condition>")
def robots(condition):
    if condition is 'all':
        sql = "SELECT sn, company, site, kpi0, kpi1, kpi2, kpi3, kpi4, model, header FROM robots"
    elif condition is 'developer':
        sql = ""
    elif condition is 'maintainer':
        sql = ""

    sql = "SELECT sn, company, site, kpi0, kpi1, kpi2, kpi3, kpi4, model, header FROM robots"
    res = MySQL.select(sql)
    print(res)
    if res is not None:
        for i in res:
            for k, v in i.items():
                if v is None:
                    i[k] = ''
            robot_state(i['sn'])
            print("Rstate [", i['sn'], "] :", cache.hget(i['sn'], 'state'))
            if not cache.hget(i['sn'], 'state'):
                i['state'] = 0
            else:
                state = eval(cache.hget(i['sn'], 'state').decode())
                if state['error'] or state['collision'] > 0:
                    i['state'] = 2
                elif state['ready'] > 0 or state['busy'] > 0:
                    i['state'] = 1
                else:
                    i['state'] = 0
            i['kpi'] = i['kpi0'] + ', ' + i['kpi1'] + ', ' + i['kpi2'] + ', ' + i['kpi3'] + ', ' + i['kpi4']
            i['enter'] = '<a href=/display/%s>Display</a>' % i['sn']
            del i['kpi0'], i['kpi1'], i['kpi2'], i['kpi3'], i['kpi4']

    return jsonify(res)


@app.route("/robot/state/<sn>")
def robot_state(sn):
    # sql = "SELECT state FROM robot_states " \
    #       "WHERE serial_number = \"%s\" AND date >= \"%s\" AND date < \"%s\" " \
    #       "ORDER BY date DESC LIMIT 1 " \
    #       % (sn, (datetime.utcnow() - timedelta(seconds=30)).strftime(fmtAll), datetime.utcnow().strftime(fmtAll))
    # res = MySQL.select(sql, False)
    # print("State Loop Res [%s]: " % sn, res)
    # if res is False:
    #     dic = str({'busy': 0, 'collision': 0, 'emergency': 0, 'error': 0, 'home': 0,
    #                'finish': 0, 'ready': 0, 'resetting': 0, 'zero': 0, 'is_server_connected': 1})
    #     cache.hset(sn, 'state', dic)
    #     return jsonify(dic)
    #
    # cache.hset(sn, 'state', res['state'])

    # return jsonify(res['state'])

    # Todo : 캐시에 저장된 로봇 상태값을 가져온다
    # Todo : 지금은 Static 값으로 테스트 한다.
    # dic = cache.hget(sn, 'state').decode('utf8')

    dic = str({'busy': 0, 'collision': 0, 'emergency': 0, 'error': 0, 'home': 0,
               'finish': 0, 'ready': 0, 'resetting': 0, 'zero': 0, 'is_server_connected': 1})
    cache.hset(sn, 'state', dic)
    return Response('ok')


@app.route("/test", methods=['GET'])
@LoginRequired("user")
def test():
    print(current_user.is_authenticated)
    print(current_user.id)
    return jsonify("Fuck")
