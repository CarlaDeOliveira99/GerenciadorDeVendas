window.onload = verificarAlterar()

function verificarAlterar() {
    if (acao() >= 1) {
        preencherCampoAlterar();
    }
}


function acao() {
    const urlParametro = new URLSearchParams(window.location.search);
    const id = urlParametro.get("id");
    return id
}


const btnSalvar = document.getElementById('btnSalvar')

btnSalvar.addEventListener('click', function dados() {
    const dadosCategoria = document.getElementById('campoCategoria').value;
    let validacaoCampo = validarCampo(dadosCategoria);

    if (!validacaoCampo) {
        mensagemErro()
    } else {
        if (acao() == null) {
            cadastraCategoria(dadosCategoria);
        } else if (acao() >= 1) {
            alterar(acao());
        }
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
        .then(
            mensagemSalvoComSucesso(),
        )
}

function preencherCampoAlterar() {
    const urlParametro = new URLSearchParams(window.location.search);
    const descricaoCampo = urlParametro.get("descricao");

    document.getElementById('campoCategoria').value = descricaoCampo
}


function alterar(id) {
    let informacoesAlterada = document.getElementById('campoCategoria').value
    let dados = { id: id, txtCampo: informacoesAlterada }

    fetch('http://localhost/GerenciadorDeVendas/app.php?rota=categoria&acao=alterarCategoria', {
        headers: {
            'content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(dados)
    })
        .then(
            mensagemSalvoComSucesso()
        ).then(() => { trocaParatelaPrincipal() })

}


function mensagemSalvoComSucesso() {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Salvo com sucesso!",
        showConfirmButton: false,
        timer: 1500
    }).then(() => { trocaParatelaPrincipal() })
}

function trocaParatelaPrincipal() {
    return window.location = 'http://localhost/GerenciadorDeVendas/src/view/ui/consultarCategoria.html'
}
