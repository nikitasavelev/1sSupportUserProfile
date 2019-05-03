<template>
    <table
        rules="rows"
        cellspacing="5"
    >
        <thead>
            <th v-for="(header, index) in headers"
                :key="index"
                :colspan="header.isEmpty ? 1 : 3"
                align="center">
                <v-text-field
                    v-if="!header.isEmpty"
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
                    {{operator.targetKpi[0].callsAverageDuration}}
                </td>
                <td align="center">
                    {{operator.kpi.calls.durations.onLinePerDayAverage}}
                </td>
                <td align="center" class="right-border">
                    0
                </td>

                <td align="center">
                    {{operator.targetKpi[0].onLinePerDayAverageDuration}}
                </td>
                <td align="center">
                    {{operator.kpi.calls.durations.average}}
                </td>
                <td align="center" class="right-border">
                    0
                </td>

                <td align="center">
                    {{operator.targetKpi[0].questionsAverageMark}}
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
    data(){
        return {
            headers: [
                {
                    isEmpty: true,
                    label: ""
                },
                {
                    isEmpty: true,
                    label: ""
                },
                {
                    isEmpty: false,
                    label: "KPI по времени на линии"
                },
                {
                    isEmpty: false,
                    label: "KPI по времени на звонка"
                },
                {
                    isEmpty: false,
                    label: "KPI по оценке"
                },
            ],
            operators:[]
        }
    },
    async mounted(){
        const analytics = await UsersService.getOperatorsAnalytics();
        this.operators = analytics.operators;
    }
}
</script>

<style scoped>
    table {
        empty-cells: show;
    }
    .right-border{
        border-right: 1px solid gray;
    }
</style>
