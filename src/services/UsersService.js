import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";
import formatDate from "Constants/FORMAT_DATE.js";

class UsersService {
  async getUserInfo() {
    return requestToAPI(serverAPIUrls.GET_USER_INFO, undefined, data => {
      data.oneCPortalAuthInfo.expiresIn = formatDate(data.oneCPortalAuthInfo.expiresIn);
      return data;
    });
  }
  async getOperatorAnalytics(){
    return requestToAPI(serverAPIUrls.GET_OPERATOR_ANALYTICS);
  }
}
export default new UsersService();
