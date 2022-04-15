const sidebar__small = document.querySelector("#sidebar-1");
const sidebar__expanded = document.querySelector("#sidebar-2");
const signOutBtn = document.querySelector("#btnSignOut");
const main = document.querySelector("main");
const card =document.createElement("div");
const userName = document.querySelector("#name");
const correo = localStorage.getItem("actuallyLoggedIn");
const userData = JSON.parse(localStorage.getItem(correo));
var DateTime = luxon.DateTime;
var Duration = luxon.Duration;
let d;
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
    main.innerHTML = `<h1>Selecciona la fecha, hora y lugar del partido</h1>`;
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
            d = DateTime.fromFormat(res.date.formatted, "MM/dd/yyyy");
        }
    });
}

async function dataCanchas(){
    const data = await getData(JSON_CANCHAS_POR_CIUDAD);
    const dataCiudades = await getData(JSON_CIUDADES_COLOMBIA);
    renderTarjetasCanchas(data, dataCiudades);
    const botonesVerCanchas = document.querySelectorAll(".btn__verCanchas");
    botonesVerCanchas.forEach(boton=>{
        boton.addEventListener("click",(evt) =>canchaSeleccionada(evt,data));
    })
}

function canchaSeleccionada(evt, data=[]){
    const elemento = evt.target,
          idElemento = elemento.getAttribute("id"),
          ciudad = idElemento.split(/\d/g)[0].toLowerCase(),
          idNumero = parseInt(idElemento.split(/[a-z]{0,25}[^\d]/g)[2]),
          seleccionUsuario = [],
          dateTime = DateTime.fromISO(localStorage.getItem(userData[0].id)); 

    data.forEach(el=>{
        let filtro = el.find((seleccion)=>{
            return (seleccion.ciudad.toLowerCase() == ciudad && seleccion.id == idNumero);
        });
        (filtro||false != false) && seleccionUsuario.push(filtro);
    })
    localStorage.setItem("canchaSeleccionada",JSON.stringify(seleccionUsuario[0]));
    renderPaymentPage(seleccionUsuario, dateTime);
    realizarPago();      
}

async function realizarPago(){
    const sendBtn = document.querySelector('#boton-enviar');
    // prevent default y mensaje de pago exitoso
    sendBtn.addEventListener("click",e=>{
        e.preventDefault();      
        Swal.fire(
            {
                allowOutsideClick: false,
                title: 'Pago Exitoso',
                text: 'El pago fue realizado con éxito, recuerda llegar al sitio con 15 minutos de antelación.',
                icon: 'success'
            }
        ).then((result) => {
            result.isConfirmed && window.location.assign("../models/reservas.html");
        })
    });   
}

