
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
      id: 'descricao',
      name: 'Descrição'
    }, {
      id: 'valor',
      name: 'Preço'
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
      name: 'Ação'
    }],
    server: {
      url: 'Php/arquivo.php?a',
      then: json => json.dados.map(produto => [produto.id, produto.nome, produto.quantidade]),
      total: json => json.totalRegistros
    }
  });
  
  grid.render(document.getElementById("wrapper"));

  
