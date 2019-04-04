<template>
    <v-layout row wrap>
        <v-flex xs9 class="left-side">
            <div v-if="profileData.companyInfo" class="mx-5">
              <span class="text-uppercase subheader py-2">Профиль организации {{profileData.companyInfo.companyName}}</span>
              <hr>
              <v-layout column class="pa-2 client-profile-page-info">
                <div>ИНН: {{profileData.companyInfo.inn}}</div>
                <div>КПП: {{profileData.companyInfo.kpp}}</div>
                <div>Логин в 1С: {{profileData.oneCPortalAuthInfo.login}}</div>
                <div>Тип договора: {{profileData.oneCPortalAuthInfo.agreement}}</div>
                <div>
                  Дата истечения договора: {{profileData.oneCPortalAuthInfo.expiresDate}}
                </div>
              </v-layout>
              <hr>
              <div class="text-uppercase subheader py-2">Мои продукты</div>
              <hr>
              <div v-for="product in profileData.products" :key="product.name" class="d-inline-block mx-2">
                <img :src="product.imageUrl" class="product-image" alt="image of product">
                <div class="client-profile-page-product-name">{{product.name}}</div>
                <p class="client-profile-page-check-updates"
                  title="check updates for product"
                  @click="checkUpdates(product.url)"
                >
                  Проверить обновления
                </p>
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
import Store from "Store/store.js";
import SideNews from "Components/SideNews";

export default {
  name: "ClientProfilePage",
  props: {},
  components: { SideNews },
  data() {
    return {
      profileData: {},
      news: {},
      role: ""
    };
  },
  methods: {
    checkUpdates(url) {
      window.open(url, "_blank");
    }
  },
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
  color: #333333;
  font-family: Open Sans;
  font-size: 1.25rem;
  line-height: 1.25rem;
}

.left-side {
  border-right: 1px solid gray;
}

.product-image {
  height: 150px;
  width: 150px;
}

.client-profile-page-info {
  font-family: Open Sans;
  font-size: 1rem;
  color: #4f4f4f;
}

.client-profile-page-product-name {
  font-family: Open Sans;
  font-size: 1rem;
  color: #333333;
}

.client-profile-page-check-updates {
  font-family: Open Sans;
  font-size: 0.875rem;
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}
</style>
