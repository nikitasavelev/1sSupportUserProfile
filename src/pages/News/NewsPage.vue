<template>
    <div>
        Hello news
        <div v-for="n in news" :key="n.id">
            {{n.text}} {{n.createdDate}}
        </div>
    </div>    
</template>
<script>
import { ServerAPIUrls } from "Constants/SERVER_API_URLS.js";
export default {
  name: "NewsPage",
  props: {},
  data() {
    return {
      news: []
    };
  },
  methods: {},
  created() {
    const requestOptions = {
      headers: {
        "Content-Type": "text/plain",
        "Authorization": "Bearer " + this.$store.state.authorizationToken
      },
      mode: "cors",
      cache: "default"
    };
    fetch(ServerAPIUrls.GET_NEWS, requestOptions)
      .then(res => res.json())
      .then(res => {
        this.news = res.data;
        console.log(res.data);
      });
  }
};
</script>
