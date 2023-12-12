
document.getElementById('top').addEventListener('click', ()=>{
    fetch('http://localhost/GerenciadorDeVendas/app.php?rota=teste&acao=xTeste', {

    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({a:1, b:2, c:3})
})
.then(resp => Response.json())
.then((resp) => {
    console.log(resp);
})
})



