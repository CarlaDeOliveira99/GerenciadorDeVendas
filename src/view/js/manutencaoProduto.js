
function listaCategosiras() {
  fetch('http://localhost/GerenciadorDeVendas/app.php?rota=categoria&acao=consultar', {
    headers: {
      'content-Type': 'application/json'
    },
    method: "GET",
  })

    //lista de categoria
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

// Chame a função para buscar os dados
 listaCategosiras();





