<template>
  <div class="art">

    <!-- логотип и версии статей -->
    <div class="header-logo">
        <v-layout align-end fill-height>
          <v-flex xs3 offset-xs1>
            <img class="img-logo" src="@/assets/logo.png"/>
          </v-flex>
          <!-- версии статей -->
          <v-flex xs7>
            <div class="vers">
              <a 
                v-for="(version, index) in article"
                :key="version.id"
                @click="setCurrentVersion(index)"
                class="ml-3 version"
                :class="{activeVersion: version.articleId === currentArticle.articleId}"
               >                
                Версия {{index+1}}
              </a>
            </div>
          </v-flex>
        </v-layout>
    </div>
    
    <!-- название страницы -->
    <v-container class="titl">
      <v-layout align-center justify-space-between row>
        <v-flex xs1>
          <img src="@/assets/ic_arrow_back_24px.png" @click="goBack" class="goBack"/>
        </v-flex>
        <v-flex xs10>          
          <div v-if="currentArticle != ''" class="ar-name text-xs-center" v-html="currentArticle.title"></div>
        </v-flex>
        <v-flex xs1>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- черта-->
    <dir class="my-hr"></dir>

    <!-- статья -->
    <div class="d-art">
      <v-container>        
        <div v-if="currentArticle != ''" class="article" v-html="currentArticle.text"></div>
      </v-container>
    </div>

    <!-- черта если блок оценка статей не зафиксирован -->
    <!-- <dir class="my-hr"></dir> -->

    <!--  если блок оценка статей зафиксирован -->
    <dir class="my-br"></dir>

    <!-- оценка статьи пользователем -->
    <v-footer
      height="auto"
      fixed
      color="white"
    >
      <v-layout justify-center>
        <div class="feedback text-xs-center">
          <p class="fb-que">Помогла ли вам информация из этой статьи?</p>
          <div v-if="rating == '0'" class="fb-answ">Нажмите, чтобы оценить</div>
          <div v-if="rating == '1'" class="fb-answ">Не помогла совсем</div>
          <div v-if="rating == '2'" class="fb-answ">Не помогла, но стало ясно в какую сторону думать</div>
          <div v-if="rating == '3'" class="fb-answ">Помогла, но было сложно найти ответ</div>
          <div v-if="rating == '4'" class="fb-answ">Помогла достаточно быстро</div>
          <div v-if="rating == '5'" class="fb-answ">Моментально помогла</div>
          <v-rating
            v-model="rating"
            :hover="true"
            color="#003399"
            large          
          ></v-rating>
          <div v-if="rating == '0'"><br></div>
          <div v-if="rating != '0'">Спасибо, Ваша оценка принята! Вы по-прежнему можете изменить оценку</div>
        </div>
      </v-layout>
    </v-footer>

  </div>
</template>


<script>
import axios from "axios";
import ModalComponent from "./ModalComponent";
import ArticlesService from "Services/ArticlesService.js";
import { serverAPIUrls } from "Constants/SERVER_API_URLS";
export default {
  name: "ArticlePage",
  components: { ModalComponent },
  props: {
    articleId: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      token: this.$store.state.authorizationToken,
      rating: 0,
      currentArticle: {},
      article: ""
    };
  },
  methods: {
    setCurrentVersion(index) {
      this.currentArticle = this.article[index];
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  },
  async mounted() {
    this.token = localStorage.getItem("authorizationToken");
    this.article = await ArticlesService.getArticle(this.articleId);
    this.currentArticle = this.article[0];
  },

  async beforeDestroy() {
    if (rating != 0) {
      ArticlesService.sendArticlerating(artId, rating);
    }
  }
};
</script>


<!-- "scoped" нужно что бы CSS действовало только на этот компонент -->
<style scoped>
.article {
  font-family: RobReg, "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
/*стили для всей страницы*/
.art {
  background: white;
  color: #6a6a6a;
  font-family: RobReg;
}
/*стили для логотипа*/
.header-logo {
  height: 150px;
  padding-bottom: 20px;
  margin-top: 0%;
  background: rgb(175, 175, 175);
  background: linear-gradient(
    180deg,
    rgba(213, 213, 225, 1) 0%,
    rgba(228, 228, 235, 1) 50%,
    rgba(255, 255, 255, 1) 100%
  );
}
.img-logo {
  padding-bottom: 15px;
  width: 80%;
  height: auto;
}
/*стили для названия статьи*/
.ar-name {
  color: #333333;
  font-size: 26px;
}
.titl {
  padding-bottom: 10px;
  padding-top: 5px;
  background-color: white;
}
/*стили для черты под названием статьи*/
.my-hr {
  border-top: solid #dfdfdf 1px;
  width: 100%;
}
/*стили для оценки статьи*/
.fb-answ {
  color: #003399;
  font-size: 18px;
}
.feedback {
  padding-top: 20px;
  padding-bottom: 15px;
  /*если блок оценка статей зафиксирован*/
  border-top: solid #dfdfdf 1px;
  width: 100%;
}
.fb-que {
  color: #333333;
  font-size: 24px;
  margin-bottom: 10px;
}
/*если блок оценка статей зафиксирован*/
.my-br {
  height: 190px;
  background-color: #fcfcfc;
}

/*стили для статей*/
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
/*.article >>> .formula {
    border: solid 1px #BFBFBF;
    margin-left: 20px;
    margin-bottom: 10px;
    width: 30%;
    font-style: italic;
  }*/

.article >>> .formula {
  margin-bottom: 15px;
  margin-left: 20px;
  width: 30%;
  background-color: #dfdfdf;
  font-style: italic;
}
/*.article >>> .formula {
    font-style: italic;
    margin-bottom: 15px;
    margin-left: 20px;
    width: 30%;
    font-style: italic;
  }*/
.article >>> .formula p {
  padding: 10px;
  margin: 0px;
}
.article >>> .obnovlenie {
  color: #333333;
  font-size: 140%;
}

.vers {
  display: flex;
  justify-content: flex-end;
}

.version {
  font-size: 1.2rem;
  color: gray;
}

.activeVersion {
  color: #004eeb;
}

.goBack {
  cursor: pointer;
}
</style>


<style>
@font-face {
  font-family: RobReg;
  src: url(../assets/fonts/roboto/Roboto-Regular.woff2);
}
@font-face {
  font-family: RobBold;
  src: url(../assets/fonts/roboto/Roboto-Bold.woff2);
}
@font-face {
  font-family: RobThin;
  src: url(../assets/fonts/roboto/Roboto-Thin.woff2);
}
@font-face {
  font-family: RobMed;
  src: url(../assets/fonts/roboto/Roboto-Medium.woff2);
}
@font-face {
  font-family: RobLig;
  src: url(../assets/fonts/roboto/Roboto-Light.woff2);
}
</style>