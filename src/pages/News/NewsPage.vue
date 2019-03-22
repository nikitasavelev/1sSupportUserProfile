<template>
    <v-layout align-center column>
        <div class="newsCaption w-100">
          Новости
          <hr>
        </div>
        <div v-for="n in news" :key="n.id" class="w-100">
          <div>
            <span class="mt-3 ml-3">{{n.text}}</span>
            <span class="right mr-3 mt-3">{{n.createdDate}}</span>
          </div>
          <div class="mt-3 clearfix">
            <img src="" style="height: 100px; width: 100px;" class="left">
            <span class="ml-3 left">{{n.text}}</span>
          </div>
          <hr class="mt-3">
        </div>
        <v-btn>Показать еще</v-btn>
    </v-layout>    
</template>
<script>
import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import NewsService from "Services/NewsService.js";
export default {
  name: "NewsPage",
  props: {},
  data() {
    return {
      news: [],
      areNewsLoaded: false
    };
  },
  methods: {},
  async mounted() {
    this.news = await NewsService.getNews();
    this.areNewsLoaded = true;
  }
};
</script>

<style scoped>
.clearfix::after {
  display: table;
  content: "";
  clear: both;
}

.newsCaption{
  text-align: left !important;
}

.w-100{
  width:100%;
  padding-left: 5rem;
  padding-right: 5rem;
}
</style>

