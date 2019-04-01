import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";
import formatDate from "Constants/FORMAT_DATE.js";

class NewsService {
  async getNews() {
    return requestToAPI(serverAPIUrls.GET_NEWS, undefined, data => {
      data.forEach(news => {
        news.createdAt = formatDate(news.createdAt);
      });
      return data;
    });
  }

  async getNewsShortPreviews() {
    return requestToAPI(serverAPIUrls.GET_NEWS_SHORT_PREVIEWS, undefined, data => {
      data.forEach(news => {
        news.createdAt = formatDate(news.createdAt);
      });
      return data;
    });
  }

  async getNewsPreviews() {
    return requestToAPI(serverAPIUrls.GET_NEWS_PREVIEWS, undefined, data => {
      data.forEach(news => {
        news.createdAt = formatDate(news.createdAt);
      });
      return data;
    });
  }

  async getSpecificNews(newsId = 1) {
    return requestToAPI(`${serverAPIUrls.GET_NEWS}/${newsId}`, undefined, data => {
      data.createdAt = formatDate(data.createdAt);
      return data;
    });
  }
}
export default new NewsService();
