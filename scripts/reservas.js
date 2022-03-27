const sidebar__small = document.querySelector("#sidebar-1");
const sidebar__expanded = document.querySelector("#sidebar-2");
const signOutBtn = document.querySelector("#btnSignOut");
const main = document.querySelector("main");

const card =document.createElement("div");

sidebar__small.addEventListener("mouseenter",mostrarSidebarExpandida);
sidebar__expanded.addEventListener("mouseleave",mostrarSidebarRecogida);
signOutBtn.addEventListener("click",()=>{
    localStorage.setItem("actuallyLoggedIn",false);
    signOutBtn.setAttribute("href","../index.html");
})

const dataModalidad = (async ()=>{
    const response = await fetch('../data_formato_canchas.json');
    const formatos = await response.json();
    return formatos;
})();

(async ()=>{
    const data = await dataModalidad;
    let cont = 1;
    for(let i=0;i<2;i++){
        const filas = document.createElement("div");
        const col1 = document.createElement("div");
        const col2 = document.createElement("div");
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
            <div id="card${el.id}" class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg">
                <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                    <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">${el.name}</h2>
                </div>
            </div>`;
        
        document.querySelector("#card"+el.id).setAttribute("style","background-image: url('..\u002fimages\u002f"+el.url_img+"'); background-repeat: no-repeat; background-size: cover; background-position: center");
    });
})();

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
