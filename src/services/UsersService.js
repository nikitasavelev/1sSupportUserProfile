import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import { requestToAPI } from "Constants/DEFAULT_REQUEST.js";
import formatDate from "Constants/COMMON_METHODS.js";
import {toDateString} from "Constants/COMMON_METHODS.js";

const weekBefore = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString().substr(0, 10);
const todayInISOFormat = new Date().toISOString().substr(0, 10);
const weekAfter = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString().substr(0, 10);

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

  async getPreviousKPI() {
    return requestToAPI({
      url: `${serverAPIUrls.GET_PREVIOUS_KPI}`,
      modifyDataCallback: analytics => {
        analytics.operators.forEach(operator => {
          operator.caption = `${operator.firstName} ${operator.lastName} ${operator.secondName}`;
        });
        return analytics;
      }
    });
  }

  async getOperatorAnalytics(operatorId, fromDate = weekBefore, toDate = todayInISOFormat) {
    const [from, to ] = toDateString(fromDate, toDate);
    return requestToAPI({ url: `${serverAPIUrls.GET_OPERATOR_ANALYTICS}/${operatorId}?from=${from}&to=${to}` });
  }

  async getMyAnalytics(fromDate = weekBefore, toDate = todayInISOFormat) {
    const [from, to ] = toDateString(fromDate, toDate);
    return requestToAPI({ url: `${serverAPIUrls.ANALYTICS}/me?from=${from}&to=${to}` });
  }

  async getOperatorsAnalytics(fromDate = weekBefore, toDate = todayInISOFormat) {
    const [from, to ] = toDateString(fromDate, toDate);
    return requestToAPI({
      url: `${serverAPIUrls.GET_OPERATORS_ANALYTICS}?from=${from}&to=${to}`,
      modifyDataCallback: analytics => {
        analytics.operators.forEach(operator => {
          operator.caption = `${operator.firstName} ${operator.lastName} ${operator.secondName}`;
        });
        analytics.averageKpi.caption = "Средний показатель";
        return analytics;
      }
    });
  }

  async setKpi(kpiType, kpiValue, employeeIds, fromDate = todayInISOFormat, toDate = weekAfter) {
    return requestToAPI({
      url: serverAPIUrls.SET_KPI,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        kpiType,
        kpiValue,
        employeeIds,
        fromDate,
        toDate
      }
    });
  }
}
export default new UsersService();
