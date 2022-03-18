
const buttonLogin = document.querySelector("#login");
const linkLogin = document.querySelector("#loginLink");
buttonLogin.addEventListener("click",mostrarFormulario);
linkLogin.addEventListener("click",mostrarFormulario);

function mostrarFormulario(){
    Swal.fire({
        title: 'Inicio de sesión',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Sign in',
        html:
        `
            <form class="login">
                <img src="../images/LogoSinFondo.png" alt="" width="200" height="200">
                <div class="form-floating login__email">
                    <input id="emailLogin" type="email" class="form-control login__email" id="floatingInput" placeholder="name@example.com" data-dashlane-rid="eead604e5eee915d" data-kwimpalastatus="alive" data-kwimpalaid="1647566942343-2" data-form-type="email">
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating login__password">
                    <input id="passwordLogin" type="password" class="form-control login__password" id="floatingPassword" placeholder="Password" data-dashlane-rid="fa0aa51ebcef76d6" data-kwimpalastatus="alive" data-kwimpalaid="1647566942343-1" data-form-type="password">
                    <label for="floatingPassword">Password</label>
                </div>
            
                <div class="checkbox mt-3">
                    <label data-dashlane-label="true">
                        <input type="checkbox" value="remember-me" data-dashlane-rid="cfd9a04ac97be861" data-form-type="consent,rememberme"> Remember me
                    </label>
                </div>
                <p class="mt-3 mb-3 text-muted">© 2022</p>
            </form>
        `
    }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
    })
}

  