<template>
    <v-container>
        <main>
          <router-link to="/news">Все новости</router-link>
          <v-layout v-if="isLoaded" column class="ml-5">
            <p class="specific-news-page-title">{{news.title}}</p>
            <p class="specific-news-page-created-date">{{news.createdAt}}</p>
            <div class="specific-news-page-text">{{news.text}}</div>
            <v-layout justify-center class="clearfix">
            <image-with-aspect-ratio :source="news.imageUrl" class="specific-news-image"/>
            </v-layout>
            <v-layout row justify-center>
              <span class="text-uppercase specific-news-page-mark mt-3">Оцените новость:</span>
              <v-rating
                v-model="news.mark"
                :hover="true"
                color="#003399"
                medium 
                :readonly="isMarked"        
              ></v-rating>
            </v-layout>
          </v-layout>
          <v-layout v-else justify-center mt-5>
            <v-progress-circular
              :size="70"
              :width="7"
              color="primary"
              indeterminate
            />
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
      news: {},
      isMarked: false,
      isLoaded: false
    };
  },
  components: { ImageWithAspectRatio },
  async mounted() {
    this.news = await NewsService.getSpecificNews(this.$route.params.id);
    this.isMarked = this.news.mark > 0;
    this.isLoaded = true;
  },
  watch: {
    "news.mark": function(mark) {
      if (mark !== 0 && !this.isMarked) {
        NewsService.markNews(this.news.id, mark);
        this.isMarked = true;
      }
    }
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
