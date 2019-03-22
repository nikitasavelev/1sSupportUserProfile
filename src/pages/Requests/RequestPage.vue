<template>
    <v-container>
        <div class="clearfix w-100">
          <router-link :to="'/requests'" style="min-width: 120px;">
                    Все обращения
          </router-link>
          <v-btn class="right-btn">Задать вопрос</v-btn>
        </div>
        <div>
            <span>Обращение №{{this.$route.params.id}}</span>
            <span class="right">{{request.createdDate}}</span>
            <div>{{request.title}}</div>
        </div>
        <hr>
         <v-textarea
          solo
          class="mt-3"
          name="input-7-4"
          label="Solo textarea"
          placeholder="Напишите сообщение"
        ></v-textarea>
        <v-btn class="d-block" color="primary">Отправить</v-btn>
        <v-flex offset-xs5>
            <v-btn class="d-block" color="success">Вопрос решен</v-btn>
        </v-flex>
    </v-container>
</template>
<script>
import QuestionsService from "Services/QuestionsService.js";

export default {
  name: "RequestPage",
  data() {
    return {
      request: {}
    };
  },
  async mounted() {
    this.request = await QuestionsService.getQuestion(this.$route.params.id);
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
</style>
