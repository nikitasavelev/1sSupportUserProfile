import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";
import formatDate from "Constants/FORMAT_DATE.js";

class NewsService {
  async getNews() {
    return requestToAPI(serverAPIUrls.GET_NEWS, undefined, data => {
      data.forEach(news => {
        news.createdDate = formatDate(news.createdDate);
      });
    });
  }
}
export default new NewsService();
