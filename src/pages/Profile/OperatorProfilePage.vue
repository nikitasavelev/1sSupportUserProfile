<template>
    <v-container>
        Hello
    </v-container>
    
</template>
<script>
import UsersService from "Services/UsersService.js";

export default {
  name: "OperatorProfilePage",
  props: {},
  components: {},
  data() {
    return {
      profileData: {},
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
