import Vue from "vue";
import Router from "vue-router";
import Store from "Store/store.js";
import DefaultPage from "Pages/Main/DefaultPage";
import MainPage from "Pages/Main/MainPage";
import ArticlePage from "Components/ArticlePage";
import ProfilePage from "Pages/Profile/ProfilePage";

import LoginPage from "Pages/Login/LoginPage";
import RegistrationPage from "Pages/Login/RegistrationPage";

import RequestsPage from "Pages/Requests/RequestsPage";
import RequestPage from "Pages/Requests/RequestPage";

import NewsPage from "Pages/News/NewsPage";
import SpecificNewsPage from "Pages/News/SpecificNewsPage";

import KpiPage from "Pages/KPI/KpiPage";
import SetKpiPage from "Pages/SetKPI/SetKpiPage";

import ArticlesMainPage from "Pages/Articles/ArticlesMainPage"

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "DefaultPage",
      component: DefaultPage,
      children: [
        {
          path: "",
          name: "MainPage",
          component: MainPage
        }
      ]
    },
    {
      path: "/login",
      component: LoginPage,
      name: "LoginPage"
    },
    {
      path: "/register",
      component: RegistrationPage,
      name: "RegistrationPage"
    },
    {
      path: "/articles/:articleId",
      component: ArticlePage,
      name: "ArticlePage",
      props: true
    },
    {
      path: "/profile",
      component: ProfilePage,
      name: "ProfilePage"
    },
    {
      path: "/kpi/:id",
      component: KpiPage,
      name: "KpiPage"
    },
    {
      path: "/set-kpi",
      component: SetKpiPage,
      name: "SetKpiPage"
    },

    /* Requests */

    {
      path: "/requests",
      component: RequestsPage,
      name: "RequestsPage"
    },
    {
      path: "/requests/:id",
      component: RequestPage,
      name: "RequestPage"
    },

    /* News */
    {
      path: "/news",
      component: NewsPage,
      name: "NewsPage"
    },
    {
      path: "/news/:id",
      component: SpecificNewsPage,
      name: "SpecificNewsPage"
    },
    {
      path: "/articles",
      component: ArticlesMainPage,
      name: "ArticlesMainPage"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (!Store.getters.getAuthorizationToken && to.path !== "/login" && to.path !== "/register") {
    next({ name: "LoginPage" });
  } else {
    next();
  }
});

export default router;
