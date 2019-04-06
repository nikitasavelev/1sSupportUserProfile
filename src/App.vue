<template>
  <v-app id="app" style="background-color:white">
    <header-component v-if="this.$store.getters.getAuthorizationToken">
    </header-component>
    <keep-alive include="DefaultPage">
      <router-view/>
    </keep-alive>
  </v-app>
</template>

<script>
import HeaderComponent from "Components/Header";
export default {
  name: "App",
  components: { HeaderComponent }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html,
body {
  font-size: 16px !important;
}
.clearfix::after {
  display: table;
  content: "";
  clear: both;
}
</style>
