<template>
    <div id="all_calls_count">        
    </div>
</template>

<script>
import { GoogleCharts } from "google-charts";
export default {
    name:"AllCallsCount",
    mounted() {
    GoogleCharts.load(drawChart);
    const number = 13;
    function drawChart() {
      const data = google.visualization.arrayToDataTable([
        ["Тип звонка", "Количество"],
        ["Исходящие", 11],
        ["Входящие", 2],
      ]);

      const options = {
        title: `Общее количество звонков ${number}`,
        is3D: true,
        pieSliceText:"value",
        legend: {
          alignment: 'center'
        }
      };

      const chart = new google.visualization.PieChart(
        document.getElementById("all_calls_count")
      );
      chart.draw(data, options);
    }
  }
}
</script>