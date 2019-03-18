import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";

class ArticlesService {
  async getArticle(articleId) {
    return requestToAPI(`${serverAPIUrls.GET_ARTICLE}/${articleId}`);
  }

  async sendArticlerating(articleId, rating) {
    let requestOptions = {
      method: "post",
      data: {
        articleId: articleId,
        mark: rating
      }
    };
    return requestToAPI(serverAPIUrls.SET_ARTICLES_MARKS, requestOptions);
  }
}
export default new ArticlesService();
