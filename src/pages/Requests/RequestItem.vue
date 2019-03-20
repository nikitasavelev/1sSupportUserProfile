<template>
  <v-layout row wrap>
    <v-flex xs10>
      <div>{{request.theme}}</div>
    </v-flex>
    <v-flex xs2 style="text-align: center;">
       {{request.date}} 
    </v-flex>
    <hr>
  </v-layout>
</template>


<script>
import axios from "axios";
import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import QuestionsService from "Services/QuestionsService.js";

export default {
  name: "RequestItem",
  props: {
    request: {
      theme: {
        required: true,
        type: String
      },
      status: {
        required: true,
        type: String
      },
      id: {
        required: true,
        type: Number
      },
      date: {
        required: true,
        type: String
      },
      rating: {
        required: false,
        type: Number
      }
    }
  },
  data() {
    return {
      rating: 0,
      title: "",
      isLoaded: false,
      isDescriptionShown: false
    };
  },
  methods: {
    async showDescription() {
      if (!this.isLoaded) {
        let question = await QuestionsService.getQuestion();
        this.title = question.title;
        this.isLoaded = true;
      }
      this.isDescriptionShown = !this.isDescriptionShown;
    }
  },
  mounted() {},

  beforeDestroy() {}
};
</script>


<style scoped>
.request-item.border {
  border: 3px solid #ccc;
}

hr{
  width: 100%;
}
</style>


