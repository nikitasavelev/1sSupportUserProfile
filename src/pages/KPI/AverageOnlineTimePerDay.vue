<template>
    <div id="chart">
    </div>
</template>
<script>
import {GoogleCharts} from 'google-charts';
export default {
  name: "AverageOnlineTimePerDay",
  props: {averageOnlineTimePerDay : Object},  
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart(){
      GoogleCharts.load(drawVisualization);
      function drawVisualization() {
        // Some raw data (not necessarily accurate)
        const data = google.visualization.arrayToDataTable([
          ['Month', 'Иванов И.И.',  'Целевой показатель', 'Средний показатель'],
          ['01.05.2019',  165,   200, 100],
          ['02.05.2019',  135,   175, 125],
          ['03.05.2019',  157,   150, 150],
          ['04.05.2019',  139,   125, 100],
          ['05.05.2019',  136,   100, 100]
        ]);

        const options = {
          title : 'Длительность в статусе "на линии" в среднем за рабочий день',
          vAxis: {title: 'Время "на линии" в среднем за день'},
          hAxis: {title: 'День'},
          seriesType: 'bars',
          series: {1: {type: 'line'}, 2: {type: 'line'}}  
        };

        const chart = new google.visualization.ComboChart(document.getElementById('chart'));
        chart.draw(data, options);
      }
    }
  },
  watch: {
    averageOnlineTimePerDay(value){
      this.averageOnlineTimePerDay = value;
      this.drawChart();
    }
  }
};
</script>
