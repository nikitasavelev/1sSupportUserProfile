<template>
    <v-container>
        <router-link to="/news">Все новости</router-link>
        <v-layout column class="ml-5">
          <p>{{news.title}}</p>
          <p>{{news.createdDate}}</p>
          <div>{{news.text}}</div>
          <img :src="news.imageUrl">
          <v-layout column align-center>
            <span>Оцените новость</span>
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