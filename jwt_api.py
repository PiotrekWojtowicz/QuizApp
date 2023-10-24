import jwt

test_user = {
    'login': 'john123',
    'password': 'ilike69and420'
}

test_user2 = {
    'login': 'amy456',
    'password': 'b00bs'
}

users = [test_user, test_user2]
global_token = ''


def getToken(login, password):
    try:
        if (next(item for item in users if (item["login"] == login) and (item["password"] == password)), False):
            token = jwt.encode(
                key=password,
                payload=next(item for item in users if item["login"] == login)
            )
            global global_token
            global_token = token
            return token
    except StopIteration:
        return ('Invalid Data!')


def authorizeToken(token):
    if (token == global_token):
        return token
    else:
        return "Invalid Token!"


print(getToken('amy456', 'b00bs'))
print(getToken('lololpl', 'aosfjkaakf'))
print(authorizeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFteTQ1NiIsInBhc3N3b3JkIjoiYjAwYnMifQ.aJjxMJkxxONf59gaMenIn4q-irwm0S3Cf0J1A7GMzJM'))
print(authorizeToken(''))
