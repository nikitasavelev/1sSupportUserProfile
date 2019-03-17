<template>
    <div class="mw-50wv pa-2">
        <div v-if="profileData.companyInfo">
            <span>{{profileData.companyInfo.companyName}}</span>
            <span class="pa-1 ml-2 border">{{profileData.companyInfo.inn}}</span>
            <span class="pa-1 border">{{profileData.companyInfo.kpp}}</span>
            <v-layout class="mt-2">{{profileData.companyInfo.contactPersonName}}</v-layout>
           
           <v-layout row>
                <support-agents :agents="profileData.supportInfo.managers" :role="'Менеджер'"></support-agents>
                <support-agents :agents="profileData.supportInfo.consultants" :role="'Консультант'"></support-agents>
           </v-layout>

            <div class="d-inline-block">
                <div class="border mt-3 pl-1">
                    Логин {{profileData.oneCPortalAuthInfo.login}}
                    <v-btn class="text-capitalize">Восстановить пароль к порталу</v-btn>
                </div>
                <div class="border pl-1">
                    {{profileData.oneCPortalAuthInfo.agreement}}
                    <v-btn class="text-capitalize">Продлить</v-btn>
                </div>
            </div>

            <table class="border mt-2" rules="all">
                <thead>
                    <tr>
                        <th>Мои продукты</th>
                        <th>Ссылка на обновление</th>
                    </tr>
                </thead>
                <tr v-for="product in profileData.products" :key="product.name">
                    <td>{{product.name}}</td>
                    <td><a>{{product.url}}</a></td>
                </tr>           
            </table>
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
</style>
