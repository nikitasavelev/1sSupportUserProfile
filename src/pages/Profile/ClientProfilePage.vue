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
                <img :src="product.imageUrl" class="product-image">
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
        <side-news></side-news> 
    </v-layout>
</template>
<script>
import UsersService from "Services/UsersService.js";
import SupportAgents from "./SupportAgents";
import Store from "Store/store.js";
import SideNews from "Components/SideNews";

export default {
  name: "ClientProfilePage",
  props: {},
  components: { SupportAgents, SideNews },
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
    this.role = Store.getters.getRole;
  }
};
</script>
<style scoped>
hr {
  height: 1px;
}

.subheader {
  color: #363636;
}

.left-side {
  border-right: 1px solid gray;
}

.product-image {
  height: 150px;
  width: 150px;
}
</style>
