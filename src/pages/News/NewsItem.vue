<template>
    <v-layout column class="align-center">
        <div>{{news.title}}</div>
        <img src="">
        <div>{{news.description}}</div>
    </v-layout>
</template>

<script>
export default {
  name: "NewsItem",
  props: {
      news:{}
  },
};
</script>