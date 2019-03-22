import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";
import formatDate from "Constants/FORMAT_DATE.js";

class NewsService {
  async getNews() {
    return requestToAPI(serverAPIUrls.GET_NEWS, undefined, data => {
      data.forEach(news => {
        news.createdDate = formatDate(news.createdDate);
      });
      return data;
    });
  }
  async getSpecificNews(newsId = 1) {
    return requestToAPI(`${serverAPIUrls.SUPPORT_QUESTIONS}/${newsId}`, undefined, data => {
      data.createdDate = formatDate(data.createdDate);
      return data;
    });
  }
}
export default new NewsService();
