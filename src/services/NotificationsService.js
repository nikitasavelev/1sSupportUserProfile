import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
const signalR = require('@aspnet/signalr');

class NotificationsService {
  async connectToNotificationsHub() {
    return new signalR.HubConnectionBuilder()
      .withUrl(serverAPIUrls.NOTIFICATIONS)
      .configureLogging(signalR.LogLevel.Error)
      .build();
  }
}
export default new NotificationsService();
