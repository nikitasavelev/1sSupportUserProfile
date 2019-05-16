<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card flat tile>
          <v-card-title primary-title>
            <h1>Введите ключевые слова, описывающие проблему</h1>
          </v-card-title>

          <v-card-actions>
            <v-layout row wrap>
              <v-flex xs12 sm8>
                <v-combobox
                  v-model="searchTerm"
                  type="text"
                  autocomplete="off"
                  v-on:click="search()"
                  :allHit="numHits"
                  :items="searchResults"
                >
                  <!-- <template slot="item">
                    <v-list-tile-content>{{ items }}</v-list-tile-content>
                  </template>-->
                </v-combobox>
              </v-flex>
              <v-flex xs12 sm2>
                <v-btn color="#3f66b2" style="height: 47px">
                  <v-icon medium color="white" v-on:click="search()">search</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "SearchInput",
  props: {
    sessionId: {
      required: false,
      type: String
    }
  },
  data() {
    return {
      searchString: "",
      shownHint: [],

      baseUrl: "http://localhost:3000", // API url
      searchTerm: "2005", // Default search term
      searchDebounce: null, // Timeout for search bar debounce
      searchResults: [], // Displayed search results
      numHits: 0, // Total search results found
      searchOffset: 0, // Search result pagination offset

      totalArticles: 0,

      selectedArticle: null,
      info: null
    };
  },
  computed: {},
  mounted() {},
  methods: {
    //this function for suggestions
    onSearchInput() {
      clearTimeout(this.searchDebounce);
      this.searchDebounce = setTimeout(async () => {
        this.searchOffset = 0;
        this.searchResults = await this.search();
      }, 100);
    },
    /** Call API to search for inputted term */
    async search() {
      const response = await axios.get(`${this.baseUrl}/search`, {
        params: { term: this.searchTerm, offset: this.searchOffset }
      });

      this.numHits = response.data.hits.total;

      this.$emit("onSearchData", {
        totalArticles: this.numHits.value,
        articlesWholeData: response.data.hits.hits,
        articlesOffset: this.searchOffset
      });
      return response.data.hits.hits;
    }
  }
};
</script>

<style>
</style>