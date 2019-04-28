<template>
    <v-layout v-if="analytics" column class="px-5 py-2">
      <div v-for="param in parameters" :key="param.name">
        <span>{{param.name}}</span>
        <span class="right">{{param.analytics}}</span>
      </div>
    </v-layout>
    <v-layout v-else justify-center mt-5>
        <v-progress-circular
            :size="70"
            :width="7"
            color="primary"
            indeterminate
            ></v-progress-circular>
    </v-layout>
</template>
<script>
import UsersService from "Services/UsersService.js";

export default {
  name: "OperatorAnalytics",
  props: { analytics: Object },
  data(){
    return {
      parameters:[]
    }
  },
  created() {
    this.setParameters(this.analytics);
  },
  watch: {
    analytics(value) {
      this.setParameters(value)
    },
  },
  methods:{
    setParameters(analytics){
      if (analytics) {
        this.parameters = [
          {
            name: "Закрытых заявок",
            analytics: analytics.resolvedQuestionsCount
          },
          {
            name: "Принятых звонков",
            analytics: analytics.incomeCallsCount
          },
          {
            name: "Общее время разговоров",
            analytics: analytics.allCallDuration
          },
          {
            name: "Средняя оценка",
            analytics: analytics.averageMark
          },
          {
            name: "Среднее время телефонного разговора",
            analytics: analytics.averageCallDuration
          },
          {
            name: "Среднее время закрытия заявки",
            analytics: analytics.averageResolvedQuestionsTimeDuration
          },
          {
            name: 'Время в статусе "Свободен"',
            analytics: analytics.timeInFreeState
          },
          {
            name: 'Время в статусе "Занят"',
            analytics: analytics.timeInBusyState
          },
        ];
      }
    }
  }
};
</script>
<style scoped>
.right {
  float: right;
}
</style>

