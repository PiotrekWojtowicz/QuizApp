class StorageFactory {
    constructor() {
        if (new.target === StorageFactory) {
            throw new Error("This class cannot be initiated")
        }
    }

    createStorage() {
        throw new Error("Method needs to be implemented");
    }
}

class QuizSessionStorageFactory extends StorageFactory {
    createStorage() {
        return new QuizSessionStorage();
    }
}

class QuizLocalStorageFactory extends StorageFactory {
    createStorage() {
        return new QuizLocalStorage();
    }
}

class QuizStorage {

    constructor() {
        if (new.target === QuizStorage) {
            throw new Error("This class cannot be initiated")
        }
        this.tokenKey = "token";
        this.flagKey = "isFinished"
        this.pointsKey = "points"
    }

    setFlag(flag){
        throw new Error("Method needs to be implemented");
    }

    getFlag(){
        throw new Error("Method needs to be implemented");
    }

    removeFlag(){
        throw new Error("Method needs to be implemented");
    }

    setPoints(points){
        throw new Error("Method needs to be implemented");
    }

    getPoints(){
        throw new Error("Method needs to be implemented");
    }

    removePoints(){
        throw new Error("Method needs to be implemented");
    }

    setToken(token) {
        throw new Error("Method needs to be implemented");
    }

    getToken() {
        throw new Error("Method needs to be implemented");
    }

    removeToken() {
        throw new Error("Method needs to be implemented");
    }
}

class QuizSessionStorage extends QuizStorage {

    constructor() {
        super();
    }

    setFlag(flag){
        sessionStorage.setItem(this.flagKey, flag);
    }

    getFlag(){
        return sessionStorage.getItem(this.flagKey);
    }

    removeFlag(){
        sessionStorage.removeItem(this.flagKey);
    }

    setPoints(points){
        sessionStorage.setItem(this.pointsKey, points);
    }

    getPoints(){
        return sessionStorage.getItem(this.pointsKey);
    }

    removePoints(){
        sessionStorage.removeItem(this.pointsKey);
    }

    setToken(token) {
        sessionStorage.setItem(this.tokenKey, token);
    }

    getToken() {
        return sessionStorage.getItem(this.tokenKey);
    }

    removeToken() {
        sessionStorage.removeItem(this.tokenKey);
    }
}

class QuizLocalStorage extends QuizStorage {

    constructor() {
        super();
    }

    setFlag(flag){
        localStorage.setItem(this.flagKey, flag);
    }

    getFlag(){
        return localStorage.getItem(this.flagKey);
    }

    removeFlag(){
        localStorage.removeItem(this.flagKey);
    }

    setPoints(points){
        localStorage.setItem(this.pointsKey, points);
    }

    getPoints(){
        return localStorage.getItem(this.pointsKey);
    }

    removePoints(){
        localStorage.removeItem(this.pointsKey);
    }

    setToken(token) {
        localStorage.setItem(this.tokenKey, token);
    }

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    removeToken() {
        localStorage.removeItem(this.tokenKey);
    }
}

class XMLHttpRequestAbs{

    createXMLHttpRequest() {
        throw new Error("Method needs to be implemented");
    }
}


class StandardXMLHttpRequestFactory extends XMLHttpRequestAbs {
    createXMLHttpRequest() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else {
            throw new Error("XMLHttpRequest is not supported in this environment.");
        }
    }
}

class LoginXMLHttpRequest extends XMLHttpRequestAbs {
    
    constructor(username, password) {
        super();
        this.endpoint = 'http://127.0.0.1:5000/login/';
        this.method = 'POST';
        this.username = username;
        this.password = password;
    }
    
