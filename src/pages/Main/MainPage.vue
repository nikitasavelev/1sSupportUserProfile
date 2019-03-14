<template>
  <div>
    <search-input
      @search="searchHandler($event)" :marks="articlesMarks"/>
    <not-found-message v-if="noDataInResponse"/>
    <search-result
      :searchResponse="searchRequestResponse"
      :allCount="totalCount"
      :lastQuery="lastQuery"/>
    <modal-component/>

  </div>
</template>

<script>
import SearchInput from "Components/SearchInput";
import SearchResult from "Components/SearchResult";
import ModalComponent from "Components/ModalComponent";
import NotFoundMessage from "Components/NotFoundMessage";
import axios from "axios";

import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";

export default {
  name: "MainPage",
  components: { SearchInput, SearchResult, ModalComponent, NotFoundMessage },
  data() {
    return {
      // not necessary to have Token and SessionId as data here,
      // but it's easier to debug
      token: "",
      sessionId: "",
      searchRequestResponse: [],
      totalCount: 0,
      lastQuery: "",
      noDataInResponse: false,
      articlesMarks: []
    };
  },
  methods: {
    getToken: async function() {
      let response = await axios.post(serverAPIUrls.LOGIN, {
        inn: "000000000000",
        login: "test"
      });
      return response.data.data.accessToken;
    },
    getArticles: async function(query, sessionId) {
      let axiosConfig = {
        method: "get",
        url: serverAPIUrls.GET_SEARCH,
        headers: {
          Authorization: "Bearer " + this.token
        },
        params: {
          text: query
        }
      };
      var response = await axios(axiosConfig);
      response.data.data.length == 0
        ? (this.noDataInResponse = true)
        : (this.noDataInResponse = false);
      console.log(response.data.data);
      return response.data.data;
    },
    searchHandler: async function(payload) {
      this.lastQuery = payload;
      let data = await this.getArticles(payload, this.sessionId);
      this.searchRequestResponse = data.previews;
      this.totalCount = data.allCount;
    },
    getMarks: async function(token) {
      let axiosConfig = {
        method: "get",
        url: serverAPIUrls.GET_POPULAR_SEARCH,
        headers: {
          Authorization: "Bearer " + this.token
        },
        params: {
          n: 1
        }
      };
      console.log(axiosConfig);
      var response = await axios(axiosConfig);
      return response.data.data;
    }
  },
  async created() {
    // not necessary to have Token and SessionId as data here,
    // but it's easier to debug
    this.token = await this.getToken();
    this.$store.dispatch("updateAuthorizationToken", this.token);
    this.articlesMarks = await this.getMarks(this.token);
  }
};
</script>

<style>
</style>

<style>
/* @import "vuetify/dist/vuetify.min.css"; */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
