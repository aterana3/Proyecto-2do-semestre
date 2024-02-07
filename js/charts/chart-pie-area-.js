$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://sga.unemi.edu.ec/api?a=apitotaltiporevista",
        success: function(data){
            tipo = (Object.keys(data))
            valor = (Object.values(data))
            crearGraficaAreas(tipo, valor)
        }
    })

});
function crearGraficaAreas(tipo, valor) {
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: tipo,
            datasets: [{
                data: valor,
                backgroundColor: ['#4e73df', '#1cc88a',],
                hoverBackgroundColor: ['#2e59d9', '#17a673',],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
            },
            legend: {
                display: true
            },
            cutoutPercentage: 80,
        },
    });
}
