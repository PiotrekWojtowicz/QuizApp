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
                        sessionStorage.setFlag('false');
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

const standardFactory = new StandardXMLHttpRequestFactory();

const standardXHR = standardFactory.createXMLHttpRequest();
