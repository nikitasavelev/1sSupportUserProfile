<template>
    <div column class="news align-center pa-1" @click="goToSpecificNews(news.id)">
        <p class="ml-4 news-title">{{news.title}}</p>
        <img :src="news.imageUrl" alt="image of product" class="news-img">
        <div class="ml-4 news-short-preview">{{news.shortPreview}}</div>
        <hr>
    </div>
</template>

<script>
export default {
  name: "NewsItem",
  props: {
    news: {}
  },
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
