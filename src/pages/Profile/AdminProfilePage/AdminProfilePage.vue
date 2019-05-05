<template>
    <v-container @click="arePickersShown = !arePickersShown" align-center>
        <hr>
        <date-pickers
            :are-pickers-shown="arePickersShown"
            @update:fromDate="fromDate = $event"
            @update:toDate="toDate = $event">
        </date-pickers>
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
                    :key="operator.employeeId"
                  />

                  <table-for-operator-analytics
                  :info="averageKpi"
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
                ></v-progress-circular>
            </v-layout>
    </v-container>
</template>
<script>
import DatePickers from "Components/DatePickers";
import UsersService from "Services/UsersService";
import TableForOperatorAnalytics from "./TableForOperatorAnalytics";
import TableInfo from "./TableInfo";
import {calculateAnalytics} from "Constants/COMMON_METHODS.js";

export default {
  name: "AdminProfilePage",
  components: { DatePickers, TableForOperatorAnalytics, TableInfo },
  data() {
    return {
      fromDate: new Date(Date.now() - 1000*60*60*24*7).toISOString().substr(0, 10),
      toDate: new Date().toISOString().substr(0, 10),
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
      averageKpi: {},
      isLoaded: false
    };
  },
  async mounted() {
    await this.getOperatorsAnalytics();
  },
  methods: {
    async getOperatorsAnalytics(fromDate, toDate) {
      this.isLoaded = false;
      const response = await UsersService.getOperatorsAnalytics(fromDate, toDate);
      this.operatorsAnalytics = response.operators;
      this.averageKpi = response.averageKpi;
      this.isLoaded = true;
      calculateAnalytics(this.operatorsAnalytics);
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
