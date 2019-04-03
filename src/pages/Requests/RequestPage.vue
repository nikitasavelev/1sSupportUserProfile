<template>
    <v-container>
        <div class="clearfix w-100">
          <router-link :to="'/requests'" style="min-width: 120px;">
                    Все обращения
          </router-link>
        </div>
        <div v-if="isLoaded">
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
            <v-btn 
              class="d-block right"
              color="primary"
              type="submit"
              v-if="!isResolved && request.mark == null">Отправить</v-btn>
          </form>
          <v-layout justify-center align-center column v-if="this.questionId !== '0'">
              <v-btn
              class="d-block mt-5"
              color="success"
              @click="resolveQuestion"
              v-if="!isResolved && request.mark == null">
                Вопрос решен
              </v-btn>
              <div class="question-resolved" v-if="isResolved || request.mark > 0">Вопрос решен</div>
              <v-rating
                  v-model="request.mark"
                  :hover="true"
                  :readonly="isClosed"
                  color="#003399"
                  v-if="isResolved || request.mark > 0"
                  large          
                ></v-rating>
          </v-layout>
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
        </div>
        <v-layout v-else justify-center mt-5>
                <v-progress-circular
                  :size="70"
                  :width="7"
                  color="primary"
                  indeterminate
                  ></v-progress-circular>
            </v-layout>
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
      titleId: "",
      questionId: this.$route.params.id,
      isResolved: false,
      isClosed: false,
      isLoaded: false
    };
  },
  async mounted() {
    this.titles = await QuestionsService.getTitles();
    if (this.questionId !== "0") {
      this.request = await QuestionsService.getQuestion(this.questionId);
      this.isResolved =
        this.request.state.name == "QuestionStateType.ResolvedByClient"
          ? true
          : false;
    }
    this.isLoaded = true;
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
      if (this.questionId === "0") {
        this.isModalShown = true;
      }
    },
    resolveQuestion() {
      QuestionsService.resolveQuestion(this.questionId);
      this.isResolved = true;
    }
  },
  watch: {
    "request.mark": function(mark) {
      if (mark != null) {
        QuestionsService.closeQuestion(this.questionId, mark);
        this.isClosed = true;
      }
    }
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

.question-resolved {
  color: #4caf50;
}
</style>
