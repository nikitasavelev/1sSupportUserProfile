import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";

class LoginService {
  async login(inn, userLogin) {
    const requestParameters = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        mode: "cors",
        cache: "default",
        body: JSON.stringify({
            inn,
            login: userLogin
        })       
    };
    return requestToAPI(serverAPIUrls.LOGIN, requestParameters);
  }
}
export default new LoginService();
