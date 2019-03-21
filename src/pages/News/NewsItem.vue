<template>
    <div column class="news align-center pa-1">
        <p class="ml-4">{{news.text}}</p>
        <img src="">
        <div class="ml-4">{{news.createdDate}}</div>
        <hr>
    </div>
</template>

<script>
export default {
  name: "NewsItem",
  props: {
    news: {}
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

</style>
