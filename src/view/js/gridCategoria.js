
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

        // formatter: (cell, row) => {

        //     let imgEditar = document.createElement('img')
        //     imgEditar.src = '../../../upload/icones/editar.png'


        //     let imgExcluir = document.createElement('img')
        //     imgExcluir.src = '../../../upload/icones/lixeira.png'
        //     imgExcluir.classList.add('imgPadrao')

        //     imgExcluir.setAttribute("id", "btnExcluir")
        //     imgEditar.classList.add('imgPadrao')
        //     imgEditar.setAttribute("id", "btnEditar")


        //     return gridjs.h('div', {}, [imgEditar, imgExcluir]);
        // }        

    }],
    server: {
        url: 'http://localhost/GerenciadorDeVendas/app.php?rota=categoria&acao=consultar',
        then: json => json.dados.map(produto => [produto.id_categoria, produto.nome]),
        total: json => json.totalRegistros
    }
});

grid.render(document.getElementById("tabCategoria"));

