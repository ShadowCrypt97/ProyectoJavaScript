class CanchaFutbol{
    constructor(){
        this.id = 0;
        this.ciudad = "";
        this.direccion = "";
        this.formatoCancha = "";
        this.precio = 0;
    }

    registrarCancha(id,ciudad,direccion,formatoCancha,precio){
        this.id = id;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.formatoCancha = formatoCancha;
        this.precio = precio;
        if(this.ciudad != "" && this.direccion != "" && this.formatoCancha != "" && this.precio != 0 && this.fechaCancha != ""){
            if(this.ciudad.length >= 3 && this.direccion.length >= 5 && !isNaN(this.formatoCancha) && !isNaN(this.precio)){
                return true;
            }
            else
                return false;
        } 
        else
            return false;
    }

}

class MaestroCanchas{
    constructor(){
        this.canchas = [];
        this.clientes = [];
        this.fechasReservadas = []; 
    }

    addCancha(cancha){
        this.canchas.forEach((cancha)=>{
            cancha.id = cancha.id++;
        })
        this.canchas.push(cancha);
    }


    addFecha(id,fecha){
        this.fechasReservadas.push({id:id,fecha:fecha});
    }


    validarFecha(fecha){
        let regexpFecha = /^(?:3[01]|[12][0-9]|0?[1-9])([/])(0?[1-9]|1[1-2])\1\d{4}$/;
        return regexpFecha.test(fecha);
    }

    addCliente(cliente){
        this.clientes.push(cliente);
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
const admin = new MaestroCanchas();

const procesoRegistroCancha = (id) => {
    const cancha = new CanchaFutbol();
    alert("REGISTRO CANCHA");
    let canchaIsRegistered = cancha.registrarCancha(
        id,
        prompt("Ingresa la ciudad de tu cancha *"),
        prompt("Ingresa la dirección de tu cancha *"),
        parseInt(prompt("Ingresa el tamaño de la cancha (solo numeros son aceptados)*\n"+
        "Escriba los siguientes tamaños de cancha:\n"+
        "[11] -> Futbol 11\n"+
        "[8] -> Futbol 8\n"+
        "[7] -> Futbol 7\n"+
        "[5] -> Futbol 5\n"
        )),
        parseFloat(prompt("Ingresa el precio de la cancha (solo numeros son aceptados)*"))
    );

    while(!canchaIsRegistered)
    {
        alert("REGISTRO CANCHA");
        alert("Por favor ingresa todos los campos para continuar!");
        canchaIsRegistered = cancha.registrarCancha(
            id,
            prompt("Ingresa la ciudad de tu cancha*\nLONGITUD MINIMA 3 CARACTERES"),
            prompt("Ingresa la dirección de tu cancha*\nLONGITUD MINIMA 8 CARACTERES"),
            parseInt(prompt("Ingresa el tamaño de la cancha*\nDEBE SER EL NUMERO DE JUGADORES POR EQUIPO\n"+
            "Escriba los siguientes tamaños de cancha:\n"+
            "[11] -> Futbol 11\n"+
            "[8] -> Futbol 8\n"+
            "[7] -> Futbol 7\n"+
            "[5] -> Futbol 5\n")),
            parseFloat(prompt("Ingresa el precio de la cancha*\nDEBE SER EL PRECIO DE LA CANCHA(EJ: 120000.50)"))
        );
    }
    admin.addCancha(cancha);
    return cancha;
} 

const procesoCompleto = () =>{
    alert("Bienvenido al sistema de registro de canchas!");
    const cantidadCanchas = prompt("¿Cuantas canchas desea Registrar?\n[solo valores numéricos]");
    const canchas = [];
    for(let i = 1;i<=cantidadCanchas;i++){
        canchas.push(procesoRegistroCancha(i));
    }
    const cliente = procesoRegistroCliente();
    canchas.forEach((cancha)=>{
        console.log(cancha);
    })
    const idCancha = parseInt(prompt("Escribe el id de alguna de las canchas mostradas en la consola para realizar la reserva: \n"));
    while((isNaN(idCancha) || !Number.isInteger(idCancha))&&(!canchas.includes(idCancha))){
        canchas.forEach((cancha)=>{
            console.log(cancha);
        })
        idCancha = parseInt(prompt("Escribe el id de alguna de las canchas mostradas en la consola para realizar la reserva: \n"));
    }
    const fechaAlquiler = cliente.setFechaAlquiler(idCancha);
    for(const cancha of canchas){
        if(cancha.id == idCancha){
            if(cliente.pagarCancha(cancha.precio,fechaAlquiler)){
                const reserva = new Reserva(idCancha,cancha.ciudad,cancha.precio,fechaAlquiler,cliente.id,cliente.nombre, cliente.apellido,cliente.correo);
                reserva.generarFactura();
            }
        }
    }
}

const BD =
[
    {
        id: 1,
        nombre_cancha: 'GramaF6',
        ubicacion: 'Carrera 123#32-34',
        formato: '7',
        precio_hora: '100000',
        url_img: "http://"
    },
    {
        id: 2,
        nombre_cancha: 'FutSite5',
        ubicacion: 'Carrera 56#37-12',
        formato: '5',
        precio_hora: '80000',
        url_img: "http://"
    },
    {
        id: 3,
        nombre_cancha: 'Fut11',
        ubicacion: 'Calle 100#15-23',
        formato: '11',
        precio_hora: '120000',
        url_img: "http://"
    },
    {
        id: 4,
        nombre_cancha: 'GramaF6',
        ubicacion: 'Carrera 123#32-34',
        formato: '11',
        precio_hora: '150000',
        url_img: "http://"
    }
]

const pedirCanchas= () =>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(BD);
        },3000);
    });
}

let canchas = []
const mostrarCanchas = array =>{
    for(const el of array){
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("style","width: 18rem;")
        card.innerHTML = 
        `
            <img src="${el.url_img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${el.nombre_cancha}</h5>
                <p class="card-text">
                    Ubicación: ${el.ubicacion}<br>
                    Tamaño de la cancha: ${el.formato}<br>
                    precio/hora: ${el.precio_hora}
                </p>
                <a href="#" class="btn btn-primary">Ver mas</a>
            </div>
        `;
        document.body.append(card);
    }
}

canchas = [...BD];
pedirCanchas()
    .then(
        mostrarCanchas(canchas)
    )
    .catch( error =>{
            console.log(error)
        }  
    )
