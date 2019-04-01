import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";
import formatDate from "Constants/FORMAT_DATE.js";

class QuestionsService {
  async getTitles() {
    return requestToAPI(serverAPIUrls.GET_SUPPORT_MESSAGES_TITLES);
  }

  async getQuestion(questionId = 1) {
    return requestToAPI(`${serverAPIUrls.GET_QUESTIONS}/${questionId}`, undefined, data => {
      data.createdAt = formatDate(data.createdAt);
      return data;
    });
  }

  async getQuestions() {
    return requestToAPI(serverAPIUrls.GET_QUESTIONS, undefined, data => {
      data.activeQuestions.forEach(question => {
        question.createdAt = formatDate(question.createdAt);
      });
      data.closedQuestions.forEach(question => {
        question.createdAt = formatDate(question.createdAt);
      });
      return data;
    });
  }
}
export default new QuestionsService();
