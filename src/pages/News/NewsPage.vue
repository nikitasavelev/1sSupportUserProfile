<template>
    <div>
        Hello news
        <div v-for="n in news" :key="n.id" >
          {{n.text}} {{n.createdDate}}
        </div>
    </div>    
</template>
<script>
import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import NewsService from "Services/NewsService.js";
export default {
  name: "NewsPage",
  props: {},
  data() {
    return {
      news: [],
      areNewsLoaded: false,
    };
  },
  methods: {},
  async mounted() {
    this.news = await NewsService.getNews();
    this.areNewsLoaded = true;
  }
};
</script>
