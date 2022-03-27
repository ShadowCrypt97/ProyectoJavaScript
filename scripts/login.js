const buttonLogin = document.querySelector("#login");
buttonLogin.addEventListener("click",mostrarFormulario);

function mostrarFormulario(){
    Swal.fire({
        title: 'Inicio de sesión',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Sign in',
        allowOutsideClick: false,
        showCancelButton: true,
        html:
        `
            <form class="login">
                <img src="../images/LogoSinFondo.png" alt="" width="200" height="200">
                <div class="form-floating login__email">
                    <input [autocomplete]="username" id="emailLogin" type="email" class="form-control login__email" id="floatingInput" placeholder="name@example.com" data-dashlane-rid="eead604e5eee915d" data-kwimpalastatus="alive" data-kwimpalaid="1647566942343-2" data-form-type="email">
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating login__password">
                    <input [autocomplete]="current-password" id="passwordLogin" type="password" class="form-control login__password" id="floatingPassword" placeholder="Password" data-dashlane-rid="fa0aa51ebcef76d6" data-kwimpalastatus="alive" data-kwimpalaid="1647566942343-1" data-form-type="password">
                    <label for="floatingPassword">Password</label>
                </div>
                <p class="mt-3 mb-3 text-muted">© 2022</p>
            </form>
        `
    }).then((result) => {
        
        if(result.isConfirmed){
            const inputEmail = document.querySelector("#emailLogin");
            const inputPassword = document.querySelector("#passwordLogin");
            const emailStored = localStorage?.getItem(inputEmail.value)?.includes(inputEmail.value)||false;
            const passwordStored = localStorage?.getItem(inputEmail.value)?.includes(inputPassword.value)||false;

        if(emailStored){
            if(passwordStored){
                (async ()=>{
                    await Swal.fire('Success!','Has iniciado sesión correctamente','success');
                    window.location.href = "./models/reservas.html";
                })();
                localStorage.setItem("actuallyLoggedIn",inputEmail.value);  
            }else{
                Swal.fire(
                    'Contraseña inválida!',
                    'Porfavor verifique la información e intente nuevamente.'
                ) 
            }
        }else{
            Swal.fire(
                'Correo Inválido!',
                'Porfavor verifique la información e intente nuevamente.'
            ) 
        }
        }

    })
}

function redirectDashboard(){
    window.location.href = "../models/register.html";
}  