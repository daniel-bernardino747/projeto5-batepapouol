let nameInput = '';
function registerAndLogin() {
    nameInput = document.querySelector('.js-login__name').value;
    console.log(nameInput)
    const login = document.querySelector('.js-login');
    const box = document.querySelector('.js-login__input');
    const loading = document.querySelector('.js-login__loader');
    box.classList.remove('u-total-centralized')
    box.classList.add('is-hidden');
    loading.classList.remove('is-hidden');
    makePost('cadastro', "https://mock-api.driven.com.br/api/v6/uol/participants", {name: nameInput});
    
    setTimeout(() => {
        login.classList.remove('u-total-centralized')
        login.classList.add('is-hidden')
    }, 3000);


}



let nameToSendMessage = 'Todos';
let statusMessage = 'message';


function makeGet(type, url) {

    const promise = axios.get(url);

    if (type === 'allMSM') {

        promise.then( downloadMSM )
        promise.catch( deuErrado )

    } else if (type === 'userOnline') {

        promise.then( downloadUsers )
        promise.catch( deuErrado )
    }
}

function makePost(type, url, body) {

    const promise = axios.post(url, body);

    if (type === 'cadastro') {

        promise.then( startAll )
        promise.catch( deuErrado )

    } else if (type === 'msm'){

        promise.then( deuCerto )
        promise.catch( deuErrado )

    } else if (type === 'none') {
        return;
    }
}

function startAll() {

    setInterval(() => {
        makeGet('allMSM', "https://mock-api.driven.com.br/api/v6/uol/messages");
    }, 3000);

    setInterval(() => {
        makeGet('userOnline', 'https://mock-api.driven.com.br/api/v6/uol/participants');
    }, 10000);
    
    setInterval(estouOnline, 5000)
}

function deuCerto(answer) {
    console.log(answer);
    return answer;
} 

function deuErrado(answer) {
    alert('Não funcionou');
    console.log(answer)
}

function estouOnline() {
    makePost('none', "https://mock-api.driven.com.br/api/v6/uol/status", {name: nameInput});
}

function sendMSM(classInput) {
    const text = document.querySelector(classInput);

    body = {
        from: nameInput,
        to: nameToSendMessage,
        text: text.value,
        type: statusMessage
    };
    
    makePost('msm', "https://mock-api.driven.com.br/api/v6/uol/messages", body);

    makeGet('allMSM', "https://mock-api.driven.com.br/api/v6/uol/messages");

    clearInput(text);
}

function createMSM(msm, number) {
    const box = document.querySelector('.js-screen__chat');
    let blabla = '';
    
    if (number === 0) {
        box.innerHTML = '';
    }

    if (msm.type === 'status') {
        blabla = `
        <div class="msg ${msm.type}" id="msm${number}">
            <p>
                <span class="msg-hour">${msm.time}</span>
                <span class="msg-user"><b>${msm.from}</b></span>
                <span class="msg-text">${msm.text}</span>
            </p>
        </div>
        `    
    } else {
        blabla = `
        <div class="msg ${msm.type}" id="msm${number}">
            <p>
                <span class="msg-hour">${msm.time}</span>
                <span class="msg-user"><b>${msm.from}</b> para <b>${msm.to}</b>: </span>
                <span class="msg-text">${msm.text}</span>
            </p>
        </div>
        `
    }

    box.innerHTML += blabla

    const ble = document.getElementById(`msm${number}`)
    ble.scrollIntoView();
}

function insertUserInMenu(users, number) {
    const menu = document.querySelector('.js-menu__users');

    if (number === 0) {
        menu.innerHTML = `
        <div onclick="selectedMenuItem('js-optionAll', 'js-menu__users')">
            <div>
                <ion-icon name="people"></ion-icon>
                <p>Todos</p>
            </div>
            <ion-icon class='c-menu__icon is-hidden js-optionAll is-selected' name="checkmark-outline"></ion-icon>
        </div>
        `;
    }

    const blabla = `
    <div data-identifier="participant" onclick="selectedMenuItem('js-option${number}', 'js-menu__users')">
        <div>
            <ion-icon name="person-circle"></ion-icon>
            <p>${users.name}</p>
        </div>
        <ion-icon class='c-menu__icon is-hidden js-option${number}' name="checkmark-outline"></ion-icon>
    </div>
    `;

    menu.innerHTML += blabla;
}

function clearInput(element) {
    element.value = '';
}

function downloadMSM(allMessage) {
    const mensagens = allMessage.data;

    for (let i = 0; i < mensagens.length; i++) {
         createMSM(mensagens[i], i)

    }
}

function downloadUsers(allUsers) {
    const users = allUsers.data;
    console.log('usuários online : ',allUsers, users);

    for (let i = 0; i < users.length; i++) {
        insertUserInMenu(users[i], i);
    }
}

document.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
    
        let btn = document.getElementById("js-screen__button");
      
      btn.click();
    
    }
});


const blabla = document.querySelector('.js-menu__background');
const blibli = document.querySelector('.js-screen__chat');
const blable = document.querySelector('.js-menu');
const icon = document.getElementById('js-screen__icon-menu');
const textInInputAdd = document.getElementById('js-screen__input-value');


function selectedMenuItem(element, family) {
    const selected = document.querySelector(`.${family} .is-selected`);
    
    if (selected !== null) {
        selected.classList.remove("is-selected");
    }
    
    const selector = `.${family} .${element}`;
    const button = document.querySelector(selector);
    button.classList.add('is-selected');

    if (family === 'js-menu__users') {

        const select = document.querySelector(`.${family} .is-selected`);
        const pai = select.parentNode

        nameToSendMessage = pai.innerText;
        textInInputAdd.innerHTML = `Enviando para ${nameToSendMessage} (reservadamente)`;

    } else if (family === 'js-menu__visibility') {

        const nhami = document.querySelector(`.${family} .is-selected`);
        const nhamii = nhami.parentNode.innerText

        if (nhamii === 'Público') {

            statusMessage = 'message';

            textInInputAdd.classList.remove('is-selected');
            textInInputAdd.classList.add('is-hidden');

        } else if (nhamii === 'Reservadamente') {

            statusMessage = 'private_message';
            
            textInInputAdd.classList.remove('is-hidden');
            textInInputAdd.classList.add('is-selected');
            console.log(textInInputAdd);
        }
    }

}

document.documentElement.onclick = function(event){

    if (event.target === icon) {

        blable.classList.remove("is-shrunken");
        blabla.classList.remove("is-shrunken");
        blibli.classList.add('stop');
        
    } else if (event.target === blabla){

        blable.classList.add("is-shrunken");
        blabla.classList.add("is-shrunken");
        blibli.classList.remove('stop');
    }
}