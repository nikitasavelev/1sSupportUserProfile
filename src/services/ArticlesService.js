import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";
import Store from "Store/store.js"

class ArticlesService {
  async getArticle(articleId) {
    return requestToAPI({
      url: `${serverAPIUrls.ARTICLE}/${articleId}`
    });
  }

  async addArticle(form) {
    return fetch(serverAPIUrls.ARTICLE, {
      method: "POST",
      body: form,
      headers: {
        Authorization: "Bearer " + Store.getters.getAuthorizationToken
      }
    });
  }

  async updateArticle(form, articleId) {
    return fetch(`${serverAPIUrls.ARTICLE}/${articleId}`, {
      method: "PATCH",
      body: form,
      headers: {
        Authorization: "Bearer " + Store.getters.getAuthorizationToken
      }
    });
  }

  async updateArticleStatus(articleId, status) {
    return requestToAPI({
      url: `${serverAPIUrls.ARTICLE}/${articleId}/status=${status}`,
      method: "PATCH"
    });
  }

  async deleteArticle(articleId) {
    return requestToAPI({
      url: `${serverAPIUrls.ARTICLE}/${articleId}`,
      method: "DELETE"
    });
  }

  async getItems(folderId) {
    return requestToAPI({
      url: `${serverAPIUrls.FOLDERS}/items/${folderId}`
    });
  }

  async getFolders(folderId) {
    return requestToAPI({
      url: `${serverAPIUrls.FOLDERS}/${folderId}`
    });
  }

  async getAvailableFolders(folderId) {
    let folders = await this.getFolders(folderId);
    let availableFolders = [];
    for (let i = 0; i < folders.length; i++){
      if (folders[i].isAvailable)
        availableFolders.push(folders[i]);
    }
    return availableFolders;
  }

  async addFolder(parentId, name, isBlocked, isAvailable) {
    return requestToAPI({
      url: serverAPIUrls.FOLDERS,
      method: "POST",
      body: {
        parentId,
        name,
        isBlocked,
        isAvailable
      },
      headers: {
            'Content-Type': 'application/json',
          }
    });
  }

  async deleteFolder(folderId) {
    return requestToAPI({
      url: `${serverAPIUrls.FOLDERS}/${folderId}`,
      method: "DELETE"
    });
  }

  async updateFolder(folder) {
    return requestToAPI({
      url: `${serverAPIUrls.FOLDERS}/${folder.id}`,
      method: "PATCH",
      body: {
        id: folder.id,
        parentId: folder.parentId,
        name: folder.name,
        isAvailable: folder.isAvailable
      },
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  async updateFolderStatus(folderId, status) {
    return requestToAPI({
      url: `${serverAPIUrls.FOLDERS}/${folderId}/status=${status}`,
      method: "PATCH"
    });
  }


  async sendArticleRating(articleId, rating) {
    return requestToAPI({
      url: serverAPIUrls.SET_ARTICLES_MARKS,
      method: "POST",
      body: {
        articleId,
        mark: rating
      }
    });
  }
}
export default new ArticlesService();
