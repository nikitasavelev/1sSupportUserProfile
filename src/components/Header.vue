<template>
    <header class="header pl-2">
        <v-btn class="ma-0 link text-capitalize" depressed>
             <router-link to="/" class="nostyle">Поиск</router-link>
        </v-btn>
        <v-btn class="ma-0 link text-capitalize" depressed>
            <router-link to="/requests" class="nostyle">Заявки</router-link>
        </v-btn>
        <v-btn class="ma-0 link text-capitalize" depressed>
            <router-link to="/profile" class="nostyle">Профиль</router-link>
        </v-btn>
        <v-btn class="ma-0 link text-capitalize" depressed>
            <router-link to="/news" class="nostyle">Новости</router-link>
        </v-btn>
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
header.header > .link.ma-0 {
  background-color: #ccc;
  border: 0;
}
.nostyle{
    text-decoration: none;
    color: inherit;
    font-size: 1.5rem;
}
</style>
