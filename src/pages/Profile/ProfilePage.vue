<template>
    <div class="pa-2 px-5 profile-page">
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
    </div>
</template>
<script>
import UsersService from "Services/UsersService.js";
import SupportAgents from "./SupportAgents";
export default {
  name: "ProfilePage",
  props: {},
  components: { SupportAgents },
  data() {
    return {
      profileData: {}
    };
  },
  methods: {},
  async mounted() {
    this.profileData = await UsersService.getUserInfo();
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

.profile-page{
  color: #909090;
  font-size: 1.6rem;
}

hr{
  height: 1px;
}

.subheader{
  color:#363636;
}
</style>
