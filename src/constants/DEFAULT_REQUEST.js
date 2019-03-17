import Store from "Store/store.js";

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
  requestOptions.headers.Authorization = "Bearer " + Store.getters.getAuthorizationToken;
  return fetch(url, requestOptions)
    .then(res => res.json())
    .then(res => {
      if (modifyDataCallback instanceof Function) {
        modifyDataCallback(res.data);
      }
      return res.data;
    });
}
