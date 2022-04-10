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

function mostrarCanchas(){
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
    const renderCanchas = array =>{
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
            main.append(card);
        }
    }

    canchas = [...BD];
    pedirCanchas()
    .then(
        renderCanchas(canchas)
    )
    .catch( error =>{
            console.log(error)
        }  
    )
}