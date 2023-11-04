import jwt
from flask import Flask, request, jsonify, abort
from flask_cors import CORS, cross_origin
import random as rd
import json
import unittest

# type 'flask --app jwt_api run' to start locally
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# users
test_user = {
    'login': 'a',
    'password': 'a'
}

test_user2 = {
    'login': 'amy456',
    'password': 'b00bs'
}

users = [test_user, test_user2]


class QuestionManager:
    def __init__(self, data_file):
        self.questions = []
        self.index = 0
        self.max_questions = 10

        # Load questions from the JSON data file
        with open(data_file, 'r') as file:
            self.questions = json.load(file)

        # Shuffle the questions to randomize the order
        rd.shuffle(self.questions)

    def get_next_question(self):
        if self.index < self.max_questions:
            question = self.questions[self.index]
            self.index += 1
            return question
        else:
            return None  # No more questions available

    def reset_questions(self):
        self.index = -1
        rd.shuffle(self.questions)

    def has_more_questions(self):
        return self.index < self.max_questions


class API:
    def __init__(self) -> None:
        self.global_token = ''
        self.finishExam = False
        # list of questions indices
        self.questions_list = list(range(1, 101))
        self.questions_list = rd.sample(self.questions_list, 10)
        rd.shuffle(self.questions_list)


api = API()
question_manager = QuestionManager('questions.json')


# login endpoint
@app.route("/login/", methods=['POST'])
@cross_origin(origin='*')
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
    print(token)
    if (token == api.global_token):
        if(question_manager.has_more_questions()):
            print(question_manager.index)
            return jsonify(question_manager.get_next_question())
        else:
            api.finishExam = True
            question_manager.reset_questions()
            return jsonify(json.dumps({'finished': api.finishExam}))
    else:
        abort(401, description="Invalid token!")


@app.route("/questionsAll/", methods=['GET'])
def getQuestions(token: str = ''):
    token = request.headers.get('token')
    print(token)
    if (token == api.global_token):
        return jsonify(question_manager.questions)
    else:
        abort(401, description="Invalid token!")

# adding new questions
@app.route("/add", methods=['PUT'])
def add_question(question):
    temp = open("temp.txt", "a")
    temp.write(question)


if __name__ == '__main__':
    print('siema')
