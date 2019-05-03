<template>
    <tr v-if="info">
        <td class="pa-3">{{info.caption}}</td>
        <td class="pa-3">{{analytics.questions.createdCounts.fromMango}}</td>
        <td class="pa-3">{{analytics.questions.createdCounts.fromSystem}}</td>
        <td class="pa-3">{{analytics.calls.durations.perDayAverage}}</td>
        <td class="pa-3">{{analytics.calls.durations.average}}</td>
        <td class="pa-3">{{analytics.calls.durations.max}}</td> 
        <td class="pa-3">{{analytics.calls.durations.onLinePerDayAverage}}</td> 
        <td class="pa-3">{{analytics.questions.resolvedCounts.total}}</td> 
        <td class="pa-3">{{analytics.calls.counts.total}}</td> 
        <td class="pa-3">{{analytics.calls.counts.incomes}}</td> 
        <td class="pa-3">{{analytics.calls.counts.outcomes}}</td> 
        <td class="pa-3">{{analytics.questions.marks.average}}</td>                                   
    </tr>
</template>

<script>
export default {
    name: "TableForOperatorAnalytics",
    props: {info: Object},
    created() {
        this.analytics = this.info.kpi ? this.info.kpi : this.info;
    },
    watch: {
        info() {
            this.analytics = this.info.kpi ? this.info.kpi : this.info;
        }
    }
}
</script>
