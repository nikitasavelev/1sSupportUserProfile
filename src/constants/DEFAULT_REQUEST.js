import Store from "Store/store.js";
import Router from "../router/router";
import LoginService from "Services/LoginService";

export const defaultRequestOptions = Object.freeze({
  headers: {
    "Content-Type": "text/plain"
  },
  mode: "cors",
  cache: "default"
});

/**
 *
 * @param {string} url url to fetch
 * @param {object} requestOptions object with options for request
 * @param {function} modifyDataCallback if data needs to be modified after getting response
 */
export async function requestToAPI(url, requestOptions = defaultRequestOptions, modifyDataCallback) {
  if (isAccessTokenExpired()) {
    const response = await LoginService.getNewAccessToken();
    if (response.code === "Ok"){
      updateStateAndLocalStorage(response.data);
    }
  }
  requestOptions.headers.Authorization = "Bearer " + Store.getters.getAuthorizationToken;
  return fetch(url, requestOptions)
    .then(res => res.json())
    .then(res => {
      if (modifyDataCallback instanceof Function) {
        res.data = modifyDataCallback(res.data);
      }
      return res.data;
    });
}

function updateStateAndLocalStorage(response) {
  if (response.expires && response.accessToken && response.refreshToken && response.role) {
    localStorage.setItem("expires", response.expires);
    localStorage.setItem("token", response.accessToken);
    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("role", response.role);

    Store.dispatch("updateAuthorizationToken", response.accessToken);
    Store.dispatch("updateRole", response.role);
  }
}

// if "expires" is presented in localStorage, then
// check if token is expired, redirect to loginPage otherwise
function isAccessTokenExpired() {
  if (localStorage.getItem("expires")) {
    const expirationDate = Number(localStorage.getItem("expires"));
    const currentDate = new Date().valueOf();
    return !(expirationDate > currentDate);
  } else {
    Router.push({ name: "LoginPage" });
  }
}
