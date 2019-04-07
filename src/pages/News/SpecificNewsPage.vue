<template>
    <v-container>
        <main>
          <router-link to="/news">Все новости</router-link>
          <v-layout column class="ml-5">
            <p class="specific-news-page-title">{{news.title}}</p>
            <p class="specific-news-page-created-date">{{news.createdAt}}</p>
            <div class="specific-news-page-text">{{news.text}}</div>
            <v-layout justify-center class="clearfix">
            <image-with-aspect-ratio :source="news.imageUrl" class="specific-news-image"></image-with-aspect-ratio>
            </v-layout>
            <v-layout row justify-center>
              <span class="text-uppercase specific-news-page-mark mt-3">Оцените новость:</span>
              <v-rating
                :hover="true"
                color="#003399"
                medium         
              ></v-rating>
            </v-layout>
          </v-layout>
        </main>
    </v-container>
</template>

<script>
import NewsService from "Services/NewsService";
import ImageWithAspectRatio from "Components/ImageWithAspectRatio";

export default {
  name: "SpecificNewsPage",
  data() {
    return {
      news: {}
    };
  },
  components: { ImageWithAspectRatio },
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
  color: #333333;
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

.specific-news-image {
  max-width: 500px;
}
</style>
