class Cliente{
    constructor(){
        this.nombre = "";
        this.apellido ="";
        this.telefono = "";
        this.correo = "";
        this.contrasenha = "";
        this.confirmarContrasenha = "";
        this.saldo = 1000000;
        this.saldoAnterior = 0;
        this.fechaAlquiler = "";
    }

    validarEmail(){
        let regexpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regexpEmail.test(this.correo);
    }

    validarFecha(fecha){
        let regexpFecha = /^(?:3[01]|[12][0-9]|0?[1-9])([/])(0?[1-9]|1[1-2])\1\d{4}$/;
        return regexpFecha.test(fecha);
    }

    registrarUsuario(nombre, apellido, telefono, correo, contrasenha, confirmarContrasenha){
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.correo = correo;
        this.contrasenha = contrasenha;
        this.confirmarContrasenha = confirmarContrasenha;

        
        
        if(this.nombre != "" && this.apellido != "" && this.correo != "" &&this.contrasenha != "" && this.confirmarContrasenha != ""){
            if(this.nombre.length >= 3 && this.apellido.length >= 3 && this.validarEmail() && this.contrasenha.length >= 8 && this.contrasenha === this.confirmarContrasenha){
                return true;
            }
            else
                return false;
        }
        else
            return false;
    }

    setFechaAlquiler(){
        this.fechaAlquiler = prompt(
            "Estimado Cliente:\n"+
            "ingrese una fecha para reservar la cancha\n"+
            "formato fecha dd/mm/aaaa \n"+
            "Nota: Si la fecha de alquiler no coincide con la fecha disponible establecida por el local no se podrá alquilar la cancha.");

        while(!this.validarFecha(this.fechaAlquiler)){
            this.fechaAlquiler = prompt(
                "Fecha ingresada no disponible\n"+
                "favor ingrese una nueva fecha para reservar la cancha\n"+
                "formato fecha dd/mm/aaaa \n"+
                "Nota: Si la fecha de alquiler no coincide con la fecha disponible establecida por el local no se podrá alquilar la cancha.");    
        }
    }

