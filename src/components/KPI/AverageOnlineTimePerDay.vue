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
      dates: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
      targetKPI: 0,
      barsAmount: 0,
      daysAmountInPeriod: 0
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
        const daysStats = [];
        for (let i = 0; i < self.barsAmount; i++) {
          const [startDateForPeriod, endDateForPeriod] = self.getNextDate(i);
          daysStats.push([
            `с ${startDateForPeriod.toLocaleDateString()}\nпо
            ${endDateForPeriod.toLocaleDateString()}`,
            self.days[i],
            self.targetKPI,
            self.averageOnlineTimePerDay.onlineAverage
          ]);
        }
        if (daysStats.length !== 0) {
          const data = google.visualization.arrayToDataTable([
            ["Month", "Иванов И.И.", "Целевой показатель", "Средний показатель"],
            ...daysStats
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
      }
    },
    getNextDate(index) {
      const maxDays = 9 * this.daysAmountInPeriod;
      let dayIndex = index * this.daysAmountInPeriod + 1;
      //dayIndex += dayIndex === maxDays ? 0 : 1;
      const startDateForPeriod =
        new Date(
          this.averageOnlineTimePerDay.kpiForPeriod[dayIndex].date
        ).getTime();
      const endDateForPeriod =
        startDateForPeriod +
        1000 * 60 * 60 * 24 * (this.daysAmountInPeriod - 1);
      return [new Date(startDateForPeriod), new Date(endDateForPeriod)];
    },
    calculatePeriods() {
      let period = 0;
      let daysInCurrentPeriod = 0;
      // 10 bars for graph is max
      this.barsAmount =
        this.averageOnlineTimePerDay.kpiForPeriod.length - 1 > 10
          ? 10
          : this.averageOnlineTimePerDay.kpiForPeriod.length - 1;
      this.daysAmountInPeriod = Math.floor(
        (this.averageOnlineTimePerDay.kpiForPeriod.length - 1) / this.barsAmount
      );
      this.averageOnlineTimePerDay.kpiForPeriod.forEach((day, index) => {
        // first day is always 1st January 1970th, so skip it
        if (index !== 0) {
          if (daysInCurrentPeriod >= this.daysAmountInPeriod) {
            period += 1;
            daysInCurrentPeriod = 0;
          }
          this.days[period] += day.calls.durations.onLineAverageInSeconds;
          daysInCurrentPeriod += 1;
        }
      });
      this.days = this.days.map(period => {
        return Number((period / this.daysAmountInPeriod / 60).toFixed(2));
      });
      this.days = this.days[0] !== this.days[0] ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : this.days;
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
          return (
            targetKPI +
            current.onLinePerDayAverageDurationInSeconds * daysAmount
          );
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
