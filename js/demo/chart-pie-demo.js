// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Area 1", "Area 2", "Area 3", "Area 4", "Area 5", "Area 6", "Area 7", "Area 8", "Area 9", "Area 10",
    "Area 11", "Area 12", "Area 13", "Area 14", "Area 15", "Area 16", "Area 17", "Area 18", "Area 19", "Area 20",
    "Area 21", "Area 22", "Area 23"],
    datasets: [{
      data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#cc8636', '#cc3636', '#BDCC36FF', '#7ACC36FF', '#36CC4AFF', '#36CCA9FF', '#5236CCFF', '#A236CCFF', '#CC3686FF', '#CC3652FF', '#9B0F0FFF', '#9B630FFF', '#969B0FFF', '#D50000',
'#18FFFF', '#64FFDA', '#B2FF59', '#E6EE9C', '#CE93D8', '#009688'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
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
      display: false
    },
    cutoutPercentage: 80,
  },
});

const chart_area_text = document.getElementById("chart-areas-text");

let labels = myPieChart.data.labels;
let colors = myPieChart.data.datasets[0].backgroundColor;

for(i in labels) {
  const row = document.createElement('span');
  row.classList.add("mr-2")
  row.innerHTML = ` <i class="fas fa-circle" style="color: ${colors[i]}"></i> ${labels[i]}`
  chart_area_text.appendChild(row);
}