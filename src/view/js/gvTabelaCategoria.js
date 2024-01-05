
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
    }],
    server: {
        url: 'Php/arquivo.php?a',
        then: json => json.dados.map(produto => [produto.id, produto.nome]),
        total: json => json.totalRegistros
    }
});

grid.render(document.getElementById("tabCategoria"));


