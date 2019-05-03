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
import AverageMark from "./AverageMark";
import AverageCallTime from "./AverageCallTime";
import AverageOnlineTimePerDay from "./AverageOnlineTimePerDay";
import AllCallsCount from "./AllCallsCount";
import IncidentCount from "./IncidentCount";
import UsersService from "Services/UsersService";

export default {
    name: "KpiPage",
    components: {AverageMark, AverageCallTime, AverageOnlineTimePerDay, AllCallsCount, IncidentCount},
    data(){
        return {
            marks: {},
            averageCallTime: "",
            allCallsCount: {},
            incidentCount: {},
        }
    },
    async mounted(){
        const response = await UsersService.getOperatorAnalytics(this.$route.params.id);
        this.marks = response.kpi.questions.marks;
        this.averageCallTime = response.kpi.calls.durations.average;
        this.allCallsCount = response.kpi.calls.counts;
        this.incidentCount = response.kpi.questions.createdCounts;
    }
}
</script>

<style scoped>
.average-call-time{
    max-width: 50vw;
}
</style>
