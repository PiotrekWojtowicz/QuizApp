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
    'login': 'Profesor',
    'password': 'a'
}

test_user2 = {
    'login': 'Student',
    'password': 'a'
}

users = [test_user, test_user2]


class QuestionManager:
    def __init__(self):
        self.questions = []
        self.index = 0
        self.max_questions = 10

    def reload_all_questions(self, data_file):
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
question_manager = QuestionManager()
question_manager.reload_all_questions('questions.json')
global idNum
idNum = len(question_manager.questions)


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
        if (question_manager.has_more_questions()):
            print(question_manager.index)
            return jsonify(question_manager.get_next_question())
        else:
            api.finishExam = True
            question_manager.reset_questions()
            return jsonify(json.dumps({'finished': api.finishExam}))
    else:
        abort(401, description="Invalid token!")


@app.route("/questionsAll/", methods=['GET'])
@cross_origin(origin='*')
def getQuestions(token: str = ''):
    token = request.headers.get('token')
    print(token)
    if (token == api.global_token):
        question_manager.reload_all_questions('questions.json')
        return jsonify(question_manager.questions)
    else:
        abort(401, description="Invalid token!")

@app.route("/checkProf/", methods=['GET'])
@cross_origin(origin='*')
def checkProf(token: str = ''):
    token = request.headers.get('token')
    print(token)
    if (token == "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IlByb2Zlc29yIiwicGFzc3dvcmQiOiJhIn0.qJ-RHgdi2Mztz3AVTVEgJ6pXo8k22lIIBFZTVqhqNKI"):
        return jsonify("True")
    else:
        abort(401, description="Invalid token!")

# adding new questions
@app.route("/add/", methods=['PUT'])
def add_question(token: str = '', question: str = ''):
    token = request.headers.get('token')
    global idNum
    idNum += 1
    question = {
        "id":idNum,
        "question": request.headers.get('question'),
        "answers": [
            request.headers.get('answA'),
            request.headers.get('answB'),
            request.headers.get('answC'),
            request.headers.get('answD')
        ],
        "correct_answer": request.headers.get('correct')
    }
    print(token)
    if (token == api.global_token):
        with open('questions.json', 'r+') as questionFile:
            questionFile_data = json.load(questionFile)
            questionFile_data.append(question)
            questionFile.seek(0)
            json.dump(questionFile_data, questionFile, indent=4)
            question_manager.reload_all_questions('questions.json')
            return jsonify("Added")
    else:
        abort(401, description="Invalid token!")

# deleting questions
@app.route("/delete/", methods=['DELETE'])
def delete_question(token: str = '', questions: str = ''):
    token = request.headers.get('token')
    questions = request.headers.get('questions').split()
    print(token)
    print(questions)
    if (token == api.global_token):
        with open('questions.json', 'r+') as questionFile:
            questionFile_data = json.load(questionFile)
        for q in questions:
            del questionFile_data[int(q)]
        with open('questions.json', 'w') as questionWrite:
            json.dump(questionFile_data, questionWrite, indent=4)

        question_manager.reload_all_questions('questions.json')
        return jsonify("Success")
    else:
        abort(401, description="Invalid token!")


if __name__ == '__main__':
    print('siema')
