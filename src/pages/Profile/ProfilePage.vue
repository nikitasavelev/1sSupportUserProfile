<template>
    <div class="pa-2 px-5 profile-page">
      <client-profile-page v-if="role === 'Client'"></client-profile-page>
      <operator-profile-page v-if="role === 'Operator'"></operator-profile-page>
    </div>
</template>
<script>
import UsersService from "Services/UsersService.js";
import SupportAgents from "./SupportAgents";
import NewsService from "Services/NewsService.js";
import NewsItem from "../News/NewsItem";
import Store from "Store/store.js";
import ClientProfilePage from "./ClientProfilePage";
import OperatorProfilePage from "./OperatorProfilePage";

export default {
  name: "ProfilePage",
  props: {},
  components: {
    SupportAgents,
    NewsItem,
    ClientProfilePage,
    OperatorProfilePage
  },
  data() {
    return {
      profileData: {},
      news: {},
      role: ""
    };
  },
  methods: {},
  async mounted() {
    this.role = Store.getters.getRole;
  }
};
</script>
<style scoped>
.profile-page {
  color: #909090;
  font-size: 1.6rem;
}
</style>
