import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";

class LoginService {
  async signIn(email, password) {
    const requestParameters = {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        email,
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

  async signUp(
    firstName,
    secondName,
    lastName,
    email,
    password,
    confirmPassword,
    phone,
    partnerLogin,
    partnerPassword
  ) {
    const requestParameters = {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        firstName,
        secondName,
        lastName,
        email,
        password,
        confirmPassword,
        phone,
        partnerLogin,
        partnerPassword
      })
    };
    try {
      const response = await requestToAPI(serverAPIUrls.SIGN_UP, requestParameters);
      return response;
    } catch (error) {
      return error;
    }
  }
}
export default new LoginService();
