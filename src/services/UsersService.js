import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";
import formatDate from "Constants/FORMAT_DATE.js";

class UsersService {
  async getUserInfo() {
    return requestToAPI({
      url: serverAPIUrls.GET_USER_INFO,
      modifyDataCallback: data => {
        data.oneCPortalAuthInfo.expiresIn = formatDate(data.oneCPortalAuthInfo.expiresIn);
        return data;
      }
    });
  }
  async getOperatorAnalytics() {
    return requestToAPI({ url: serverAPIUrls.GET_OPERATOR_ANALYTICS });
  }

  async getOperatorsAnalytics() {
    return requestToAPI({
      url: serverAPIUrls.GET_OPERATORS_ANALYTICS,
      modifyDataCallback: analytics => {
        analytics.operators.forEach(operator => {
          operator.caption = `${operator.firstName} ${operator.lastName} ${operator.secondName}`;
        });
        analytics.averageKpi.caption = "Средний показатель";
        return analytics;
      }
    });
  }
}
export default new UsersService();
