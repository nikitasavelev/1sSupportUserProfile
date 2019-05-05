<template>
    <v-layout class="my-2" align-center>
        <span>Выберите период с</span>
        <div class="datepicker-wrapper">
          <label>
            <input
              v-model="fromDate"
              class="datepicker-input ml-2 pa-1"
              @click="toggleDatePickerFrom"
              name="date from"
              aria-label="start date"
              > 
          </label> 
          <v-date-picker 
            v-model="fromDate"
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
              v-model="toDate"
              class="datepicker-input pa-1"
              @click="toggleDatePickerTo"
              name="date to"
              aria-label="end date"
              > 
          </label> 
          <v-date-picker 
            v-model="toDate"
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
      fromDate: new Date(Date.now() - 1000*60*60*24*7).toISOString().substr(0, 10),
      toDate: new Date().toISOString().substr(0, 10)
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
    fromDate() {
      this.$emit("update:fromDate", this.fromDate);
    },
    toDate() {
      this.$emit("update:toDate", this.toDate);
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
