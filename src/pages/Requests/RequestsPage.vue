<template>
    <v-layout row wrap>
      <v-flex xs9 class="left-side pr-2 pl-5"> 
        <div class="clearfix"> 
          <v-btn class="ask-question btn ma-0 mt-4 clearfix">Задать вопрос</v-btn>
        </div>   
        <v-flex xs-8 class="text-uppercase">Активные</v-flex> 
        <hr>
        <request-item v-for="request in activeQuestions" :request="request" :key="request.id"></request-item> 
        <v-flex xs-8 class="text-uppercase">Завершенные</v-flex>
        <hr>
        <request-item v-for="request in closedQuestions" :request="request" :key="request.id"></request-item>  
      </v-flex>
      <v-flex xs3>
        <v-layout align-center column>
          <news-item v-for="n in news" :news="n" :key="n.title"></news-item>
          <v-btn class="text-none">Показать все новости</v-btn>
        </v-layout>
      </v-flex>
      <v-pagination @input="onPageChange" :total-visible="8" :length="16" v-model="page"></v-pagination>
    </v-layout>
</template>
<script>
import axios from "axios";
import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import RequestItem from "./RequestItem";
import QuestionsService from "Services/QuestionsService.js";
import NewsService from "Services/NewsService.js";
import NewsItem from "../News/NewsItem";

export default {
  name: "RequestsPage",
  props: {},
  components: { RequestItem, NewsItem },
  data() {
    return {
      page: 1,      
      news: [
        {
          title: "Title 1",
          description: "Description 1"
        },
        {
          title: "Title 2",
          description: "Description 2"
        },
      ],
      activeQuestions:[],
      closedQuestions:[],
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
.left-side  .ask-question.btn.ma-0 {
  color: white;
  background-color: #2f80ed;
  float: right;
}

.left-side{
  border-right: 1px solid gray;
}

.clearfix::after {
  display: table;
  content: "";
  clear: both;
}

.text-none{
  text-transform: none;
}
</style>