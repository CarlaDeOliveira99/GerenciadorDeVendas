
window.addEventListener("load", function verificarUser() {
    fetch('http://localhost/GerenciadorDeVendas/app.php?rota=user&acao=userLogado', {
        method: "GET",
    })
    .then(res => res.text())
        .then(res => JSON.parse(res))
        .then(res => {
            if (res != "login") {
                window.location = res;     
            } 
        });
})


const submit = document.getElementById("btnEnviar");

submit.addEventListener('click', validate);

function validate(e) {
    e.preventDefault();

    const firstNameField = document.getElementById("floatingInput");
    const floatingPassword = document.getElementById("floatingPassword");
    let validNome = true;
    let validSenha = true;

    if (!firstNameField.value) {
        const nameError = document.getElementById("nameErrorNome");
        nameError.classList.add("visible");
        firstNameField.classList.add("invalid");
        nameError.setAttribute('aria-hidden', false);
        nameError.setAttribute('aria-invalid', true);
        validNome = false
    }

    if (!floatingPassword.value) {
        const nameError = document.getElementById("nameErrorSenha");
        nameError.classList.add("visible");
        floatingPassword.classList.add("invalid");
        nameError.setAttribute('aria-hidden', false);
        nameError.setAttribute('aria-invalid', true);
        validSenha = false
    }

    if (validNome & validSenha == true) {
        user(firstNameField, floatingPassword)
    }
}

function user(email, senha) {
    const dados = { email: email.value, senha: senha.value }
    fetch('http://localhost/GerenciadorDeVendas/app.php?rota=user&acao=validarUser', {

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(dados)
    })
        .then(res => res.text())
        .then(res => JSON.parse(res))
        .then(res => {
            if (res == "erro") {
                Swal.fire({
                    text: "Dados inválidos",
                    icon: "warning",
                    confirmButtonColor: "#3085d6",
                });
            } else {
                window.location = res;
            }
        });


}


