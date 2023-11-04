

const sessionTokenFactory = new QuizSessionStorageFactory();
const localTokenFactory = new QuizLocalStorageFactory();

const sessionTokenStorage = sessionTokenFactory.createStorage();
const localTokenStorage = localTokenFactory.createStorage();

sessionTokenStorage.setToken('sessionToken123');
sessionTokenStorage.setFlag('false')
localTokenStorage.setToken('localToken456');
localTokenStorage.setFlag('false')
const sessionToken = sessionTokenStorage.getToken();
const localToken = localTokenStorage.getToken();

console.log(`Session Token: ${sessionToken}`);
console.log(`Local Token: ${localToken}`);
