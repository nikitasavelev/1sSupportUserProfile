<template>
    <button @click="login">Login</button>
</template>

<script>
import LoginService from "Services/LoginService.js";
export default {
  name: "LoginPage",
  components: {},
  data() {
    return {
        serverResponse:{},
        accessToken:"",
        role:"",
    };
  },
  methods:{
    async login(){
      this.serverResponse = await LoginService.login("000000000000","test");
      this.accessToken = this.serverResponse.accessToken;
      this.role = this.serverResponse.roleType.name;
      this.$store.dispatch("updateAuthorizationToken", this.accessToken);
      this.$store.dispatch("updateRole", this.role);
      this.$router.push({name: 'MainPage'});
    }
  }
};
</script>
