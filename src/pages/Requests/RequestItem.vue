<template>
  <v-layout row wrap class="pa-2">
    <v-flex xs9>
      <div>
        <router-link :to="{name: 'RequestPage', params: { id: request.questionId} }">
          <span class="request-title">{{request.title}}</span>
        </router-link>
        <span v-if="!request.isActive" class="text-uppercase right mt-2 request-mark">Оценить:</span>
      </div>
      <div class="request-text">
        {{request.text}}
      </div>
      <div v-if="$store.getters.getRole !== 'Client'" class="request-text">
        <span>
          {{request.fullName}}
        </span>
        -
        <span>
          {{request.companyName}}
        </span>
      </div>
    </v-flex>
    <v-flex xs3 class="request-create-date">
        <v-rating
            v-if="!request.isActive"
            v-model="request.mark"
            :hover="true"
            readonly
            color="#003399"
            small         
          ></v-rating>
       {{request.updatedAt}} 
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
hr {
  width: 100%;
}

.request-title {
  font-size: 1.125rem;
  color: #003399;
  font-family: Open Sans;
}

.request-text {
  font-size: 0.875rem;
  /* color: #828282; */
  color: #333333;
  font-family: Open Sans;
}

.request-create-date {
  text-align: center;
  font-size: 1rem;
  color: #4f4f4f;
}

.request-mark {
  font-size: 0.875rem;
  color: #333333;
}
</style>


