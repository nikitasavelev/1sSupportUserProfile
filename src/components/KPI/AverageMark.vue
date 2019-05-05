<template>
  <div 
    class="average-mark-wrapper" style="width: 700px; height: 500px;"
    v-if="marks.average !== 0"
  >
    <div id="average_mark" style="width: 700px; height: 500px;">
    </div>
    <div class="average-mark">{{this.marks.average}}</div>
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
  name: "AverageMark",
  props: {
    marks: {}
  },
  mounted() {
    if (this.marks.average !== 0 && this.marks.average != null){
      this.marks.average = this.marks.average.toFixed(2)
      this.drawChart();
    }
  },
  methods: {
    drawChart() {
      GoogleCharts.load(draw);
      const self = this;
      function draw() {
        const data = google.visualization.arrayToDataTable([
          ["Task", "Hours per Day"],
          ["Единиц", self.marks.counts.units],
          ["Двоек", self.marks.counts.twos],
          ["Троек", self.marks.counts.threes],
          ["Четверок", self.marks.counts.fours],
          ["Пятерок", self.marks.counts.fives]
        ]);

        const options = {
          title: "Полученные оценки",
          pieHole: 0.5,
          pieSliceText: "value",
          fontSize: 22,
          fontName: 'Open Sans',
          titleTextStyle: {
            bold: false,
            color: '#2c3e50'

          }
        };

        const chart = new google.visualization.PieChart(
          document.getElementById("average_mark")
        );
        chart.draw(data, options);
      }
    }
  },
  watch: {
    marks(value) {
      this.marks = value;
      if (this.marks.average !== 0 && this.marks.average != null){
        this.marks.average = this.marks.average.toFixed(2)
        this.drawChart();
      }
    }
  }
};
</script>

<style scoped>
.average-mark-wrapper {
  position: relative;
}
.average-mark {
  position: absolute;
  top: 45%;
  left: 33.5%;
  font-size: 2rem;
}
</style>
