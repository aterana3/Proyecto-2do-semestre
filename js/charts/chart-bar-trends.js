function crearGraficoTrends(areas, valores) {
    var ctx = document.getElementById("myTrendsAreas");
    var myLineChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: areas,
            datasets: [{
                label: 'Total de areas',
                data: valores,
                fill: false,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(134, 211, 255, 0.2)',
                    'rgba(255, 194, 92, 0.2)',
                    'rgba(197, 255, 92, 0.2)',
                    'rgba(92, 255, 223, 0.2)',
                    'rgba(255, 92, 213, 0.2)',
                    'rgba(92, 150, 255, 0.2)',
                    'rgba(255, 92, 92, 0.2)',
                    'rgba(171, 92, 255, 0.2)',
                    'rgba(92, 255, 92, 0.2)',
                    'rgba(255, 153, 51, 0.2)',
                    'rgba(102, 255, 102, 0.2)',
                    'rgba(255, 0, 127, 0.2)',
                    'rgba(0, 255, 255, 0.2)',
                    'rgba(255, 204, 204, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192)',
                    'rgba(54, 162, 235)',
                    'rgba(153, 102, 255)',
                    'rgba(201, 203, 207)',
                    'rgba(255, 99, 132)',
                    'rgba(134, 211, 255)',
                    'rgba(255, 194, 92)',
                    'rgba(197, 255, 92)',
                    'rgba(92, 255, 223)',
                    'rgba(255, 92, 213)',
                    'rgba(92, 150, 255)',
                    'rgba(255, 92, 92)',
                    'rgba(171, 92, 255)',
                    'rgba(92, 255, 92)',
                    'rgba(255, 153, 51)',
                    'rgba(102, 255, 102)',
                    'rgba(255, 0, 127)',
                    'rgba(0, 255, 255)',
                    'rgba(255, 204, 204)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            }
        }
    })
}

function crearGraficoRanking(nombres, valores) {
    var ctx = document.getElementById("myResearchRanking");
    var myLineChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nombres,
            datasets: [{
                label: "Total de articulos",
                data: valores,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(134, 211, 255, 0.2)',
                    'rgba(255, 194, 92, 0.2)',
                    'rgba(197, 255, 92, 0.2)',
                    'rgba(92, 255, 223, 0.2)',
                    'rgba(255, 92, 213, 0.2)',
                    'rgba(92, 150, 255, 0.2)',
                    'rgba(255, 92, 92, 0.2)',
                    'rgba(171, 92, 255, 0.2)',
                    'rgba(92, 255, 92, 0.2)',
                    'rgba(255, 153, 51, 0.2)',
                    'rgba(102, 255, 102, 0.2)',
                    'rgba(255, 0, 127, 0.2)',
                    'rgba(0, 255, 255, 0.2)',
                    'rgba(255, 204, 204, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192)',
                    'rgba(54, 162, 235)',
                    'rgba(153, 102, 255)',
                    'rgba(201, 203, 207)',
                    'rgba(255, 99, 132)',
                    'rgba(134, 211, 255)',
                    'rgba(255, 194, 92)',
                    'rgba(197, 255, 92)',
                    'rgba(92, 255, 223)',
                    'rgba(255, 92, 213)',
                    'rgba(92, 150, 255)',
                    'rgba(255, 92, 92)',
                    'rgba(171, 92, 255)',
                    'rgba(92, 255, 92)',
                    'rgba(255, 153, 51)',
                    'rgba(102, 255, 102)',
                    'rgba(255, 0, 127)',
                    'rgba(0, 255, 255)',
                    'rgba(255, 204, 204)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            legend: {
                display: false
            }
        },
    });
}

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "https://sga.unemi.edu.ec/api?a=apitotalareapublicacion",
        data: {},
        success: function (data) {
            areas = []
            valores = []
            for (e in data) {
                nombre = data[e]['area'];
                valor = data[e]['totalarticulos'];
                areas.push(nombre);
                valores.push(valor);
            }
            crearGraficoTrends(areas, valores)
        }
    });
    $.ajax({
        type: "GET",
        url: "https://sga.unemi.edu.ec/api?a=apirankingautorespublicacion",
        data: {},
        success: function (data) {
            nombres = []
            valores = []
            data.forEach(element => {
                nombre = element.autor
                valor = element.totalarticulos
                nombres.push(nombre);
                valores.push(valor);
            });
            crearGraficoRanking(nombres, valores)
        }
    });
    $(".preloader").fadeOut();
});