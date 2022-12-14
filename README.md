# Bem-vindo ao Projeto 5: Bate-papo UOL da Driven
### Aluno: Daniel Bernardino de Souza
### Turma 8

## Introdução

O projeto consiste em criar um site de bate-papo, utilizando uma API disponibilizada pela Driven Education.

Durante o decorrer deste readme, irei mostrar os detalhes do código, facilitando sem entendimento.

Sem mais delongas:

###
<details><summary><h2>Gerais</h2></summary>

<p>

Algumas partes do código que não estão dependentes dos próximos títulos. Como, por exemplo, utilitários CSS.

#### HTML
~~~html
<!-- configurações da página -->
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Bate-papo UOL</title>

<!-- Importações de estilos -->
<link rel="stylesheet" href="./css/reset.css" />
<link rel="stylesheet" href="./css/style.css" />

<!-- axios -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<!-- icons -->
<script src="https://unpkg.com/ionicons@5.4.0/dist/ionicons.js"></script>

<!-- javascripts -->
<script src="scripts.js"></script>
~~~
#### CSS
~~~css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

* {
    box-sizing: border-box;
}

body {
    background: #F3F3F3;
    width: 375px;
    
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
}

button {
    background: #FFFFFF;
    border: 0px;
    cursor: pointer;
}

b { font-weight: 700; }

.u-total-centralized {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}

