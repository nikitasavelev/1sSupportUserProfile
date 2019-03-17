import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";

class UsersService {
  async getUserInfo() {
    return requestToAPI(serverAPIUrls.GET_USER_INFO);
  }
}
export default new UsersService();
