<template>
  <main>
    <v-container>
        <router-link :to="'/requests'" style="min-width: 120px;">
                  Все обращения
        </router-link>
        <div v-if="isLoaded">
          <div v-if="this.$route.params.id !== '0'">
              <span class="request-number">Обращение №{{this.$route.params.id}}</span>
              <span class="right request-created-date">{{request.updatedAt}}</span>
              <div class="request-title">{{request.title}}</div>
          </div>
          <hr>
          <form @submit="formSubmit">
            <v-textarea
              solo
              class="mt-3"
              label="Solo textarea"
              required
              v-model="message"
              placeholder="Напишите сообщение"
            ></v-textarea>
            <v-btn 
              class="d-block right"
              color="primary"
              type="submit"
              v-if="!isResolved">Отправить</v-btn>
          </form>
          <v-layout justify-center align-center column v-if="this.questionId !== '0'">
              <v-btn
              class="d-block mt-5 resolve-question-btn"
              color="#27ae60"
              @click="resolveQuestion"
              v-if="!isResolved">
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
            <choose-title-modal
             :titles="titles"
             @update:isModalShown="isModalShown = false"
             :message="message">
            </choose-title-modal>
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
  </main>
</template>
<script>
import QuestionsService from "Services/QuestionsService.js";
import ChooseTitleModal from "./ChooseTitleModal";

export default {
  name: "RequestPage",
  data() {
    return {
      request: {},
      message: "",
      isModalShown: false,
      titles: [],
      questionId: this.$route.params.id,
      isResolved: false,
      isClosed: false,
      isLoaded: false
    };
  },
  components: { ChooseTitleModal },
  async mounted() {
    this.titles = await QuestionsService.getTitles();
    if (this.questionId !== "0") {
      this.request = await QuestionsService.getQuestion(this.questionId);
      // ids 5 and 6 means resolved (by client or by operator)
      this.isResolved =
        this.request.state.id === 5 || this.request.state.id === 6;
    }
    this.isLoaded = true;
  },
  methods: {
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
      if (mark !== 0) {
        QuestionsService.closeQuestion(this.questionId, mark);
        this.isClosed = true;
      }
    }
  }
};
</script>
<style scoped>
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

.question-resolved {
  color: #4caf50;
}

.d-block.mt-5.resolve-question-btn {
  color: white;
}
</style>
