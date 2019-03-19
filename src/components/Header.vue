<template>
  <nav class="border">
    <header> 
      <v-tabs
        centered
        color="white"
        dark
        class="header"
        v-model="active"        
      >
        <v-tabs-slider color="#2f80ed"></v-tabs-slider>

        <v-tab v-for="page in pages"
           :key="page.caption"
           @click="goToPage(page.link)"
           class="link pa-0"
           :class="{isActive: page.link === currentLink, isNews: page.link === '/news'}"           
           >
          {{page.caption}}
        </v-tab>

      </v-tabs>
    </header>    
  </nav>
</template>
<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      pages: [
        {
          link: "/",
          caption: "Поиск"
        },
        {
          link: "/requests",
          caption: "Обращения"
        },
        {
          link: "/profile",
          caption: "Профиль"
        },
        {
          link: "/news",
          caption: "Новости"
        }
      ],
      currentLink: "",
      active: null
    };
  },
  methods: {
    goToPage(path) {      
      this.currentLink = path;
      this.$router.push(path);
    }
  }
};
</script>
<style scoped>

/*this selector is only for specificity*/
nav header .link.pa-0 {
  color: black;
}

header {
  border-bottom: 1px solid gray;
}

nav header .isActive.link.pa-0 {
  color: #2f80ed;
}

.nostyle {
  text-decoration: none;
  color: inherit;
  font-size: 1.5rem;
}

.link.pa-0.isNews {
  margin-right:0; 
  margin-left: 40%;
}
</style>