.u-message { background: #FFFFFF; }

.u-private_message { background: #FFDEDE; }

.u-status { background: #DCDCDC; }

.is-freezed {
    position: fixed;
    top: 0;

    height: 100%;
    width: 100%;
    
    overflow: hidden;
}

.is-hidden { display: none; }

.is-selected { display: initial !important; }

.is-shrunken { max-width: 0; }
~~~
#### Javascript
~~~javascript
const darkBackgroundMenu = document.querySelector('.js-menu__background');
const chat = document.querySelector('.js-screen__chat');
const menu = document.querySelector('.js-menu');
const icon = document.getElementById('js-screen__icon-menu');
const descriptionInputInChat = document.getElementById('js-screen__input-description');

let userName = '';
let nameToSendMessage = 'Todos';
let statusMessage = 'message';

function makeGet(description, url) {

    const promise = axios.get(url);

    if (description === 'allMessages') {

        promise.then( downloadMessages )
        promise.catch( errorCorretions )

    } else if (description === 'usersOnline') {

        promise.then( downloadUsersOnline )
        promise.catch( errorCorretions )
    }
}

function makePost(description, url, body) {

    const promise = axios.post(url, body);

    if (description === 'signInServer') {

        promise.then( getMessagesAndUsers )
        promise.catch( errorCorretions )

    } else if (description === 'sendMessage'){

        promise.then( (answer) => console.log(answer))
        promise.catch( errorCorretions )

    } else if (description === 'none') { return }
}

function errorCorretions(answer) {

    const errorURL = answer.response.request.responseURL
    const codeStatusError = answer.response.status

    if (errorURL === 'https://mock-api.driven.com.br/api/v6/uol/participants') {

        switch (codeStatusError) {
            case 400:
                alert('Insira um nome válido para entrar no chat. \n\nIsso acontece quando você não digita algo ou quando o nome digitado já é utilizado, nesse caso, utilize outro nome. \n\nPara mais informações, consulte nossa equipe.');
                break;
            default:
                alert('infelizmente tivemos um problema.');
        }

    } else if (errorURL === 'https://mock-api.driven.com.br/api/v6/uol/messages') {

        switch (codeStatusError) {
            case 400:
                alert('Você precisa digitar algo para enviar uma mensagem.');
                break;
            default:
                alert('infelizmente tivemos um problema.');
        }
    }
}

document.addEventListener('keypress', function(e) {
    
    if(e.key === 'Enter') {
        const screenLogin = document.querySelector('.js-login').classList;
        const isVisible = screenLogin.value.includes('is-hidden');
        let buttonEnter = '';

        if (!isVisible) {
            buttonEnter = document.getElementById('js-login__button');
            buttonEnter.click();
        } else {
            buttonEnter = document.getElementById('js-screen__button');
            buttonEnter.click();
        }

    }
});

document.documentElement.onclick = function(event){

    if (event.target === icon) {

        menu.classList.remove('is-shrunken');
        darkBackgroundMenu.classList.remove('is-shrunken');
        chat.classList.add('is-freezed');
        
    } else if (event.target === darkBackgroundMenu){

        menu.classList.add('is-shrunken');
        darkBackgroundMenu.classList.add('is-shrunken');
        chat.classList.remove('is-freezed');
    }
}
~~~
</p>
</details>

###
<details><summary><h2>Tela de login</h2></summary>

<p>
Uma interface que possui um input e um botão, perguntando e conferindo se o nome do usuário é válido para aquele chat. Logo depois, há uma tela de loading de 5s antes de entrar no chat.

#### HTML
~~~html
<!-- tela de login no servidor -->
<div class="c-login u-total-centralized js-login">

    <img src="./src/logo.png" class="c-login__logo" alt="login__logo" />

    <div class="js-login__input u-total-centralized">
        <input type="text" class="c-login__input js-login__name" placeholder="Digite seu nome" />
        <button class="c-login__button" onclick="registerAndLogin()">Entrar</button>
    </div>

    <div class="js-login__loader is-hidden">
        <img src="./src/loading-loader.gif" class="c-login__loader" alt="login__loader" />
    </div>

</div>
<!-- /tela de login no servidor -->
~~~
#### CSS
~~~css
.c-login {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 5;

    background-color: #FFFFFF;
    height: 100%;
    width: 100%;
}

.c-login__logo {
    position: absolute;
    left: center;
    top: 15%;

    height: 92px;
    width: 130px;
}

.c-login__loader { width: 70px; }

.c-login__input {
    background: #FFFFFF;
    border: 1px solid #D7D7D7;
    border-radius: 4px;
    margin: 20px;
    height: 54px;
    width: 261px;

    font-size: 18px;
    text-align: center;
}

.c-login ::-webkit-input-placeholder { text-align: center; }

.c-login__button {
    background-color: black;
    background: #E7E7E7;
    border-radius: 9px;
    height: 45px;
    width: 109px;
}
~~~
#### Javascript
~~~javascript
function registerAndLogin() {

    const screenLogin = document.querySelector('.js-login');
    const inputLogin = document.querySelector('.js-login__input');
    const loaderLogin = document.querySelector('.js-login__loader');

    userName = document.querySelector('.js-login__name').value;

    inputLogin.classList.remove('u-total-centralized')
    inputLogin.classList.add('is-hidden');

    loaderLogin.classList.remove('is-hidden');

    makePost('signInServer', 'https://mock-api.driven.com.br/api/v6/uol/participants', {name: userName});
    
    setTimeout(() => {
        screenLogin.classList.remove('u-total-centralized');
        screenLogin.classList.add('is-hidden');
    }, 3000);
}

function getMessagesAndUsers() {

    setInterval(() => {
        makeGet('allMessages', 'https://mock-api.driven.com.br/api/v6/uol/messages');
    }, 3000);
    
    setInterval(() => {
        makeGet('usersOnline', 'https://mock-api.driven.com.br/api/v6/uol/participants');
    }, 10000);
    
    setInterval(() => {
        makePost('none', 'https://mock-api.driven.com.br/api/v6/uol/status', {name: userName});
    }, 5000)
}
~~~

</p>
</details>

###
<details><summary><h2>Chat</h2></summary>

<p>

Possui um topo fixo com a logo e menu. Além disso, todas as 100 últimas mensagens do servidor são puxadas e renderizadas na tela, mas você não conseguirá ver mensagens privadas que não foram destinadas a você.


#### HTML
~~~html
<!-- tela do bate-papo -->
<div class="c-screen">

    <div class="c-screen__top">
        <img src="./src/logo.png" alt="logo-uol" />
        <ion-icon name="people" id="js-screen__icon-menu"></ion-icon>
    </div>

    <div class="c-screen__chat js-screen__chat"></div>

    <div class="c-screen__bottom">

        <div>
            <input type="text" class="c-screen_input" placeholder="Escreva aqui...">
            <p id="js-screen__input-value" class="c-screen__input-value is-hidden">Enviando para Todos (reservadamente)</p>
        </div>

        <button class="c-screen__button" id="js-screen__button" onclick="sendMSM('.c-screen_input')">
            <ion-icon name="paper-plane-outline"></ion-icon>
        </button>

    </div>
</div>
<!-- /tela do bate-papo -->
~~~
#### CSS
~~~css
.c-screen__top, .c-screen__bottom  {
    position: fixed;
    left: 0;
    z-index: 1;

    background: #FFFFFF;
    height: 80px;
    padding: 0 21px;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
}

.c-screen__top {
    top: 0;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
}

.c-screen__bottom  {
    bottom: 0;
    box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.05);
}

.c-screen__top ion-icon { font-size: 45px; }


.c-screen__bottom ion-icon { font-size: 26px; }

.c-screen__chat {
    margin-bottom: 90px;
    margin-top: 100px;
    width: 100%;
}

.c-screen__message {
    border-radius: 2px;
    margin: 6px 0px;
    min-height: 40px;
    width: 100%;

    display: flex;
    align-items: center;
}

.c-screen__message p {
    padding: 10px 8px;
    width: 375px;

    word-wrap: break-word;
}

.c-screen__hour { color: #AAAAAA; }

.c-screen__input-value {
    position: relative;
    top: 10px;
    
    color: #505050;

    font-weight: 300;
    font-size: 14px;
    line-height: 18px;
    
    pointer-events: none;
}

.c-screen_input[type='text'], input:focus {
    height: 50%;
    width: 97%;
    
    box-shadow: 0 0 0 0;
    border: 0 none;
    color: #000000;
    outline: 0;
    
    font-size: 18px;
    font-style: italic;
}
~~~
#### Javascript
~~~javascript
function sendMessage(inputToSendMessage) {
    const valueInMessage = document.querySelector(inputToSendMessage);

    body = {
        from: userName,
        to: nameToSendMessage,
        text: valueInMessage.value,
        type: statusMessage
    };
    
    makePost('sendMessage', 'https://mock-api.driven.com.br/api/v6/uol/messages', body);

    makeGet('allMessages', 'https://mock-api.driven.com.br/api/v6/uol/messages');

    valueInMessage.value = '';
}

function downloadMessages(allMessages) {
    const listMessages = allMessages.data;

    for (let i = 0; i < listMessages.length; i++) {
         renderMessage(listMessages[i], i)
    }
}

function renderMessage(message, number) {
    const toMessagePrivate = (message.type === 'private_message' && (message.to === userName || message.from === userName));
    const screenChat = document.querySelector('.js-screen__chat');
    let templateMessage = '';
    let lastMessageInScreen = '';

    templateMessageStatus = `
    <div class="c-screen__message u-${message.type}" id="js-message${number}">
        <p>
            <span class="c-screen__hour">${message.time}</span>
            <span><b>${message.from}</b></span>
            <span>${message.text}</span>
        </p>
    </div>
    `
    templateMessage = `
    <div class="c-screen__message u-${message.type}" id="js-message${number}">
        <p>
            <span class="c-screen__hour">${message.time}</span>
            <span><b>${message.from}</b> para <b>${message.to}</b>: </span>
            <span>${message.text}</span>
        </p>
    </div>
    `
    
    if (number === 0) {
        screenChat.innerHTML = '';
    }

    if (message.type === 'status') {
        screenChat.innerHTML += templateMessageStatus
        lastMessageInScreen = document.getElementById(`js-message${number}`)
        lastMessageInScreen.scrollIntoView();

    } else if (message.type !== 'private_message') {
        screenChat.innerHTML += templateMessage
        lastMessageInScreen = document.getElementById(`js-message${number}`)
        lastMessageInScreen.scrollIntoView();

    } else if (toMessagePrivate) {
        screenChat.innerHTML += templateMessage
        lastMessageInScreen = document.getElementById(`js-message${number}`)
        lastMessageInScreen.scrollIntoView();
    }
}
~~~
</p>
</details>

###
<details><summary><h2>Menu</h2></summary>

<p>

Esse menu contém todos os usuários online, atualizando a cada 10s e as opções de visibilidade da mensagem.

#### HTML
~~~html
<!-- fundo escuro do menu -->
<div class="c-menu__dark-bg js-menu__background is-shrunken"></div>

<!-- menu -->
<div class="c-menu js-menu is-shrunken">

    <!-- opções de destinatário -->
    <div>
        <h1>Escolha um contato para enviar mensagem:</h1>

        <div class="c-menu__selection js-menu__users"></div>
    </div>
    <!-- /opções de destinatário -->

    <!-- opções de visibilidade -->
    <div>
        <h1>Escolha a visibilidade:</h1>

        <div class="c-menu__selection js-menu__visibility">

            <div data-identifier="visibility" onclick="selectedMenuItem('js-option1', 'js-menu__visibility')">
                <div>
                    <ion-icon name="lock-open"></ion-icon>
                    <p>Público</p>
                </div>
                <ion-icon class="c-menu__icon is-hidden is-selected js-option1" name="checkmark-outline"></ion-icon>
            </div>

            <div data-identifier="visibility" onclick="selectedMenuItem('js-option2', 'js-menu__visibility')">
                <div>
                    <ion-icon name="lock-closed"></ion-icon>
                    <p>Reservadamente</p>
                </div>
                <ion-icon class="c-menu__icon is-hidden js-option2" name="checkmark-outline"></ion-icon>
            </div>

        </div>

    </div>
    <!-- /opções de visibilidade -->

</div>
<!-- /menu -->
~~~
#### CSS
~~~css
.c-menu {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;

    background-color: #FFFFFF;
    height: 1000px;
    width: 80%;
    max-width: 80%;

    transition: max-width 1s ease-in-out;
    overflow: hidden;
}

.c-menu__dark-bg {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 2;

    background: rgba(0, 0, 0, 0.6);
    height: 667px;
    width: 100%;
    max-width: 100%;

    transition: max-width 1s ease-in-out;
    overflow: hidden;
}

.c-menu h1 {
    margin: 25px 0;
    padding: 0 100px;

    font-weight: 700;
    font-size: 16px;
    line-height: 19px;

    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
}

.c-menu__selection {
    font-size: 16px;
    line-height: 8px;
}

.c-menu__selection div {
    margin: 10px 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;
}

.c-menu__selection div div { margin: 0 0; }

.c-menu__selection div div ion-icon {
    margin-left: 10px;
    margin-right: 20px;

    font-size: 25px;
}

.c-menu__icon {
    color: #28BB25;
    margin: 0 10px;

    font-size: 20px;
}
~~~
#### Javascript
~~~javascript
function downloadUsersOnline(allUsers) {
    const listUsers = allUsers.data;

    for (let i = 0; i < listUsers.length; i++) {
        renderUserInMenu(listUsers[i], i);
    }
}

function renderUserInMenu(users, number) {
    const usersMenu = document.querySelector('.js-menu__users');

    if (number === 0) {
        usersMenu.innerHTML = `
        <div onclick="selectedMenuItem('js-optionAll', 'js-menu__users')">
            <div>
                <ion-icon name="people"></ion-icon>
                <p>Todos</p>
            </div>
            <ion-icon class="c-menu__icon is-hidden js-optionAll is-selected" name="checkmark-outline"></ion-icon>
        </div>
        `;
    }

    usersMenu.innerHTML += `
    <div data-identifier="participant" onclick="selectedMenuItem('js-option${number}', 'js-menu__users')">
        <div>
            <ion-icon name="person-circle"></ion-icon>
            <p>${users.name}</p>
        </div>
        <ion-icon class="c-menu__icon is-hidden js-option${number}" name="checkmark-outline"></ion-icon>
    </div>
    `;
}

function selectedMenuItem(checkmarkIcon, family) {
    const isSelected = document.querySelector(`.${family} .is-selected`);
    
    if (isSelected !== null) {
        isSelected.classList.remove('is-selected');
    }
    
    const itemSelected = document.querySelector(`.${family} .${checkmarkIcon}`);
    itemSelected.classList.add('is-selected');

    if (family === 'js-menu__users') {

        const parentSelected = document.querySelector(`.${family} .is-selected`).parentNode;

        nameToSendMessage = parentSelected.innerText;
        descriptionInputInChat.innerHTML = `Enviando para ${nameToSendMessage} (reservadamente)`;

    } else if (family === 'js-menu__visibility') {

        const messageVisibleItem = document.querySelector(`.${family} .is-selected`).parentNode;

        if (messageVisibleItem.innerText === 'Público') {

            statusMessage = 'message';

            descriptionInputInChat.classList.remove('is-selected');
            descriptionInputInChat.classList.add('is-hidden');

        } else if (messageVisibleItem.innerText === 'Reservadamente') {

            statusMessage = 'private_message';
            
            descriptionInputInChat.classList.remove('is-hidden');
            descriptionInputInChat.classList.add('is-selected');
        }
    }
}
~~~
</p>
</details>