window.onload = verificarAlterar()

function verificarAlterar() {
    if (idAlterar() >= 1) {
        preencherCampoAlterar(idAlterar());
    }
}


function idAlterar() {
    const urlParametro = new URLSearchParams(window.location.search);
    const id = urlParametro.get("idAlterar");
    return id
}


const btnSalvar = document.getElementById('btnSalvar')

btnSalvar.addEventListener('click', function dados() {
    const dadosCategoria = document.getElementById('campoCategoria').value;
    let validacaoCampo = validarCampo(dadosCategoria);

    if (!validacaoCampo) {
        mensagemErro()
    } else {
        if (idAlterar() == null) {
            cadastraCategoria(dadosCategoria);
        } else if (idAlterar() >= 1) {
            alterar(idAlterar());
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

function preencherCampoAlterar(id) {
fetch(`http://localhost/GerenciadorDeVendas/app.php?rota=categoria&acao=campoAlterarIndormacoes&id=${id}`,{
    headers:{
        'content-Type':'application/json'
    },
    method: "GET",
})
.then(res => res.json())
.then(dados =>{
   document.getElementById('campoCategoria').value = dados[0].nome
})
    
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
        )

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



