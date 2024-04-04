
window.onload = function () {
  verificarResertIdTabela();
  statusImg();
}
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
    name: 'Nome',
    width: '111px'
  }, {
    id: 'cod_barra',
    name: 'cod_barra'
  }, {
    id: 'descricaoPrevia',
    name: 'Descrição Previa',
    width: '129px'
  }, {
    id: 'descricaoCompleta',
    name: 'Descrição Completa',
    width: '159px'
  },
  {
    id: 'valor',
    name: 'Preço',
    width: '100px'
  }, {
    id: 'desconto',
    name: 'Desconto',
    width: '87px'
  }, {
    id: 'frete',
    name: 'Frete'
  }, {
    id: 'nome_categoria',
    name: 'Categoria',
    with: '102px'
  }, {
    id: 'imgProduto',
    name: 'Imagem do Produto',
    width: '152px',
    formatter: (cell, row) => {

      return gridjs.html(` 
      <button id="btnImgProduto" class="btnAcoes">
        <a href="http://localhost/GerenciadorDeVendas/src/view/ui/manutencaoProdutoImagens.html?idProduto=${row.cells[0].data}" class="confBtn">
         <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
          class="bi bi-images" viewBox="0 0 16 16">
          <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
          <path
              d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1z" />
          </svg>
         <span id="status" class="statusImagens" style="color: red;font-weight: 500;" value =${row.cells[0].data} >status:Pedente</span>
      </a>
     </button>`)
    }
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
    then: json => json.dados.map(produto => [produto.id_produto, produto.nome, produto.cod_barra, produto.descricaoprevia, produto.descricao, produto.valor, produto.desconto, produto.frete, produto.nome_categoria, produto.imgproduto,]),
    total: json => json.totalRegistros,
  }
});

grid.render(document.getElementById("wrapper"));

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
  fetch(`http://localhost/GerenciadorDeVendas/app.php?rota=produto&acao=excluir&idDeletar=${id}`, {
    headers: {
      'content-Type': 'application/json'
    },
    method: "GET",
  })
    .then(resp => resp.text())
    .then(() => { trocaParatelaPrincipal() })
}

function trocaParatelaPrincipal() {
  return window.location = 'http://localhost/GerenciadorDeVendas/src/view/ui/consultarProduto.html'
}



function verificarResertIdTabela() {
  fetch(`http://localhost/GerenciadorDeVendas/app.php?rota=produto&acao=verificarTabela`, {
    headers: {
      'content-Type': 'application/json'
    },
    method: "GET",
  })

}

function statusImg() {

  fetch(`http://localhost/GerenciadorDeVendas/app.php?rota=produto&acao=statusImg`, {
    headers: {
      'content-Type': 'application/json'
    },
    method: "GET",
  })
    .then(resposta => resposta.json())
    .then(resposta => {
      Array.from(document.querySelectorAll(".statusImagens")).forEach(dados => {
        let valorValue = dados.attributes[3].textContent;
        resposta.forEach(element => {
          if (parseInt(valorValue) == element["id_produto"]) {
            dados.innerHTML = "status Concluído";
            dados.style.color = "#09943e";
            dados.style.fontSize = "11pt"
          }
        });
      });
    });
}






