import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";

class ArticlesService {
  async getArticle(articleId) {
    return requestToAPI({
      url: `${serverAPIUrls.GET_ARTICLE}/${articleId}`
    });
  }

  async getFolders(folderId) {
    return requestToAPI({
      url: `${serverAPIUrls.GET_FOLDERS}/${folderId}`
    });
  }

  async sendArticlerating(articleId, rating) {
    return requestToAPI({
      url: serverAPIUrls.SET_ARTICLES_MARKS,
      method: "POST",
      body: {
        articleId: articleId,
        mark: rating
      }
    });
  }
}
export default new ArticlesService();
