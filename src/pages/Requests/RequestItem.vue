<template>
  <v-layout row wrap>
    <v-flex xs9>
      <div>
        <span>{{request.title}}</span>
        <span v-if="!request.isActive" class="text-uppercase right mt-2">Оценить:</span>
      </div>
      <div>
        {{request.text}}
      </div>
    </v-flex>
    <v-flex xs3 style="text-align: center;">
        <v-rating
            v-if="!request.isActive"
            v-model="request.mark"
            :hover="true"
            color="#003399"
            medium         
          ></v-rating>
       {{request.createdDate}} 
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


