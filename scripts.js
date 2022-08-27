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

function errorCorretions(answer) {
    alert('Não funcionou');
    console.log(answer)
}

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

function renderMessage(message, number) {
    const screenChat = document.querySelector('.js-screen__chat');
    let templateMessage = '';
    
    if (number === 0) {
        screenChat.innerHTML = '';
    }

    if (message.type === 'status') {
        templateMessage = `
        <div class="c-screen__message u-${message.type}" id="js-message${number}">
            <p>
                <span class="c-screen__hour">${message.time}</span>
                <span><b>${message.from}</b></span>
                <span>${message.text}</span>
            </p>
        </div>
        `    
    } else {
        templateMessage = `
        <div class="c-screen__message u-${message.type}" id="js-message${number}">
            <p>
                <span class="c-screen__hour">${message.time}</span>
                <span><b>${message.from}</b> para <b>${message.to}</b>: </span>
                <span>${message.text}</span>
            </p>
        </div>
        `
    }

    screenChat.innerHTML += templateMessage

    const lastMessageInScreen = document.getElementById(`js-message${number}`)
    lastMessageInScreen.scrollIntoView();
}

function insertUserInMenu(users, number) {
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

function downloadMessages(allMessages) {
    const listMessages = allMessages.data;

    for (let i = 0; i < listMessages.length; i++) {
         renderMessage(listMessages[i], i)

    }
}

function downloadUsersOnline(allUsers) {
    const listUsers = allUsers.data;

    for (let i = 0; i < listUsers.length; i++) {
        insertUserInMenu(listUsers[i], i);
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