    createXMLHttpRequest() {
        if (window.XMLHttpRequest) {
            const xmlHttp = new StandardXMLHttpRequestFactory();
            const xhr = xmlHttp.createXMLHttpRequest();
            xhr.open(this.method, this.endpoint);
            xhr.setRequestHeader('login', this.username);
            xhr.setRequestHeader('password', this.password);
            xhr.setRequestHeader('Access-Control-Allow-Origin','*');
            xhr.setRequestHeader('Content-Type','application/json');

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const sessionFactory = new QuizLocalStorageFactory();
                        const sessionStorage = sessionFactory.createStorage();
                        sessionStorage.setToken(xhr.responseText);
                        sessionStorage.setFlag(1);
                        sessionStorage.setPoints(0);
                        window.location.href = './quiz/quiz.html';
                    } else {
                        window.alert("Błędne dane logowania");
                    }
                }
            };
            xhr.send();
        } else {
            throw new Error("XMLHttpRequest is not supported in this environment.");
        }
    }
}

class AddQuestionXMLHttpRequest extends XMLHttpRequestAbs {

    constructor(username, password) {
        super();
        this.endpoint = 'http://127.0.0.1:5000/login/';
        this.method = 'POST';
        this.username = username;
        this.password = password;
    }

    createXMLHttpRequest() {
        if (window.XMLHttpRequest) {
            const xmlHttp = new StandardXMLHttpRequestFactory();
            const xhr = xmlHttp.createXMLHttpRequest();
            xhr.open(this.method, this.endpoint);
            xhr.setRequestHeader('login', this.username);
            xhr.setRequestHeader('password', this.password);
            xhr.setRequestHeader('Access-Control-Allow-Origin','*');
            xhr.setRequestHeader('Content-Type','application/json');

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const sessionFactory = new QuizLocalStorageFactory();
                        const sessionStorage = sessionFactory.createStorage();
                        sessionStorage.setToken(xhr.responseText);
                        sessionStorage.setFlag(1);
                        sessionStorage.setPoints(0);
                        window.location.href = './formularzAdd.html';
                    } else {
                        window.alert("Błędne dane logowania");
                    }
                }
            };
            xhr.send();
        } else {
            throw new Error("XMLHttpRequest is not supported in this environment.");
        }
    }
}

class DelXMLHttpRequest extends XMLHttpRequestAbs {

    constructor(username, password) {
        super();
        this.endpoint = 'http://127.0.0.1:5000/login/';
        this.method = 'POST';
        this.username = username;
        this.password = password;
    }

    createXMLHttpRequest() {
        if (window.XMLHttpRequest) {
            const xmlHttp = new StandardXMLHttpRequestFactory();
            const xhr = xmlHttp.createXMLHttpRequest();
            xhr.open(this.method, this.endpoint);
            xhr.setRequestHeader('login', this.username);
            xhr.setRequestHeader('password', this.password);
            xhr.setRequestHeader('Access-Control-Allow-Origin','*');
            xhr.setRequestHeader('Content-Type','application/json');

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const sessionFactory = new QuizLocalStorageFactory();
                        const sessionStorage = sessionFactory.createStorage();
                        sessionStorage.setToken(xhr.responseText);
                        sessionStorage.setFlag(1);
                        sessionStorage.setPoints(0);
                        window.location.href = './formularz.html';
                    } else {
                        window.alert("Błędne dane logowania");
                    }
                }
            };
            xhr.send();
        } else {
            throw new Error("XMLHttpRequest is not supported in this environment.");
        }
    }
}

class PutQuestionXMLHttpRequest extends XMLHttpRequestAbs {

    constructor() {
        super();
        this.endpoint = 'http://127.0.0.1:5000/add/';
        this.method = 'PUT';
    }

    createXMLHttpRequest(question, a, b, c, d, propAns) {
        if (window.XMLHttpRequest) {
            const xmlHttp = new StandardXMLHttpRequestFactory();
            const xhr = xmlHttp.createXMLHttpRequest();
            xhr.open(this.method, this.endpoint);
            xhr.setRequestHeader('Access-Control-Allow-Origin','*');
            xhr.setRequestHeader('Content-Type','application/json');
            const sessionFactory = new QuizLocalStorageFactory();
            const sessionStorage = sessionFactory.createStorage();
            if(sessionStorage.getToken() === null){
                window.alert("You are not authorized");
                window.location.href = '../signin.html';
            }
            const tokenWithoutQuotes = sessionStorage.getToken().replace(/"/g, '');
            xhr.setRequestHeader('token', tokenWithoutQuotes);
            xhr.setRequestHeader('question', question);
            xhr.setRequestHeader('answA', a);
            xhr.setRequestHeader('answB', b);
            xhr.setRequestHeader('answC', c);
            xhr.setRequestHeader('answD', d);
            xhr.setRequestHeader('correct', propAns);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        window.alert("Dodano pytanie :)");
                    } else {
                        window.alert("Błędne dane logowania");
                    }
                }
            };
            xhr.send();
        } else {
            throw new Error("XMLHttpRequest is not supported in this environment.");
        }
    }
}
class DelQuestionXMLHttpRequest extends XMLHttpRequestAbs {

