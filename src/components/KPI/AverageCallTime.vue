<template>
    <div
      v-if="Number(averageCallTime) !== 0"
      class="average-call-time-wrapper"
      >
      <div class="average-call-time-caption">Среднее время разговора</div>
      <div
        id="average_call_time"
      >        
      </div>
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
  name: "AverageCallTime",
  props: { averageCallTime: Number },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart(){
      if (Number(this.averageCallTime) !== 0) {
        GoogleCharts.load(drawChart, {packages: ["gauge"]});
        const averageTime = Number(this.averageCallTime);
        function drawChart() {
          const data = google.visualization.arrayToDataTable([
            ["Время", "Значение"],
            ["Время", averageTime / 60]
          ]);

          const options = {
            width: 400,
            height: 300,
            redFrom: 15,
            redTo: 10,
            yellowFrom: 10,
            yellowTo: 5,
            greenFrom:5,
            greenTo: 0,
            minorTicks: 5,
            min: 15,
            max: 0
          };

          const chart = new google.visualization.Gauge(
            document.getElementById("average_call_time")
          );
          chart.draw(data, options);
        }
      }
    }
  },
  watch: {
      averageCallTime(value) {
        this.drawChart();
      }
  }
};
</script>

<style scoped>
.average-call-time-caption{
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}
.average-call-time-wrapper{
  position: relative;
  left: -7rem;
}
</style>