class CanchaFutbol{
    constructor(){
        this.id = 0;
        this.ciudad = "";
        this.direccion = "";
        this.formatoCancha = "";
        this.precio = 0;
    }

}

class Reserva{
    constructor(idCancha, ciudad,precioReserva,fechaReserva,idCliente,nombreCliente,apellidoCliente,correoCliente){
        this.idCancha = idCancha;
        this.ciudad = ciudad;
        this.precioReserva = precioReserva;
        this.fechaReserva = fechaReserva;
        this.idCliente = idCliente;
        this.nombreCliente = nombreCliente;
        this.apellidoCliente = apellidoCliente;
        this.correo = correoCliente;
    }

    generarFactura(){
        alert(`
        FACTURA DE RESERVA
        Datos del Cliente:
        Nombre cliente: ${this.nombreCliente} ${this.apellidoCliente}
        N° de documento: ${this.idCliente}
        Email cliente: ${this.correo}

        Datos de la cancha reservada:
        Numero de cancha: ${this.idCancha}
        Ciudad: ${this.ciudad}
        Fecha reserva: ${this.fechaReserva}  
        Total reserva: ${this.precioReserva}
        `
        );
    }
}

