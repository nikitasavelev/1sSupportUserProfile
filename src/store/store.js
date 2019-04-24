import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authorizationToken: "",
    sessionId: "",
    role: "",
    userId: ""
  },
  mutations: {
    setAuthorizationToken(state, authorizationToken) {
      setValueAndAddToLocalStorage(state, "authorizationToken", authorizationToken);
    },
    setSessionId(state, sessionId) {
      state.sessionId = sessionId;
    },
    setRole(state, role) {
      setValueAndAddToLocalStorage(state, "role", role);
    },
    setUserid(state, userId) {
      setValueAndAddToLocalStorage(state, "userId", userId);
    }
  },
  getters: {
    getAuthorizationToken: state => {
      return getStoreValue(state, "authorizationToken");
    },
    getRole: state => {
      return getStoreValue(state, "role");
    },
    getUserId: state => {
      return getStoreValue(state, "userId");
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

function setValueAndAddToLocalStorage(state, name, value) {
  state[name] = value;
  localStorage.setItem(name, value);
}

/**
 *
 * @param {string} value
 * checks value in store, if it's presented then it's returned
 * if it's not localStorage is checked. Even if in localStorage
 * it isn't found empty String is returned
 */
function getStoreValue(store, value) {
  if (store[value] !== "") return store[value];
  if (localStorage.getItem(value) !== null) {
    store[value] = localStorage.getItem(value);
    return store[value];
  }
  return "";
}
