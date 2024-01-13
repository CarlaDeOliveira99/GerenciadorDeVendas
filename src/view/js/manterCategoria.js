function acao() {
    const urlParametro = new URLSearchParams(window.location.search);
    const status = urlParametro.get("status");
    return status
}


const btnSalvar = document.getElementById('btnSalvar')

btnSalvar.addEventListener('click', function dados() {
    const dadosCategoria = document.getElementById('campoCategoria').value;
    let validacaoCampo = validarCampo(dadosCategoria);

    if (!validacaoCampo) {
        mensagemErro()
    }

    if (acao() === "true") {
        cadastraCategoria(dadosCategoria);
    } else if (acao() === "true") {
        alterarCategoria();
    } else {
        window.location = 'http://localhost/GerenciadorDeVendas/src/view/ui/gridCategoria.html'
    }

})


function validarCampo(dadosCategoria) {

    if (dadosCategoria != "") {
        return true;
    } else {
        return false;
    }
}

function mensagemErro() {
    Swal.fire({
        title: "Campo vazio",
        text: "Por favor, preencha o campo!",
        icon: "warning"
    });
}

function cadastraCategoria(dadosCategoria) {

    fetch('http://localhost/GerenciadorDeVendas/app.php?rota=categoria&acao=cadastrarCategoria', { 
        headers: {
            'content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(dadosCategoria)
    })

}

function alterarCategoria() {
    console.log("alterar");
}



