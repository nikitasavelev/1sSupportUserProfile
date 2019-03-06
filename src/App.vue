<template>
  <v-app id="app" style="background-color:white">
    <header-component></header-component>
    <keep-alive include="DefaultPage">
      <router-view/>
    </keep-alive>
  </v-app>
</template>

<script>
import ModalComponent from "Components/ModalComponent";
import Toolbar from "Components/Toolbar";
import HeaderComponent from "Components/Header";
export default {
  name: "App",
  components: { ModalComponent, Toolbar, HeaderComponent }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
