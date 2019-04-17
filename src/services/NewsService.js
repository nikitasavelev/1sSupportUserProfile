import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";
import formatDate from "Constants/FORMAT_DATE.js";

class NewsService {
  async getNews() {
    return requestToAPI({
      url: serverAPIUrls.GET_NEWS,
      modifyDataCallback: data => {
        data.forEach(news => {
          news.createdAt = formatDate(news.createdAt);
        });
        return data;
      }
    });
  }

  async getNewsShortPreviews(offset = 0, count = 5) {
    return requestToAPI({
      url: `${serverAPIUrls.GET_NEWS_SHORT_PREVIEWS}?offset=${offset}&count=${count}`,
      modifyDataCallback: data => {
        data.forEach(news => {
          news.createdAt = formatDate(news.createdAt);
        });
        return data;
      }
    });
  }

  async getNewsPreviews(offset = 0, count = 2) {
    return requestToAPI({
      url: `${serverAPIUrls.GET_NEWS_PREVIEWS}?offset=${offset}&count=${count}`,
      modifyDataCallback: data => {
        data.forEach(news => {
          news.createdAt = formatDate(news.createdAt);
        });
        return data;
      }
    });
  }

  async getSpecificNews(newsId = 1) {
    return requestToAPI({
      url: `${serverAPIUrls.GET_NEWS}/${newsId}`,
      modifyDataCallback: data => {
        data.createdAt = formatDate(data.createdAt);
        return data;
      }
    });
  }

  async markNews(newsId, mark) {
    return requestToAPI({
      url: `${serverAPIUrls.GET_NEWS}/${newsId}${serverAPIUrls.MARKS}`,
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: { mark }
    });
  }
}
export default new NewsService();
