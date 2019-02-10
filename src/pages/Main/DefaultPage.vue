<template>
  <div>
    <toolbar/>
    <keep-alive include="MainPage">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import MainPage from './MainPage'
import Toolbar from 'Components/Toolbar'
export default {
  name: "DefaultPage",
  components: { Toolbar, MainPage }
};
</script>

<style scoped="">
</style>
