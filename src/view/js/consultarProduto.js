
const grid = new gridjs.Grid({
  search: {
    server: {
      url: (prev, keyword) => `${prev}&search=${keyword}`
    }
  },
  pagination: {
    limit: 5,
    server: {
      url: (prev, page, limit) => `${prev}&limit=${limit}&offset=${page * limit}`
    }
  },
  columns: [{
    id: 'id',
    name: 'Id'
  }, {
    id: 'cod',
    name: 'Cod'
  }, {
    id: 'nome',
    name: 'Nome'
  }, {
    id: 'cod',
    name: 'Cod'
  }, {
    id: 'descricaoPrevia',
    name: 'Descrição Previa'
  },
  {
    id: 'descricaoComple',
    name: 'Descrição Completa'
  }, {
    id: 'valor',
    name: 'Preço',
    width: '87px'
  }, {
    id: 'desconto',
    name: 'Desconto'
  }, {
    id: 'frete',
    name: 'Frete'
  }, {
    id: 'id_categoria',
    name: 'id_categoria'
  }, {
    id: 'imgProduto',
    name: 'Produto'
  }, {
    id: 'acao',
    name: 'Ação',
    width: '132px',

    formatter: (cell, row) => {

      return gridjs.html(`<span class="areaBtnAcao"><a href="http://localhost/GerenciadorDeVendas/src/view/ui/manutencaoProduto.html?idAlterar=${row.cells[0].data}"><button class="btnAcoes"><img src="../../../upload/icones/editar.png" alt="Alterar" class="imgAcao"></button></a>
          <button onclick=excluir(${row.cells[0].data}) class="btnAcoes"><img src="../../../upload/icones/lixeira.png" alt="excluir" class="imgAcao"></button></span>`)
    }
  }],
  style: {
    th: {
      'background-color': '#bfbfbf83',
      'color': '#070707'
    },
    td: {
      'background-color': 'rgb(254, 254, 254)'
    }
  },
  server: {
    url: 'http://localhost/GerenciadorDeVendas/app.php?rota=produto&acao=consultar',
    then: json => json.dados.map(produto => [produto.id_produto, produto.nome, produto.cod_barra, produto.descricaoprevia, produto.descricao, produto.valor, produto.desconto, produto.frete, produto.frete, produto.id_categoria, produto.imgproduto,]),
    total: json => json.totalRegistros
  }
});

grid.render(document.getElementById("wrapper"));


