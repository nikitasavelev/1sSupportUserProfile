<template>
  <div 
    id="all_calls_count"
    v-if="allCallsCount.total > 0"
    style="height: 300px;">
  </div>
  <v-container
    v-else
    class="text-xs-center"
    >
      Нет данных за этот период
  </v-container>
</template>

<script>
import { GoogleCharts } from "google-charts";
export default {
  name:"AllCallsCount",
  props: {allCallsCount : Object},
  mounted() {
    if (this.allCallsCount.total > 0){
      this.drawChart();
    }
    window.addEventListener('resize', this.drawChart)
  },
  beforeDestroy(){
    window.removeEventListener('resize', this.drawChart);
  },
  methods: {
    drawChart(){
      GoogleCharts.load(drawChart);
      const total = this.allCallsCount.total;
      const income = this.allCallsCount.incomes;
      const outcome = this.allCallsCount.outcomes;
      function drawChart() {
        const data = google.visualization.arrayToDataTable([
          ["Тип звонка", "Количество"],
          ["Исходящие", income],
          ["Входящие", outcome],
        ]);

        const options = {
          title: `Общее количество звонков ${total}`,
          is3D: true,
          pieSliceText:"value",
          legend: {
            alignment: 'center'
          },
          width: ((window.innerWidth - 50)/2).toString()
        };

        const chart = new google.visualization.PieChart(
          document.getElementById("all_calls_count")
        );
        chart.draw(data, options);
      }
    }
  },
  watch: {
    allCallsCount(value){
      this.allCallsCount = value;
      if (this.allCallsCount.total > 0){
        this.drawChart();
      }
    }
  }
}
</script>