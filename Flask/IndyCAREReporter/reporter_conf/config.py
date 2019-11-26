import json, os

CONFIG_PATH = os.path.join('/home/user/release/IndyCAREReporter', 'reporter_conf/')
# print(CONFIG_PATH)
with open(CONFIG_PATH + 'indyCAREConfig.json') as file:
    json_data = json.load(file)
    # print(data)

URL = json_data['url']
COMPANY = json_data['company']
SITE = json_data['site']
HEADER = json_data['header']

