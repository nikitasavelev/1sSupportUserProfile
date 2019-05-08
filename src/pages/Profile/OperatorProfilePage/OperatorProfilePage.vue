<template>
    <v-container @click="arePickersShown = !arePickersShown">
      <div>
        {{operatorAnalytics.lastName}} {{operatorAnalytics.firstName}} {{operatorAnalytics.secondName}}
        <v-switch v-model="showGraphs"
         :label="`Вид отображения: ${showGraphs ? 'графический' : 'текстовый'}`">
        </v-switch>
      </div>
      <hr>
      <date-pickers
       :are-pickers-shown="arePickersShown"
       @update:fromDate="fromDate = $event"
       @update:toDate="toDate = $event">
      </date-pickers>
      <hr>
      <graphical-operator-analytics
       v-if="showGraphs"
       :analytics="operatorAnalytics"/>

      <operator-analytics
        v-else
        :analytics="operatorAnalytics.calculatedKPI"/>        
    </v-container>
</template>
<script>
import UsersService from "Services/UsersService.js";
import DatePickers from "Components/DatePickers";
import OperatorAnalytics from "./OperatorAnalytics";
import GraphicalOperatorAnalytics from "./GraphicalOperatorAnalytics";
import {calculateAnalytics} from "Constants/COMMON_METHODS.js";

export default {
  name: "OperatorProfilePage",
  props: {},
  components: { DatePickers, OperatorAnalytics, GraphicalOperatorAnalytics },
  data() {
    return {
      operatorAnalytics: {},
      roleType: 0,
      fromDate: "",
      toDate: "",
      arePickersShown: false,
      showGraphs: false,
    };
  },
  methods: {
    async getAnalytics(fromDate, toDate){
      this.operatorAnalytics = await UsersService.getMyAnalytics(fromDate, toDate);
      calculateAnalytics([this.operatorAnalytics]);
    }
  },
  async mounted() {
    this.getAnalytics();
  },
  watch: {
    fromDate(value) {
      this.getAnalytics(this.fromDate, this.toDate);
    },
    toDate(value) {
      this.getAnalytics(this.fromDate, this.toDate);
    }
  }
};
</script>
<style scoped>
hr {
  height: 1px;
  background-color: black;
}

.datepicker {
  width: 6rem;
  border: 1px solid #ccc;
}
</style>
