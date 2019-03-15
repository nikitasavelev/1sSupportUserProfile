import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authorizationToken: "",
    sessionId: ""
  },
  mutations: {
    setAuthorizationToken(state, token) {
      state.authorizationToken = token;
      localStorage.setItem("token", token);
    },
    setSessionId(state, sessionId) {
      state.sessionId = sessionId;
    }
  },
  getters: {
    getAuthorizationToken: state => {
      if (state.authorizationToken !== "") return state.authorizationToken;
      if (localStorage.getItem("token") !== null) {
        state.authorizationToken = localStorage.getItem("token");
        return state.authorizationToken;
      }
      return "";
    }
  },
  actions: {
    updateAuthorizationToken(context, newToken) {
      context.commit("setAuthorizationToken", newToken);
    },
    updateSessionId(context, newSessionId) {
      context.commit("setSessionId", newSessionId);
    }
  }
});
