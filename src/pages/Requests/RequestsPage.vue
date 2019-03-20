<template>
    <v-layout row wrap>
      <v-flex xs9 class="left-side pr-2 pl-5"> 
        <div class="clearfix"> 
          <v-btn class="ask-question btn ma-0 mt-4 clearfix">Задать вопрос</v-btn>
        </div>   
        <v-flex xs-8 class="text-uppercase">Активные</v-flex> 
        <hr>
        <request-item v-for="request in shownRequests" :request="request" :key="request.id"></request-item> 
        <v-flex xs-8 class="text-uppercase">Завершенные</v-flex>
        <hr>
        <request-item v-for="request in shownRequests" :request="request" :key="request.id"></request-item>  
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
      requests: [
        {
          id: "32",
          theme: "Theme1",
          status: "Status1",
          date: "22.10.2018",
          rating: 3
        },
        {
          id: "33",
          theme: "Theme2",
          status: "Status2",
          date: "23.10.2018",
          rating: 2
        },
        { id: "34", theme: "Theme3", status: "Status3", date: "24.10.2018" },
        { id: "35", theme: "Theme4", status: "Status4", date: "25.10.2018" },
        {
          id: "36",
          theme: "Theme5",
          status: "Status5",
          date: "26.10.2018",
          rating: 5
        },
        {
          id: "37",
          theme: "Theme6",
          status: "Status6",
          date: "27.10.2018",
          rating: 1
        },
        { id: "38", theme: "Theme7", status: "Status7", date: "28.10.2018" },
        { id: "39", theme: "Theme8", status: "Status8", date: "29.10.2018" }
      ],
      shownRequests: [
        {
          id: "32",
          theme: "Theme1",
          status: "Status1",
          date: "22.10.2018",
          rating: 3
        },
        {
          id: "33",
          theme: "Theme2",
          status: "Status2",
          date: "23.10.2018",
          rating: 2
        },
        { id: "34", theme: "Theme3", status: "Status3", date: "24.10.2018" },
        { id: "35", theme: "Theme4", status: "Status4", date: "25.10.2018" }
      ],
      news: [
        {
          title: "Title 1",
          description: "Description 1"
        },
        {
          title: "Title 2",
          description: "Description 2"
        },
      ]
    };
  },
  methods: {
    onPageChange() {
      //console.log(this.page); // current chosen page
      /* request new data for shown requests */
    }
  },
  async mounted() {
    const a = await QuestionsService.getQuestions();
    const b = await NewsService.getNews();
    console.log(a);
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