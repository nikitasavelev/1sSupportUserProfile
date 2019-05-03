<template>
    <tr v-if="info && analytics.calls && analytics.questions">
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
    data(){
        return {
            employeeId: ""
        }
    },
    created() {
        this.analytics = this.info.kpi ? this.info.kpi : this.info;
        this.employeeId = this.info.employeeId;
    },
    watch: {
        info() {
            this.analytics = this.info.kpi ? this.info.kpi : this.info;
            this.employeeId = this.info.employeeId;
        }
    }
}
</script>
