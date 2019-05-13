<template>
  <main>
    <v-layout class="px-5 requests-page" row wrap>
      <v-flex v-if="isLoaded" xs9 class="left-side pr-2 pl-5"> 
        <div class="clearfix">
          <router-link :to="'/requests/0'" aria-label="Задать вопрос">
            <v-btn
             class="ask-question btn ma-0 mt-4 clearfix"
             v-if="Number($store.getters.getRoleType) === Number(roleTypes.Client)">Задать вопрос</v-btn>
          </router-link> 
        </div>   
        <v-flex xs-8 class="text-uppercase requests-header mt-2">Активные {{activeQuestions.length}}</v-flex> 
        <hr>
        <request-item v-for="request in activeQuestions" :request="request" :key="request.id"/>
        <v-flex xs-8 class="text-uppercase requests-header">Завершенные {{closedQuestions.length}}</v-flex>
        <hr>
        <request-item v-for="request in closedQuestions" :request="request" :key="request.id"/>
      </v-flex>
      <v-layout v-else justify-center mt-5>
        <v-progress-circular :size="70" :width="7" color="primary" indeterminate/>
      </v-layout>
      <side-news/>
    </v-layout>
  </main>
</template>
<script>
import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import RequestItem from "./RequestItem";
import QuestionsService from "Services/QuestionsService.js";
import SideNews from "Components/SideNews";
import { roleTypes } from "Constants/ROLE_TYPES.js";

export default {
  name: "RequestsPage",
  props: {},
  components: { RequestItem, SideNews },
  data() {
    return {
      page: 1,
      news: [],
      activeQuestions: [],
      closedQuestions: [],
      roleTypes: roleTypes,
      isLoaded: false,
    };
  },
  async mounted() {
    const allQuestions = await QuestionsService.getQuestions();  
    this.activeQuestions = allQuestions.activeQuestions.map(question => {
      question.isActive = true;
      return question;
    });
    this.closedQuestions = allQuestions.closedQuestions;
    this.isLoaded = true;
  }
};
</script>
<style scoped>
.left-side .ask-question.btn.ma-0 {
  color: white;
  background-color: #003399;
  float: right;
}

.left-side {
  border-right: 1px solid gray;
}

.requests-page {
  font-size: 1.25rem;
}

.requests-header {
  font-size: 1.25rem;
  line-height: 1.25rem;
  font-family: Open Sans;
}
</style>