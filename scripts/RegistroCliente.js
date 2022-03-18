class Cliente{
    constructor(){
        this.id = 0;
        this.nombre = "";
        this.apellido ="";
        this.telefono = "";
        this.correo = "";
        this.contrasenha = "";
        this.confirmarContrasenha = "";
        this.checkbox = false;
        this.saldo = 1000000;
        this.saldoAnterior = 0;
    }

    registrarUsuario(id,nombre,apellido,telefono,correo,contrasenha,confirmarContrasenha,checkbox){
        const formulario = document.querySelector("#formulario");
        const regexpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const cliente = [];
        let validation;
        this.id = id.value;
        this.nombre = nombre.value;
        this.apellido = apellido.value;
        this.telefono = telefono.value;
        this.correo = correo.value;
        this.contrasenha = contrasenha.value;
        this.confirmarContrasenha = confirmarContrasenha.value;
        this.checkbox = checkbox; 
        formulario.addEventListener("submit", enviarFormulario);
        formulario.addEventListener("change",validarCampos);
       

        function enviarFormulario(e){
            validation = true;
            e.preventDefault();
            if(nombre.value==''||nombre.value.length<3){
                nombre.className = 'form-control is-invalid';
                validation = false;
            }
            if(apellido.value==''||apellido.value.length<3){
                apellido.className = 'form-control is-invalid';
                validation = false;
            }
            if(correo.value==''||!regexpEmail.test(correo.value)){
                correo.className = 'form-control is-invalid';
                validation = false;
            }
            if(contrasenha.value==''||contrasenha.value.length<8){
                contrasenha.className = 'form-control is-invalid';
                validation = false;
            }
            if(confirmarContrasenha.value==''||!(contrasenha.value === confirmarContrasenha.value)){
                confirmarContrasenha.className = 'form-control is-invalid';
                validation = false;
            }
            if(id.value==''||id.value.length<5){
                id.className = 'form-control is-invalid';
                validation = false;
            }
            if(!checkbox.checked){
                crearMensaje("checkAlert","alert alert-warning","Debe aceptar los términos y condiciones para continuar.");
                validation = false;
            }     
            if(validation) {
                cliente.push(
                    {
                        id: id.value,
                        nombre: nombre.value,
                        apellido: apellido.value,
                        telefono: telefono.value,
                        correo: correo.value,
                        contrasenha: contrasenha.value,
                        checkbox: checkbox.checked
                    }  
                )
                let boolean = !validaSiExisteId()&&!validaSiExisteCorreo();
                let mensaje;
                if(validaSiExisteCorreo()){
                    mensaje = "El usuario con correo "+correo.value+" ya está registrado";
                }
                if(validaSiExisteId()){
                    mensaje = "El usuario con documento "+id.value+" ya está registrado";
                }

                boolean ? guardarCliente(): crearMensaje("userAlreadyExists","alert alert-primary", mensaje);
                cliente.pop();
            }
            else
                crearMensaje("mandatoryAlert","alert alert-danger","Debe completar los campos obligatorios para continuar.");
        
        }
        function validaSiExisteId(){
            return localStorage?.getItem(id.value)?.includes(id.value)||false;
        }
        function validaSiExisteCorreo(){
            return localStorage?.getItem(correo.value)?.includes(correo.value)||false;
        }
        function guardarCliente(){
            localStorage.setItem(correo.value,JSON.stringify(cliente))
            localStorage.setItem(id.value,JSON.stringify(cliente));
            crearMensaje("success","alert alert-success","Formulario enviado exitosamente");
            id.value = "";
            nombre.value = "";
            apellido.value = "";
            telefono.value = "";
            correo.value = "";
            contrasenha.value = "";
            confirmarContrasenha.value = "";
            checkbox.checked = false;
        }

        function validarCampos(event){
            (event.target.value.length >=3) && (nombre.className = "form-control");
            (apellido.value.length>=3) && (apellido.className = 'form-control');
            (regexpEmail.test(correo.value)) && (correo.className = 'form-control');
            (contrasenha.value.length>=8) && (contrasenha.className = 'form-control');
            (contrasenha.value === confirmarContrasenha.value) && (confirmarContrasenha.className = 'form-control');
            (id.value.length>=5) && (id.className = 'form-control');
            if(checkbox.checked){
                if(!document.querySelector('#checkAlert')==='null'){
                    document.querySelector('#checkAlert').remove();
                }
            }
        }

        function crearMensaje(idElementoHtml, className, mensaje){
            const main = document.querySelector('main');
            const div = document.createElement('div');
            div.innerHTML = `<div id="${idElementoHtml}" class="${className}" role="alert">
            ${mensaje}
            </div>`;
            main.prepend(div);
            setTimeout(()=>{document.querySelector('#'+idElementoHtml).remove();},3000);
        }
    }

    setFechaAlquiler(idCancha){
        const fechaAlquiler = prompt(
            "Estimado Cliente:\n"+
            "ingrese una fecha para reservar la cancha\n"+
            "formato fecha dd/mm/aaaa");

        while(!this.validarFecha(fechaAlquiler)){
            fechaAlquiler = prompt(
                "Fecha ingresada no disponible\n"+
                "favor ingrese una nueva fecha para reservar la cancha\n"+
                "formato fecha dd/mm/aaaa");    
        }
 
        if(admin.fechasReservadas.includes({id: idCancha, fecha:fechaAlquiler})){
            alert("la cancha no está disponible para el " + fechaAlquiler);
            return "";
        }
        else{
            alert("la cancha está disponible para el " + fechaAlquiler);
            admin.addFecha(idCancha,fechaAlquiler);
            return fechaAlquiler;
        }
    }

    pagarCancha(precioCancha,fechaAlquiler){
        this.saldoAnterior = this.saldo;
        this.saldo = this.saldo - precioCancha;
        if(fechaAlquiler != ""){
            let confirmacion = prompt("La cancha está disponible, ¿desea continuar con el pago de la cancha?:\n[SI] PARA CONTINUAR\n[NO] PARA CANCELAR");
            if(confirmacion.toLowerCase() == 'si'){
                if(this.saldo < 0){
                    alert("Lo sentimos, no tiene saldo suficiente para pagar la cancha");
                    return false;
                }
                else{
                    alert("felicitaciones tu cancha quedo apartada para el "+ fechaAlquiler + ".\nTe queda "+this.saldo+" disponible");
                    return true;
                }
            }else{
                alert("Esperamos que vuelvas pronto");
                return false;
            }
            
        }else{
            alert("Lo sentimos, la cancha no está disponible para esa fecha");
            return false;
        }
    }

}

const procesoRegistroCliente = () =>{
    const cliente = new Cliente();
    let id = document.querySelector("#docId");
    let nombre = document.querySelector("#username");
    let apellido = document.querySelector("#lastName");
    let telefono = document.querySelector("#phone");
    let correo = document.querySelector("#email");
    let contrasenha = document.querySelector("#password");
    let confirmarContrasenha = document.querySelector("#confirmPassword"); 
    let checkbox = document.querySelector('#termsAndConditions');
    cliente.registrarUsuario(id,nombre,apellido,telefono,correo,contrasenha,confirmarContrasenha,checkbox);  
}


procesoRegistroCliente();


