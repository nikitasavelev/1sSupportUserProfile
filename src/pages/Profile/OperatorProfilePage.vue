<template>
    <v-container @click="arePickersShown = !arePickersShown">
      <div>Иванов Иван Иванович</div>
      <hr>
      <date-pickers
       :are-pickers-shown="arePickersShown"
       @update:dateFrom="dateFrom = $event"
       @update:dateTo="dateTo = $event">
      </date-pickers>
      <hr>
      <v-layout column class="px-5 py-2">
        <div>
          <span>Закрытых заявок</span>
          <span class="right">10000000</span>
        </div>
        <div>
          <span>Принятых звонков</span>
          <span class="right">0</span>
        </div>
        <div>
          <span>Общее время разговоров</span>
          <span class="right">00:00:00</span>
        </div>
        <div>
          <span>Средняя оценка</span>
          <span class="right">5,0</span>
        </div>
        <div>
          <span>Среднее время телефонного разговора</span>
          <span class="right">00:00</span>
        </div>
        <div>
          <span>Среднее время закрытия заявки</span>
          <span class="right">15:00</span>
        </div>
        <div>
          <span>Время в статусе "Свободен"</span>
          <span class="right">00:30:32</span>
        </div>
        <div>
          <span>Время в статусе "Занят"</span>
          <span class="right">119:29:28</span>
        </div>
      </v-layout>
    </v-container>
</template>
<script>
import UsersService from "Services/UsersService.js";
import DatePickers from "Components/DatePickers";

export default {
  name: "OperatorProfilePage",
  props: {},
  components: { DatePickers },
  data() {
    return {
      profileData: {},
      role: "",
      dateFrom: "",
      dateTo: "",
      arePickersShown: false,
    };
  },
  methods: {
  },
  async mounted() {
    this.profileData = await UsersService.getUserInfo();
  }
};
</script>
<style scoped>
hr {
  height: 0.1px;
  background-color: black;
}

.v-input__slot {
  margin: 0 !important;
  padding: 0 !important;
}

.datepicker {
  width: 6rem;
  border: 1px solid #ccc;
}

.right {
  float: right;
}
</style>
