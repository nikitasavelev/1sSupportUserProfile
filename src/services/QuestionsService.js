import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";
import formatDate from "Constants/FORMAT_DATE.js";

class QuestionsService {
  // async getTitles() {
  //   return requestToAPI(serverAPIUrls.GET_SUPPORT_MESSAGES_TITLES);
  // }

  async getQuestion(questionId = 1) {
    return requestToAPI(`${serverAPIUrls.QUESTIONS}${questionId}`, undefined, data => {
      data.updatedAt = formatDate(data.updatedAt);
      return data;
    });
  }

  async getQuestions() {
    return requestToAPI(serverAPIUrls.QUESTIONS, undefined, data => {
      data.activeQuestions.forEach(question => {
        question.updatedAt = formatDate(question.updatedAt);
      });
      data.closedQuestions.forEach(question => {
        question.updatedAt = formatDate(question.updatedAt);
      });
      return data;
    });
  }

  async askQuestion(text, title) {
    const requestParameters = {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        text,
        title
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
      body: JSON.stringify({ mark })
    };
    return requestToAPI(`${serverAPIUrls.QUESTIONS}${questionId}${serverAPIUrls.MARKS}`, requestParameters);
  }

  async getMessages(questionId) {
    return requestToAPI(`${serverAPIUrls.QUESTIONS}${questionId}${serverAPIUrls.MESSAGES}`,undefined, data => {
      data.forEach(message => {
        message.createdAt = formatDate(message.createdAt);
      });     
      return data;
    });
  }

  async sendMessage(questionId, text) {
    const requestParameters = {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({ text })
    };
    return requestToAPI(`${serverAPIUrls.QUESTIONS}${questionId}${serverAPIUrls.MESSAGES}`, requestParameters);
  }
}
export default new QuestionsService();
