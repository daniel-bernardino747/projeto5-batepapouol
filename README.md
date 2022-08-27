# Bem-vindo ao Projeto 5: Bate-papo UOL da Driven
### Aluno: Daniel Bernardino de Souza
### Turma 8

## Introdução

O projeto consiste em criar um site de bate-papo, utilizando uma API disponibilizada pela Driven Education.

Durante o decorrer deste readme, irei mostrar os detalhes do código, facilitando sem entendimento.

Sem mais delongas:

## Tela de login

Uma interface que possui um input e um botão, perguntando e conferindo se o nome do usuário é válido para aquele chat. Logo depois, há uma tela de loading de 5s antes de entrar no chat.

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
~~~javascript
/* testando */
~~~
