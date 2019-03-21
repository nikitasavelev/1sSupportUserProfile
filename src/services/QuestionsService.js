import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";
import formatDate from "Constants/FORMAT_DATE.js";

class QuestionsService {
  async getTitles() {
    return requestToAPI(serverAPIUrls.GET_SUPPORT_MESSAGES_TITLES);
  }

  async getQuestion(questionId = 1) {
    return requestToAPI(`${serverAPIUrls.SUPPORT_QUESTIONS}/${questionId}`);
  }

  async getQuestions() {
    return requestToAPI(serverAPIUrls.SUPPORT_QUESTIONS, undefined, data => {
      data.activeQuestions.forEach(question => {
        question.createdDate = formatDate(question.createdDate);
      });
      data.closedQuestions.forEach(question => {
        question.createdDate = formatDate(question.createdDate);
      });
      return data;
    });
  }
}
export default new QuestionsService();
