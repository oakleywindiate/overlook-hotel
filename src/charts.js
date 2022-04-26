import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const amountSpent = (ctx, value, total) =>    {
  let myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: [`Amount Spent`],
          datasets: [{
              label: 'Amount',
              data: [value, total],
              backgroundColor: [
                  '#1e7898',
                  '#FFF',
              ],
          }]
      },
      options: {
          maintainAspectRatio: false,
          responsive: true,
          cutout: 70,
          borderWidth: 1,
          borderColor: '#000000',
          hoverOffset: 0,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false,
            },
            title: {
              display: false,
              font: {
                size: 20
              },
              text: "Amount",
              color: "#000000",
            }
          }
      }
  });
}


export default Chart;
export {amountSpent}