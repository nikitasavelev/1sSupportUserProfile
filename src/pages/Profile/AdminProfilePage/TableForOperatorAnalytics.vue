<template>
    <tr v-if="info && hasDataToShow()">
        <td class="pa-3">
            <router-link
                v-if="info.caption !== 'Средний показатель'" 
                :to="{
                  name: 'KpiPage',
                  params: {id: String(employeeId), fromDate, toDate}
                }">
                {{info.caption}}
            </router-link>
            <span v-else>{{info.caption}}</span>
        </td>
        <td class="pa-3"
          :class="moreBetter(analytics.questions.createdCounts.fromMango, minMaxValues.fromMango)"
        >
          {{analytics.questions.createdCounts.fromMango.toFixed(2)}}
        </td>

        <td class="pa-3"
         :class="moreBetter(analytics.questions.createdCounts.fromSystem, minMaxValues.fromSystem)"
        >
          {{analytics.questions.createdCounts.fromSystem.toFixed(2)}}
        </td>

        <td class="pa-3"
          :class="lessBetter((analytics.calls.durations.averageInSeconds), minMaxValues.averageInSeconds)"
        >
          {{fractionalHoursToIntegerHoursAndMinutes((analytics.calls.durations.averageInSeconds/60).toFixed(2))}}
        </td>

        <td class="pa-3"
          :class="lessBetter((analytics.calls.durations.maxInSeconds), minMaxValues.maxInSeconds)"
        >
          {{fractionalHoursToIntegerHoursAndMinutes((analytics.calls.durations.maxInSeconds/60).toFixed(2))}}
        </td> 

        <td class="pa-3"
          :class="lessBetter((analytics.calls.durations.onLineAverageInSeconds), minMaxValues.onLineAverageInSeconds)"
        >
          {{fractionalHoursToIntegerHoursAndMinutes((analytics.calls.durations.onLineAverageInSeconds/60).toFixed(2))}}
        </td> 

        <td class="pa-3"
          :class="moreBetter(analytics.questions.resolvedCounts.total, minMaxValues.resolvedCountsTotal)"
        >
          {{analytics.questions.resolvedCounts.total.toFixed(2)}}
        </td>

        <td class="pa-3"
        :class="moreBetter(analytics.calls.counts.total, minMaxValues.total)"
        >
          {{analytics.calls.counts.total.toFixed(2)}}
        </td> 

        <td class="pa-3"
          :class="moreBetter(analytics.calls.counts.incomes, minMaxValues.incomes)"
        >
          {{analytics.calls.counts.incomes.toFixed(2)}}
        </td> 

        <td class="pa-3"
          :class="moreBetter(analytics.calls.counts.outcomes, minMaxValues.outcomes)"
        >
          {{analytics.calls.counts.outcomes.toFixed(2)}}
        </td> 

        <td class="pa-3"
          :class="moreBetter(analytics.questions.marks.average, minMaxValues.averageMark)"
        >
          {{analytics.questions.marks.average.toFixed(2)}}
        </td>                                   
    </tr>
</template>

<script>
import { fractionalHoursToIntegerHoursAndMinutes } from "Constants/COMMON_METHODS.js";
export default {
  name: "TableForOperatorAnalytics",
  props: {
    info: Object,
    minMaxValues: Object,
    fromDate: {
      type: String,
      default: new Date().toISOString().substr(0, 10),
      required: false
    },
    toDate: {
      type: String,
      default: new Date().toISOString().substr(0, 10),
      required: false
    }
  },
  data() {
    return {
      employeeId: ""
    };
  },
  created() {
    this.analytics = this.info.calculatedKPI
      ? this.info.calculatedKPI
      : this.info;
    this.employeeId = this.info.employeeId;
    // analytics for operator and it's not empty
    if (Array.isArray(this.analytics) && this.analytics.length > 0) {
      // calculate here
      this.analytics = this.analytics[0];
    }
    this.fractionalHoursToIntegerHoursAndMinutes = fractionalHoursToIntegerHoursAndMinutes;
  },
  watch: {
    info() {
      this.analytics = this.info.calculatedKPI
        ? this.info.calculatedKPI
        : this.info;
      this.employeeId = this.info.employeeId;
    }
  },
  methods: {
    hasDataToShow() {
      if (
        this.analytics.calls &&
        this.analytics.questions &&
        this.minMaxValues
      ) {
        if (Array.isArray(this.analytics)) {
          return this.analytics.length > 0;
        } else {
          return true;
        }
      }
      return false;
    },
    moreBetter(value, minMaxValue) {
      return {
        best:
          this.minMaxValues != null &&
          Number(value.toFixed(2)) === Number(minMaxValue.max.toFixed(2)),
        worst:
          this.minMaxValues != null &&
          Number(value.toFixed(2)) === Number(minMaxValue.min.toFixed(2))
      };
    },
    lessBetter(value, minMaxValue) {
      return {
        best:
          this.minMaxValues != null &&
          Number(value.toFixed(2)) === Number(minMaxValue.min.toFixed(2)),
        worst:
          this.minMaxValues != null &&
          Number(value.toFixed(2)) === Number(minMaxValue.max.toFixed(2))
      };
    }
  }
};
</script>

<style scoped>
.best {
  color: forestgreen;
}
.worst {
  color: brown;
}
</style>

