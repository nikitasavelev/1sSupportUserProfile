<template>
    <v-container @click="hideDatePickers">
      <div>Иванов Иван Иванович</div>
      <hr>
      <v-layout class="my-2" align-center>
        <span>Выберите период с</span>
        <div>
          <input
            v-model="dateFrom"
            class="datepicker ml-2 pa-1"
            @click="toggleDatePickerFrom"
            >  
          <v-date-picker 
            v-model="dateFrom"
            v-if="showDatePickerFrom"
            @input="showDatePickerFrom = false"
            style="position: absolute;"
            >
          </v-date-picker>
        </div>
        <span class="mx-2">по</span>
        <div>
          <input
            v-model="dateTo"
            class="datepicker pa-1"
            @click="toggleDatePickerTo"
            >  
          <v-date-picker 
            v-model="dateTo"
            v-if="showDatePickerTo"
            @input="showDatePickerTo = false"
            style="position: absolute;"
            >
          </v-date-picker>
        </div>
      </v-layout>
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

export default {
  name: "OperatorProfilePage",
  props: {},
  components: {},
  data() {
    return {
      profileData: {},
      role: "",
      showDatePickerFrom: false,
      showDatePickerTo: false,
      dateFrom: new Date().toISOString().substr(0, 10),
      dateTo: new Date().toISOString().substr(0, 10)
    };
  },
  methods: {
    toggleDatePickerFrom(event) {
      event.stopPropagation();
      this.showDatePickerFrom = !this.showDatePickerFrom;
      this.showDatePickerTo = false;
    },
    toggleDatePickerTo(event) {
      event.stopPropagation();
      this.showDatePickerTo = !this.showDatePickerTo;
      this.showDatePickerFrom = false;
    },
    hideDatePickers() {
      this.showDatePickerFrom = false;
      this.showDatePickerTo = false;
    }
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
