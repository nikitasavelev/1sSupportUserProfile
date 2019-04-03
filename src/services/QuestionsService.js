import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";
import formatDate from "Constants/FORMAT_DATE.js";

class QuestionsService {
  async getTitles() {
    return requestToAPI(serverAPIUrls.GET_SUPPORT_MESSAGES_TITLES);
  }

  async getQuestion(questionId = 1) {
    return requestToAPI(`${serverAPIUrls.QUESTIONS}/${questionId}`, undefined, data => {
      data.createdAt = formatDate(data.createdAt);
      return data;
    });
  }

  async getQuestions() {
    return requestToAPI(serverAPIUrls.QUESTIONS, undefined, data => {
      data.activeQuestions.forEach(question => {
        question.createdAt = formatDate(question.createdAt);
      });
      data.closedQuestions.forEach(question => {
        question.createdAt = formatDate(question.createdAt);
      });
      return data;
    });
  }

  async askQuestion(text, titleId) {
    const requestParameters = {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        contactData: "999999",
        text,
        titleId
      })
    };
    return requestToAPI(serverAPIUrls.QUESTIONS, requestParameters);
  }

  async resolveQuestion(questionId) {
    const requestParameters = {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT",
      mode: "cors",
      cache: "default"
    };
    return requestToAPI(`${serverAPIUrls.QUESTIONS}${questionId}${serverAPIUrls.RESOLVE_QUESTION}`, requestParameters);
  }

  async closeQuestion(questionId, mark) {
    const requestParameters = {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT",
      mode: "cors",
      cache: "default",
      body: JSON.stringify(mark)
    };
    return requestToAPI(`${serverAPIUrls.QUESTIONS}${questionId}${serverAPIUrls.CLOSE_QUESTION}`, requestParameters);
  }
}
export default new QuestionsService();
