<template>
    <div id="chart">
    </div>
</template>
<script>
import { GoogleCharts } from "google-charts";
export default {
  name: "AverageOnlineTimePerDay",
  props: { averageOnlineTimePerDay: Object },
  data() {
    return {
      days: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      targetKPI: 0
    };
  },
  mounted() {
    if (this.averageOnlineTimePerDay.kpiForPeriod) {
      this.calculatePeriods();
      this.calculateTargetKPI();
    }
  },
  methods: {
    drawChart() {
        GoogleCharts.load(drawVisualization);
        const self = this;
        function drawVisualization() {
          // Some raw data (not necessarily accurate)
          const data = google.visualization.arrayToDataTable([
            ["Month", "Иванов И.И.", "Целевой показатель", "Средний показатель"],
            [
              "01.05.2019",
              self.days[0],
              self.targetKPI,
              self.averageOnlineTimePerDay.onlineAverage
            ],
            [
              "02.05.2019",
              self.days[1],
              self.targetKPI,
              self.averageOnlineTimePerDay.onlineAverage
            ],
            [
              "03.05.2019",
              self.days[2],
              self.targetKPI,
              self.averageOnlineTimePerDay.onlineAverage
            ],
            [
              "04.05.2019",
              self.days[3],
              self.targetKPI,
              self.averageOnlineTimePerDay.onlineAverage
            ],
            [
              "01.05.2019",
              self.days[4],
              self.targetKPI,
              self.averageOnlineTimePerDay.onlineAverage
            ],
            [
              "02.05.2019",
              self.days[5],
              self.targetKPI,
              self.averageOnlineTimePerDay.onlineAverage
            ],
            [
              "03.05.2019",
              self.days[6],
              self.targetKPI,
              self.averageOnlineTimePerDay.onlineAverage
            ],
            [
              "04.05.2019",
              self.days[7],
              self.targetKPI,
              self.averageOnlineTimePerDay.onlineAverage
            ],
            [
              "01.05.2019",
              self.days[8],
              self.targetKPI,
              self.averageOnlineTimePerDay.onlineAverage
            ],
            [
              "02.05.2019",
              self.days[9],
              self.targetKPI,
              self.averageOnlineTimePerDay.onlineAverage
            ]
          ]);

          const options = {
            title: 'Длительность в статусе "на линии" в среднем за рабочий день',
            vAxis: { title: 'Время "на линии" в среднем за день' },
            hAxis: { title: "День" },
            seriesType: "bars",
            series: { 1: { type: "line" }, 2: { type: "line" } }
          };

          const chart = new google.visualization.ComboChart(
            document.getElementById("chart")
          );
          chart.draw(data, options);
        }
    },
    calculatePeriods() {
      let period = 0;
      let daysInCurrentPeriod = 0;
      // 10 bars for graph
      const daysAmountInPeriod =
        (this.averageOnlineTimePerDay.kpiForPeriod.length - 1) / 10;
      this.averageOnlineTimePerDay.kpiForPeriod.forEach(day => {
        this.days[period] += day.calls.durations.onLineAverageInSeconds;
        daysInCurrentPeriod += 1;
        if (daysInCurrentPeriod > daysAmountInPeriod) {
          period += 1;
          daysInCurrentPeriod = 0;
        }
      });
      this.days = this.days.map(period => {
        return Number((period / daysAmountInPeriod / 60).toFixed(2));
      });
    },
    calculateTargetKPI() {
      let totalDays = 0;
      const sumOfKPI = this.averageOnlineTimePerDay.targetKPI.reduce(
        (targetKPI, current, index) => {
          if (index === 0) return targetKPI;
          const daysAmount =
            (new Date(current.toDate) - new Date(current.fromDate)) /
            1000 /
            60 /
            60 /
            24;
          totalDays += daysAmount;
          return targetKPI + current.onLinePerDayAverageDurationInSeconds * daysAmount;
        },
        0
      );
      this.targetKPI = sumOfKPI / totalDays / 60;
    }
  },
  watch: {
    averageOnlineTimePerDay(value) {
      this.averageOnlineTimePerDay = value;
      this.drawChart();
      if (this.averageOnlineTimePerDay.kpiForPeriod) {
        this.calculatePeriods();
        this.calculateTargetKPI();
      }
    }
  }
};
</script>
