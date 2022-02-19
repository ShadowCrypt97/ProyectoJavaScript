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
        this.fechaAlquiler = prompt("ingrese una fecha para reservar la cancha");
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
            if(this.ciudad.length >= 3 && this.direccion.length >= 8 && !isNaN(this.formatoCancha) && !isNaN(this.precio) && regexFecha.test(this.fechaCancha)){
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

    let canchaIsRegistered = cancha.registrarCancha(prompt("Ingresa la ciudad de tu cancha *"),prompt("Ingresa la dirección de tu cancha *"),parseInt(prompt("Ingresa el tamaño de la cancha *")),parseFloat(prompt("Ingresa el precio de la cancha *")),prompt("Ingresa la fecha para alquilar la cancha *"));

    while(!canchaIsRegistered)
    {
        alert("REGISTRO CANCHA");
        alert("Por favor ingresa todos los campos para continuar!");
        canchaIsRegistered = cancha.registrarCancha(prompt("Ingresa la ciudad de tu cancha\nLONGITUD MINIMA 3 CARACTERES"),prompt("Ingresa la dirección de tu cancha\nLONGITUD MINIMA 8 CARACTERES"),parseInt(prompt("Ingresa el tamaño de la cancha\nDEBE SER EL NUMERO DE JUGADORES POR EQUIPO")),parseFloat(prompt("Ingresa el precio de la cancha\nDEBE SER EL PRECIO DE LA CANCHA(EJ: 120000)")),prompt("Ingresa la fecha para alquilar la cancha\nDEBE SER DE FORMATO FECHA (dd/mm/aaaa)"));
    }

    let userIsRegistered = cliente.registrarUsuario(prompt("Ingresa tu nombre *"),prompt("Ingresa tu apellido *"),prompt("Ingresa tu telefono"), prompt("Ingresa tu correo\n(EX: john.doe@example.com)*"),prompt("Ingresa tu contraseña *"), prompt("Ingresa tu contraseña nuevamente *"));
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

