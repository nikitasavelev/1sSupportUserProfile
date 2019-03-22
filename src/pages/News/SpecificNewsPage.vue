<template>
    <div>
        {{this.$route.params.id}}
    </div>
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