function renderPaymentPage(seleccionUsuario = [], dateTime){
    main.innerHTML = `
        <h1>${seleccionUsuario[0].name +" - "+seleccionUsuario[0].ciudad}</h1>
        <div class="row mb-3">
            <div class="col-xxl-6 themed-grid-col">
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="../images/Logo.png" class="img-fluid rounded-start" alt="...">
                        </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title title">Datos de la reserva</h5>
                                    <p class="card-text text-color">Por favor verifica los datos de la reserva antes de proceder con el pago.</p>
                                    <p class="card-text text-color">Nombres: ${userData[0].nombre}</p>
                                    <p class="card-text text-color">Apellidos: ${userData[0].apellido}</p>
                                    <p class="card-text text-color">Cancha: 
                                        <select id="selectCancha" class="form-select" aria-label="Default select example">
                                            <option selected>Selecciona una cancha...</option>
                                        </select>
                                    </p>
                                    <p id="price" class="card-text text-color">Precio/hora: $0</p>
                                    <p class="card-text text-color">Fecha de reserva: ${dateTime.day}/${dateTime.monthLong}/${dateTime.year}</p>
                                    <p class="card-text text-color">Hora de reserva: ${dateTime.hour}:00</p>
                                </div>
                            </div>   
                    </div>
                </div>
            </div>
            <div class="col-xxl-6 themed-grid-col">
                <div class="contenedor">
                    <!-- Tarjeta -->
                    <section class="tarjeta" id="tarjeta">
                        <div class="delantera">
                            <div class="logo-marca" id="logo-marca">
                            </div>
                            <img src="../images/chip-tarjeta.png" class="chip" alt="">
                            <div class="datos">
                                <div class="grupo" id="numero">
                                    <p class="label">Número Tarjeta</p>
                                    <p class="numero">1233 4566 7788 9900</p>
                                </div>
                                <div class="flexbox">
                                    <div class="grupo" id="nombre">
                                        <p class="label">Nombre Tarjeta</p>
                                        <p class="nombre">Jhon Doe</p>
                                    </div>
                                    <div class="grupo" id="expiracion">
                                        <p class="label">Expiracion</p>
                                        <p class="expiracion"><span class="mes">MM</span> / <span class="year">AA</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="trasera">
                            <div class="barra-magnetica"></div>
                            <div class="datos">
                                <div class="grupo" id="firma">
                                    <p class="label">Firma</p>
                                    <div class="firma"><p></p></div>
                                </div>
                                <div class="grupo" id="ccv">
                                    <p class="label">CCV</p>
                                    <p class="ccv"></p>
                                </div>
                            </div>
                            <p class="leyenda">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus exercitationem, voluptates illo.</p>
                            <a href="#" class="link-banco">www.tubanco.com</a>
                        </div>
                    </section>        
                    <!-- Contenedor Boton Abrir Formulario -->
                    <div class="contenedor-btn">
                        <button class="btn-abrir-formulario active" id="btn-abrir-formulario">
                            <i class="fas fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
            
                    <!-- Formulario -->
                    <form action="" id="formulario-tarjeta" class="formulario-tarjeta active">
                        <div class="grupo">
                            <label for="inputNumero">Número Tarjeta</label>
                            <input type="text" id="inputNumero" maxlength="19" autocomplete="off">
                        </div>
                        <div class="grupo">
                            <label for="inputNombre">Nombre</label>
                            <input type="text" id="inputNombre" maxlength="19" autocomplete="off">
                        </div>
                        <div class="flexbox">
                            <div class="grupo expira">
                                <label for="selectMes">Expiracion</label>
                                <div class="flexbox">
                                    <div class="grupo-select">
                                        <select name="mes" id="selectMes">
                                            <option disabled="" selected="">Mes</option>
                                        </select>
                                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </div>
                                    <div class="grupo-select">
                                        <select name="year" id="selectYear">
                                            <option disabled="" selected="">Año</option>
                                        </select>
                                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
            
                            <div class="grupo ccv">
                                <label for="inputCCV">CCV</label>
                                <input type="text" id="inputCCV" maxlength="3">
                            </div>
                        </div>
                        <button id="boton-enviar" type="submit" class="btn-enviar">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    const selectCancha = document.querySelector("#selectCancha"),
          priceField = document.querySelector("#price");

    for(const el of seleccionUsuario[0].formatos){
        const optionCancha = document.createElement("option");
        optionCancha.innerHTML = `${el.formato} [${el.cantidad}]`;
        selectCancha.appendChild(optionCancha);
    }
    selectCancha.addEventListener("change",e =>mostrarPrecio(e,seleccionUsuario[0], priceField));
    payment(); 

}

function payment(){
    const tarjeta = document.querySelector('#tarjeta'),
	  btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
	  formulario = document.querySelector('#formulario-tarjeta'),
	  numeroTarjeta = document.querySelector('#tarjeta .numero'),
	  nombreTarjeta = document.querySelector('#tarjeta .nombre'),
	  logoMarca = document.querySelector('#logo-marca'),
	  firma = document.querySelector('#tarjeta .firma p'),
	  mesExpiracion = document.querySelector('#tarjeta .mes'),
	  yearExpiracion = document.querySelector('#tarjeta .year');
	  ccv = document.querySelector('#tarjeta .ccv');

    // * Volteamos la tarjeta para mostrar el frente.
    const mostrarFrente = () => {
        if(tarjeta.classList.contains('active')){
            tarjeta.classList.remove('active');
        }
    }

    // * Rotacion de la tarjeta
    tarjeta.addEventListener('click', () => {
        tarjeta.classList.toggle('active');
    });

    // * Boton de abrir formulario
    btnAbrirFormulario.addEventListener('click', () => {
        btnAbrirFormulario.classList.toggle('active');
        formulario.classList.toggle('active');
    });

    // * Select del mes generado dinamicamente.
    for(let i = 1; i <= 12; i++){
        let opcion = document.createElement('option');
        opcion.value = i;
        opcion.innerText = i;
        formulario.selectMes.appendChild(opcion);
    }

    // * Select del año generado dinamicamente.
    const yearActual = new Date().getFullYear();
    for(let i = yearActual; i <= yearActual + 8; i++){
        let opcion = document.createElement('option');
        opcion.value = i;
        opcion.innerText = i;
        formulario.selectYear.appendChild(opcion);
    }

    // * Input numero de tarjeta
    formulario.inputNumero.addEventListener('keyup', (e) => {
        let valorInput = e.target.value;

        formulario.inputNumero.value = valorInput
        // Eliminamos espacios en blanco
        .replace(/\s/g, '')
        // Eliminar las letras
        .replace(/\D/g, '')
        // Ponemos espacio cada cuatro numeros
        .replace(/([0-9]{4})/g, '$1 ')
        // Elimina el ultimo espaciado
        .trim();

        numeroTarjeta.textContent = valorInput;

        if(valorInput == ''){
            numeroTarjeta.textContent = '#### #### #### ####';

            logoMarca.innerHTML = '';
        }

        if(valorInput[0] == 4){
            logoMarca.innerHTML = '';
            const imagen = document.createElement('img');
            imagen.src = '../images/logos/visa.png';
            logoMarca.appendChild(imagen);
        } else if(valorInput[0] == 5){
            logoMarca.innerHTML = '';
            const imagen = document.createElement('img');
            imagen.src = '../images/logos/mastercard.png';
            logoMarca.appendChild(imagen);
        }

        // Volteamos la tarjeta para que el usuario vea el frente.
        mostrarFrente();
    });

    // * Input nombre de tarjeta
    formulario.inputNombre.addEventListener('keyup', (e) => {
        let valorInput = e.target.value;

        formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
        nombreTarjeta.textContent = valorInput;
        firma.textContent = valorInput;

        if(valorInput == ''){
            nombreTarjeta.textContent = 'Jhon Doe';
        }

        mostrarFrente();
    });

    // * Select mes
    formulario.selectMes.addEventListener('change', (e) => {
        mesExpiracion.textContent = e.target.value;
        mostrarFrente();
    });

    // * Select Año
    formulario.selectYear.addEventListener('change', (e) => {
        yearExpiracion.textContent = e.target.value.slice(2);
        mostrarFrente();
    });

    // * CCV
    formulario.inputCCV.addEventListener('keyup', () => {
        if(!tarjeta.classList.contains('active')){
            tarjeta.classList.toggle('active');
        }

        formulario.inputCCV.value = formulario.inputCCV.value
        // Eliminar los espacios
        .replace(/\s/g, '')
        // Eliminar las letras
        .replace(/\D/g, '');

        ccv.textContent = formulario.inputCCV.value;
    });

    
}

function mostrarPrecio(e,seleccionUsuario=[], priceField){
    seleccionUsuario.formatos.forEach((el)=>{
        if(e.target.value == el.formato+" "+"["+el.cantidad+"]")
            priceField.innerHTML=`Precio/hora: $${el.precio_hora}`;
        else if(e.target.value == "Selecciona una cancha..."){
            priceField.innerHTML=`Precio/hora: $0`;
        }
    }) 
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
    const formatoSeleccionado = localStorage.getItem("modoSeleccionado");
    const cadena = removeAccents(formatoSeleccionado.toLowerCase());

    if(inputDate!="" && optionhour != "Selecciona una hora..."){
        if(calcularDiferenciaHoraria(optionhour)>0){
            if(optionCity == dataCiudades[0].ciudad){
                for(const el of filtroFormatoCancha(data[0], cadena)){
                    const card = crearTarjeta(el.ciudad+el.id,el.name,el.direccion,"../images/futbol-11.jpg");
                    document?.querySelector("#gridCards")?.remove()||gridCards.appendChild(card);            
                }
            }
            else if(optionCity == dataCiudades[1].ciudad)
            {
                for(const el of filtroFormatoCancha(data[1],cadena)){
                    const card = crearTarjeta(el.ciudad+el.id,el.name,el.direccion,"../images/futbol-7.jpg");
                    document?.querySelector("#gridCards")?.remove()||gridCards.appendChild(card);
                } 
            }
            else if(optionCity == dataCiudades[2].ciudad){
                for(const el of filtroFormatoCancha(data[2],cadena)){
                    const card = crearTarjeta(el.ciudad+el.id,el.name,el.direccion,"../images/futbol-9.jpg");
                    document?.querySelector("#gridCards")?.remove()||gridCards.appendChild(card);
                } 
            }
            else if(optionCity == dataCiudades[3].ciudad){
                for(const el of filtroFormatoCancha(data[0],cadena)){
                    const card = crearTarjeta(el.ciudad+el.id,el.name,el.direccion,"../images/futbol-11.jpg");
                    document?.querySelector("#gridCards")?.remove()||gridCards.appendChild(card);
                } 
                for(const el of filtroFormatoCancha(data[1],cadena)){
                    const card = crearTarjeta(el.ciudad+el.id,el.name,el.direccion,"../images/futbol-7.jpg");
                    document?.querySelector("#gridCards")?.remove()||gridCards.appendChild(card);
                }
                for(const el of filtroFormatoCancha(data[2],cadena)){
                    const card = crearTarjeta(el.ciudad+el.id,el.name,el.direccion,"../images/futbol-9.jpg");
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
            let h = DateTime.fromFormat(optionhour,"H:mm");
            let dur = Duration.fromObject({hours:h.hour});
            localStorage.setItem(`${userData[0].id}`,`${d.plus(dur.toObject())}`);
        }
        else
            Swal.fire(  
                'Ingrese una hora válida',
                'La hora seleccionada es inválida porque ya pasó.',
                'error'
            )
    }
    else
        Swal.fire(  
            'Lo campos de fecha y hora son obligatorios',
            'Debes seleccionar una fecha y una hora para reservar la cancha',
            'error'
        )
}

function filtroFormatoCancha(data = [], cadena ){
    return data.filter((formato)=>{
        var array = formato.formatos.filter((el)=>{
            return el.formato == cadena;
        });
        return array.some((el)=>{return el.formato == cadena});
    });
}

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("\u0020","");
} 

function calcularDiferenciaHoraria(horaSeleccionada){
    let h = DateTime.fromFormat(horaSeleccionada,"H:mm");
    let dur = Duration.fromObject({hours:h.hour})
    return d.plus(dur.toObject()).diffNow('hours');
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
                <a id="${canchaId}" href="#" class="btn btn-primary btn__verCanchas">Ver Canchas</a>
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
