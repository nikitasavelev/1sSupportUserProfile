<template>
  <div>
    <admin-articles-main-page v-if="Number(roleType) === roleTypes.Admin"/>
    <operator-articles-main-page v-if="Number(roleType) === roleTypes.Operator"/>
    <client-articles-main-page v-if="Number(roleType) === roleTypes.Client"/>
  </div>
</template>

<script>
import Store from "Store/store.js";
import AdminArticlesMainPage from "./AdminArticlesMainPage";
import OperatorArticlesMainPage from "./OperatorArticlesMainPage";
import ClientArticlesMainPage from "./ClientArticlesMainPage";
import { roleTypes } from "Constants/ROLE_TYPES.js";

export default {
  name: "ArticlesMainPage",
  components: {
    AdminArticlesMainPage,
    OperatorArticlesMainPage,
    ClientArticlesMainPage
    },
  data: () => ({
    roleType: 0,
    roleTypes: roleTypes
  }),
  methods: {},
  mounted() {
    this.roleType = Store.getters.getRoleType;
  }
};
</script>

<style>
</style>