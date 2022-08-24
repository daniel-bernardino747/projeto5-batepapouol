const nameInput = prompt('Qual o seu nome?');

function makeGet(url) {

    const promise = axios.get(url);
    promise.then( deuCerto )
    promise.catch( deuErrado )
}

function makePost(url, body) {
    
    const promise = axios.post(url, body);
    promise.then( deuCerto )
    promise.catch( deuErrado )
}

function deuCerto(answer) {
    console.log(answer);
    return answer;
}

function deuErrado(answer) {
    alert('Não funcionou');
    console.log(answer)
}

makePost("https://mock-api.driven.com.br/api/v6/uol/participants", {name: nameInput});

// setInterval(estouOnline, 5000);



function estouOnline() {
    makePost("https://mock-api.driven.com.br/api/v6/uol/status", {name: nameInput});
}

function sendMSM(classInput) {
    const text = document.querySelector(classInput);

    body = {
        from: nameInput,
        to: "Todos",
        text: text.value,
        type: "message"
    }
    
    makePost("https://mock-api.driven.com.br/api/v6/uol/messages", body)

    const allMessage = makeGet("https://mock-api.driven.com.br/api/v6/uol/messages");

    console.log('all message: ', allMessage)

    clearInput(text);
}

function clearInput(element) {
    element.value = '';
}