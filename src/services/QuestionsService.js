import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import Store from "Store/store.js";
import { defaultRequestOptions } from "Constants/DEFAULT_REQUEST_OPTIONS.js";

class QuestionsService {
  async getTitles() {
    const requestOptions = defaultRequestOptions;
    requestOptions.headers.Authorization = "Bearer " + Store.getters.getAuthorizationToken;
    return fetch(serverAPIUrls.GET_SUPPORT_MESSAGES_TITLES, requestOptions)
      .then(res => res.json())
      .then(res => {
        return res.data;
      });
  }

  async getQuestion(questionId = 1) {
    const requestOptions = defaultRequestOptions;
    requestOptions.headers.Authorization = "Bearer " + Store.getters.getAuthorizationToken;
    return fetch(`${serverAPIUrls.SUPPORT_QUESTIONS}/${questionId}`, requestOptions)
      .then(res => res.json())
      .then(res => {
        return res.data;
      });
  }

  async getQuestions() {
    const requestOptions = defaultRequestOptions;
    requestOptions.headers.Authorization = "Bearer " + Store.getters.getAuthorizationToken;
    return fetch(serverAPIUrls.SUPPORT_QUESTIONS, requestOptions)
      .then(res => res.json())
      .then(res => {
        return res.data;
      });
  }
}
export default new QuestionsService();
