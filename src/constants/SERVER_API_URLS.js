export const serverAPIDomain = "https://api.4buttons.ru/1c/v0.1";
//export const serverAPIDomain = "http://localhost:10000";

export const serverAPIUrls = Object.freeze({
  SURPRISE: serverAPIDomain + "/server_infos/surprise",

  LOGIN: serverAPIDomain + "/identity/sign-in",
  SIGN_UP: serverAPIDomain + "/identity/sign-up",
  LOGOUT: serverAPIDomain + "/tokens/logout",
  ACCESS_TOKENS: serverAPIDomain + "/identity/access-tokens",
  REFRESH_TOKENS: serverAPIDomain + "/identity/refresh-tokens",
  REFRESH_TOKEN: "refresh",
  REVOKE_TOKEN: "revoke",

  GET_SUPPORT_MESSAGES_TITLES: serverAPIDomain + "/questions/titles",
  QUESTIONS: serverAPIDomain + "/questions/",
  RESOLVE_QUESTION: "/resolve",
  MARKS: "/marks",
  GET_SEARCH: serverAPIDomain + "/searching/search/",
  GET_POPULAR_SEARCH: serverAPIDomain + "/searching/popular/",

  GET_ARTICLE: serverAPIDomain + "/articles",
  SET_ARTICLES_MARKS: serverAPIDomain + "/articles/marks",

  GET_USER_INFO: serverAPIDomain + "/companies/clients/me",

  GET_OPERATOR_ANALYTICS: serverAPIDomain + "/analytics/me",
  GET_OPERATORS_ANALYTICS: serverAPIDomain + "/analytics/operators",

  GET_NEWS: serverAPIDomain + "/news",
  GET_NEWS_SHORT_PREVIEWS: serverAPIDomain + "/news/previews/short",
  GET_NEWS_PREVIEWS: serverAPIDomain + "/news/previews",

  MESSAGES: "/messages",
});
