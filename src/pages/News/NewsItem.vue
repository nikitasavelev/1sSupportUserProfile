<template>
    <div column class="news align-center pa-1" @click="goToSpecificNews(news.id)">
        <p class="ml-4 news-title">{{news.title}}</p>
        <img :src="news.imageUrl">
        <div class="ml-4">{{news.shortPreview}}</div>
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

.news-title{
  font-family: Open Sans;
  font-size: 1rem;
  color: #333333;
}
</style>
