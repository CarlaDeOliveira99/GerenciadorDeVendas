document.getElementById('btnSair').addEventListener('click', function () {
    fetch('http://localhost/GerenciadorDeVendas/app.php?rota=user&acao=sairSession', {
        method: "GET",
    })
        .then(res => res.text())
        .then(res => JSON.parse(res))
        .then(res => {
            console.log(res);
            if (res != "sessãoAtiva") {
                window.location = res;
                this.style.backgroundColor = "green"
            }{
                this.style.backgroundColor = "red"
            }
        });
})
