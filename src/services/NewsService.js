import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import Store from "Store/store.js";
import { defaultRequestOptions } from "Constants/DEFAULT_REQUEST_OPTIONS.js";
import formatDate from "Constants/FORMAT_DATE.js";

class NewsService {
  async getNews() {
    const requestOptions = defaultRequestOptions;
    requestOptions.headers.Authorization = "Bearer " + Store.getters.getAuthorizationToken;
    return fetch(serverAPIUrls.GET_NEWS, requestOptions)
      .then(res => res.json())
      .then(res => {
        res.data.forEach(news => {
          news.createdDate = formatDate(news.createdDate);
        });
        return res.data;
      });
  }
}
export default new NewsService();
