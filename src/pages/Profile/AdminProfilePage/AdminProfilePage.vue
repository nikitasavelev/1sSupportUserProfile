<template>
    <v-container @click="arePickersShown = !arePickersShown" align-center>
        <hr>
        <date-pickers
            :are-pickers-shown="arePickersShown"
            @update:dateFrom="dateFrom = $event"
            @update:dateTo="dateTo = $event">
        </date-pickers>
        <hr>
        <table-info/>
        <v-container align-center class="pr-3">
          <table
              rules="rows"
              cellspacing="5"
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
export default {
  name: "AdminProfilePage",
  components: { DatePickers, TableForOperatorAnalytics, TableInfo },
  data() {
    return {
      dateFrom: "",
      dateTo: "",
      arePickersShown: false,
      headers: ["ФИО Агента", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",],
      operatorsAnalytics: [],
      averageKpi: {},
      isLoaded: false
    };
  },
  async mounted() {
    const response = await UsersService.getOperatorsAnalytics();
    this.operatorsAnalytics = response.operators;
    this.averageKpi = response.averageKpi;
    this.isLoaded = true;
  }
};
</script>

<style scoped>
hr {
  height: 0.1px;
  background-color: black;
}
</style>
