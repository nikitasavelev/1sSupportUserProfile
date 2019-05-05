<template>
    <div>
        <average-mark class="ml-5 mt-5" :marks="marks"/>
        <average-call-time class="average-call-time ml-5" :average-call-time="averageCallTime"/>
        <average-online-time-per-day :average-online-time-per-day="averageOnlineTimePerDay"/>
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
            averageCallTime: 0,
            allCallsCount: {},
            incidentCount: {},
            averageOnlineTimePerDay: {},
        }
    },
    mounted() {
       this.setParams();
    },
    methods: {
        setParams(){
            this.marks = this.analytics.calculatedKPI.questions.marks;
            this.averageCallTime = Number(this.analytics.calculatedKPI.calls.durations.averageInSeconds);  
            this.allCallsCount = this.analytics.calculatedKPI.calls.counts;
            this.incidentCount = this.analytics.calculatedKPI.questions.createdCounts;
            this.averageOnlineTimePerDay = {
                targetKPI: this.analytics.targetKpi,
                onlineAverage: this.analytics.calculatedKPI.calls.durations.onLineAverageInSeconds / 60,
                kpiForPeriod: this.analytics.kpi
            }
        }
    },
    watch: {
        analytics(){
            this.setParams();
        }
    }

}
</script>
