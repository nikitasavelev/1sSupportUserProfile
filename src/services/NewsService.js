import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import Store from "Store/store.js";
import { defaultRequestOptions } from "Constants/DEFAULT_REQUEST_OPTIONS.js";

class NewsService {
  async getNews() {
    const requestOptions = defaultRequestOptions;
    requestOptions.headers.Authorization =
      "Bearer " + Store.state.authorizationToken;
    return fetch(serverAPIUrls.GET_NEWS, requestOptions)
      .then(res => res.json())
      .then(res => {
        return res.data;
      });
  }
}
export default new NewsService();
