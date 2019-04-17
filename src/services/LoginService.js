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
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("expires", response.expires);
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

  async getNewAccessToken() {
    const requestParameters = {
      headers: {
        "Content-Type": "application/json",
        "Connection": 'keep-alive',
        "Accept": "*/*",
        "Accept-encoding": "gzip,deflate",
        "Content-length": "2"
      },
      method: "POST",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({})
    };
    try {
      const response = await fetch(
        `${serverAPIUrls.ACCESS_TOKENS}/${localStorage.getItem("refreshToken")}/${serverAPIUrls.REFRESH_TOKEN}`,
        requestParameters
      )
      .then(res => res.json())
      .then((response) => response);
      return response;
    } catch (error) {
      return error;
    }
  }
}
export default new LoginService();