    pagarCancha(precioCancha,disponibiliad){
        this.saldoAnterior = this.saldo;
        this.saldo = this.saldo - precioCancha;
        if(disponibiliad){
            let confirmacion = prompt("La cancha está disponible, ¿desea continuar con el pago de la cancha?:\n[SI] PARA CONTINUAR\n[NO] PARA CANCELAR");
            if(confirmacion.toLowerCase() == 'si'){
                if(this.saldo < 0){
                    alert("Lo sentimos, no tiene saldo suficiente para pagar la cancha");
                    return false;
                }
                else{
                    alert("felicitaciones tu cancha quedo apartada para el "+ this.fechaAlquiler + ".\nTe queda "+this.saldo+" disponible");
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
class CanchaFutbol{
    constructor(){
        this.ciudad = "";
        this.direccion = "";
        this.formatoCancha = "";
        this.precio = 0;
        this.fechaCancha = "";
        this.disponible = false; 
    }

    registrarCancha(ciudad,direccion,formatoCancha,precio,fechaCancha){

        this.ciudad = ciudad;
        this.direccion = direccion;
        this.formatoCancha = formatoCancha;
        this.precio = precio;
        this.fechaCancha = fechaCancha;
        this.disponible = false; 

        let regexFecha = /^(?:3[01]|[12][0-9]|0?[1-9])([/])(0?[1-9]|1[1-2])\1\d{4}$/;

    
        if(this.ciudad != "" && this.direccion != "" && this.formatoCancha != "" && this.precio != 0 && this.fechaCancha != ""){
            if(this.ciudad.length >= 3 && this.direccion.length >= 5 && !isNaN(this.formatoCancha) && !isNaN(this.precio) && regexFecha.test(this.fechaCancha)){
                return true;
            }
            else
                return false;
        } 
        else
            return false;
    }

    disponibilidadCancha(fecha){
        if(this.fechaCancha == fecha){
            alert("la cancha está disponible para el " + fecha);
            this.disponible = true;
        }
        else{
            alert("la cancha no está disponible para el " + fecha);
            this.disponible = false;
        }
        return this.disponible;
    }

    generarFactura(nombre, apellido, correo, fecha,vendida){
        if(vendida){
            alert(
            "FACTURA DE COMPRA\n"+
            "Nombre cliente: "+nombre+" "+apellido+"\n"+
            "Fecha reserva: "+fecha+"\n"+
            "Email cliente: "+correo+"\n"+
            "Total reserva: "+this.precio+"\n"
            );
        }
        
    }

}

const procesoReserva = () => {
    alert("REGISTRO CANCHA");
    const cancha = new CanchaFutbol();
    const cliente = new Cliente();

    let canchaIsRegistered = cancha.registrarCancha(
        prompt("Ingresa la ciudad de tu cancha *"),
        prompt("Ingresa la dirección de tu cancha *"),
        parseInt(prompt("Ingresa el tamaño de la cancha (solo numeros son aceptados)*\n"+
        "Escriba los siguientes tamaños de cancha:\n"+
        "[11] -> Futbol 11\n"+
        "[8] -> Futbol 8\n"+
        "[7] -> Futbol 7\n"+
        "[5] -> Futbol 5\n"
        )),
        parseFloat(prompt("Ingresa el precio de la cancha (solo numeros son aceptados)*")),
        prompt("Ingresa una fecha en la que la cancha estará disponible*\nFormato fecha aceptado: (dd/mm/aaaa)")
    );

    while(!canchaIsRegistered)
    {
        alert("REGISTRO CANCHA");
        alert("Por favor ingresa todos los campos para continuar!");
        canchaIsRegistered = cancha.registrarCancha(
            prompt("Ingresa la ciudad de tu cancha*\nLONGITUD MINIMA 3 CARACTERES"),
            prompt("Ingresa la dirección de tu cancha*\nLONGITUD MINIMA 8 CARACTERES"),
            parseInt(prompt("Ingresa el tamaño de la cancha*\nDEBE SER EL NUMERO DE JUGADORES POR EQUIPO\n"+
            "Escriba los siguientes tamaños de cancha:\n"+
            "[11] -> Futbol 11\n"+
            "[8] -> Futbol 8\n"+
            "[7] -> Futbol 7\n"+
            "[5] -> Futbol 5\n")),
            parseFloat(prompt("Ingresa el precio de la cancha*\nDEBE SER EL PRECIO DE LA CANCHA(EJ: 120000.50)")),
            prompt("Ingresa una fecha en la que la cancha estará disponible*\nDEBE SER DE FORMATO FECHA (dd/mm/aaaa)"));
    }

    let userIsRegistered = cliente.registrarUsuario(
        prompt("Ingresa tu nombre*"),
        prompt("Ingresa tu apellido *"),
        prompt("Ingresa tu telefono"), 
        prompt("Ingresa tu correo\n(EX: john.doe@example.com)*"),
        prompt("Ingresa tu contraseña (min 8 caracteres)*"), 
        prompt("Ingresa tu contraseña nuevamente (debe ser exactamente igual a la anterior)*")
    );
    while(!userIsRegistered) 
    {
        alert("REGISTRO CLIENTE");
        alert("Por favor ingresa todos los campos obligatorios!");
        userIsRegistered = cliente.registrarUsuario(prompt("Ingresa tu nombre\nLONGITUD MINIMA 3 CARACTERES"),prompt("Ingresa tu apellido\nLONGITUD MINIMA 3 CARACTERES"),prompt("Ingresa tu telefono"), prompt("Ingresa tu correo\nDEBE SER UN CORREO VALIDO(EX: john.doe@example.com)"),prompt("Ingresa tu contraseña\nLONGITUD MINIMA 8 CARACTERES"), prompt("Ingresa tu contraseña nuevamente\nDEBE COINCIDIR CON LA CONTRASEÑA ANTERIOR"));
    }

    cliente.setFechaAlquiler();
    const vendida = cliente.pagarCancha(cancha.precio,cancha.disponibilidadCancha(cliente.fechaAlquiler));
    cancha.generarFactura(cliente.nombre, cliente.apellido,cliente.correo,cliente.fechaAlquiler, vendida);
} 


procesoReserva();

