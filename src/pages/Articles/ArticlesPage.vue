<template>
  <div class="d-art">
    <v-container fluid class="pa-0">
      <v-flex class="pa-3">
        <router-link to="/articles" style="text-decoration: none;">Главная</router-link>
      </v-flex>
      <v-layout row wrap>
        <v-flex xs4 grey lighten-3>
          <articles-nav @set-article="setArticle" ref="foo"/>
        </v-flex>
        <v-flex xs8 class="pa-4" style="border-top: 1px solid #EEEEEE">
          <div v-if="this.article !== ''" class="article" v-html="article[index].text"></div>
          <div v-else>
            <ul v-for="item in items" :key="item.id">
              <tree-item class="primary--text" :item="item"/>
            </ul>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ArticlesService from "Services/ArticlesService.js";
import ArticlesNav from "./ArticlesNav";
import TreeItem from "./TreeItem";

export default {
  name: "ArticlesPage",
  components: {
    ArticlesNav,
    TreeItem
  },
  data: () => ({
    article: "",
    index: 0,
    items: []
  }),
  methods: {
    setArticle(data) {
      this.article = data.article;
    }
  },
  async mounted() {
    this.items = await ArticlesService.getItems(this.$route.params.id);
  }
};
</script>

<style scoped>
.d-art {
  background-color: #fcfcfc;
}
.article >>> h2,
.article >>> b,
.article >>> h3,
.article >>> h4,
.article >>> h5,
.article >>> h6 {
  color: #333333;
}
.article >>> h2 {
  margin-top: 10px;
}
.article >>> h2.header {
  font-size: 100%;
  font-weight: normal;
}
.article >>> a {
  color: #003399;
  text-decoration: none;
}
.article >>> a:hover {
  color: #003399;
  text-decoration: underline;
}
.article >>> a:visited {
  color: #004eeb;
}
.article >>> #actinfo,
.article >>> .header {
  font-family: RobLig;
}
.article >>> #actinfo p {
  margin-top: 0px;
  margin-bottom: 0px;
}
.article >>> ul li {
  list-style: disc;
}
.article >>> ol,
.article >>> ul {
  padding-left: 50px;
}
.article >>> ol ul,
.article >>> ul ol,
.article >>> ul ul,
.article >>> ol ol {
  padding-left: 25px;
}
.article >>> #sova_new,
.article >>> #sova {
  float: left;
  margin-top: 5px;
  margin-right: 10px;
}
.article >>> .annotation,
.article >>> .dopolnitelno {
  float: right;
  border-left: solid #dfdfdf 1px;
  width: 30%;
  padding-left: 20px;
  margin-left: 20px;
}
.article >>> div.dir {
  margin-left: 20px;
}
.article >>> div.dir p {
  text-indent: -20px;
}
.article >>> div.dir img {
  vertical-align: bottom;
  margin: 0 3pt 0 0;
}
.article >>> .list li {
  list-style: none;
}
.article >>> li.list {
  list-style: none;
}
.article >>> .sample,
.article >>> .Primer {
  border-left: solid #dfdfdf 1px;
  padding-left: 20px;
}
.article >>> .vnimanie {
  color: #004eeb;
}
.article >>> table {
  border-collapse: collapse;
  border-color: #bfbfbf;
  margin-top: 10px;
  margin-bottom: 10px;
}
.article >>> th {
  border-color: #bfbfbf;
}
.article >>> td {
  border-color: #bfbfbf;
  padding: 10px;
}
.article >>> blockquote p {
  margin-top: 10px;
  margin-bottom: 10px;
}
.article >>> .Primehanie {
  font-size: 90%;
}
.article >>> hr {
  border: none;
  color: #dfdfdf;
  background-color: #dfdfdf;
  height: 1px;
  width: 30%;
  margin-bottom: 10px;
}
.article >>> .recommendation {
  margin-top: 10px;
}
.article >>> h4,
.article >>> h5,
.article >>> h6 {
  font-size: 100%;
}
.article >>> .note,
.article >>> .Vnimanie {
  border: solid 1px red;
  margin: 20px 100px;
  padding: 15px;
  text-align: center;
}
.article >>> .note p {
  margin: 0px;
}
.article >>> #actually {
  font-family: RobLig;
  color: red;
}
.article >>> #actually b {
  color: red;
  font-weight: normal;
}
.article >>> ul,
.article >>> ol {
  margin-bottom: 10px;
}

.article >>> .formula {
  margin-bottom: 15px;
  margin-left: 20px;
  width: 30%;
  background-color: #dfdfdf;
  font-style: italic;
}

.article >>> .formula p {
  padding: 10px;
  margin: 0px;
}
.article >>> .obnovlenie {
  color: #333333;
  font-size: 140%;
}
</style>
