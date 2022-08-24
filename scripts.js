const nameInput = prompt('Qual o seu nome?');








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

        promise.then( function () {

            makeGet('allMSM', "https://mock-api.driven.com.br/api/v6/uol/messages");

            setInterval(estouOnline, 5000)
        })
        promise.catch( deuErrado )

    } else if (type === 'msm'){

        promise.then( deuCerto )
        promise.catch( deuErrado )

    } else if (type === 'none') {
        return;
    }
}










function deuCerto(answer) {
    console.log(answer);
    return answer;
}

function deuErrado(answer) {
    alert('Não funcionou');
    console.log(answer)
}














makePost('cadastro', "https://mock-api.driven.com.br/api/v6/uol/participants", {name: nameInput});


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
    }
    
    makePost('msm', "https://mock-api.driven.com.br/api/v6/uol/messages", body)

    makeGet('allMSM', "https://mock-api.driven.com.br/api/v6/uol/messages");

    clearInput(text);
}





function createMSM(msm, number) {
    const box = document.querySelector('.box-msg');

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
         createMSM(mensagens[i])

    }

}