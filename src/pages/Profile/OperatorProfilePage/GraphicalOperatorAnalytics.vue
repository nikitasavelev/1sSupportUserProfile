<template>
    <div>
        <v-layout row>
            <average-mark :marks="marks"/>
            <average-call-time class="average-call-time mt-5" :average-call-time="averageCallTime"/>
            <v-layout column>
                <div class="mt-5 analytics">
                    <div class="analytics-caption">Общее время разговоров</div>
                    <div class="analytics-number mb-5">
                        {{totalCallsDuration.hours}} h
                        {{totalCallsDuration.minutes}} m
                    </div>
                    <div class="analytics-caption">Максимальное время разговоров</div>
                    <div class="analytics-number">
                        {{maxCallTime}} m
                    </div>
                </div>
                <div></div>
            </v-layout>
        </v-layout>
        <average-online-time-per-day :average-online-time-per-day="averageOnlineTimePerDay" />
        <v-layout row align-center justify-center>
            <all-calls-count :all-calls-count="allCallsCount"/>
            <incident-count :incident-count="incidentCount"/>
        </v-layout>
    </div>
</template>

<script>
import AverageMark from "Components/KPI/AverageMark";
import AverageCallTime from "Components/KPI/AverageCallTime";
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
            totalCallsDuration: 0,
            maxCallTime: 0,
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
            const totalCallsDurationInSeconds = (this.averageCallTime * this.allCallsCount.total);
            const totalCallsDurationHours = Math.floor(totalCallsDurationInSeconds / 60 / 60);
            const totalCallsDurationMinutes = (totalCallsDurationInSeconds - (totalCallsDurationHours * 3600)) / 60;
            this.totalCallsDuration = {
                hours: totalCallsDurationHours,
                minutes: Math.floor(totalCallsDurationMinutes)
            }
            this.maxCallTime = Math.floor(this.analytics.calculatedKPI.calls.durations.maxInSeconds / 60);
        }
    },
    watch: {
        analytics(){
            this.setParams();
        }
    }

}
</script>

<style scoped>
.analytics-caption{
    font-size: 1.2rem;
    text-align: center;
}
.analytics-number{
    font-size: 1.6rem;
    text-align: center;
}
.analytics{
    margin-right: 1rem;
}
</style>
