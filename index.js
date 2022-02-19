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

    registrarUsuario(nombre, apellido, telefono, correo, contrasenha, confirmarContrasenha){
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.correo = correo;
        this.contrasenha = contrasenha;
        this.confirmarContrasenha = confirmarContrasenha;
        
        if(this.nombre != "" && this.apellido != "" && this.correo != "" && this.contrasenha != "" && this.confirmarContrasenha != "")
            return true
        else
            return false
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
class CanchasFutbol{
    constructor(ciudad, direccion, formatoCancha, precio, fechaCancha){
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.formatoCancha = formatoCancha;
        this.precio = precio;
        this.fechaCancha = fechaCancha;
        this.disponible = false; 
    }

    registrarCancha(){
    
        if(this.ciudad != "" && this.direccion != "" && this.formatoCancha != "" && this.precio != 0 && this.fechaCancha != "")
            return true
        else
            return false
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
}

const procesoReserva = () => {
    alert("REGISTRO CANCHA");
    const cancha = new CanchasFutbol(prompt("Ingresa la ciudad de tu cancha"),prompt("Ingresa la dirección de tu cancha"),prompt("Ingresa el tamaño de la cancha"),parseFloat(prompt("Ingresa el precio de la cancha")),prompt("Ingresa la fecha para alquilar la cancha"));
    const cliente = new Cliente();

    if(cancha.registrarCancha())  {
        alert("REGISTRO CLIENTE");
        if(cliente.registrarUsuario(prompt("Ingresa tu nombre"),prompt("Ingresa tu apellido"),prompt("Ingresa tu telefono"), prompt("Ingresa tu correo"),prompt("Ingresa tu contraseña"), prompt("Ingresa tu contraseña nuevamente"))){
            cliente.setFechaAlquiler();
            cliente.pagarCancha(cancha.precio,cancha.disponibilidadCancha(cliente.fechaAlquiler));
        } 
        else{
            alert("Registro de cliente no válido");
        }
    }
    else{
        alert("Registro de cancha no válido");
    }
}

procesoReserva();

