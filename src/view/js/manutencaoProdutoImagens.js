window.addEventListener('load', () => {
    consultaImg()
    const filewrapper = document.getElementById('filewrapper');
    let qtdShowfilebox = document.querySelectorAll(".showfilebox").length;

    document.getElementById("addImg").addEventListener('click', () => {

        if (document.querySelectorAll(".showfilebox").length <= 6) {

            const showfileboxElem = document.createElement("div");
            showfileboxElem.classList.add("showfilebox");
            const leftElem = document.createElement("div");
            leftElem.classList.add("left");
            const fileTypeElem = document.createElement("span");
            fileTypeElem.classList.add("filetype");
            const img = document.createElement("img");
            img.classList.add("imgProduto");
            img.setAttribute("name", "imagemPrduto");
            fileTypeElem.appendChild(img);
            leftElem.append(fileTypeElem);
            const filetitleElem = document.createElement("h3");
            const arquivo = document.createElement("input")
            arquivo.type = 'file';
            arquivo.accept = 'image/*';
            arquivo.style.display = 'none';
            arquivo.classList.add("arquivo");
            arquivo.name = "arquivoImagens"
            leftElem.append(filetitleElem, arquivo);
            showfileboxElem.append(leftElem);
            const rightElem = document.createElement("div");
            rightElem.classList.add("right");
            showfileboxElem.append(rightElem);
            const crossElem = document.createElement("span");
            crossElem.innerHTML = "&#215;";
            rightElem.append(crossElem);
            filewrapper.append(showfileboxElem);

            showfileboxElem.style.display = "none";

            arquivo.click();

            crossElem.addEventListener("click", () => {
                filewrapper.removeChild(showfileboxElem);
                document.getElementById("quantidadeCadastrada").innerHTML = document.querySelectorAll(".showfilebox").length;
            })

            arquivo.addEventListener("change", function (e) {
                let fileName = e.target.files[0].name;
                let filetype = e.target.files[0];
                const reader = new FileReader();

                reader.onload = function () { img.src = reader.result; };

                reader.readAsDataURL(filetype);

                filetitleElem.innerHTML = fileName;

                showfileboxElem.style.display = "flex";
                document.getElementById("quantidadeCadastrada").innerHTML = document.querySelectorAll(".showfilebox").length;

            });
        } else {
            Swal.fire({
                title: "ATENÇÂO",
                text: "Atigiu o limite de imagens, máximo 6 imagens e mínimo 1 imagem.",
                icon: "warning"
            });
        }
    });
})


document.getElementById("btnSalvar").addEventListener('click', () => {
    const files = new FormData();
    const id_produto = verificarIdProduto();

    idFile = 0
    Array.from(document.querySelectorAll('input[type="file"]')).forEach(element => {
        files.append("imagem " + (++idFile), element.files[0]);
    });

    if (document.querySelectorAll('input[type="file"]').length > 0 && document.querySelectorAll('input[type="file"]').length <= 6) {
        fetch(`http://localhost/app.php?rota=produto&acao=cadastrarImg&idProduto=${id_produto}`, {
            method: "POST",
            body: files
        })
            .then(() => { trocaParatelaPrincipal() });
    } else {
        Swal.fire({
            title: "ATENÇÂO",
            text: "Atigiu o limite de imagens, máximo 6 imagens e mínimo 1 imagem.",
            icon: "warning"
        });
    }
})

function verificarIdProduto() {
    const urlParametro = new URLSearchParams(window.location.search);
    const id = urlParametro.get("idProduto");
    return id
}

function trocaParatelaPrincipal() {
    // return window.location = 'http://localhost/src/view/ui/consultarProduto.html'
}

// verificar se tem imagens no banco de dados
function consultaImg() {
    const id_produto = verificarIdProduto();
    let caminhoIMG = [];
    fetch(`http://localhost/app.php?rota=produto&acao=consultarIMG&idProduto=${id_produto}`, {
        method: "GET",
    })
        .then(resposta => resposta.json())
        .then((resp) => {
            if (resp.length > 0) {
                caminhoIMG.push(resp);
                alterarIMG(caminhoIMG);
            } else {
                let formularioAddImg = document.getElementById("FundoFormulario");
                formularioAddImg.style.display = "flex";
            }

        })


    // printar as imagens do banco de dados
    function alterarIMG(caminhoIMG) {

        let formularioAddImg = document.getElementById("FundoFormulario");
        formularioAddImg.style.display = "none";

        let formularioPrintarImg = document.createElement("div");
        formularioPrintarImg.id = "formularioPrintarImg";
        formularioPrintarImg.classList.add("formularioImg");

        for (let i = 0; i < caminhoIMG[0].length; i++) {
            let localImg = document.createElement("div");
            localImg.classList.add("localImgPrintar");
            let img = document.createElement("img");
            img.classList.add("imgPrintar");
            img.src = caminhoIMG[0][i]['caminho_imagem_prod'];
            localImg.appendChild(img);
            formularioPrintarImg.appendChild(localImg);
            document.getElementById("ImagensProduto").appendChild(formularioPrintarImg);
        }

        let areaBtn = document.createElement("div");
        areaBtn.classList.add("areaBtn")
        let btnDiv = document.createElement("div");
        areaBtn.classList.add("btnDiv")
        let direcionarTelaConsulta = document.createElement("a");
        direcionarTelaConsulta.href = "consultarProduto.html";

        let btnAlterar = document.createElement("button");
        btnAlterar.id = "btnAlterar"
        btnAlterar.innerHTML = "Alterar"

        let btnCalcelar = document.createElement("button");
        btnCalcelar.id = "btnCancelar"
        btnCalcelar.innerHTML = "Cancelar"

        direcionarTelaConsulta.append(btnCalcelar)
        btnDiv.appendChild(direcionarTelaConsulta)
        btnDiv.appendChild(btnAlterar)
        areaBtn.appendChild(btnDiv);

        document.getElementById("ImagensProduto").appendChild(areaBtn);

        // botão de alterar as imagens 
        btnAlterar.addEventListener('click', () => {
            const id_produto = verificarIdProduto();
            let caminhoIMG = [];
            fetch(`http://localhost/app.php?rota=produto&acao=excluirSoImg&idProduto=${id_produto}`, {
                method: "GET",
            })
            let formularioAddImg = document.getElementById("FundoFormulario");
            formularioAddImg.style.display = "flex";
            formularioPrintarImg = document.getElementById("formularioPrintarImg");
            formularioPrintarImg.style.display = "none";
            areaBtn.style.display = "none";
        })
    }
}