    constructor() {
        super();
        this.endpoint = 'http://127.0.0.1:5000/delete/';
        this.method = 'DELETE';
    }

    createXMLHttpRequest(questions) {
        if (window.XMLHttpRequest) {
            const xmlHttp = new StandardXMLHttpRequestFactory();
            const xhr = xmlHttp.createXMLHttpRequest();
            xhr.open(this.method, this.endpoint);
            xhr.setRequestHeader('Access-Control-Allow-Origin','*');
            xhr.setRequestHeader('Content-Type','application/json');
            const sessionFactory = new QuizLocalStorageFactory();
            const sessionStorage = sessionFactory.createStorage();
            if(sessionStorage.getToken() === null){
                window.alert("You are not authorized");
                window.location.href = '../signin.html';
            }
            const tokenWithoutQuotes = sessionStorage.getToken().replace(/"/g, '');
            xhr.setRequestHeader('token', tokenWithoutQuotes);
            xhr.setRequestHeader('questions', questions);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        window.alert("Usunieto pytanie/a :)");
                    } else {
                        window.alert("Błędne dane logowania");
                    }
                }
            };
            xhr.send();
        } else {
            throw new Error("XMLHttpRequest is not supported in this environment.");
        }
    }
}
class EditQuestionsXmlHttpRequest extends XMLHttpRequestAbs {
    constructor() {
        super();
        this.endpoint = 'http://127.0.0.1:5000/questionsAll/';
        this.method = 'GET';
    }

    createXMLHttpRequest() {
        return new Promise((resolve, reject) => {
            if (window.XMLHttpRequest) {
                const xmlHttp = new StandardXMLHttpRequestFactory();
                const xhr = xmlHttp.createXMLHttpRequest();
                xhr.open(this.method, this.endpoint);
                xhr.setRequestHeader('Access-Control-Allow-Origin','*');
                xhr.setRequestHeader('Content-Type','application/json');
                const sessionFactory = new QuizLocalStorageFactory();
                const sessionStorage = sessionFactory.createStorage();
                if(sessionStorage.getToken() === null){
                    window.alert("You are not authorized");
                    window.location.href = '../signin.html';
                }
                const tokenWithoutQuotes = sessionStorage.getToken().replace(/"/g, '');
                xhr.setRequestHeader('token', tokenWithoutQuotes);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            resolve(xhr.responseText);
                        } else {
                            window.alert("Błędne dane logowania");
                            reject(new Error("Request failed with status " + xhr.status));
                        }
                    }
                };
                xhr.send();
            } else {
                reject(new Error("XMLHttpRequest is not supported in this environment."));
            }
        });
    }
}

class CheckProfXmlHttpRequest extends XMLHttpRequestAbs {
    constructor() {
        super();
        this.endpoint = 'http://127.0.0.1:5000/checkProf/';
        this.method = 'GET';
    }

    createXMLHttpRequest() {
        return new Promise((resolve, reject) => {
            if (window.XMLHttpRequest) {
                const xmlHttp = new StandardXMLHttpRequestFactory();
                const xhr = xmlHttp.createXMLHttpRequest();
                xhr.open(this.method, this.endpoint);
                xhr.setRequestHeader('Access-Control-Allow-Origin','*');
                xhr.setRequestHeader('Content-Type','application/json');
                const sessionFactory = new QuizLocalStorageFactory();
                const sessionStorage = sessionFactory.createStorage();
                if(sessionStorage.getToken() === null){
                    window.alert("You are not authorized");
                    window.location.href = '../signin.html';
                }
                const tokenWithoutQuotes = sessionStorage.getToken().replace(/"/g, '');
                xhr.setRequestHeader('token', tokenWithoutQuotes);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            resolve(xhr.responseText);
                        } else {
                            window.alert("Błędne dane logowania");
                            reject(new Error("Request failed with status " + xhr.status));
                        }
                    }
                };
                xhr.send();
            } else {
                reject(new Error("XMLHttpRequest is not supported in this environment."));
            }
        });
    }
}

