<template>
  <v-card max-width="600" class="request-item ma-2 border" @click="showDescription">
      <v-card-title primary-title>
          <v-flex>
            <v-layout justify-space-around>
                <span>Тема: {{request.theme}} </span>
                <span>Статус: {{request.status}} </span>
            </v-layout> 
            <v-divider></v-divider>
            <v-container v-if="isLoaded  && isDescriptionShown" class="pb-0">
              {{this.title}}
            </v-container>
            <v-container align-center justify-space-around row fill-height class="pl-0 pb-0">
                <v-btn class="ml-0 text-capitalize">Заявка {{request.id}}</v-btn>
                <v-btn>{{request.date}}</v-btn>
                <v-rating
                    v-model="request.rating"
                    :hover="true"
                    color="#003399"
                    large
                    class="d-inline-block"
            ></v-rating>
          </v-container>
          </v-flex>
      </v-card-title>
  </v-card>
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
</style>


