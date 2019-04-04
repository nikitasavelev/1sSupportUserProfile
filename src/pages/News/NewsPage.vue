<template>
    <v-layout align-center column>
        <h1 class="newsCaption w-100 my-2">
          Новости
          <hr>
        </h1>
        <div v-for="n in news" :key="n.id" class="w-100" @click="goToSpecificNews(n.id)">
            <div>
              <span class="mt-3 ml-3 news-title">{{n.title}}</span>
              <span class="right mr-3 mt-3 news-created-date">{{n.createdAt}}</span>
            </div>
            <v-layout class="mt-3 clearfix">
              <p class="ml-3 news-preview">
                <img :src="n.imageUrl" class="left image mr-3">
                {{n.preview}}
              </p> 
            </v-layout>
            <hr class="mt-3">
        </div>
        <v-btn @click="loadMore">Показать еще</v-btn>
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
    goToSpecificNews(newsId) {
      this.$router.push({ name: "SpecificNewsPage", params: { id: newsId } });
    },
    loadMore() {
      // const recievedNews = await NewsService.loadMore(this.news.length, 5);
      // this.news.concat(recievedNews);
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

div .newsCaption.w-100.my-2 {
  text-align: left;
  font-size: 1.25rem;
  line-height: 1.25rem;
}

.w-100 {
  width: 100%;
  padding-left: 5rem;
  padding-right: 5rem;
}

.news-title {
  font-size: 1.125rem;
  color: #333333;
}

.news-preview {
  font-size: 0.875rem;
  color: #828282;
}

.news-created-date {
  font-size: 1rem;
  color: #4f4f4f;
}

.left {
  float: left;
}

.image {
  max-height: 200px;
  max-width: 200px;
}
</style>

