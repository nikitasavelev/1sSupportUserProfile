<template>
    <header class="header pl-2">       
        <router-link to="/">
            <v-btn class="ma-0 link text-capitalize nostyle" depressed>
              Поиск
            </v-btn>
          </router-link>       
        
        <router-link to="/requests">
            <v-btn class="ma-0 link text-capitalize nostyle" depressed>
              Заявки
            </v-btn>   
        </router-link> 
      
        <router-link to="/profile">
            <v-btn class="ma-0 link text-capitalize nostyle" depressed>
              Профиль 
            </v-btn>
        </router-link>        
      
        <router-link to="/news">
            <v-btn class="ma-0 link text-capitalize nostyle" depressed>
              Новости
            </v-btn>
        </router-link>        
    </header>
</template>
<script>
export default {
  name: "HeaderComponent"
};
</script>
<style scoped>
.header {
  border: 1px solid gray;
  background-color: #ccc;
}
/*this selector is only for specificity*/
header.header .link.ma-0 {
  background-color: #ccc;
  border: 0;
}
.nostyle {
  text-decoration: none;
  color: inherit;
  font-size: 1.5rem;
}
</style>
