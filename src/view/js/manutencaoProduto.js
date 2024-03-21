// carregar a categoria
window.onload  = listaCategoria();

// pegar as informações

document.getElementById('btnSalvar').addEventListener('click', function () {
 const dadosColetados = coletarDadosDoProduto()
 postProdutoDados(dadosColetados)
})

function coletarDadosDoProduto() {
  const nomeDoPorduto = document.getElementById('nomeProduto').value;
  const codigoDeBarraProduto = document.getElementById('cod_barra').value;
  const precoProduto = document.getElementById('preco').value;
  const valorDesconto = document.getElementById('desconto').value;
  const frete = document.querySelector('input[name="opcaoFrete"]:checked').value;
  const selectCategoria = document.getElementById('selectCategoria').value;
  const previaDescricao = document.getElementById('descPrevia').value;
  const descricaoCompleta = document.getElementById('descricaoCompletaProduto').value;
  // const imagensDoProduto = 

  const dadosColetados = {
    nomeDoPorduto:nomeDoPorduto,
    codigoDeBarraProduto:codigoDeBarraProduto,
    precoProduto:precoProduto,
    valorDesconto:valorDesconto,
    frete:frete,
    selectCategoria:selectCategoria,
    previaDescricao:previaDescricao,
    descricaoCompleta:descricaoCompleta
  }
  
  return dadosColetados;
}

function postProdutoDados(dados) {
  fetch('http://localhost/GerenciadorDeVendas/app.php?rota=produto&acao=validadarDados',{
    headers:{
      'content-Type':'application/json'
    },
    method:"POST",
    body:JSON.stringify(dados)
  })
}


// lista da categoia
function listaCategoria() {
  fetch('http://localhost/GerenciadorDeVendas/app.php?rota=categoria&acao=consultar', {
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
    })
}








