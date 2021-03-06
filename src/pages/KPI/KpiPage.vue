<template>
    <div @click="arePickersShown = !arePickersShown">
        <v-layout column justify-center align-center>
            <div style="text-align:center; font-size: 2rem;">{{operatorsName}}</div>
            <date-pickers
              :are-pickers-shown="arePickersShown"
              @update:fromDate="fromDate = $event"
              @update:toDate="toDate = $event"
              :fromDate="fromDate"
              :toDate="toDate"
              :maximumDate="new Date().toISOString().substr(0, 10)"
              />
        </v-layout>
        <v-layout class="grid-container" row>            
            <average-mark class="average-mark" :marks="marks"/>
            <average-call-time class="average-call-time" :average-call-time="averageCallTime"/>
            <div class="both-analytics">
                <div class="mt-5 analytics">
                    <div class="analytics-caption">Общее время разговоров</div>
                    <div class="analytics-number mb-5">
                        {{totalCallsDuration.hours}} :
                        {{String(totalCallsDuration.minutes).length == 1 ?
                         `0${totalCallsDuration.minutes}`:
                          totalCallsDuration.minutes
                        }}
                    </div>
                    <div class="analytics-caption">Максимальное время разговоров</div>
                    <div class="analytics-number">
                        {{maxCallTime}} m
                    </div>
                </div>
            </div>
            <average-online-time-per-day
             class="average-online-time-per-day"
             :average-online-time-per-day="averageOnlineTimePerDay" />
            <all-calls-count class="all-calls-count" :all-calls-count="allCallsCount"/>
            <incident-count class="incident-count" :incident-count="incidentCount"/>
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
import { fractionalHoursToIntegerHoursAndMinutes } from "Constants/COMMON_METHODS.js";
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
      fromDate: new Date().toISOString().substr(0, 10),
      toDate: new Date().toISOString().substr(0, 10),
      arePickersShown: false
    };
  },
  created() {
    this.fromDate =
      this.$route.params.fromDate || new Date().toISOString().substr(0, 10);
    this.toDate =
      this.$route.params.toDate || new Date().toISOString().substr(0, 10);
    this.fractionalHoursToIntegerHoursAndMinutes = fractionalHoursToIntegerHoursAndMinutes;
  },
  async mounted() {
    this.drawGraphs();
  },
  methods: {
    async drawGraphs(fromDate, toDate) {
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

@media screen and (min-width:1450px) {
  .grid-container {
    display: grid;
    grid-template-rows: auto;
    grid-template-areas:
      "average_mark average_mark average_call_time average_call_time analytics analytics"
      "average_online_time_per_day average_online_time_per_day average_online_time_per_day average_online_time_per_day     average_online_time_per_day average_online_time_per_day"
      "all_calls_count all_calls_count all_calls_count all_incident_count all_incident_count all_incident_count";
  }
}

@media (min-width: 360px) and (max-width: 1449px) {
  .grid-container {
    display: grid;
    grid-template-rows: auto;
    grid-template-areas:
      "average_mark average_call_time "
      "analytics analytics"
      "average_online_time_per_day average_online_time_per_day"
      "all_calls_count all_incident_count";
  }
  .both-analytics {
    place-self: center;
  }
  .average-call-time {
    place-self: center;
  }
  .average-mark {
    place-self: center;
  }
}

.average-mark {
  grid-area: average_mark;
}

.average-call-time {
  grid-area: average_call_time;
}

.both-analytics {
  grid-area: analytics;
}

.average-online-time-per-day {
  grid-area: average_online_time_per_day;
}

.all-calls-count {
  grid-area: all_calls_count;
}

.incident-count {
  grid-area: all_incident_count;
}
</style>
