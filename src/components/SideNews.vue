<template>
    <v-flex xs3>
        <v-layout align-center column>
          <news-item v-for="n in news" :news="n" :key="n.id"></news-item>
          <v-btn class="text-none">Показать все новости</v-btn>
        </v-layout>
    </v-flex>
</template>

<script>
import NewsService from "Services/NewsService.js";
import NewsItem from "Pages/News/NewsItem";

export default {
  name: "SideNews",
  props: {},
  components: { NewsItem },
  data() {
    return {
      news: []
    };
  },
  methods: {
  },
  async mounted() {
    this.news = await NewsService.getNewsShortPreviews();
  }
};
</script>

<style scoped>
.text-none {
  text-transform: none;
}
</style>
