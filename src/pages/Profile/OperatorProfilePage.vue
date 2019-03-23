<template>
    <v-container>
        Hello
    </v-container>
    
</template>
<script>
import UsersService from "Services/UsersService.js";
import ClientProfilePage from "./ClientProfilePage";

export default {
  name: "ProfilePage",
  props: {},
  components: {},
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
  }
};
</script>
<style scoped>
</style>
