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
 * @param {object} options common object for request
 * possible properties of this object:
 *    @param {url} string url to fetch
 *    @param {object} headers request headers
 *    @param {method} string HTTP-method
 *    @param {body} object request body *
 *    @param {function} modifyDataCallback callback if data needs to be modified after getting response
 */
export async function requestToAPI(options) {
  if (isAccessTokenExpired()) {
    const response = await LoginService.getNewAccessToken();
    updateStateAndLocalStorage(response.data);
  }
  setParams(options);
  return fetch(options.url, options.requestOptions)
    .then(res => res.json())
    .then(res => {
      if (options.modifyDataCallback instanceof Function) {
        res.data = options.modifyDataCallback(res.data);
      }
      return res.data;
    });
}

function updateStateAndLocalStorage(response) {
  if (response.expires && response.accessToken && response.refreshToken && response.role) {
    localStorage.setItem("expires", response.expires);
    localStorage.setItem("authorizarionToken", response.accessToken);
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

// if specific param is provided it's set
// default param is set otherwise
function setParams(options) {
  options.requestOptions = {};
  options.requestOptions = {
    headers: {
      Authorization: "Bearer " + Store.getters.getAuthorizationToken
    },
    mode: options.requestOptions.mode || "cors",
    cache: options.requestOptions.cache || "default"
  };
  if (options.headers) {
    options.requestOptions.headers["Content-Type"] = options.headers["Content-Type"] || "text/plain";
  }
  if (options.body) {
    options.requestOptions.body = JSON.stringify(options.body);
  }
  if (options.method) {
    options.requestOptions.method = options.method;
  }
}
