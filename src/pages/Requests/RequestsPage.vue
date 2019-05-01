<template>
  <main>
    <v-layout class="px-5 requests-page" row wrap>
      <v-flex xs9 class="left-side pr-2 pl-5"> 
        <div class="clearfix">
          <router-link :to="'/requests/0'">
            <v-btn
             class="ask-question btn ma-0 mt-4 clearfix"
             v-if="$store.getters.getRoleType === roleTypes.Client">Задать вопрос</v-btn>
          </router-link> 
        </div>   
        <v-flex xs-8 class="text-uppercase requests-header mt-2">Активные {{activeQuestions.length}}</v-flex> 
        <hr>
        <request-item v-for="request in activeQuestions" :request="request" :key="request.id"></request-item> 
        <v-flex xs-8 class="text-uppercase requests-header">Завершенные {{closedQuestions.length}}</v-flex>
        <hr>
        <request-item v-for="request in closedQuestions" :request="request" :key="request.id"></request-item>  
      </v-flex>
      <side-news></side-news>
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
      roleTypes: roleTypes
    };
  },
  methods: {
    onPageChange() {
      //console.log(this.page); // current chosen page
      /* request new data for shown requests */
    }
  },
  async mounted() {
    const allQuestions = await QuestionsService.getQuestions();
    this.activeQuestions = allQuestions.activeQuestions.map(question => {
      question.isActive = true;
      return question;
    });
    this.closedQuestions = allQuestions.closedQuestions;
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