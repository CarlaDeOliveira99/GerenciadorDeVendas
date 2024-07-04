
// carregar a categoria
window.onload = function () {
  listaCategoria();
};


// lista da categoia
function listaCategoria() {
  fetch('http://localhost/app.php?rota=categoria&acao=consultar', {
    headers: {
      'content-Type': 'application/json'
    },
    method: "GET",
  })
    .then(resp => resp.json())
    .then(json => {
      categoria = json.dados.map(produto => [produto.id_categoria, produto.nome])

      let select = document.getElementById('selectCategoria')

      categoria.forEach(element => {
        let option = document.createElement('option');
        option.append(element[1])
        option.value = element[0]
        select.append(option)
      });

      verificarAlterar();
    })
}


document.getElementById('btnSalvar').addEventListener('click', function () {
  const dadosColetados = coletarDadosDoProduto()
  const alterarID = idAlterar();
  postProdutoDados(dadosColetados, alterarID);
})

function coletarDadosDoProduto() {
  const nomeDoPorduto = document.getElementById('nomeProduto').value;
  const codigoDeBarraProduto = document.getElementById('cod_barra').value;
  const precoProduto = document.getElementById('preco').value;
  const desconto = document.getElementById('desconto').value;
  const frete = document.querySelector('input[name="opcaoFrete"]:checked').value;
  const selectCategoria = document.getElementById('selectCategoria').value;
  const previaDescricao = document.getElementById('descPrevia').value;
  const descricaoCompleta = document.getElementById('descricaoCompletaProduto').value;

  const dadosColetados = {
    nomeDoPorduto: nomeDoPorduto,
    codigoDeBarraProduto: codigoDeBarraProduto,
    precoProduto: precoProduto,
    desconto: desconto,
    frete: frete,
    selectCategoria: selectCategoria,
    previaDescricao: previaDescricao,
    descricaoCompleta: descricaoCompleta
  }
  return dadosColetados;
}


// cadastrar os dados e verificar os campos 
function postProdutoDados(dados, idAlterar) {

  if (idAlterar != null) {

    let informacoes = {
      dados: dados,
      id_produto: idAlterar,
    }

    fetch('http://localhost/app.php?rota=produto&acao=aletarDados', {
      headers: {
        'content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(informacoes)
    })
      .then((resposta) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Salvo com sucesso",
          showConfirmButton: false,
          timer: 1500
        })
        .then(() => { trocaParatelaPrincipal() });
      })
  } else {
    fetch('http://localhost/app.php?rota=produto&acao=validadarDados', {
      headers: {
        'content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(dados)
    })
      .then(res => res.text())
      .then((resposta) => {

        if (resposta == "ok banco\n") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Salvo com sucesso",
            showConfirmButton: false,
            timer: 1500
          })
          .then(() => { trocaParatelaPrincipal() })
        } else if (resposta == "erro dados\n") {
          Swal.fire({
            title: "ATENÇÂO",
            text: "Preencha todos os campos",
            icon: "warning"
          });
        }
      }
      )
  }
}

function trocaParatelaPrincipal() {
  return window.location = 'http://localhost/src/view/ui/consultarProduto.html'
}

function idAlterar() {
  const urlParametro = new URLSearchParams(window.location.search);
  const id = urlParametro.get("idAlterar");
  return id
}

// verifica na url veio id para alterção
function verificarAlterar() {
  if (idAlterar() != null) {
    preencherCampoAlterar(idAlterar());
  }
}


// preencher os campos para alterar
function preencherCampoAlterar(id) {
  fetch(`http://localhost/app.php?rota=produto&acao=campoAlterarIndormacoes&id=${id}`, {
    headers: {
      'content-Type': 'application/json'
    },
    method: "GET",
  })
    .then((res) => res.json())
    .then((dados) => {
      document.getElementById('nomeProduto').value = dados[0].nome
      document.getElementById('cod_barra').value = dados[0].cod_barra
      document.getElementById('desconto').value = dados[0].desconto
      document.getElementById('descricaoCompletaProduto').value = dados[0].descricao
      document.getElementById('descPrevia').value = dados[0].descricaoprevia
      document.getElementById('preco').value = dados[0].valor
      document.getElementById('selectCategoria').value = dados[0].id_categoria
      // document.getElementById('input[name="opcaoFrete"]:checked').value = dados[0].frete;
    })
  }

  document.getElementById('desconto').addEventListener('keyup', function(){
    let valorDaporcentagem = document.getElementById('desconto').value;
    let preço = document.getElementById('preco').value
    let descobrirPorcentagem = (valorDaporcentagem*100)/preço;
    document.getElementById('porcentagem').innerHTML = descobrirPorcentagem.toFixed(2) + "%";
  })
