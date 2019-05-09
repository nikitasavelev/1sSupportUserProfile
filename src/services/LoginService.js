import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";
import Store from "Store/store.js";
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
      // TO DO: refactor this to one function
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("expires", response.expires);
      localStorage.setItem("userId", response.userId);
      return response;
    } catch (error) {
      return error;
    }
  }

  async signUp(firstName, secondName, lastName, email, password, confirmPassword, phone, secretKey, crmLogin) {
    let urlForRequest = serverAPIUrls.SIGN_UP_CLIENT;
    if (crmLogin.length > 0) {
      urlForRequest = serverAPIUrls.SIGN_UP_EMPLOYEE;
    }
    try {
      const response = await requestToAPI({
        url: urlForRequest,
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
          secretKey,
          crmLogin
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

  async logout() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      // TO DO: refactor this to one function
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("expires");
      localStorage.removeItem("roleType");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      const revokeRefreshToken = await requestToAPI({
        url: `${serverAPIUrls.REFRESH_TOKENS}/${refreshToken}/${serverAPIUrls.REVOKE_TOKEN}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: {}
      });
      const revokeAccessToken = await requestToAPI({
        url: `${serverAPIUrls.ACCESS_TOKENS}/${serverAPIUrls.REVOKE_TOKEN}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: {}
      });
      Store.dispatch("updateAuthorizationToken", null);
      Store.dispatch("updateRoleType", null);      
    } catch (error) {
      return error;
    }
  }
}
export default new LoginService();
