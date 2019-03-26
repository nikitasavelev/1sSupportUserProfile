<template>
    <v-layout align-center column>
        <div class="newsCaption w-100 my-2">
          Новости
          <hr>
        </div>
        <div v-for="n in news" :key="n.id" class="w-100" @click="goToSpecificNews(n.id)">
            <div>
              <span class="mt-3 ml-3 news-title">{{n.title}}</span>
              <span class="right mr-3 mt-3 news-created-date">{{n.createdDate}}</span>
            </div>
            <div class="mt-3 clearfix">
              <img :src="n.imageUrl" style="height: 150px; width: 150px;" class="left">
              <span class="ml-3 left news-preview">{{n.preview}}</span>
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

div .newsCaption.w-100.my-2{
  text-align: left;
  font-size: 1.25rem;
  line-height: 1.25rem;
}

.w-100{
  width:100%;
  padding-left: 5rem;
  padding-right: 5rem;
}

.news-title{
  font-size: 1.125rem;
  color: #333333;
}

.news-preview{
  font-size: 0.875rem;
  color: #828282;
}

.news-created-date{
  font-size: 1rem;
  color: #4F4F4F;
}
</style>

