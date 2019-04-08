<template>
    <v-layout class="my-2" align-center>
        <span>Выберите период с</span>
        <div class="datepicker-wrapper">
          <label>
            <input
              v-model="dateFrom"
              class="datepicker-input ml-2 pa-1"
              @click="toggleDatePickerFrom"
              name="date from"
              aria-label="start date"
              > 
          </label> 
          <v-date-picker 
            v-model="dateFrom"
            v-if="showDatePickerFrom"
            @input="showDatePickerFrom = false"
            class="datepicker"            
            >
          </v-date-picker>
        </div>
        <span class="mx-2">по</span>
        <div class="datepicker-wrapper">
          <label>
            <input
              v-model="dateTo"
              class="datepicker-input pa-1"
              @click="toggleDatePickerTo"
              name="date to"
              aria-label="end date"
              > 
          </label> 
          <v-date-picker 
            v-model="dateTo"
            v-if="showDatePickerTo"
            @input="showDatePickerTo = false"
            class="datepicker"
            >
          </v-date-picker>
        </div>
      </v-layout>
</template>

<script>
export default {
  name: "DatePickers",
  props: {
    arePickersShown: Boolean
  },
  data() {
    return {
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
    }
  },
  watch: {
    arePickersShown() {
      this.showDatePickerFrom = false;
      this.showDatePickerTo = false;
    },
    dateFrom() {
      this.$emit("update:dateFrom", this.dateFrom);
    },
    dateTo() {
      this.$emit("update:dateTo", this.dateTo);
    }
  }
};
</script>

<style scoped>
.datepicker-input {
  width: 6rem;
  border: 1px solid #ccc;
}

.datepicker {
  position: absolute;
  top: 35px;
  left: 5px;
}

.datepicker-wrapper {
  position: relative;
}
</style>
