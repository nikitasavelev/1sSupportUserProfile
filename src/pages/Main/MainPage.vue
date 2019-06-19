<template>
  <div>
    <search-input @onSearchData="onSearchData"/>
    <not-found-message v-if="noDataInResponse"/>
    <search-result
      :articlesOffset="articlesOffset"
      :searchResponse="articlesWholeData"
      :allCount="totalHits"
      :searchTerm="searchTerm"
    />
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
      articlesMarks: [],

      totalHits: 0,
      articlesWholeData: [],
      articlesOffset: 0,
      searchTerm: ""
    };
  },
  methods: {
    getArticles: async function(query, sessionId) {
      let axiosConfig = {
        method: "get",
        url: serverAPIUrls.GET_SEARCH,
        headers: {
          Authorization: "Bearer " + this.$store.getters.getAuthorizationToken
        },
        params: {
          text: query
        }
      };
      var response = await axios(axiosConfig);
      response.data.data.length == 0
        ? (this.noDataInResponse = true)
        : (this.noDataInResponse = false);
      return response.data.data;
    },
    onSearchData(data) {
      this.totalHits = data.totalArticles;
      this.articlesWholeData = data.articlesWholeData;
      this.articlesOffset = data.articlesOffset;
      this.searchTerm = data.term;
    },
    getMarks: async function(token) {
      let axiosConfig = {
        method: "get",
        url: serverAPIUrls.GET_POPULAR_SEARCH,
        headers: {
          Authorization: "Bearer " + this.$store.getters.getAuthorizationToken
        },
        params: {
          n: 1
        }
      };
      var response = await axios(axiosConfig);
      return response.data.data;
    }
  },
  async created() {
    // not necessary to have Token and SessionId as data here,
    // but it's easier to debug
    this.articlesMarks = await this.getMarks(
      this.$store.getters.getAuthorizationToken
    );
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
