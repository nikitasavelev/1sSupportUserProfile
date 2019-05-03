<template>
    <table
        rules="rows"
        cellspacing="5"
    >
        <thead>
            <th colspan="2">
                <v-btn
                 class="save-kpi btn ml-0 pa-1 px-3 text-capitalize"
                 @click="saveKpi">
                    Сохранить установленные KPI
                </v-btn>
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
                <td></td>
                <td></td>
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
                    {{operator.targetKpi[0] ?  operator.targetKpi[0].callsAverageDuration : 0}}
                </td>
                <td align="center">
                    {{operator.kpi.calls.durations.onLinePerDayAverage}}
                </td>
                <td align="center" class="right-border">
                    0
                </td>

                <td align="center">
                    {{operator.targetKpi[0] ? operator.targetKpi[0].onLinePerDayAverageDuration : 0}}
                </td>
                <td align="center">
                    {{operator.kpi.calls.durations.average}}
                </td>
                <td align="center" class="right-border">
                    0
                </td>

                <td align="center">
                    {{operator.targetKpi[0] ? operator.targetKpi[0].questionsAverageMark : 0}}
                </td> 
                <td align="center">
                    {{operator.kpi.questions.marks.average}}
                </td>
                <td align="center">
                    0
                </td>               
            </tr>
        </tbody>
    </table>
</template>

<script>
import UsersService from "Services/UsersService";
export default {
  name: "SetKpiPage",
  data() {
    return {
      headers: [
        {
            ref: "timeOnline",
            label: "KPI по времени на линии",
            kpiType: 1,
        },
        {
            ref: "callDuration",
            label:"KPI по времени на звонка",
            kpiType: 2,
        },
        {
            ref: "averageMark",
            label:"KPI по оценке",
            kpiType: 3,
        }
      ],
      operators: []
    };
  },
  async mounted() {
    const analytics = await UsersService.getOperatorsAnalytics();
    this.operators = analytics.operators;
    this.operators.forEach(operator => {
      operator.isChecked = false;
    });
  },
  methods: {
    async saveKpi(){
        const operatorsIds = this.operators.reduce((ids, operator) => {
            return operator.isChecked ? ids.concat(operator.employeeId) : ids;
        },[]);
        for (const input of this.headers) {
            if (this.hasText(input.ref)) {
                await UsersService.setKpi(
                    input.kpiType,
                    Number(this.$refs[input.ref][0].lazyValue),
                    operatorsIds
                )
            }
        }
    },
    hasText(ref){
        return this.$refs[ref][0].lazyValue && this.$refs[ref][0].lazyValue.length > 0;
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
