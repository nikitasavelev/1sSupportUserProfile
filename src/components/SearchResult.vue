<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="searchResponse" flat class="text-xs-left">
          Результатов найдено: {{ allCount }}
          <div
            class="mui--text-subhead"
          >Отображено результатов: {{ searchOffset+1 }} - {{ searchOffset + 10 }}</div>
        </v-card>

        <v-card flat max-width="90%">
          <v-list three-line>
            <v-layout v-if="searchResponse" v-for="hit in searchResponse" :key="hit._source.id">
              <v-list-tile-content>
                <router-link
                  class="article-title"
                  :to="{
                  name: 'ArticlePage',
                  params: {articleId: String(hit._source.id)}
                }"
                >
                  <v-list-tile-title>{{hit._source.title}}</v-list-tile-title>
                </router-link>
                <br />
                <v-list-tile-title
                  v-if="hit.highlight.text"
                  class="article-preview"
                  v-html="hit.highlight.text[0]"
                ></v-list-tile-title>
                <v-list-tile-title
                  v-if="hit.highlight.text"
                  class="article-preview"
                  v-html="hit.highlight.text[1]"
                ></v-list-tile-title>
                <br />
              </v-list-tile-content>
              <br />
            </v-layout>
          </v-list>
        </v-card>

        <v-layout v-if="searchResponse != false">
          <v-layout row>
            <v-flex xs12>
              <div class="pagination-panel">
                <v-btn
                  style="height: 2.5rem"
                  class="mui-btn mui-btn--flat"
                  @click="prevResultsPage()"
                  v-if="searchOffset > 9"
                >Предыдущая страница</v-btn>
                <v-btn
                  style="height: 2.5rem"
                  class="mui-btn mui-btn--flat"
                  @click="nextResultsPage()"
                >Следующая страница</v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import axios from "axios";
export default {
  name: "SearchResult",
  props: {
    searchResponse: {
      required: false,
      type: Array
    },
    allCount: {
      required: false,
      type: 0
    },
    searchTerm: {
      required: false,
      type: String
    }
  },
  data() {
    return {
      totalItems: "",
      items: [],

      baseUrl: serverAPIUrls.GET_SEARCH,

      searchDebounce: null, // Timeout for search bar debounce
      searchResults: [], // Displayed search results
      numHits: 0, // Total search results found
      searchOffset: 0 // Search result pagination offset
    };
  },
  methods: {
    /** Call API to search for inputted term */
    async search() {
      const response = await axios.get(`${this.baseUrl}/search`, {
        params: { term: this.searchTerm, offset: this.searchOffset }
      });
      this.numHits = response.data.hits.total;
      return response.data.hits.hits;
    },
    /** Get next page of search results */
    async nextResultsPage() {
      if (this.allCount > 10) {
        this.searchOffset += 10;
        if (this.searchOffset + 10 > this.allCount) {
          this.searchOffset = this.allCount - 10;
        }
        this.searchResponse = await this.search();
        document.documentElement.scrollTop = 0;
      }
    },
    /** Get previous page of search results */
    async prevResultsPage() {
      this.searchOffset -= 10;
      if (this.searchOffset < 0) {
        this.searchOffset = 0;
      }

      this.searchResponse = await this.search();
      document.documentElement.scrollTop = 0;
    }
  }
};
</script>

<style scoped>
.article-title {
  font-size: 23px;
  font-weight: bold;
  color: #00008e;
  text-decoration: none !important;
}
.article-preview {
  font-size: 18px;
}
.text-xs-left {
  margin-bottom: 2%;
  font-size: 16px;
}
.pagination-panel {
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: white;
}
</style>