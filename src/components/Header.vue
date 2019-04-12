<template>
  <nav class="border" role="navigation">
    <header role="banner"> 
      <v-tabs
        centered
        color="white"
        dark
        class="header"
        v-model="active"        
      >
        <v-tabs-slider color="#003399"></v-tabs-slider>
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
import { pagesConfig } from "Constants/PAGES_CONFIG.js";
export default {
  name: "HeaderComponent",
  data() {
    return {
      currentLink: "",
      active: null,
      role: "",
      pages: []
    };
  },
  methods: {
    goToPage(path) {
      this.currentLink = path;
      this.$router.push(path);
    },
    setActive() {
      let index;
      this.pages.forEach((page, i) => {
        if (page.link === this.currentLink) {
          index = i;
        }
      });
      this.active = index;
    }
  },
  mounted() {
    /*after page is reloaded current selected tab is reset. This code sets current tab*/
    this.role = this.$store.getters.getRole;
    this.pages = pagesConfig[this.role];
    this.currentLink = `/${this.$router.history.current.path.split("/")[1]}`;
    this.setActive();
  },
  watch: {
    $route(to, from) {
      if (to.path.split("/")[1] !== from.path.split("/")[1]) {
        this.currentLink = `/${to.path.split("/")[1]}`;
        this.setActive();
      }
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
  color: #003399;
}

.link {
  font-family: Open Sans;
  font-size: 1.25rem;
}

.nostyle {
  text-decoration: none;
  color: inherit;
  font-size: 1.5rem;
}

.link.pa-0.isNews {
  margin-right: 0;
  margin-left: 40%;
}
</style>
