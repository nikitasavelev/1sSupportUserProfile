<template>
    <div id="average_call_time">        
    </div>
</template>

<script>
import { GoogleCharts } from "google-charts";
export default {
  name: "AverageCallTime",
  props: { averageCallTime: String },
  mounted() {
    GoogleCharts.load(drawChart, {packages: ["gauge"]});

    function drawChart() {
      const data = google.visualization.arrayToDataTable([
        ["Время", "Значение"],
        ["Время", 13]
      ]);

      const options = {
        width: 500,
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
};
</script>

<style scoped>

</style>