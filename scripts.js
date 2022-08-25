const nameInput = prompt('Qual o seu nome?');

makePost('cadastro', "https://mock-api.driven.com.br/api/v6/uol/participants", {name: nameInput});

function makeGet(type, url) {

    const promise = axios.get(url);

    if (type === 'allMSM') {
        promise.then( downloadMSM )
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
        to: "Todos",
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

const blabla = document.querySelector('.screen-dark');
const blable = document.querySelector('.menu');
const icon = document.getElementById('menu');


document.documentElement.onclick = function(event){

    if (event.target === icon) {

        blable.classList.remove("hide");
        blabla.classList.remove("hide");
        
    } else if (event.target === blabla){

        blable.classList.add("hide");
        blabla.classList.add("hide");
    }
}