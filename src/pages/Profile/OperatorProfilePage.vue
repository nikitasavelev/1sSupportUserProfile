<template>
    <v-container @click="arePickersShown = !arePickersShown">
      <div>{{operatorAnalytics.lastName}} {{operatorAnalytics.firstName}} {{operatorAnalytics.secondName}}</div>
      <hr>
      <date-pickers
       :are-pickers-shown="arePickersShown"
       @update:dateFrom="dateFrom = $event"
       @update:dateTo="dateTo = $event">
      </date-pickers>
      <hr>
      <operator-analytics :analytics="operatorAnalytics.analytics"></operator-analytics>
    </v-container>
</template>
<script>
import UsersService from "Services/UsersService.js";
import DatePickers from "Components/DatePickers";
import OperatorAnalytics from "./OperatorAnalytics";

export default {
  name: "OperatorProfilePage",
  props: {},
  components: { DatePickers, OperatorAnalytics },
  data() {
    return {
      operatorAnalytics: {},
      role: "",
      dateFrom: "",
      dateTo: "",
      arePickersShown: false
    };
  },
  methods: {},
  async mounted() {
    this.operatorAnalytics = await UsersService.getOperatorAnalytics();
  }
};
</script>
<style scoped>
hr {
  height: 0.1px;
  background-color: black;
}

.v-input__slot {
  margin: 0 !important;
  padding: 0 !important;
}

.datepicker {
  width: 6rem;
  border: 1px solid #ccc;
}
</style>
