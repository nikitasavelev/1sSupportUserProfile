<template>
    <div>
        <average-mark class="ml-5 mt-5" :marks="marks"/>
        <average-call-time class="average-call-time ml-5" :average-call-time="averageCallTime"/>
        <average-online-time-per-day  />
        <all-calls-count :all-calls-count="allCallsCount"/>
        <incident-count :incident-count="incidentCount"/>
    </div>
</template>

<script>
import AverageMark from "Components/KPI/AverageMark";
import AverageCallTime from "Components/KPI//AverageCallTime";
import AverageOnlineTimePerDay from "Components/KPI/AverageOnlineTimePerDay";
import AllCallsCount from "Components/KPI/AllCallsCount";
import IncidentCount from "Components/KPI/IncidentCount";

export default {
    name: "GraphicalOperatorAnalytics",
    props: {analytics: Object},
    components: {AverageMark, AverageCallTime, AverageOnlineTimePerDay, AllCallsCount, IncidentCount},
    data(){
        return {
            marks: {},
            averageCallTime: "",
            allCallsCount: {},
            incidentCount: {},
        }
    },
    mounted(){
        this.marks = this.analytics.kpi.questions.marks;
        this.averageCallTime = this.analytics.kpi.calls.durations.average;
        this.allCallsCount = this.analytics.kpi.calls.counts;
        this.incidentCount = this.analytics.kpi.questions.createdCounts;
    }
}
</script>
