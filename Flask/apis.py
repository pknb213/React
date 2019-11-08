from utils import *
from login import User, login_user, current_user, LoginRequired


# For Login Page
@app.route('/', methods=["POST"])
def home():
    if User.check_user(request.json['email'], request.json['pwd']):
        user = User(request.json['email'])
        login_user(user)
        print("> Login : ", user.id)

        # Todo : 권한에 따른 페이지를 위한 Prams 전달. React에서 랜더링하면 User가 초기화 됨.
        if user.permission == 'user':
            return jsonify('ok')
        else:
            return jsonify("Fuck")

    if not current_user.is_authenticated:
        return jsonify("Fuck")


# For Robot List Page
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
            i['enter'] = '<a href=/display/%s>' % i['sn']
            del i['kpi0'], i['kpi1'], i['kpi2'], i['kpi3'], i['kpi4']

    return jsonify(res)


# For Robot Detail Page - State
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

    dic = {'busy': random.randrange(0, 2), 'ready': random.randrange(0, 2), 'collision': random.randrange(0, 2),
           'error': random.randrange(0, 2), 'programState': random.randrange(0, 2), 'emergency': random.randrange(0, 2),
           'is_reporter_connected': random.randrange(0, 2), 'is_server_connected': random.randrange(0, 2)}
    cache.hset(sn, 'state', str(dic))
    return jsonify(dic)


# For Robot Detail Page - Events
@app.route("/datatable/events/<sn>/<condition>")
def events(sn, condition):
    if condition == 'all':
        sql = "SELECT idx, json, file, sn, " \
              "DATE_FORMAT(CONVERT_TZ(occurrence_time, '+00:00', '+09:00'), '%%Y-%%m-%%d %%H:%%i:%%s') " \
              "as occurrence_time " \
              "FROM events " \
              "WHERE sn=\"%s\" ORDER BY occurrence_time DESC " % sn
    else:
        sql = "SELECT idx, json, file, sn, " \
              "DATE_FORMAT(CONVERT_TZ(occurrence_time, '+00:00', '+09:00'), '%%Y-%%m-%%d %%H:%%i:%%s') " \
              "as occurrence_time " \
              "FROM events " \
              "WHERE sn=\"%s\" ORDER BY occurrence_time DESC LIMIT 5 " % sn
    res = MySQL.select(sql, True)

    if not res: return jsonify('')
    for i in res:
        a = i['json'].replace("\'", "\"")
        a = a.replace("\\", "\\\\")
        a = json.loads(a)
        i['code'] = get_robot_code_description(a['code'])
        # a = a['log'].split('\\')  # For Window
        a = a['log'].split('/')  # For Linux
        i['down'] = '<a class=c_hyper href=http://localhost:4000/datatable/event/%s/%s>' % (a[-1], i['sn'])

    return jsonify(res)


# For Robot Detail Page - Events
@app.route("/datatable/event/<filename>/<sn>")
def request(filename, sn):
    print(filename, sn, request)
    load_sse_command(sn, '_event', {'sn': sn, 'filename': filename})

    t1 = t0 = datetime.now()
    while t1.timestamp() - t0.timestamp() <= app.config['ROBOT_DATA_WAIT_TIMEOUT']:
        time.sleep(1)
        t1 = datetime.now()
        print("Wait : ", t1.timestamp() - t0.timestamp())

        # Todo : File 다운 받는 코드 작성 필요

    return redirect('http://localhost:3000/display/' + sn)


# For Robot Detail Page - Video
@app.route("/clip/<sn>")
def cam(sn):
    return 'ok'


# For Robot Detail Page - Video
@app.route("/get/poster")
def get_poster():
    return send_from_directory(os.path.join(os.getcwd(), 'static/img'), 'video_loading.jpg')


# For Robot Detail Page - Video
@app.route("/get/clip/<sn>")
def get_clip(sn):
    print(os.path.join(os.getcwd(), 'upload'))
    path = os.path.join(os.getcwd(), 'upload')
    res = send_from_directory(path, 'Chronograf.mp4')

    # Todo : Clip 요청하는 코드 작성 필요

    return res


# For Robot Detail Page - Chart
@app.route("/get/kpi/<sn>")
def get_kpi(sn):
    sql = "SELECT kpi0, kpi1, kpi2, kpi3, kpi4 FROM robots WHERE sn = \"%s\" " % sn
    kpi_str = MySQL.select(sql, False)
    print("KPI RES : ", kpi_str)
    if not kpi_str: return jsonify('')
    res = []
    for k, v in kpi_str.items():
        if v is not None:
            v = v.split(',')
            k = {'sn': sn, 'kpi': v[0], 'label': v[1], 'period': v[2], 'key': v[3], 'axis': v[4]}
        else:
            k = {'sn': None, 'kpi': None, 'label': None, 'period': None, 'key': None, 'axis': None}
        res.append(k)
    return jsonify(res)


