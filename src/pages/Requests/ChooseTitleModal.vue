<template>
   <v-card>
        <v-layout column justify-center align-center>
        <v-btn
            v-for="title in titles"
            :key="title.id"
            class="title modal mt-1"
            :class="{'active-title': titleId === title.id}"
            @click="setTitle(title.id)"
            >{{title.text}}</v-btn>
        </v-layout>
        <v-divider></v-divider>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            flat
            @click="createQuestion"
        >
            Отправить обращение 
        </v-btn>
        </v-card-actions>
    </v-card> 
</template>

<script>
import QuestionsService from "Services/QuestionsService.js";
export default {
  name: "ChooseTitleModal",
  props: {
    titles: Array,
    message: String
  },
  data() {
    return {
      titleId: ""
    };
  },
  methods: {
    createQuestion() {
      this.$emit("update:isModalShown", false);
      QuestionsService.askQuestion(this.message, this.titleId);
    },
    setTitle(titleId) {
      this.titleId = titleId;
    }
  }
};
</script>

<style scoped>
.mt-1.modal.title.active-title {
  background-color: #003399;
  color: white;
}
.title {
  max-width: 50%;
}
</style>
