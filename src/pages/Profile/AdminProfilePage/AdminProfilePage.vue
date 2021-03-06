<template>
    <v-container @click="arePickersShown = !arePickersShown" align-center>
        <hr>
        <date-pickers
          :are-pickers-shown="arePickersShown"
          @update:fromDate="fromDate = $event"
          @update:toDate="toDate = $event"
          :maximumDate="new Date().toISOString().substr(0, 10)"
          />
        <hr>
        <table-info/>
        <v-container align-center justify-center class="pr-3">
          <table
              rules="rows"
              cellspacing="5"
              style="margin: auto"
          >
            <thead>
              <th v-for="header in headers" :key="header" class="pa-3">{{header}}</th>
            </thead>
            <tbody v-if="operatorsAnalytics">
              <table-for-operator-analytics
                v-for="operator in operatorsAnalytics"
                :info="operator"
                :key="operator.operatorId"
                :min-max-values="minMaxValues"
                :fromDate="fromDate"
                :toDate="toDate"
              />

              <table-for-operator-analytics
                :info="averageAnalytics"
                :min-max-values="minMaxValues"
              />
            </tbody>
          </table>
        </v-container>
        <v-layout v-if="!isLoaded" justify-center mt-5>
              <v-progress-circular
                :size="70"
                :width="7"
                color="primary"
                indeterminate
              />
            </v-layout>
    </v-container>
</template>
<script>
import DatePickers from "Components/DatePickers";
import UsersService from "Services/UsersService";
import TableForOperatorAnalytics from "./TableForOperatorAnalytics";
import TableInfo from "./TableInfo";
import { calculateAnalytics } from "Constants/COMMON_METHODS.js";
import formatDate from "Constants/COMMON_METHODS.js";

export default {
  name: "AdminProfilePage",
  components: { DatePickers, TableForOperatorAnalytics, TableInfo },
  data() {
    return {
      fromDate: formatDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)),
      toDate: formatDate(new Date()),
      arePickersShown: false,
      headers: [
        "ФИО Агента",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10"
      ],
      operatorsAnalytics: [],
      isLoaded: false,
      minMaxValues: {},
      averageAnalytics: {}
    };
  },
  async mounted() {
    await this.getOperatorsAnalytics();
  },
  methods: {
    async getOperatorsAnalytics(fromDate, toDate) {
      this.isLoaded = false;
      const response = await UsersService.getOperatorsAnalytics(
        fromDate,
        toDate
      );
      this.operatorsAnalytics = response.operators;
      this.isLoaded = true;
      calculateAnalytics(this.operatorsAnalytics);
      this.calculateMinMaxAverageStats(this.operatorsAnalytics);
      this.averageAnalytics = this.calculateAverageAnalytics();
      this.averageAnalytics.caption = "Средний показатель";
    },
    calculateMinMaxAverageStats(analytics) {
      this.initMinMaxValues(this.minMaxValues);
      analytics.forEach(operator => {
        const [valuesAndPaths, propertyNames] = this.initValuesAndPropertyNames(
          operator
        );
        valuesAndPaths.forEach((value, index) => {
          this.updateMinMaxValue(
            value,
            this.minMaxValues,
            propertyNames[index]
          );
        });
      });
    },
    updateMinMaxValue(propertyValue, minMaxValues, minMaxValuesPath) {
      if (propertyValue > minMaxValues[minMaxValuesPath].max) {
        minMaxValues[minMaxValuesPath].max = propertyValue;
      }
      if (propertyValue < minMaxValues[minMaxValuesPath].min) {
        minMaxValues[minMaxValuesPath].min = propertyValue;
      }
    },
    initMinMaxValues(minMaxValues = {}) {
      [
        "fromMango",
        "fromSystem",
        "averageInSeconds",
        "maxInSeconds",
        "onLineAverageInSeconds",
        "resolvedCountsTotal",
        "total",
        "incomes",
        "outcomes",
        "averageMark"
      ].forEach(valuePath => {
        minMaxValues[valuePath] = {
          min: Number.MAX_SAFE_INTEGER,
          max: -1
        };
      });
    },
    initValuesAndPropertyNames(operator) {
      const valuesAndPaths = [
        operator.calculatedKPI.questions.createdCounts.fromMango,
        operator.calculatedKPI.questions.createdCounts.fromSystem,
        operator.calculatedKPI.calls.durations.averageInSeconds,
        operator.calculatedKPI.calls.durations.maxInSeconds,
        operator.calculatedKPI.calls.durations.onLineAverageInSeconds,
        operator.calculatedKPI.questions.resolvedCounts.total,
        operator.calculatedKPI.calls.counts.total,
        operator.calculatedKPI.calls.counts.incomes,
        operator.calculatedKPI.calls.counts.outcomes,
        operator.calculatedKPI.questions.marks.average
      ];
      const propertyNames = [
        "fromMango",
        "fromSystem",
        "averageInSeconds",
        "maxInSeconds",
        "onLineAverageInSeconds",
        "resolvedCountsTotal",
        "total",
        "incomes",
        "outcomes",
        "averageMark"
      ];
      return [valuesAndPaths, propertyNames];
    },
    calculateAverageAnalytics() {
      let averageValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.operatorsAnalytics.forEach(operator => {
        const [valuesAndPaths, propertyNames] = this.initValuesAndPropertyNames(
          operator
        );
        valuesAndPaths.forEach((value, index) => {
          averageValues[index] += value;
        });
      });
      averageValues = averageValues.map(averageValue => {
        return averageValue / this.operatorsAnalytics.length;
      });
      return {
        calculatedKPI: {
          questions: {
            createdCounts: {
              fromMango: averageValues[0],
              fromSystem: averageValues[1]
            },
            resolvedCounts: {
              total: averageValues[5]
            },
            marks: {
              average: averageValues[9]
            }
          },
          calls: {
            durations: {
              averageInSeconds: averageValues[2],
              maxInSeconds: averageValues[3],
              onLineAverageInSeconds: averageValues[4]
            },
            counts: {
              total: averageValues[6],
              incomes: averageValues[8],
              outcomes: averageValues[7]
            }
          }
        }
      };
    }
  },
  watch: {
    fromDate(value) {
      this.getOperatorsAnalytics(this.fromDate, this.toDate);
    },
    toDate(value) {
      this.getOperatorsAnalytics(this.fromDate, this.toDate);
    }
  }
};
</script>

<style scoped>
hr {
  height: 0.1px;
  background-color: black;
}
</style>
