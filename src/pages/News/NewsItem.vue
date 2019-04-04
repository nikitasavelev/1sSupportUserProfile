<template>
    <div column class="news align-center pa-1" @click="goToSpecificNews(news.id)">
        <p class="ml-4 news-title">{{news.title}}</p>
        <image-with-aspect-ratio :source="news.imageUrl" class="news-img"></image-with-aspect-ratio>
        <div class="ml-4 news-short-preview">{{news.shortPreview}}</div>
        <hr>
    </div>
</template>

<script>
import ImageWithAspectRatio from "Components/ImageWithAspectRatio";
export default {
  name: "NewsItem",
  props: {
    news: {}
  },
  components: { ImageWithAspectRatio },
  methods: {
    goToSpecificNews(newsId) {
      this.$router.push({ name: "SpecificNewsPage", params: { id: newsId } });
    }
  }
};
</script>
<style scoped>
hr {
  height: 1px;
  width: 100%;
}

.news {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.news-title {
  font-family: Open Sans;
  font-size: 1rem;
  color: #333333;
}

.news-short-preview {
  font-family: Open Sans;
  font-size: 0.875rem;
  color: #333333;
  text-align: center;
}

.news-img{
  height: 75%;
  width: 75%;
}
</style>
