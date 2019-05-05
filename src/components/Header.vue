<template>
  <nav class="border" role="navigation">
    <header role="banner"> 
      <v-tabs
        color="white"
        dark
        class="header"
        centered
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
      <div class="right-icons">
        <span class="exit pa-2 ml-5 mt-1 mr-2" @click="logout">
          <v-icon dark class="dark">exit_to_app</v-icon>
        </span>
      </div>
    </header>    
  </nav>
</template>
<script>
import { pagesConfig } from "Constants/PAGES_CONFIG.js";
import LoginService from "Services/LoginService";
export default {
  name: "HeaderComponent",
  data() {
    return {
      currentLink: "",
      active: null,
      roleType: 0,
      pages: []
    };
  },
  methods: {
    goToPage(path) {
      this.currentLink = path;
      if (this.currentLink === "/kpi") {
        this.$router.push({
          name: "KpiPage",
          params: { id: String(this.$store.getters.getUserId) }
        });
      } else {
        this.$router.push(path);
      }
    },
    setActive() {
      let index;
      this.pages.forEach((page, i) => {
        if (page.link === this.currentLink) {
          index = i;
        }
      });
      this.active = index;
    },
    async logout() {
      await LoginService.logout();
      this.$router.push({ name: "LoginPage" });
    }
  },
  mounted() {
    /*after page is reloaded current selected tab is reset. This code sets current tab*/
    this.roleType = this.$store.getters.getRoleType;
    this.pages = pagesConfig[this.roleType];
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
nav {
  position: relative;
}
header {
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: center;
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
  align-self: flex-end;
}

.right-icons {
  position: absolute;
  right: 0px;
  top: 0.5rem;
}

.exit {
  cursor: pointer;
  justify-self: flex-end;
}

.exit.pa-2 .dark {
  color: #000;
}
</style>
