<template>
    <div>
        <average-mark class="ml-5 mt-5" :marks="marks"/>
        <average-call-time class="average-call-time ml-5" :average-call-time="averageCallTime"/>
        <average-online-time-per-day :average-online-time-per-day="averageOnlineTimePerDay" />
        <all-calls-count :all-calls-count="allCallsCount"/>
        <incident-count :incident-count="incidentCount"/>
    </div>
</template>

<script>
import AverageMark from "Components/KPI/AverageMark";
import AverageCallTime from "Components/KPI/AverageCallTime";
import AverageOnlineTimePerDay from "Components/KPI/AverageOnlineTimePerDay";
import AllCallsCount from "Components/KPI/AllCallsCount";
import IncidentCount from "Components/KPI/IncidentCount";
import UsersService from "Services/UsersService";
import {calculateAnalytics} from "Constants/COMMON_METHODS.js";

export default {
    name: "KpiPage",
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
    async mounted(){
        const response = await UsersService.getOperatorAnalytics(this.$route.params.id);
        calculateAnalytics([response]);
        this.marks = response.calculatedKPI.questions.marks;
        this.averageCallTime = Number(response.calculatedKPI.calls.durations.averageInSeconds);  
        this.allCallsCount = response.calculatedKPI.calls.counts;
        this.incidentCount = response.calculatedKPI.questions.createdCounts;
        this.averageOnlineTimePerDay = {
            targetKPI: response.targetKpi,
            onlineAverage: response.calculatedKPI.calls.durations.onLineAverageInSeconds / 60,
            kpiForPeriod: response.kpi
        }
    }
}
</script>

<style scoped>
.average-call-time{
    max-width: 50vw;
}
</style>
