export const serverAPIDomain = "https://api.4buttons.ru/1c/v0.1";
//export const serverAPIDomain = "http://localhost:10000";

export const serverAPIUrls = Object.freeze({
  SURPRISE: serverAPIDomain + "/server_infos/surprise",
  LOGIN: serverAPIDomain + "/tokens/login",
  LOGOUT: serverAPIDomain + "/tokens/logout",
  GET_SUPPORT_MESSAGES_TITLES: serverAPIDomain + "/support_questions/titles",
  SUPPORT_QUESTIONS: serverAPIDomain + "/support_questions",
  GET_SEARCH: serverAPIDomain + "/search",
  GET_POPULAR_SEARCH: serverAPIDomain + "/search/popular",
  GET_ARTICLE: serverAPIDomain + "/articles",
  SET_ARTICLES_MARKS: serverAPIDomain + "/articles/marks",
  GET_NEWS: serverAPIDomain + "/news",
  GET_USER_INFO: serverAPIDomain + "/users",
  GET_NEWS_SHORT_PREVIEWS: serverAPIDomain + "/news/short_previews",
  GET_NEWS_PREVIEWS: serverAPIDomain + "/news/previews",
});
