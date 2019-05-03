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
       @update:dateFrom="dateFrom = $event"
       @update:dateTo="dateTo = $event">
      </date-pickers>
      <hr>
      <graphical-operator-analytics
       v-if="showGraphs"
       :analytics="operatorAnalytics"/>
      <operator-analytics
        v-else
        :analytics="operatorAnalytics.kpi"/>
        
    </v-container>
</template>
<script>
import UsersService from "Services/UsersService.js";
import DatePickers from "Components/DatePickers";
import OperatorAnalytics from "./OperatorAnalytics";
import GraphicalOperatorAnalytics from "./GraphicalOperatorAnalytics";

export default {
  name: "OperatorProfilePage",
  props: {},
  components: { DatePickers, OperatorAnalytics, GraphicalOperatorAnalytics },
  data() {
    return {
      operatorAnalytics: {},
      roleType: 0,
      dateFrom: "",
      dateTo: "",
      arePickersShown: false,
      showGraphs: false,
    };
  },
  methods: {},
  async mounted() {
    this.operatorAnalytics = await UsersService.getMyAnalytics();
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
