<template>
    <v-container class="wrapper pb-0 px-5 pt-3">
        <div
            v-for="(i,index) in info"
            class="width-50"
            :key="i"
            >
            {{index+1}} - {{i}}
        </div>
    </v-container>
</template>
<script>
export default {
  name: "TableInfo",
  data() {
    return {
      info: [
        "Количество обращений через Манго",
        "Количество обращений через Систему",
        "Среднее время на звонок",
        "Максимальное время разговора",
        'Длительность в статусе "на линии" в среднем за рабочий день',
        "Закрытых обращений в системе",
        "Всего Количество звонков",
        "Исходящих звонков",
        "Входящих звонков",
        "Средняя оценка"
      ]
    };
  }
};
</script>

<style scoped>

.wrapper{
    width: 100%;
}
.width-50 {
  display: inline-block;  
  width: 40%;
  margin-left: 10%; 
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
