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

  async getNewsShortPreviews(offset = 0, count = 5) {
    return requestToAPI(`${serverAPIUrls.GET_NEWS_SHORT_PREVIEWS}?offset=${offset}&count=${count}`, undefined, data => {
      data.forEach(news => {
        news.createdAt = formatDate(news.createdAt);
      });
      return data;
    });
  }

  async getNewsPreviews(offset = 0, count = 2) {
    return requestToAPI(`${serverAPIUrls.GET_NEWS_PREVIEWS}?offset=${offset}&count=${count}`, undefined, data => {
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

  async markNews(newsId, mark) {
    const requestParameters = {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({ mark })
    };
    return requestToAPI(`${serverAPIUrls.GET_NEWS}/${newsId}${serverAPIUrls.MARKS}`, requestParameters);
  }
}
export default new NewsService();
