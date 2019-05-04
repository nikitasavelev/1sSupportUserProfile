<template>
    <tr v-if="info && hasDataToShow()">
        <td class="pa-3">
            <router-link
                v-if="info.caption !== 'Средний показатель'" 
                :to="{
                  name: 'KpiPage',
                  params: {id: String(employeeId)}
                }">
                {{info.caption}}
            </router-link>
            <span v-else>{{info.caption}}</span>
        </td>
        <td class="pa-3">{{analytics.questions.createdCounts.fromMango.toFixed(2)}}</td>
        <td class="pa-3">{{analytics.questions.createdCounts.fromSystem.toFixed(2)}}</td>
        <td class="pa-3">{{(analytics.calls.durations.averageInSeconds/60).toFixed(2)}}</td>
        <td class="pa-3">{{(analytics.calls.durations.maxInSeconds/60).toFixed(2)}}</td> 
        <td class="pa-3">{{(analytics.calls.durations.onLineAverageInSeconds/60).toFixed(2)}}</td> 
        <td class="pa-3">{{analytics.questions.resolvedCounts.total.toFixed(2)}}</td> 
        <td class="pa-3">{{analytics.calls.counts.total.toFixed(2)}}</td> 
        <td class="pa-3">{{analytics.calls.counts.incomes.toFixed(2)}}</td> 
        <td class="pa-3">{{analytics.calls.counts.outcomes.toFixed(2)}}</td> 
        <td class="pa-3">{{analytics.questions.marks.average.toFixed(2)}}</td>                                   
    </tr>
</template>

<script>
export default {
  name: "TableForOperatorAnalytics",
  props: { info: Object },
  data() {
    return {
      employeeId: ""
    };
  },
  created(){
    this.analytics = this.info.calculatedKPI ? this.info.calculatedKPI : this.info;
    this.employeeId = this.info.employeeId;
    // analytics for operator and it's not empty
    if (Array.isArray(this.analytics) && this.analytics.length > 0) {
      // calculate here
      this.analytics = this.analytics[0]
    }
  },
  watch: {
    info(){
      this.analytics = this.info.calculatedKPI ? this.info.calculatedKPI : this.info;
      this.employeeId = this.info.employeeId;
    }
  },
  methods: {
    hasDataToShow() {
      if (this.analytics.calls && this.analytics.questions){
        if (Array.isArray(this.analytics)) {
          return this.analytics.length > 0;
        } else {
          return true;
        }
      }
      return false;
    }
  }
};
</script>
