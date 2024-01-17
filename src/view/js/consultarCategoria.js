
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
        id: 'nome',
        name: 'Nome'
    }, {
        id: 'acao',
        name: 'Ação',

        formatter: (cell, row) => {
            
                return gridjs.html(`<a href="http://localhost/GerenciadorDeVendas/src/view/ui/manutencaoCategoria.html?id=${row.cells[0].data}&descricao=${row.cells[1].data}"><button class="btnAcoes" id="btnAlterar""><img src="../../../upload/icones/editar.png" alt="Alterar" class="imgAcao"></button></a>
               <button class="btnAcoes" id="btnExcluir"><img src="../../../upload/icones/lixeira.png" alt="excluir" class="imgAcao"></button>`)
              }  
    }],
    server: {
        url: 'http://localhost/GerenciadorDeVendas/app.php?rota=categoria&acao=consultar',
        then: json => json.dados.map(produto => [produto.id_categoria, produto.nome]),
        total: json => json.totalRegistros
    }
});

grid.render(document.getElementById("tabCategoria"));



