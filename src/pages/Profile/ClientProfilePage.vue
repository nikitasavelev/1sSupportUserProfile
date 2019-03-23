<template>
    <v-layout row wrap>
        <v-flex xs9 class="left-side">
            <div v-if="profileData.companyInfo" class="mx-5">
            <span class="text-uppercase subheader">Профиль организации {{profileData.companyInfo.companyName}}</span>
            <hr>
            <div>ИНН: {{profileData.companyInfo.inn}}</div>
            <div>КПП: {{profileData.companyInfo.kpp}}</div>
            <div>Логин в 1С: {{profileData.oneCPortalAuthInfo.login}}</div>
            <div>Тип договора: {{profileData.oneCPortalAuthInfo.agreement}}</div>
            <div>Дата истечения договора: {{profileData.oneCPortalAuthInfo.agreement}}</div>
            <hr>
            <div class="text-uppercase subheader">Мои продукты</div>
            <hr>
            <div v-for="product in profileData.products" :key="product.name" class="d-inline-block mx-2">
                <img src="">
                <div>{{product.name}}</div>
                <a :href="product.url">Проверить обновления</a>
            </div>
            </div>
            <v-layout v-else justify-center mt-5>
                <v-progress-circular
                    :size="70"
                    :width="7"
                    color="primary"
                    indeterminate
                    ></v-progress-circular>
            </v-layout>
        </v-flex>
        <v-flex xs3 class="right-side">
            <news-item v-for="n in news" :news="n" :key="n.title"></news-item>
            <v-btn class="text-none center">Показать все новости</v-btn>
        </v-flex>  
    </v-layout>
</template>
<script>
import UsersService from "Services/UsersService.js";
import SupportAgents from "./SupportAgents";
import NewsService from "Services/NewsService.js";
import NewsItem from "../News/NewsItem";
import Store from "Store/store.js";

export default {
  name: "ClientProfilePage",
  props: {},
  components: { SupportAgents, NewsItem },
  data() {
    return {
      profileData: {},
      news: {},
      role: ""
    };
  },
  methods: {},
  async mounted() {
    this.profileData = await UsersService.getUserInfo();
    this.news = await NewsService.getNews();
    this.role = Store.getters.getRole;
  }
};
</script>
<style scoped>
.border {
  border: 1px solid gray;
}
th,
td {
  padding: 10px;
}
.mw-50wv {
  max-width: 50vw;
}

.column {
  width: 100%;
}

.profile-page {
  color: #909090;
  font-size: 1.6rem;
}

hr {
  height: 1px;
}

.right-side {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-between;
  align-items: center;
}

.subheader {
  color: #363636;
}

.left-side {
  border-right: 1px solid gray;
}
</style>
