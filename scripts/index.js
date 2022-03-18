const registerButtonHeader = document.querySelector("#btn__register");
const registerButtonBody = document.querySelector("#btn_signup");

registerButtonHeader.addEventListener("click",abrirPaginaRegistro);
registerButtonBody.addEventListener("click",abrirPaginaRegistro);
function abrirPaginaRegistro(){
    window.location.href = "../models/register.html";
}


