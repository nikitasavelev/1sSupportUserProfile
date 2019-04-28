<template>
    <tr v-if="info">
        <td class="pa-3">{{info.caption}}</td>
        <td class="pa-3">{{analytics.resolvedQuestionsCount}}</td>
        <td class="pa-3">{{analytics.incomeCallsCount}}</td>
        <td class="pa-3">{{analytics.allCallDuration}}</td> 
        <td class="pa-3">{{analytics.averageMark}}</td> 
        <td class="pa-3">{{analytics.averageCallDuration}}</td> 
        <td class="pa-3">{{analytics.averageResolvedQuestionsTimeDuration}}</td> 
        <td class="pa-3">{{analytics.timeInFreeState}}</td> 
        <td class="pa-3">{{analytics.timeInBusyState}}</td>                                 
    </tr>
</template>

<script>
export default {
    name: "TableForOperatorAnalytics",
    props: {info: Object},
    created() {
        this.analytics = this.info.analytics ? this.info.analytics : this.info;
    },
    watch: {
        info() {
            this.analytics = this.info.analytics ? this.info.analytics : this.info;
        }
    }
}
</script>
