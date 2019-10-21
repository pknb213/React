import os, sys
from flask import Flask
sys.path.append(os.getcwd())
sys.path.append(os.getcwd() + os.path.sep + 'python')
print(os.getcwd())

app = Flask(__name__, template_folder=os.getcwd()+'/templates', static_folder=os.getcwd()+'/static')
app.config.update(
    DEBUG=False,
    SCREATE_KEY='secret_xxx',
)

