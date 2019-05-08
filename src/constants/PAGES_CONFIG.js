import { roleTypes } from "Constants/ROLE_TYPES.js";
export const pagesConfig = {
  [roleTypes.Client]: [
    {
      link: "/",
      caption: "Поиск"
    },
    {
      link: "/requests",
      caption: "Обращения"
    },
    {
      link: "/profile",
      caption: "Профиль"
    },
    {
      link: "/articles",
      caption: "Справочник"
    },
    {
      link: "/news",
      caption: "Новости"
    }
  ],
  [roleTypes.Operator]: [
    {
      link: "/requests",
      caption: "Обращения"
    },
    {
      link: "/profile",
      caption: "Профиль"
    },
    {
      link: "/articles",
      caption: "Справочник"
    }
  ],
  [roleTypes.Admin]: [
    {
      link: "/profile",
      caption:"Профиль"
    },
    {
      link: "/set-kpi",
      caption: "KPI"
    },
    {
      link: "/requests",
      caption:"Обращения"
    },
    {
      link: "/kpi",
      caption:"Показатели"
    },
    {
      link: "/articles",
      caption: "Справочник"
    }
  ]
};
