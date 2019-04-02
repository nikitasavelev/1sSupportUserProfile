<template>
    <v-container>
        <div class="clearfix w-100">
          <router-link :to="'/requests'" style="min-width: 120px;">
                    Все обращения
          </router-link>
        </div>
        <div v-if="this.$route.params.id !== '0'">
            <span class="request-number">Обращение №{{this.$route.params.id}}</span>
            <span class="right request-created-date">{{request.createdAt}}</span>
            <div class="request-title">{{request.title}}</div>
        </div>
        <hr>
        <form @submit="formSubmit">
          <v-textarea
            solo
            class="mt-3"
            name="input-7-4"
            label="Solo textarea"
            required
            v-model="message"
            placeholder="Напишите сообщение"
          ></v-textarea>
          <v-btn class="d-block right" color="primary" type="submit">Отправить</v-btn>
        </form>
        <v-flex offset-xs5 v-if="this.$route.params.id !== '0'">
            <v-btn class="d-block mt-5" color="success" @click="solveQuestion">Вопрос решен</v-btn>
        </v-flex>
        <v-dialog
          v-model="isModalShown"
          width="400"
        >  
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
          </v-dialog>
    </v-container>
</template>
<script>
import QuestionsService from "Services/QuestionsService.js";

export default {
  name: "RequestPage",
  data() {
    return {
      request: {},
      message: "",
      isModalShown: false,
      titles: [],
      titleId: ""
    };
  },
  async mounted() {
    this.titles = await QuestionsService.getTitles();
    if (this.$route.params.id !== "0") {
      this.request = await QuestionsService.getQuestion(this.$route.params.id);
    }
  },
  methods: {
    createQuestion() {
      this.isModalShown = false;
      QuestionsService.askQuestion(this.message, this.titleId);
    },
    setTitle(titleId) {
      this.titleId = titleId;
    },
    formSubmit(event) {
      event.preventDefault();
      if (this.$route.params.id === "0") {
        this.isModalShown = true;
      }
    },
    solveQuestion() {}
  }
};
</script>
<style scoped>
.clearfix::after {
  display: table;
  content: "";
  clear: both;
}

.right-btn {
  float: right;
}

.w-100 {
  width: 100%;
}

.right-btn .ask-question {
  color: white !important;
}

.request-number {
  font-size: 0.75rem;
  font-family: Open Sans;
}

.request-created-date {
  font-size: 1rem;
  color: #4f4f4f;
  font-family: Open Sans;
}

.request-title {
  font-size: 1.125rem;
  color: #333333;
  font-family: Open Sans;
}

.title {
  max-width: 50%;
}

.mt-1.modal.title.active-title {
  background-color: #003399;
  color: white;
}
</style>
