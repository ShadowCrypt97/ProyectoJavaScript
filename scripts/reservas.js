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
/************CONSTANTES*************/
const JSON_FORMATO_CANCHAS = "../data_formato_canchas.json";
const JSON_CANCHAS_POR_CIUDAD = "../data_canchas_por_ciudad.json";
const JSON_HORAS_SERVICIO = "../horas_servicio.json";
const JSON_CIUDADES_COLOMBIA = "../data_ciudades_Colombia.json";

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

async function getData(jsonPath){
    const response = await fetch(jsonPath);
    const data = await response.json();
    return data;
}

const createPageModalidad = (async ()=>{
    localStorage.setItem("page",1);
    const data = await getData(JSON_FORMATO_CANCHAS);
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


function paginaAgendamiento(dataHorarios, dataCiudades){
    const idHorarios = [];
    const horasServicio = [];
    const idCiudades = [];
    const nombreCiudades = [];
    const seleccionarFechayHora = document.createElement("div");
    const seleccionarCiudad = document.createElement("div");
    const searchBtn = document.createElement("button");
    const cantidadHorarios = Object.keys(dataHorarios).length;
    const cantidadCiudades = Object.keys(dataCiudades).length;
    searchBtn.addEventListener("click", dataCanchas);
    seleccionarCiudad.classList.add("input-group");
    seleccionarFechayHora.classList.add("input-group","mb-3","gap-3");
    searchBtn.setAttribute("type","button");
    searchBtn.classList.add("btn","btn-primary","mt-3","mb-3");
    localStorage.setItem("page",2);
    borrarMain();
    main.className = "p-4";

    dataHorarios.forEach((el)=>{
        idHorarios.push(el.id);
        horasServicio.push(el.hora);
    });

    dataCiudades.forEach((el)=>{
        idCiudades.push(el.id);
        nombreCiudades.push(el.ciudad);
    })

    seleccionarFechayHora.innerHTML = `
        <div class="reservas__agendamiento">
            <div class="input-group">
                <input id="dateInput" type="text" class="form-control " placeholder="Selecciona una fecha de reserva..." aria-label="Username" aria-describedby="basic-addon1" disabled readonly>
                <span id="dateCalendar" class="input-group-text" id="basic-addon1"><svg class="bi" width="24" height="24" role="img" aria-label="Reservar"><use xlink:href="#calendar3"></use></svg></span>
            </div>
            <div class="input-group mt-3">
                <select class="form-select" id="selectHour" aria-label="Example select with button addon">
                    <option selected>Selecciona una hora...</option>
                </select>
            </div>
        </div>
    `;

    seleccionarCiudad.innerHTML = `
        <div class="reservas__agendamiento">      
            <select class="form-select" id="selectCity" aria-label="Example select with button addon">
            <option selected>Seleccionar ciudad...</option>
            </select>
        </div>
    `;

    searchBtn.innerText = "Buscar";

    main.appendChild(seleccionarFechayHora);
    main.appendChild(seleccionarCiudad);
    main.appendChild(searchBtn);
    const listaHorarios = document.querySelector("#selectHour");
    const listaCiudades = document.querySelector("#selectCity");

    crearListaOptionsHtml(cantidadCiudades,idCiudades,nombreCiudades,listaCiudades);
    crearListaOptionsHtml(cantidadHorarios,idHorarios,horasServicio,listaHorarios);

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

async function dataCanchas(){
    const data = await getData(JSON_CANCHAS_POR_CIUDAD);
    const dataCiudades = await getData(JSON_CIUDADES_COLOMBIA);
    renderTarjetasCanchas(data, dataCiudades);
}

function renderTarjetasCanchas(data, dataCiudades){
    const selectCity = document.querySelector("#selectCity");
    const dateField = document.querySelector("#dateInput");
    const hourField = document.querySelector("#selectHour");
    const gridCards = document.createElement("div");
    gridCards.setAttribute("id","gridCards");
    const optionCity = selectCity.options[selectCity.selectedIndex].text;
    const inputDate = dateField.value;
    const optionhour = hourField.options[hourField.selectedIndex].text;
    
    if(inputDate!="" && optionhour != "Selecciona una hora..."){
        if(optionCity == dataCiudades[0].ciudad){
            for(const el of data[0]){
                const card = crearTarjeta(el.id,el.name,el.direccion,"../images/futbol-11.jpg");
                document?.querySelector("#gridCards")?.remove()||gridCards.appendChild(card);
            } 
        }
        else if(optionCity == dataCiudades[1].ciudad)
        {
            for(const el of data[1]){
                const card = crearTarjeta(el.id,el.name,el.direccion,"../images/futbol-7.jpg");
                document?.querySelector("#gridCards")?.remove()||gridCards.appendChild(card);
            } 
        }
        else if(optionCity == dataCiudades[2].ciudad){
            for(const el of data[2]){
                const card = crearTarjeta(el.id,el.name,el.direccion,"../images/futbol-9.jpg");
                document?.querySelector("#gridCards")?.remove()||gridCards.appendChild(card);
            } 
        }
        else if(optionCity == dataCiudades[3].ciudad){
            for(const el of data[0]){
                const card = crearTarjeta(el.id,el.name,el.direccion,"../images/futbol-11.jpg");
                document?.querySelector("#gridCards")?.remove()||gridCards.appendChild(card);
            } 
            for(const el of data[1]){
                const card = crearTarjeta(el.id,el.name,el.direccion,"../images/futbol-7.jpg");
                document?.querySelector("#gridCards")?.remove()||gridCards.appendChild(card);
            } 
            for(const el of data[2]){
                const card = crearTarjeta(el.id,el.name,el.direccion,"../images/futbol-9.jpg");
                document?.querySelector("#gridCards")?.remove()||gridCards.appendChild(card);
            } 
        }
        else
            Swal.fire(  
                'Selecciona una opción',
                'Debes seleccionar alguna ciudad',
                'error'
            )
        gridCards.className = "row row-cols-1 row-cols-md-3 g-4";
        main.appendChild(gridCards);
    }
    else
        Swal.fire(  
            'Lo campos de fecha y hora son obligatorios',
            'Debes seleccionar una fecha y una hora para reservar la cancha',
            'error'
        )
}

function crearTarjeta(canchaId, title, direccion, source_img){
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = 
    `
        <div class="card">
            <img id="img${canchaId}" src="${source_img}" class="card-img-top" alt="cancha ${canchaId}">
            <div class="card-body">
                <h5 id="title${canchaId}" class="card-title">${title}</h5>
                <p class="card-text">${direccion}</p>
                <a id="" href="#" class="btn btn-primary">Ver Cancha</a>
            </div>
        </div>
    `;

    return card;
}

function crearListaOptionsHtml(cantidadElementos,idElemento = [],valorElemento= [],lista){
    for(let i=0;i<cantidadElementos;i++){
        const opciones = document.createElement("option");
        opciones.setAttribute("id",idElemento[i]);
        opciones.innerText = `${valorElemento[i]}`;
        lista.appendChild(opciones);
    }
}
function showHoursInSelect(){
    DateTime.now().hour
}
async function seleccionarModoDeJuego(e){
    const dataHorarios = await getData(JSON_HORAS_SERVICIO);
    const dataCiudades = await getData(JSON_CIUDADES_COLOMBIA);
    let modoSeleccionado;
    modoSeleccionado = e.target;
    localStorage.setItem("modoSeleccionado", modoSeleccionado.innerText);
    paginaAgendamiento(dataHorarios, dataCiudades);
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
