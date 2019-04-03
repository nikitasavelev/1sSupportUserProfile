export const serverAPIDomain = "https://api.4buttons.ru/1c/v0.1";
//export const serverAPIDomain = "http://localhost:10000";

export const serverAPIUrls = Object.freeze({
  SURPRISE: serverAPIDomain + "/server_infos/surprise",
  LOGIN: serverAPIDomain + "/identity/sign-in",
  LOGOUT: serverAPIDomain + "/tokens/logout",

  GET_SUPPORT_MESSAGES_TITLES: serverAPIDomain + "/questions/titles",
  QUESTIONS: serverAPIDomain + "/questions/",
  RESOLVE_QUESTION: "/resolve",
  CLOSE_QUESTION: "/close",
  GET_SEARCH: serverAPIDomain + "/searching/search/",
  GET_POPULAR_SEARCH: serverAPIDomain + "/searching/popular/",

  GET_ARTICLE: serverAPIDomain + "/articles",
  SET_ARTICLES_MARKS: serverAPIDomain + "/articles/marks",

  GET_USER_INFO: serverAPIDomain + "/clients/me",

  GET_NEWS: serverAPIDomain + "/news",
  GET_NEWS_SHORT_PREVIEWS: serverAPIDomain + "/news/short-previews",
  GET_NEWS_PREVIEWS: serverAPIDomain + "/news/previews",
});
