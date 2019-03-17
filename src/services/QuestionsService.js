import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";

class QuestionsService {
  async getTitles() {
    return requestToAPI(serverAPIUrls.GET_SUPPORT_MESSAGES_TITLES);
  }

  async getQuestion(questionId = 1) {
    return requestToAPI(`${serverAPIUrls.SUPPORT_QUESTIONS}/${questionId}`);
  }

  async getQuestions() {
    return requestToAPI(serverAPIUrls.SUPPORT_QUESTIONS);
  }
}
export default new QuestionsService();
