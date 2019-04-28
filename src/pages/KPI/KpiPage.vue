<template>
    <div>
        <average-mark class="ml-5 mt-5"/>
        <average-call-time class="average-call-time ml-5" :average-call-time="'2'"/>
        <average-online-time-per-day />
    </div>
</template>

<script>
import AverageMark from "./AverageMark";
import AverageCallTime from "./AverageCallTime";
import AverageOnlineTimePerDay from "./AverageOnlineTimePerDay"
export default {
    name: "KpiPage",
    components: {AverageMark, AverageCallTime, AverageOnlineTimePerDay}
}
</script>

<style scoped>
.average-call-time{
    max-width: 50vw;
}
</style>
