window.onload = function () {
    validarSeTaLogado();
}

function validarSeTaLogado() {
    fetch('http://localhost/app.php?rota=user&acao=validarSeTaLogado', {
        method: "GET",
    })
        .then(res => res.json())
        .then((res) => {
            window.location = res[0]
        });
    estoqueCirculo()
}


function estoqueCirculo() {
    const autocolors = window['chartjs-plugin-autocolors'];
    Chart.register(autocolors);

    // const data = dadosDoEstoque();
    // const dados = 

    const ctx = document.getElementById('grafico1').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["azul", "amarelo", "preto"],/*data,*/
            datasets: [{
                data: [2, 3, 5] /* dados,*/
            }]
        },
        options: {
            plugins: {
                autocolors: {
                    mode: 'data'
                }
            },
            maintainAspectRatio: false,

            animation: {
                duration: 1000,
                easing: "easeInQuint",
            },
            // scales: {
            //   y: {
            //     stacked: true,
            //     grid: {
            //       display: true,
            //     }
            //   },
            //   x: {
            //     grid: {
            //       display: false
            //     }
            //   }
            // }
        }
    });
}

function estoqueLinha() {
    const autocolors = window['chartjs-plugin-autocolors'];
    Chart.register(autocolors);

    // const data = dadosDoEstoque();
    // const dados = 

    const ctx = document.getElementById('grafico2').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data,
            datasets: [{
                label: 'Quantidade de Frutas',
                data: dados,
            }]
        },
        options: {


            animations: {
                tension: {
                    duration: 5000,
                    easing: 'linear',
                    from: 1,
                    to: 0,
                    loop: false
                }
            },
            plugins: {
                autocolors: {
                    mode: 'data'
                }
            },
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}






function dadosDoEstoqueGeral() {
    fetch('http://localhost/app.php?rota=dashboard&acao=estoqueGeral', {
        headers: {
            'content-Type': 'application/json'
        },
        method: "GET",
    })
        .then(resposta => resposta.json())
        .then(resposta => {
            console.log(resposta);
        })
}






