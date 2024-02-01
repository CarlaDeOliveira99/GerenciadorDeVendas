
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

            return gridjs.html(`<a href="http://localhost/GerenciadorDeVendas/src/view/ui/manutencaoCategoria.html?idAlterar=${row.cells[0].data}"><button class="btnAcoes"><img src="../../../upload/icones/editar.png" alt="Alterar" class="imgAcao"></button></a>
            <button onclick=excluir(${row.cells[0].data}) class="btnAcoes"><img src="../../../upload/icones/lixeira.png" alt="excluir" class="imgAcao"></button>`)
        }
    }],
    // style: {
    //     td: {
    //         'width':'fit-content',
    //     }
    // },
    server: {
        url: 'http://localhost/GerenciadorDeVendas/app.php?rota=categoria&acao=consultar',
        then: json => json.dados.map(produto => [produto.id_categoria, produto.nome]),
        total: json => json.totalRegistros
    }
});
grid.render(document.getElementById("tabCategoria"));



function excluir(id) {
    mensagemExluir(id)
}



function mensagemExluir(id) {
    Swal.fire({
        title: "Tem certeza?",
        text: "Você não poderá reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, excluí-lo!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Exluído!",
                text: "Dados excluído com sucesso!",
                icon: "success"
            }).then(() => { deletar(id) })
        }
    })
}


function deletar(id) {
    console.log(id);
    fetch(`http://localhost/GerenciadorDeVendas/app.php?rota=categoria&acao=excluir&idDeletar=${id}`, {
        headers: {
            'content-Type': 'application/json'
        },
        method: "GET",
    }).then(() => { trocaParatelaPrincipal() })
}


function trocaParatelaPrincipal() {
    return window.location = 'http://localhost/GerenciadorDeVendas/src/view/ui/consultarCategoria.html'
}




