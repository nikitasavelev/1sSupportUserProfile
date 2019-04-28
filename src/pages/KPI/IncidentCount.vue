<template>
    <div id="incident_count">        
    </div>
</template>

<script>
import { GoogleCharts } from "google-charts";
export default {
    name:"IncidentCount",
    mounted() {
    GoogleCharts.load(drawChart);
    const number = 35;
    function drawChart() {
      const data = google.visualization.arrayToDataTable([
        ["Тип звонка", "Количество"],
        ["Через систему", 21],
        ["Через Манго", 14],
      ]);

      const options = {
        title: `Общее количество обращений ${number}`,
        is3D: true,
        pieSliceText:"value",
        legend: {
          alignment: 'center'
        }
      };

      const chart = new google.visualization.PieChart(
        document.getElementById("incident_count")
      );
      chart.draw(data, options);
    }
  }
}
</script>