# For Robot Detail Page - Chart
@app.route("/chart/data/<sn>/<axis>/<key>/recent/<period>")
def get_chart_data(sn, axis, key, period):
    # print("Opdata Loop SN : %s, Axis : %s, Key : %s, Time : %s" % (sn, axis, key, datetime.now().strftime(fmtAll)))
    # if key == 'count':
    #     sql = "SELECT DATE_FORMAT(CONVERT_TZ(MAX(x), '+00:00', '+09:00'), '%%m-%%d %%H:%%i') m, " \
    #           "COUNT(y) from opdatas " \
    #           "WHERE x >= \"%s\" AND x < \"%s\" AND serial_number = \"%s\" " \
    #           "GROUP BY ROUND(UNIX_TIMESTAMP(x) / 600) ORDER BY m DESC LIMIT 10" \
    #           % ((datetime.utcnow() - timedelta(minutes=180)).strftime(fmtAll), datetime.utcnow().strftime(fmtAll), sn)
    #     res = MySQL.select(sql)
    #     # print("Res : ", res)
    #     if res is not False and res is not None:
    #         for i in res:
    #             i['x'] = i['m']
    #             i['y'] = i['COUNT(y)']
    #             del i['m'], i['COUNT(y)']
    # elif key == 'mean' and axis == '1':
    #     sql = "SELECT DATE_FORMAT(CONVERT_TZ(x, '+00:00', '+09:00'), '%%m-%%d %%H:%%i') m, ROUND(AVG(y), 2) " \
    #           "FROM analog_opdatas " \
    #           "WHERE x >= \"%s\" AND x < \"%s\" AND serial_number = \"%s\" GROUP BY m ORDER by m DESC LIMIT 80" \
    #           % ((datetime.utcnow() - timedelta(hours=2)).strftime(fmtAll), datetime.utcnow().strftime(fmtAll), sn)
    #     res = MySQL.select(sql)
    #     if res is not False and res is not None:
    #         for i in res:
    #             i['x'] = i['m']
    #             i['y'] = i['ROUND(AVG(y), 2)']
    #             del i['m'], i['ROUND(AVG(y), 2)']
    # elif key == 'mean' and axis == '6':
    #     sql = "SELECT DATE_FORMAT(CONVERT_TZ(x, '+00:00', '+09:00'), '%%m-%%d %%H:%%i') m, " \
    #           "ROUND(AVG(joint0), 2), ROUND(AVG(joint1), 2), " \
    #           "ROUND(AVG(joint2), 2), ROUND(AVG(joint3), 2), " \
    #           "ROUND(AVG(joint4), 2), ROUND(AVG(joint5), 2) FROM temperature_opdatas " \
    #           "WHERE x >= \"%s\" AND x < \"%s\" AND serial_number = \"%s\" GROUP BY m ORDER by m DESC LIMIT 80" \
    #           % ((datetime.utcnow() - timedelta(hours=2)).strftime(fmtAll), datetime.utcnow().strftime(fmtAll), sn)
    #     res = MySQL.select(sql)
    #     # print("Res : ", res)
    #
    #     az = []
    #     bz = []
    #     cz = []
    #     dz = []
    #     ez = []
    #     fz = []
    #
    #     if res is None or type(res) is bool: return jsonify(res)
    #     for i in res:
    #         a = {'x': i['m'], 'y': i['ROUND(AVG(joint0), 2)']}
    #         b = {'x': i['m'], 'y': i['ROUND(AVG(joint1), 2)']}
    #         c = {'x': i['m'], 'y': i['ROUND(AVG(joint2), 2)']}
    #         d = {'x': i['m'], 'y': i['ROUND(AVG(joint3), 2)']}
    #         e = {'x': i['m'], 'y': i['ROUND(AVG(joint4), 2)']}
    #         f = {'x': i['m'], 'y': i['ROUND(AVG(joint5), 2)']}
    #         az.append(a)
    #         bz.append(b)
    #         cz.append(c)
    #         dz.append(d)
    #         ez.append(e)
    #         fz.append(f)
    #
    #     aa = [az, bz, cz, dz, ez, fz]
    #     return jsonify(aa)
    # else:
    #     res = None
    # return jsonify(res)

    res = [
        {'x': (datetime.now() - timedelta(minutes=30)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=60)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=90)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=120)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=150)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=180)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=210)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=240)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=270)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=300)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=330)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=360)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=390)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=420)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=450)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=480)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=510)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=540)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=570)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=600)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=630)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=660)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=690)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=720)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=750)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=780)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=810)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=840)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=870)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=900)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=930)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=960)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=990)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=1200)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=1230)).strftime(fmtAll), 'y': random.randrange(30, 100)},
        {'x': (datetime.now() - timedelta(minutes=1260)).strftime(fmtAll), 'y': random.randrange(30, 100)}
    ]

    return jsonify(res)


""" Reporter APIs """


@app.route("/reporter/robot/info", methods=["POST"])
def post_sn_from_reporter():
    return 1


@app.route("/reporter/robot/state/<sn>", methods=["POST"])
def post_robot_state(sn):
    return 1


@app.route("/reporter/robot/event/<file>/<sn>", methods=["POST"])
def post_robot_event(file, sn):
    return 1


@app.route("/reporter/chart/data/<sn>", methods=["POST"])
def post_robot_chart_data(sn):
    return 1


@app.route("/reporter/robot/kpi/<sn>", methods=["POST"])
def post_robot_kpi(sn):
    return 1


""" Test APIs"""


@app.route("/test", methods=['GET'])
@LoginRequired("user")
def test():
    print(current_user.is_authenticated)
    print(current_user.id)
    return jsonify("Fuck")



