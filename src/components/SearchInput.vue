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
                <div class="inputString">
                  <v-combobox
                    v-model="searchTerm"
                    @keyup.enter="search()"
                    placeholder="Поиск"
                    hide-no-data
                    hide-details
                    solo
                    append-icon="null"
                    :menu-props="{ overflowY: false}"
                    :allHit="numHits"
                    :items="searchResults"
                  ></v-combobox>
                </div>
              </v-flex>
              <v-flex xs12 sm2>
                <v-btn color="#3f66b2" style="height: 47px" @click="search()">
                  <v-icon medium color="white">search</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-if="!isLoaded" justify-center mt-5>
      <v-progress-circular :size="70" :width="7" color="primary" indeterminate />
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
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

      baseUrl: serverAPIUrls.GET_SEARCH,
      searchTerm: "", // Default search term
      searchDebounce: null, // Timeout for search bar debounce
      searchResults: [], // Displayed search results
      numHits: 0, // Total search results found
      searchOffset: 0, // Search result pagination offset
      totalArticles: 0,
      isLoaded: true
    };
  },
  computed: {},
  methods: {
    async mounted() {},
    /** Call API to search for inputted term */
    async search() {
      this.isLoaded = false;
      const response = await axios.get(`${this.baseUrl}/search`, {
        params: { term: this.searchTerm, offset: this.searchOffset }
      });
      this.numHits = response.data.hits.total;
      this.$emit("onSearchData", {
        term: this.searchTerm,
        totalArticles: this.numHits.value,
        articlesWholeData: response.data.hits.hits,
        articlesOffset: this.searchOffset
      });
      this.isLoaded = true;
      return response.data.hits.hits;
    }
  }
};
</script>

<style>
input {
  box-sizing: border-box;
  width: 100%;
  border: 0;
  background-color: transparent;
  height: 47px;
}
.inputString {
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: black;
}
.inputFilter {
  width: 30%;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: black;
}
</style>