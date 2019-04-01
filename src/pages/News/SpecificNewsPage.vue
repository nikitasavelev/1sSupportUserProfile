<template>
    <v-container>
        <router-link to="/news">Все новости</router-link>
        <v-layout column class="ml-5">
          <p class="specific-news-page-title">{{news.title}}</p>
          <p class="specific-news-page-created-date">{{news.createdAt}}</p>
          <div class="specific-news-page-text">{{news.text}}</div>
          <img :src="news.imageUrl">
          <v-layout row justify-center>
            <span class="text-uppercase specific-news-page-mark mt-3">Оцените новость:</span>
            <v-rating
              :hover="true"
              color="#003399"
              medium         
            ></v-rating>
          </v-layout>
        </v-layout>
    </v-container>
</template>

<script>
import NewsService from "Services/NewsService";

export default {
  name: "SpecificNewsPage",
  data() {
    return {
      news: {}
    };
  },
  async mounted() {
    this.news = await NewsService.getSpecificNews(this.$route.params.id);
  }
};
</script>

<style scoped>
.specific-news-page-title {
  font-family: Open Sans;
  font-size: 1.25rem;
  color: #333333;
}

.specific-news-page-created-date {
  font-family: Open Sans;
  font-size: 0.875rem;
  color: #bdbdbd;
}

.specific-news-page-text {
  font-family: Open Sans;
  font-size: 0.875rem;
  color: #333333;
}

.specific-news-page-mark {
  font-family: Open Sans;
  font-size: 0.875rem;
  color: #333333;
}
</style>
