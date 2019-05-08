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
            name: "Входящих звонков",
            analytics: analytics.calls.counts.incomes
          },
          {
            name: "Исходящих звонков",
            analytics: analytics.calls.counts.outcomes
          },
          {
            name: "Всего звонков",
            analytics: analytics.calls.counts.total
          },
          {
            name: "Среднее время телефонного разговора",
            analytics: (analytics.calls.durations.averageInSeconds / 60).toFixed(2)
          },
          {
            name: "Максимальное время телефонного разговора",
            analytics: analytics.calls.durations.maxInSeconds
          },
          {
            name: 'Длительность в статусе "на линии" в среднем за рабочий день',
            analytics: (analytics.calls.durations.onLineAverageInSeconds / 60).toFixed(2)
          },
          {
            name: 'Количество созданных вопросов через Манго',
            analytics: analytics.questions.createdCounts.fromMango
          },
          {
            name: 'Количество созданных вопросов через Систему',
            analytics: analytics.questions.createdCounts.fromSystem
          },
          {
            name: 'Средняя оценка',
            analytics: Number(analytics.questions.marks.average).toFixed(2)
          },
          {
            name: 'Оценок "1"',
            analytics: analytics.questions.marks.counts.units
          },
          {
            name: 'Оценок "2"',
            analytics: analytics.questions.marks.counts.twos
          },
          {
            name: 'Оценок "3"',
            analytics: analytics.questions.marks.counts.threes
          },
          {
            name: 'Оценок "4"',
            analytics: analytics.questions.marks.counts.fours
          },
          {
            name: 'Оценок "5"',
            analytics: analytics.questions.marks.counts.fives
          },
          {
            name: 'Разрешенных вопросов клиентом',
            analytics: analytics.questions.resolvedCounts.byClient
          },
          {
            name: 'Разрешенных вопросов оператором',
            analytics: analytics.questions.resolvedCounts.byOperator
          },
          {
            name: 'Всего разрешенных вопросов',
            analytics: analytics.questions.resolvedCounts.total
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

