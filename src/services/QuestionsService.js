import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";
import formatDate from "Constants/FORMAT_DATE.js";
import Store from "Store/store.js";
import { roleTypes } from "Constants/ROLE_TYPES.js";

class QuestionsService {
  // async getTitles() {
  //   return requestToAPI(serverAPIUrls.GET_SUPPORT_MESSAGES_TITLES);
  // }

  async getQuestion(questionId = 1) {
    return requestToAPI({
      url: `${serverAPIUrls.QUESTIONS}${questionId}`,
      modifyDataCallback: data => {
        data.updatedAt = formatDate(data.updatedAt);
        return data;
      }
    });
  }

  async getQuestions() {
    return requestToAPI({
      url: serverAPIUrls.QUESTIONS,
      modifyDataCallback: data => {
        data.activeQuestions.forEach(question => {
          question.updatedAt = formatDate(question.updatedAt);
        });
        data.closedQuestions.forEach(question => {
          question.updatedAt = formatDate(question.updatedAt);
        });
        return data;
      }
    });
  }

  async askQuestion(text, title) {
    return requestToAPI({
      url: serverAPIUrls.QUESTIONS,
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: {
        text,
        title
      }
    });
  }

  async resolveQuestion(questionId) {
    return requestToAPI({
      url: `${serverAPIUrls.QUESTIONS}${questionId}${serverAPIUrls.RESOLVE_QUESTION}`,
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT"
    });
  }

  async closeQuestion(questionId, mark) {
    return requestToAPI({
      url: `${serverAPIUrls.QUESTIONS}${questionId}${serverAPIUrls.MARKS}`,
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: { mark }
    });
  }

  async getMessages(questionId) {
    return requestToAPI({
      url: `${serverAPIUrls.QUESTIONS}${questionId}${serverAPIUrls.MESSAGES}`,
      modifyDataCallback: data => {
        data.forEach(message => {
          message.createdAt = formatDate(message.createdAt);
          if (Number(Store.getters.getRoleType) === Number(roleTypes.Admin)) {
            // operator is aligned to the right
            message.isMe = message.roleType === roleTypes.Operator
          } else {
            message.isMe = Number(Store.getters.getUserId) === Number(message.authorId);
          }
        });
        return data;
      }
    });
  }

  async sendMessage(questionId, text) {
    return requestToAPI({
      url: `${serverAPIUrls.QUESTIONS}${questionId}${serverAPIUrls.MESSAGES}`,
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: { text },
      modifyDataCallback: data => {
        data.createdAt = formatDate(data.createdAt);
        return data;
      }
    });
  }
}
export default new QuestionsService();
