import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";
import { get } from "https";

class ArticlesService {
  async getArticle(articleId) {
    return requestToAPI({
      url: `${serverAPIUrls.GET_ARTICLE}/${articleId}`
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
        parentId: parentId,
        name: name,
        isBlocked: isBlocked,
        isAvailable: isAvailable
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
