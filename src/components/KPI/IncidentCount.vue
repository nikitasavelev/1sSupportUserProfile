<template>
    <div 
      v-if="hasDataToShow()"
      style="width: 700px; height: 300px;"
      id="incident_count"
    >        
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
  name:"IncidentCount",
  props: {incidentCount : Object}, 
  mounted() {
    if (this.hasDataToShow()) {
      this.drawChart();
    }
  },
  methods: {
    hasDataToShow(){
      // includes NaN check
      return (this.incidentCount.fromMango + this.incidentCount.fromSystem !== 0) &&
        this.incidentCount.fromMango != null &&
        this.incidentCount.fromSystem != null
    },
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
      if (this.hasDataToShow()) {
        this.drawChart();
      }
    }
  }
}
</script>