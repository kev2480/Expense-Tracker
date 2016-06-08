var $           = require('jquery');
var Chart       = require('chart.js');

export default class PieChart {
  constructor(chart, expenses) {
    this.$chart = chart;
    this.expenses = expenses;
    this.buildData();
    this.buildPie();
  }

  buildData() {

    let titles = this.expenses.pluck('title');
    let colors = this.expenses.pluck('color');
    let amounts = this.expenses.pluck('amount');

  //  console.log(titles + " " + colors + " " + amounts);

    this.data = {
      labels: titles,
      datasets: [
          {
              data: amounts,
              backgroundColor: colors,
              hoverBackgroundColor: colors
          }]
    };
  }

  buildPie() {
    this.myPieChart = new Chart(this.$chart,{
        type: 'pie',
        data: this.data,
        //options: options
    });
  }

  destroyPie(){
    this.myPieChart.destroy();
  }

  //Figure out what is meant by VM25278 bundle.js:33176 Uncaught TypeError: Cannot read property 'custom' of undefined
  updatePie(expenses)
  {
    this.expenses = expenses;
    let titles = this.expenses.pluck('title');
    let colors = this.expenses.pluck('color');
    let amounts = this.expenses.pluck('amount');

    this.myPieChart.data.labels = titles;
    this.myPieChart.data.datasets.data = amounts;
    this.myPieChart.data.datasets.backgroundColor = colors;
    this.myPieChart.data.datasets.hoverBackgroundColor = colors;

    this.myPieChart.update();
  }

}