class QuestionXMLHttpRequest extends XMLHttpRequestAbs{

    constructor() {
        super();
        this.endpoint = 'http://127.0.0.1:5000/questions/';
        this.method = 'GET';
    }

    createXMLHttpRequest() {
        if (window.XMLHttpRequest) {
            const xmlHttp = new StandardXMLHttpRequestFactory();
            const xhr = xmlHttp.createXMLHttpRequest();
            xhr.open(this.method, this.endpoint);
            xhr.setRequestHeader('Access-Control-Allow-Origin','*');
            xhr.setRequestHeader('Content-Type','application/json');
            const sessionFactory = new QuizLocalStorageFactory();
            const sessionStorage = sessionFactory.createStorage();
            if(sessionStorage.getToken() === null){
                window.alert("You are not authorized");
                window.location.href = '../signin.html';
            }
            const tokenWithoutQuotes = sessionStorage.getToken().replace(/"/g, '');
            xhr.setRequestHeader('token', tokenWithoutQuotes);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const jsonData = JSON.parse(xhr.response);
                        if(!jsonData.hasOwnProperty('answers')){
                            if(window.location.href !== 'file:///Users/piotrwojtowicz/fleet/QuizApp/html/quiz/quizlastpage.html'){
                                window.location.href = '../quiz/quizlastpage.html';
                            }
                        }
                        const template = new TemplateEngine();
                        template.incrementStorage();
                        template.insertText(jsonData);
                        TemplateEngine.propAnswer = jsonData['correct_answer'];
                    } else {
                        window.alert("Błędne dane logowania");
                        window.location.href = '../signin.html';
                    }
                }
            };
            xhr.send();

        } else {
            throw new Error("XMLHttpRequest is not supported in this environment.");
        }
    }

    checkPoints(){
        TemplateEngine.checkAnswer();
    }

}

class TemplateEngine{

    static propAnswer = "";

    constructor() {
        this.questionField = document.getElementById("question");
        this.ansA = document.getElementById("answA");
        this.ansB = document.getElementById("answB");
        this.ansC = document.getElementById("answC");
        this.ansD = document.getElementById("answD");
        this.numField = document.getElementsByClassName("number");
        const sessionFactory = new QuizLocalStorageFactory();
        this.sessionStorage = sessionFactory.createStorage();
    }

    incrementStorage(){
        let num = this.sessionStorage.getFlag();
        for (let i = 0; i < this.numField.length; i++) {
            this.numField[i].textContent = num;
        }
        this.sessionStorage.removeFlag();

        num = parseInt(num);
        num += 1;
        num = num.toString();
        this.sessionStorage.setFlag(num);
    }

    insertText(jsonData) {
        this.questionField.innerText=jsonData['question'];
        this.ansA.innerText=jsonData['answers'][0];
        this.ansB.innerText=jsonData['answers'][1];
        this.ansC.innerText=jsonData['answers'][2];
        this.ansD.innerText=jsonData['answers'][3];
    }
    static checkAnswer(){
        let userAnswer;
        let radios = document.getElementsByName('q1');
        let sessionFactory = new QuizLocalStorageFactory();
        let sessionStorage = sessionFactory.createStorage();

        for (let i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                userAnswer = radios[i].nextSibling.textContent;
                break;
            }
        }

        if (userAnswer === this.propAnswer) {
            let num = sessionStorage.getPoints();
            num = parseInt(num);
            num += 1;
            num = num.toString();
            sessionStorage.removePoints();
            sessionStorage.setPoints(num);
        }
    }

}

const standardFactory = new StandardXMLHttpRequestFactory();

const standardXHR = standardFactory.createXMLHttpRequest();
