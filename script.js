const blabla = document.querySelector('.screen-dark');
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
}

document.documentElement.onclick = function(event){

    if (event.target === icon) {

        blable.classList.remove("hide");
        blabla.classList.remove("hide");
        
    } else if (event.target === blabla){

        blable.classList.add("hide");
        blabla.classList.add("hide");
    }
}