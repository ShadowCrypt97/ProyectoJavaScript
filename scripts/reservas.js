const sidebar__small = document.querySelector("#sidebar-1");
const sidebar__expanded = document.querySelector("#sidebar-2");
const signOutBtn = document.querySelector("#btnSignOut");
const main = document.querySelector("main");
const card =document.createElement("div");
const userName = document.querySelector("#name");
const correo = localStorage.getItem("actuallyLoggedIn");
const userData = JSON.parse(localStorage.getItem(correo));

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
    const formatos = await response.json();
    return formatos;
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

function paginaAgendamiento(){
    const calendario = document.createElement("div");
    calendario.classList.add("input-group","mb-3");
    localStorage.setItem("page",2);
    borrarMain();
    main.className = "reservas__agendamiento p-4";
    calendario.innerHTML = `
        <input id="dateInput" type="text" class="form-control" placeholder="Selecciona una fecha de reserva..." aria-label="Username" aria-describedby="basic-addon1">
        <span id="dateCalendar" class="input-group-text" id="basic-addon1"><svg class="bi" width="24" height="24" role="img" aria-label="Reservar"><use xlink:href="#calendar3"></use></svg></span>`
    main.appendChild(calendario);    
    $('#dateCalendar').dateDropper({
        large: true,
        largeOnly: true,
        lang: "es",
        modal: true,
        lock: 'from',
        onChange: function (res) {
            document.querySelector("#dateInput").setAttribute("placeholder",'La fecha seleccionada es '+ res.date.l+ ' ' + res.date.d + ' de ' +res.date.F +' del '+res.date.Y);
        }
    });
}

function seleccionarModoDeJuego(e){
    let modoSeleccionado;
    modoSeleccionado = e.target;
    localStorage.setItem("modoSeleccionado", modoSeleccionado.innerText);
    paginaAgendamiento();
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
