let nameInput = '';
function start() {
    nameInput = document.getElementById('name').value;
    console.log(nameInput)
    const login = document.querySelector('.login');
    const box = document.querySelector('.box-input');
    const loading = document.querySelector('.load');
    box.classList.remove('in-center')
    box.classList.add('hidden');
    loading.classList.remove('hidden');
    makePost('cadastro', "https://mock-api.driven.com.br/api/v6/uol/participants", {name: nameInput});
    
    setTimeout(() => {
        login.classList.remove('in-center')
        login.classList.add('hidden')
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
    const box = document.querySelector('.box-msg');
    
    if (number === 0) {
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
    <div data-identifier="participant" onclick="select('op${number}', 'one')">
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
    
        let btn = document.getElementById("button-enter");
      
      btn.click();
    
    }
});


const blabla = document.querySelector('.screen-dark');
const blibli = document.querySelector('.box-msg');
const blable = document.querySelector('.menu');
const icon = document.getElementById('menu');
const textInInputAdd = document.getElementById('textInputAdd');


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
        textInInputAdd.innerHTML = `Enviando para ${nameToSendMessage} (reservadamente)`;
    } else if (family === 'two') {
        const nhami = document.querySelector(`.${family} .selecionado`);
        const nhamii = nhami.parentNode.innerText
        if (nhamii === 'Público') {
            statusMessage = 'message';
            textInInputAdd.classList.remove('selecionado');
            textInInputAdd.classList.add('hidden');

        } else if (nhamii === 'Reservadamente') {
            statusMessage = 'private_message';
            
            textInInputAdd.classList.remove('hidden');
            textInInputAdd.classList.add('selecionado');
            console.log(textInInputAdd);
        }
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