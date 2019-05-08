<template>
    <div @click="arePickersShown = !arePickersShown">
        <v-layout column justify-center align-center>
            <div style="text-align:center; font-size: 2rem;">{{operatorsName}}</div>
            <date-pickers
                :are-pickers-shown="arePickersShown"
                @update:fromDate="fromDate = $event"
                @update:toDate="toDate = $event">
            </date-pickers>
        </v-layout>
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
import UsersService from "Services/UsersService";
import { calculateAnalytics } from "Constants/COMMON_METHODS.js";
import DatePickers from "Components/DatePickers";
export default {
  name: "KpiPage",
  components: {
    AverageMark,
    AverageCallTime,
    AverageOnlineTimePerDay,
    AllCallsCount,
    IncidentCount,
    DatePickers
  },
  data() {
    return {
      marks: {},
      averageCallTime: 0,
      allCallsCount: {},
      incidentCount: {},
      averageOnlineTimePerDay: {},
      totalCallsDuration: 0,
      maxCallTime: 0,
      operatorsName: "",
      fromDate: "",
      toDate: "",
      arePickersShown: false,
    };
  },
  async mounted() {
    this.drawGraphs();
  },
  methods: {
    async drawGraphs(fromDate, toDate){
        const response = await UsersService.getOperatorAnalytics(
            this.$route.params.id,
            fromDate,
            toDate
        );
        calculateAnalytics([response]);
        this.operatorsName = `${response.lastName} ${response.firstName} ${
        response.secondName
        }`;
        this.marks = response.calculatedKPI.questions.marks;
        this.averageCallTime = Number(
        response.calculatedKPI.calls.durations.averageInSeconds
        );
        this.allCallsCount = response.calculatedKPI.calls.counts;
        this.incidentCount = response.calculatedKPI.questions.createdCounts;
        this.averageOnlineTimePerDay = {
        targetKPI: response.targetKpi,
        onlineAverage:
            response.calculatedKPI.calls.durations.onLineAverageInSeconds / 60,
        kpiForPeriod: response.kpi
        };
        const totalCallsDurationInSeconds =
        this.averageCallTime * this.allCallsCount.total;
        const totalCallsDurationHours = Math.floor(
        totalCallsDurationInSeconds / 60 / 60
        );
        const totalCallsDurationMinutes =
        (totalCallsDurationInSeconds - totalCallsDurationHours * 3600) / 60;
        this.totalCallsDuration = {
        hours: totalCallsDurationHours,
        minutes: Math.floor(totalCallsDurationMinutes)
        };
        this.maxCallTime = Math.floor(
        response.calculatedKPI.calls.durations.maxInSeconds / 60
        );
    }
  },
  watch: {
    fromDate(value) {
      this.drawGraphs(this.fromDate, this.toDate);
    },
    toDate(value) {
      this.drawGraphs(this.fromDate, this.toDate);
    }
  }
};
</script>

<style scoped>
.average-call-time {
  max-width: 50vw;
}
.analytics-caption {
  font-size: 1.2rem;
  text-align: center;
}
.analytics-number {
  font-size: 2.4rem;
  text-align: center;
}
.analytics {
  margin-right: 2rem;
}
</style>
