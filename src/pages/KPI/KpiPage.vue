<template>
    <div>
        <average-mark class="ml-5 mt-5"/>
        <average-call-time class="average-call-time ml-5" :average-call-time="'2'"/>
        <average-online-time-per-day />
        <all-calls-count/>
        <incident-count/>
    </div>
</template>

<script>
import AverageMark from "./AverageMark";
import AverageCallTime from "./AverageCallTime";
import AverageOnlineTimePerDay from "./AverageOnlineTimePerDay";
import AllCallsCount from "./AllCallsCount";
import IncidentCount from "./IncidentCount";
export default {
    name: "KpiPage",
    components: {AverageMark, AverageCallTime, AverageOnlineTimePerDay, AllCallsCount, IncidentCount}
}
</script>

<style scoped>
.average-call-time{
    max-width: 50vw;
}
</style>
