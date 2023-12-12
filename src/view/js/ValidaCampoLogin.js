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

function user(nome, senha) {
    const dados = { nome: nome.value, senha: senha.value }
    fetch('http://localhost/GerenciadorDeVendas/app.php?rota=user&acao=validarUser', {

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(dados)
    })
}
