<template>
    <table
        v-if="isLoaded"
        rules="rows"
        cellspacing="5"
        @click="arePickersShown = !arePickersShown"
    >
        <thead>
            <th colspan="2">
                <date-pickers
                    class="pl-3"
                    :are-pickers-shown="arePickersShown"
                    @update:fromDate="fromDate = $event"
                    @update:toDate="toDate = $event"/>
            </th>
            <th v-for="(header, index) in headers"
                :key="index"
                :colspan="3"
                align="center">
                <v-text-field
                    :ref="header.ref"
                    :label="header.label"
                ></v-text-field>                
            </th>
        </thead>
        <tbody>
            <tr> 
                <td align="center" class="pa-2">
                    <v-checkbox
                        v-model="isAllChecked"                        
                    ></v-checkbox>
                </td>               
                <td align="center"
                    >
                    <v-btn
                        class="save-kpi btn ml-0 pa-1 px-3 text-capitalize"
                        @click="saveKpi"
                    >
                        Сохранить установленные KPI
                    </v-btn>
                </td>                
                <template v-for="c in [1,2,3]">
                    <td align="center" class="pa-2">Прошлый KPI</td>
                    <td align="center" class="pa-2">Прошлый результат</td>
                    <td align="center" class="right-border pa-2">Новый KPI</td>
                </template>    
            </tr>
            <tr v-for="operator in operators" :key="operator.employeeId">
                <td class="pa-2">
                    <v-checkbox
                        v-model="operator.isChecked"                        
                    ></v-checkbox>
                </td>
                <td align="center">
                    <router-link :to="{
                        name: 'KpiPage',
                        params: {id: String(operator.employeeId)}
                        }">
                        {{operator.caption}}
                    </router-link>
                </td>

                <td align="center">
                    {{operator.kpi.callsAverageDurationInSeconds.target}}
                </td>
                <td align="center">
                    {{operator.kpi.callsAverageDurationInSeconds.result}}
                </td>
                <td align="center" class="right-border">
                    0
                </td>

                <td align="center">
                    {{operator.kpi.onLinePerDayAverageDurationInSeconds.target}}
                </td>
                <td align="center">
                    {{operator.kpi.onLinePerDayAverageDurationInSeconds.result}}
                </td>
                <td align="center" class="right-border">
                    0
                </td>

                <td align="center">
                    {{operator.kpi.questionsAverageMark.target}}
                </td> 
                <td align="center">
                    {{operator.kpi.questionsAverageMark.result}}
                </td>
                <td align="center">
                    0
                </td>               
            </tr>
        </tbody>
    </table>
    <v-layout v-else justify-center mt-5>
            <v-progress-circular
              :size="70"
              :width="7"
              color="primary"
              indeterminate
              ></v-progress-circular>
          </v-layout>
</template>

<script>
import UsersService from "Services/UsersService";
import DatePickers from "Components/DatePickers";

export default {
  name: "SetKpiPage",
  components: { DatePickers },
  data() {
    return {
      headers: [
        {
          ref: "timeOnline",
          label: "KPI по времени на линии",
          kpiType: 1
        },
        {
          ref: "callDuration",
          label: "KPI по времени на звонка",
          kpiType: 2
        },
        {
          ref: "averageMark",
          label: "KPI по оценке",
          kpiType: 3
        }
      ],
      operators: [],
      isLoaded: false,
      fromDate: new Date().toISOString().substr(0, 10),
      toDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
        .toISOString()
        .substr(0, 10),
      arePickersShown: false,
      isAllChecked: false
    };
  },
  async mounted() {
    const analytics = await UsersService.getPreviousKPI();
    this.isLoaded = true;
    this.operators = analytics.operators;
    this.operators.forEach(operator => {
      operator.isChecked = false;
    });
  },
  methods: {
    async saveKpi() {
      const operatorsIds = this.operators.reduce((ids, operator) => {
        return operator.isChecked ? ids.concat(operator.employeeId) : ids;
      }, []);
      for (const input of this.headers) {
        if (this.hasText(input.ref)) {
          await UsersService.setKpi(
            input.kpiType,
            Number(this.$refs[input.ref][0].lazyValue.replace(",", ".")),
            operatorsIds,
            this.fromDate,
            this.toDate
          );
        }
      }
    },
    hasText(ref) {
      return (
        this.$refs[ref][0].lazyValue && this.$refs[ref][0].lazyValue.length > 0
      );
    }
  },
  watch: {
    isAllChecked() {
      this.operators.forEach(
        operator => (operator.isChecked = this.isAllChecked)
      );
    }
  }
};
</script>

<style scoped>
table {
  empty-cells: show;
}
.right-border {
  border-right: 1px solid gray;
}
.save-kpi.btn.ml-0.pa-1 {
  background-color: #003399;
  color: #fff;
}
</style>
