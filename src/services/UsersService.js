import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";
import formatDate from "Constants/FORMAT_DATE.js";

class UsersService {
  async getUserInfo() {
    return requestToAPI(serverAPIUrls.GET_USER_INFO, undefined, data => {
      data.oneCPortalAuthInfo.expiresDate = formatDate(data.oneCPortalAuthInfo.expiresDate);
      return data;
    });
  }
}
export default new UsersService();
