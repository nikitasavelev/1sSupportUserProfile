<template>
    <div id="incident_count">        
    </div>
</template>

<script>
import { GoogleCharts } from "google-charts";
export default {
  name:"IncidentCount",
  props: {incidentCount : Object}, 
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      GoogleCharts.load(drawChart);    
      const fromMango = this.incidentCount.fromMango;
      const fromSystem = this.incidentCount.fromSystem
      const total = fromSystem + fromMango;
      function drawChart() {
        const data = google.visualization.arrayToDataTable([
          ["Тип звонка", "Количество"],
          ["Через систему", fromSystem],
          ["Через Манго", fromMango],
        ]);

        const options = {
          title: `Общее количество обращений ${total}`,
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
  },
  watch: {
    incidentCount(value){
      this.incidentCount = value;
      this.drawChart();
    }
  }
}
</script>