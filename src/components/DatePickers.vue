<template>
    <v-layout class="my-2" align-center>
        <span>Выберите период с</span>
        <div class="datepicker-wrapper">
          <label>
            <input
              v-model="localizedFromDateData"
              class="datepicker-input ml-2 pa-1"
              @click="toggleDatePickerFrom"
              name="date from"
              aria-label="start date"
              autocomplete="off"
              readonly
              > 
          </label> 
          <v-date-picker 
            v-model="fromDateData"
            v-if="showDatePickerFrom"
            @input="showDatePickerFrom = false"
            class="datepicker"
            :min="minDate"
            :max="maxDate"            
            >
          </v-date-picker>
        </div>
        <span class="mx-2">по</span>
        <div class="datepicker-wrapper">
          <label>
            <input
              v-model="localizedToDateData"
              class="datepicker-input pa-1"
              @click="toggleDatePickerTo"
              name="date to"
              aria-label="end date"
              autocomplete="off"
              readonly
              > 
          </label> 
          <v-date-picker 
            v-model="toDateData"
            v-if="showDatePickerTo"
            @input="showDatePickerTo = false"
            class="datepicker"
            :min="minDate"
            :max="maxDate"
            >
          </v-date-picker>
        </div>
      </v-layout>
</template>

<script>
import formatDate from 'Constants/COMMON_METHODS.js'
export default {
  name: "DatePickers",
  props: {
    arePickersShown: Boolean,
    fromDate: {
      type: String,
      default: new Date().toISOString().substr(0, 10),
      required: false,
    },
    toDate: {
      type: String,
      default: new Date().toISOString().substr(0, 10),
      required: false,
    },
    minimumDate: {
      type: String,
      default: '0000-01-01',
      required: false,
    },
    maximumDate: {
      type: String,
      default: '2099-01-01',
      required: false
    }
  },
  data() {
    return {
      showDatePickerFrom: false,
      showDatePickerTo: false,
      minDate: this.minimumDate,
      maxDate: this.maximumDate,
      fromDateData: this.fromDate,
      toDateData: this.toDate,
      localizedFromDateData: this.localizeDate(this.fromDate) || this.localizeDate(this.minimumDate),
      localizedToDateData: this.localizeDate(this.toDate) || this.localizeDate(this.maximumDate),
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
    localizeDate(date){
      return formatDate(new Date(date));
    }
  },
  watch: {
    arePickersShown() {
      this.showDatePickerFrom = false;
      this.showDatePickerTo = false;
    },
    fromDateData() {
      this.$emit("update:fromDate", this.fromDateData);
      this.localizedFromDateData = this.localizeDate(this.fromDateData);
    },
    toDateData() {
      this.$emit("update:toDate", this.toDateData);
      this.localizedToDateData = this.localizeDate(this.toDateData);
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
  z-index: 1;
}

.datepicker-wrapper {
  position: relative;
}
</style>
