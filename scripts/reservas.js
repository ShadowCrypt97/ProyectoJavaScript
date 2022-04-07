const sidebar__small = document.querySelector("#sidebar-1");
const sidebar__expanded = document.querySelector("#sidebar-2");
const signOutBtn = document.querySelector("#btnSignOut");
const main = document.querySelector("main");
const card =document.createElement("div");
const userName = document.querySelector("#name");
const correo = localStorage.getItem("actuallyLoggedIn");
const userData = JSON.parse(localStorage.getItem(correo));
var DateTime = luxon.DateTime;
DateTime.now().setZone("system");

userData.forEach((el)=>{
    userName.innerText = el.nombre +" "+el.apellido;
})
sidebar__small.addEventListener("mouseenter",mostrarSidebarExpandida);
sidebar__expanded.addEventListener("mouseleave",mostrarSidebarRecogida);
window.addEventListener("beforeunload",(e)=>{
    e.returnValue="exit";
})

signOutBtn.addEventListener("click",()=>{
    localStorage.setItem("actuallyLoggedIn",false);
    signOutBtn.setAttribute("href","../index.html");
})

const dataModalidad = (async ()=>{
    const response = await fetch('../data_formato_canchas.json');
    const data = await response.json();
    return data;
})();

const dataCanchas = (async ()=>{
    const response = await fetch('../data_canchas_por_ciudad.json');
    const data = await response.json();
    return data;
})();

const horarioServicio = (async ()=>{
    const response = await fetch('../horas_servicio.json');
    const data = await response.json();
    return data;
})();

const createPageModalidad = (async ()=>{
    localStorage.setItem("page",1);
    const data = await dataModalidad;
    const cantidadElementos = Object.keys(data).length;
    let cont = 1;
    for(let i=0;i<cantidadElementos;i++){
        const filas = document.createElement("div");
        const col1 = document.createElement("div");
        const col2 = document.createElement("div");
        filas.setAttribute("id","fila"+i);
        col1.classList.add("col");
        col1.setAttribute("id","contenedor"+cont++);
        col2.classList.add("col");
        col2.setAttribute("id","contenedor"+cont++);
        (i!=0)?filas.classList.add("row","row-cols-1", "row-cols-lg-2","align-items-stretch", "g-4","py-4"):filas.classList.add("row","row-cols-1", "row-cols-lg-2","align-items-stretch", "g-4");
        main.appendChild(filas);
        filas.append(col1);
        filas.append(col2);
    }
    data.forEach((el)=> {
        const contenedor = document.querySelector("#contenedor"+el.id);
        contenedor.innerHTML=`
        <a href="#">
            <div id="card${el.id}" class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg">
                <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                    <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">${el.name}</h2>
                </div>
            </div>
        </a>`;
        let card = document.querySelector("#card"+el.id);
        card.setAttribute("style","background-image: url('..\u002fimages\u002f"+el.url_img+"'); background-repeat: no-repeat; background-size: cover; background-position: center");
        card.addEventListener("click",seleccionarModoDeJuego);
    });
})();

function borrarMain(){
    main.innerHTML = `<h1>Selecciona la fecha y hora del partido</h1>`;
}


function paginaAgendamiento(data){
    const idHorarios = [];
    const horasServicio = [];
    const seleccionarFechayHora = document.createElement("div");
    const cantidadElementos = Object.keys(data).length;
    seleccionarFechayHora.classList.add("input-group","mb-3","gap-3");
    localStorage.setItem("page",2);
    borrarMain();
    main.className = "reservas__agendamiento p-4";
    data.forEach((el)=>{
        idHorarios.push(el.id);
        horasServicio.push(el.hora);
    });

    seleccionarFechayHora.innerHTML = `
    <div class="input-group">
        <input id="dateInput" type="text" class="form-control " placeholder="Selecciona una fecha de reserva..." aria-label="Username" aria-describedby="basic-addon1" disabled readonly>
        <span id="dateCalendar" class="input-group-text" id="basic-addon1"><svg class="bi" width="24" height="24" role="img" aria-label="Reservar"><use xlink:href="#calendar3"></use></svg></span>
    </div>
    <div class="input-group">
        <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
            <option selected>Selecciona una hora...</option>
        </select>
    </div>
    `
    main.appendChild(seleccionarFechayHora);
    const listaHorarios = document.querySelector("#inputGroupSelect04");
    for(let i=0;i<cantidadElementos;i++){
        const opcionesHorario = document.createElement("option");
        opcionesHorario.setAttribute("id",idHorarios[i]);
        opcionesHorario.innerText = `${horasServicio[i]}`;
        listaHorarios.appendChild(opcionesHorario);
    }


    $('#dateCalendar').dateDropper({
        large: true,
        largeOnly: true,
        lang: "es",
        modal: true,
        lock: 'from',
        onChange: function (res) {
            document.querySelector("#dateInput").removeAttribute("disabled readonly");
            document.querySelector("#dateInput").setAttribute("value",'La fecha seleccionada es '+ res.date.l+ ' ' + res.date.d + ' de ' +res.date.F +' del '+res.date.Y);
        }
    });
}
function showHoursInSelect(){
    DateTime.now().hour
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

async function seleccionarModoDeJuego(e){
    const data = await horarioServicio;
    let modoSeleccionado;
    modoSeleccionado = e.target;
    localStorage.setItem("modoSeleccionado", modoSeleccionado.innerText);
    paginaAgendamiento(data);
}

function mostrarSidebarExpandida(){
    sidebar__small.classList.add("header__sidebar--show");
    sidebar__expanded.classList.remove("header__sidebar--show");
}

function mostrarSidebarRecogida(){
    setTimeout(()=>{
        sidebar__expanded.classList.add("header__sidebar--show");
        sidebar__small.classList.remove("header__sidebar--show");
    }, 500);
}
