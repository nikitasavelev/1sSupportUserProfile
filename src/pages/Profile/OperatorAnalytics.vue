<template>
    <v-layout column class="px-5 py-2">
        <div>
          <span>Закрытых заявок</span>
          <span class="right">{{analytics.resolvedQuestionsCount}}</span>
        </div>
        <div>
          <span>Принятых звонков</span>
          <span class="right">{{analytics.incomeCallsCount}}</span>
        </div>
        <div>
          <span>Общее время разговоров</span>
          <span class="right">{{analytics.allCallDuration}}</span>
        </div>
        <div>
          <span>Средняя оценка</span>
          <span class="right">{{analytics.averageMark}}</span>
        </div>
        <div>
          <span>Среднее время телефонного разговора</span>
          <span class="right">{{analytics.averageCallDuration}}</span>
        </div>
        <div>
          <span>Среднее время закрытия заявки</span>
          <span class="right">{{analytics.averageResolvedQuestionsTimeDuration}}</span>
        </div>
        <div>
          <span>Время в статусе "Свободен"</span>
          <span class="right">{{analytics.timeInFreeState}}</span>
        </div>
        <div>
          <span>Время в статусе "Занят"</span>
          <span class="right">{{analytics.timeInBusyState}}</span>
        </div>
      </v-layout>
</template>
<script>
export default {
  name: "OperatorAnalytics",
  props: { analytics: Object }
};
</script>
<style scoped>
.right {
  float: right;
}
</style>

