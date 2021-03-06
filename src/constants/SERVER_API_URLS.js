export const serverAPIDomain = "https://api.1ssupport.ru/v0.1";
//export const serverAPIDomain = "http://localhost:10000";
// export const serverAPIDomain = "http://localhost:10012";

export const serverAPIUrls = Object.freeze({
  SURPRISE: serverAPIDomain + "/server_infos/surprise",

  LOGIN: serverAPIDomain + "/identity/sign-in",
  SIGN_UP_OPERATOR: serverAPIDomain + "/identity/sign-up/operator",
  SIGN_UP_CLIENT: serverAPIDomain + "/identity/sign-up/client",
  LOGOUT: serverAPIDomain + "/tokens/logout",
  ACCESS_TOKENS: serverAPIDomain + "/identity/access-tokens",
  REFRESH_TOKENS: serverAPIDomain + "/identity/refresh-tokens",
  REFRESH_TOKEN: "refresh",
  REVOKE_TOKEN: "revoke",

  GET_SUPPORT_MESSAGES_TITLES: serverAPIDomain + "/questions/titles",
  QUESTIONS: serverAPIDomain + "/questions/",
  SOLUTION_NOT_FOUND: serverAPIDomain + "/questions/not-found",
  RESOLVE_QUESTION: "/resolve",
  MARKS: "/marks",
  GET_SEARCH: serverAPIDomain + "/searching/search/",
  GET_POPULAR_SEARCH: serverAPIDomain + "/searching/popular/",

  ARTICLE: serverAPIDomain + "/articles",
  SET_ARTICLES_MARKS: serverAPIDomain + "/articles/marks",

  FOLDERS: serverAPIDomain + "/articles/folders",

  GET_USER_INFO: serverAPIDomain + "/companies/clients/me",

  ANALYTICS: serverAPIDomain + "/analytics",
  GET_OPERATOR_ANALYTICS: serverAPIDomain + "/analytics/operators",
  GET_OPERATORS_ANALYTICS: serverAPIDomain + "/analytics/operators",

  GET_NEWS: serverAPIDomain + "/news",
  GET_NEWS_SHORT_PREVIEWS: serverAPIDomain + "/news/previews/short",
  GET_NEWS_PREVIEWS: serverAPIDomain + "/news/previews",

  MESSAGES: "/messages",
  NOTIFICATIONS: serverAPIDomain + "/notifications/ocs-notifications-hub",

  SET_KPI: serverAPIDomain + "/analytics",
  GET_PREVIOUS_KPI: serverAPIDomain + "/analytics/target/operators"
});
