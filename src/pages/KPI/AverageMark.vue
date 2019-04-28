<template>
  <div class="average-mark-wrapper" style="width: 700px; height: 500px;">
    <div id="average_mark" style="width: 700px; height: 500px;">
    </div>
    <div class="average-mark">3.5</div>
  </div>
</template>

<script>
import { GoogleCharts } from "google-charts";
export default {
  name: "AverageMark",
  mounted() {
    GoogleCharts.load(drawChart);
    function drawChart() {
      const data = google.visualization.arrayToDataTable([
        ["Task", "Hours per Day"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7]
      ]);

      const options = {
        title: "My Daily Activities",
        pieHole: 0.5,
        pieSliceText:"value"
      };

      const chart = new google.visualization.PieChart(
        document.getElementById("average_mark")
      );
      chart.draw(data, options);
    }
  }
};
</script>

<style scoped>
.average-mark-wrapper{
  position:relative;
}
.average-mark {
  position: absolute;
  top: 45%;
  left: 35%;
  font-size: 2rem;
}
</style>
