import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";

class LoginService {
  async signIn(email, password) {
    try {
      const response = await requestToAPI({
        url: serverAPIUrls.LOGIN,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: {
          email,
          password
        }
      });
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
    try {
      const response = await requestToAPI({
        url: serverAPIUrls.SIGN_UP,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: {
          firstName,
          secondName,
          lastName,
          email,
          password,
          confirmPassword,
          phone,
          partnerLogin,
          partnerPassword
        }
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async getNewAccessToken() {
    const requestParameters = {
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
        Accept: "*/*",
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
        .then(response => response);
      return response;
    } catch (error) {
      return error;
    }
  }
}
export default new LoginService();
