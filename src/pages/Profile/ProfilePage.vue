<template>
    <div class="pa-2 px-5">
      <client-profile-page v-if="Number(roleType) === roleTypes.Client"></client-profile-page>
      <operator-profile-page v-if="Number(roleType) === roleTypes.Operator"></operator-profile-page>
      <admin-profile-page v-if="Number(roleType) === roleTypes.Admin"></admin-profile-page>
    </div>
</template>
<script>
import Store from "Store/store.js";
import ClientProfilePage from "./ClientProfilePage/ClientProfilePage";
import OperatorProfilePage from "./OperatorProfilePage/OperatorProfilePage";
import AdminProfilePage from "./AdminProfilePage/AdminProfilePage";
import { roleTypes } from "Constants/ROLE_TYPES.js";

export default {
  name: "ProfilePage",
  props: {},
  components: {
    ClientProfilePage,
    OperatorProfilePage,
    AdminProfilePage
  },
  data() {
    return {
      profileData: {},
      news: {},
      roleType: 0,
      roleTypes: roleTypes,
    };
  },
  methods: {},
  async mounted() {
    this.roleType = Store.getters.getRoleType;
  }
};
</script>
<style scoped>
</style>
