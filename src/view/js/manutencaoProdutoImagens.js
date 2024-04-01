window.addEventListener('load', () => {
    const filewrapper = document.getElementById('filewrapper');
    let qtdShowfilebox = document.querySelectorAll(".showfilebox").length;

    document.getElementById("addImg").addEventListener('click', () => {

        if (document.querySelectorAll(".showfilebox").length < 6) {

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
                text: "Precisa pelo menos uma imagem do produto.",
                icon: "warning"
            });
        }
    });
})


document.getElementById("btnSalvar").addEventListener('click', () => {
    console.log(document.querySelectorAll('input[type="file"]'))
    const files = new FormData();

    idFile = 0
    Array.from(document.querySelectorAll('input[type="file"]')).forEach(element => {
        files.append(++idFile, element.files[0]);
    });

    fetch('http://localhost/GerenciadorDeVendas/app.php?rota=produto&acao=cadastrarImg', {
        method: "POST",
        body: files
    })

})









