// carregar a categoria
window.onload = listaCategoria();

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
  // const uploadDasImagensproduto = document.getElementById("uploadImgProduto").files;

  const dadosColetados = {
    nomeDoPorduto: nomeDoPorduto,
    codigoDeBarraProduto: codigoDeBarraProduto,
    precoProduto: precoProduto,
    valorDesconto: valorDesconto,
    frete: frete,
    selectCategoria: selectCategoria,
    previaDescricao: previaDescricao,
    descricaoCompleta: descricaoCompleta
    // imgConvertidaBase64:imgConvertidaBase64
  }

  return dadosColetados;
}

function postProdutoDados(dados) {
  fetch('http://localhost/GerenciadorDeVendas/app.php?rota=produto&acao=validadarDados', {
    headers: {
      'content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(dados)
  })
    .then((response) => response.text())
    .then((resposta) => {
      if (resposta == 'erro\n') {
        Swal.fire({
          title: "ATENÇÂO",
          text: "Preencha todos os campos",
          icon: "warning"
        });
      }
      if (resposta == 'ok\n') {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Salvo com sucesso",
          showConfirmButton: false,
          timer: 1500
        }).then(() => { window.location.reload(true); })
      }
    }
    )
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


// imagens do upload para usuario
const uploadImagem = document.querySelector('#uploadImgProduto');
const paragraphDescricaoIMG = document.querySelector('#file_input_help');

uploadImagem.addEventListener('change', function (evt) {
  if (!(evt.target && evt.target.files && evt.target.files.length <= 6)) {
    Swal.fire({
      title: "ATENÇÂO",
      text: "quantidade informada maior que 6 unidades. Por Favor, seleciona novamente as imagens.",
      icon: "warning"
    });

    document.getElementById("uploadImgProduto").value = ""

  } else {

    const files = evt.target.files;

    for (let i = 0; i < files.length; i++) {
      // Inicia o file-reader para cada arquivo:
      var reader = new FileReader();

      // Define o que ocorre quando concluir para cada arquivo:
      reader.onload = (function (file) {
        return function (e) {
          const imagem = document.createElement('img');
          imagem.classList.add("imagensUpload")
          const divImg = document.getElementById('imgPrevia');


          // Define o `src` do elemento para o resultado:
          imagem.src = e.target.result;

          // Insere a imagem após o parágrafo de descrição:
          divImg.append(imagem);
        };
      })(files[i]);

      // Lê o arquivo e cria um link (o resultado vai ser enviado para o onload).
      reader.readAsDataURL(files[i]);
    }
  }
});
