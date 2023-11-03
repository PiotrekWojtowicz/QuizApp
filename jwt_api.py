import jwt
from flask import Flask, request, jsonify, abort
import random as rd
import unittest

# type 'flask --app jwt_api run' to start locally
app = Flask(__name__)


# users
test_user = {
    'login': 'john123',
    'password': 'ilike69and420'
}

test_user2 = {
    'login': 'amy456',
    'password': 'b00bs'
}

users = [test_user, test_user2]


class API:
    def __init__(self) -> None:
        self.global_token = ''
        self.finishExam = False
        # list of questions indices
        self.questions_list = list(range(1, 101))
        self.questions_list = rd.sample(self.questions_list, 10)
        rd.shuffle(self.questions_list)


api = API()


# login endpoint
@app.route("/login/", methods=['POST'])
def authorize_login(login: str = '', password: str = ''):
    try:
        login = request.headers.get("login")
        password = request.headers.get('password')

        print("login: " + str(login) + " | password: " + str(password))

        if (next(item for item in users if (item["login"] == login) and (item["password"] == password)), False):
            token = jwt.encode(
                key=password,
                payload=next(item for item in users if item["login"] == login)
            )
            api.global_token = token
            return jsonify(token)
    except StopIteration:
        abort(401, description="Invalid data!")


# getting questions
@app.route("/questions/", methods=['GET'])
def getQuestion(token: str = ''):
    token = request.headers.get('token')

    if (token == api.global_token):
        if (len(api.questions_list) == 0):
            api.finishExam = True
            return jsonify(api.finishExam)
        question = api.questions_list.pop()
        return jsonify(question)
    else:
        abort(401, description="Invalid token!")


# adding new questions
@app.route("/add", methods=['PUT'])
def add_question(question):
    temp = open("temp.txt", "a")
    temp.write(question)


# unit tests
class UnitTests(unittest.TestCase):

    def test_login(self):
        response = app.test_client().post('/login/', headers={
            "login": "amy456",
            "password": "b00bs"
        })

        assert response.status_code == '200'


if __name__ == '__main__':
    unittest.main()
