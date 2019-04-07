import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";

class LoginService {
  async signIn(login, password) {
    const requestParameters = {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        login,
        password
      })
    };
    try {
      const response = await requestToAPI(serverAPIUrls.LOGIN, requestParameters);
      return response;
    } catch (error) {
      return error;
    }
  }
}
export default new LoginService();
