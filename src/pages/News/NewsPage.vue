<template>
    <v-layout align-center column>
        <div class="newsCaption w-100">
          Новости
          <hr>
        </div>
        <div v-for="n in news" :key="n.id" class="w-100" @click="goToSpecificNews(n.id)">
            <div>
              <span class="mt-3 ml-3">{{n.title}}</span>
              <span class="right mr-3 mt-3">{{n.createdDate}}</span>
            </div>
            <div class="mt-3 clearfix">
              <img :src="n.imageUrl" style="height: 150px; width: 150px;" class="left">
              <span class="ml-3 left">{{n.preview}}</span>
            </div>
            <hr class="mt-3">
        </div>
        <v-btn>Показать еще</v-btn>
    </v-layout>    
</template>
<script>
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
  methods: {
    goToSpecificNews(newsId){
      this.$router.push({name: 'SpecificNewsPage', params: { id: newsId} });
    }
  },
  async mounted() {
    this.news = await NewsService.getNewsPreviews();
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

