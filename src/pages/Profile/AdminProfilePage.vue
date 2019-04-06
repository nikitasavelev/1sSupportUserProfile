<template>
    <v-container @click="arePickersShown = !arePickersShown">
        <hr>
        <date-pickers
            :are-pickers-shown="arePickersShown"
            @update:dateFrom="dateFrom = $event"
            @update:dateTo="dateTo = $event">
        </date-pickers>
        <hr>
        <table class="data-table"
            rules="rows"
            cellspacing="5">
            <thead>
                <th v-for="header in headers" :key="header" class="pa-3">{{header}}</th>
            </thead>
            <tbody v-if="operatorsAnalytics">
                <tr v-for="operator in operatorsAnalytics" :key="operator.firstName">
                  <td class="pa-3">{{operator.firstName}} {{operator.lastName}} {{operator.secondName}}</td>
                  <td class="pa-3">{{operator.analytics.resolvedQuestionsCount}}</td>
                  <td class="pa-3">{{operator.analytics.incomeCallsCount}}</td>
                  <td class="pa-3">{{operator.analytics.allCallDuration}}</td> 
                  <td class="pa-3">{{operator.analytics.averageMark}}</td> 
                  <td class="pa-3">{{operator.analytics.averageCallDuration}}</td> 
                  <td class="pa-3">{{operator.analytics.averageResolvedQuestionsTimeDuration}}</td> 
                  <td class="pa-3">{{operator.analytics.timeInFreeState}}</td> 
                  <td class="pa-3">{{operator.analytics.timeInBusyState}}</td>                                 
                </tr>
            </tbody>
        </table>
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

export default {
  name: "AdminProfilePage",
  components: { DatePickers },
  data() {
    return {
      dateFrom: "",
      dateTo: "",
      arePickersShown: false,
      headers: ["ФИО Агента", "1", "2", "3", "4", "5", "6", "7", "8"],
      operatorsAnalytics: [],
      isLoaded: false
    };
  },
  async mounted() {
    this.operatorsAnalytics = await UsersService.getOperatorsAnalytics();
    this.operatorsAnalytics = this.operatorsAnalytics.operators;
    this.isLoaded = true;
  }
};
</script>

<style scoped>
hr {
  height: 0.1px;
  background-color: black;
}
.data-table {
}
</style>
