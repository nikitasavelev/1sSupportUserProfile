import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authorizationToken: "",
    sessionId: "",
    role: "",
  },
  mutations: {
    setAuthorizationToken(state, token) {
      state.authorizationToken = token;
      localStorage.setItem("token", token);      
    },
    setSessionId(state, sessionId) {
      state.sessionId = sessionId;
    },
    setRole(state, role){
      state.role = role;
      localStorage.setItem("role", role);
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
    },    
    getRole: state => {
      if (state.role !== "") return state.role;
      if (localStorage.getItem("role") !== null) {
        state.role = localStorage.getItem("role");
        return state.role;
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
    },
    updateRole(context, newRole) {
      context.commit("setRole", newRole);
    }
  }
});
