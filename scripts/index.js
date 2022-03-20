const preRegisterForm = document.querySelector("#preRegisterForm");
const registerButtonHeader = document.querySelector("#btn__register");
const registerButtonBody = document.querySelector("#btn_signup");
const emailFieldBody = document.querySelector("#floatingInput");
const passwordFieldBody = document.querySelector("#floatingPassword");
const regexpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

registerButtonHeader.addEventListener("click",redirigirRegistro);
registerButtonBody.addEventListener("click",abrirPaginaRegistro);
function abrirPaginaRegistro(e){
    e.preventDefault();
    preRegisterForm.addEventListener("change",validarCampos);

    validaCampoPassword() && crearMensaje("campo Password obligatorio","error", "Por favor completar todos los campos obligatorios");
    if(validaSiExisteCorreo()!="invalidEmail"){
        let boolean = !validaSiExisteCorreo();
        validaSiExisteCorreo() && (mensaje = "El usuario con correo "+emailFieldBody.value+" ya está registrado");
        boolean && escribirCamposEnMemoria();
        boolean ? redirigirRegistro(): crearMensaje("Usuario ya existe","info", mensaje);
    }else
        crearMensaje("Email inválido","info", "El email debe ser un email válido [Ex: example@gmail.com]");
    

    function validarCampos(){
        (regexpEmail.test(emailFieldBody.value)) && (emailFieldBody.className = 'form-control');
        (passwordFieldBody.value.length>=8) && (passwordFieldBody.className = 'form-control');
    }
}

function validaCampoPassword(){
    let validation = true;
    (passwordFieldBody.value==''||passwordFieldBody.value.length<8)&&(validation = invalidField(passwordFieldBody));
    return !validation;
}

function validaSiExisteCorreo(){
    let validation = true;
    (emailFieldBody.value==''||!regexpEmail.test(emailFieldBody.value))&&(validation = invalidField(emailFieldBody));
    if(validation)
        return localStorage?.getItem(emailFieldBody.value)?.includes(emailFieldBody.value)||false;
    else
        return "invalidEmail";
}

function invalidField(attrib){
    attrib.className = 'form-control is-invalid';
    return false;
}

function crearMensaje(title,className, mensaje){
    Swal.fire({
        title: title,
        text: mensaje,
        icon: className,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      })
}

function redirigirRegistro(){
    window.location.assign("../models/register.html");
}

function escribirCamposEnMemoria(){
    localStorage.setItem('emailFromIndex',emailFieldBody.value);
    localStorage.setItem('passwordFromIndex',passwordFieldBody.value);
}

