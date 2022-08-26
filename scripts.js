const nameInput = prompt('Qual o seu nome?');
let nameToSendMessage = 'Todos';

makePost('cadastro', "https://mock-api.driven.com.br/api/v6/uol/participants", {name: nameInput});

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
    
    makeGet('userOnline', 'https://mock-api.driven.com.br/api/v6/uol/participants');
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
        type: "message"
    };
    
    makePost('msm', "https://mock-api.driven.com.br/api/v6/uol/messages", body);

    makeGet('allMSM', "https://mock-api.driven.com.br/api/v6/uol/messages");

    clearInput(text);
}

function createMSM(msm, number) {
    const box = document.querySelector('.box-msg');
    
    if (number === 1) {
        box.innerHTML = '';
    }


    const blabla = `
        <div class="msg ${msm.type}" id="msm${number}">
            <p>
                <span class="msg-hour">${msm.time}</span>
                <span class="msg-user">${msm.from} para ${msm.to}: </span>
                <span class="msg-text">${msm.text}</span>
            </p>
        </div>
        `
    box.innerHTML += blabla

    const ble = document.getElementById(`msm${number}`)
    ble.scrollIntoView();
}

function insertUserInMenu(users, number) {
    const menu = document.querySelector('.one');

    if (number === 0) {
        menu.innerHTML = `
        <div onclick="select('op', 'one')">
            <div>
                <ion-icon name="people"></ion-icon>
                <p>Todos</p>
            </div>
            <ion-icon class='green op selecionado' name="checkmark-outline"></ion-icon>
        </div>
        `;
    }

    const blabla = `
    <div onclick="select('op${number}', 'one')">
        <div>
            <ion-icon name="person-circle"></ion-icon>
            <p>${users.name}</p>
        </div>
        <ion-icon class='green op${number}' name="checkmark-outline"></ion-icon>
    </div>
    `;

    menu.innerHTML += blabla;
}

function clearInput(element) {
    element.value = '';
}

function downloadMSM(allMessage) {
    const mensagens = allMessage.data;
    console.log('all message: ', allMessage.data[0])

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












const blabla = document.querySelector('.screen-dark');
const blibli = document.querySelector('.box-msg');
const blable = document.querySelector('.menu');
const icon = document.getElementById('menu');

function select(element, family) {
    const selected = document.querySelector(`.${family} .selecionado`);
    
    if (selected !== null) {
        selected.classList.remove("selecionado");
    }
    
    const selector = `.${family} .${element}`;
    const button = document.querySelector(selector);
    button.classList.add('selecionado');

    if (family === 'one') {
        const select = document.querySelector(`.${family} .selecionado`);
        const pai = select.parentNode
        nameToSendMessage = pai.innerText;
    } else if (family === 'two') {
        const nhami = document.querySelector(`.${family} .selecionado`);
        const nhamii = nhami.parentNode
        console.log(nhamii, nhamii.id)
    }

}

document.documentElement.onclick = function(event){

    if (event.target === icon) {

        blable.classList.remove("hide");
        blabla.classList.remove("hide");
        blibli.classList.add('stop');
        
    } else if (event.target === blabla){

        blable.classList.add("hide");
        blabla.classList.add("hide");
        blibli.classList.remove('stop');
    }
}