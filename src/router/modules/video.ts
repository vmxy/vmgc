const video: AuthRoute.Route[] = [
  {
    name: "home",
    path: "/home",
    component: "self",
    meta: {
      title: "首页",
      requiresAuth: false,
      keepAlive: false,
      singleLayout: "basic",
      icon: "mdi:video-2d",
      order: 1,
      i18nTitle: "menu.home",
    },
  },
  {
    name: "video_movie",
    path: "/video/movie",
    component: "self",
    meta: {
      title: "menu.movie",
      requiresAuth: false,
      keepAlive: true,
      singleLayout: "basic",
      icon: "mdi:video-input-svideo",
      order: 2,
      i18nTitle: "menu.movie",
    },
  },
  {
    name: "video_tv",
    path: "/video/tv",
    component: "self",
    meta: {
      title: "电视剧",
      requiresAuth: false,
      keepAlive: true,
      singleLayout: "basic",
      icon: "mdi:youtube-tv",
      order: 3,
      i18nTitle: "menu.tv",

    },
  },
  {
    name: "video_anime",
    path: "/video/anime",
    component: "self",
    meta: {
      title: "动漫",
      requiresAuth: false,
      keepAlive: true,
      singleLayout: "basic",
      icon: "mdi:atv",
      order: 4,
      i18nTitle: "menu.anime",

    },
  },
  {
    name: "video_variety",
    path: "/video/variety",
    component: "self",
    meta: {
      title: "综艺",
      requiresAuth: false,
      keepAlive: true,
      singleLayout: "basic",
      icon: "mdi:eye",
      order: 5,
      i18nTitle: "menu.variety",

    },
  },
  {
    name: "video_sport",
    path: "/video/sport",
    component: "self",
    meta: {
      title: "体育",
      requiresAuth: false,
      keepAlive: true,
      singleLayout: "basic",
      icon: "mdi:basketball",
      order: 6,
      i18nTitle: "menu.sport",

    },
  },
  {
    name: "video_doc",
    path: "/video/doc",
    component: "self",
    meta: {
      title: "纪录片",
      requiresAuth: false,
      keepAlive: true,
      singleLayout: "basic",
      icon: "mdi:video-vintage",
      order: 7,
      i18nTitle: "menu.doc",

    },
  },
  {
    name: "video_detail_:id",
    path: "/video/detail/:id",
    component: "self",
    meta: {
      title: "详情",
      requiresAuth: false,
      keepAlive: true,
      singleLayout: "basic",
      icon: "mdi:video-vintage",
      order: 8,
      hide: true,
      tab: false,
      
    },
  },
  {
    name: "video_search",
    path: "/video/search",
    component: "self",
    meta: {
      title: "搜索",
      requiresAuth: false,
      keepAlive: true,
      singleLayout: "basic",
      //icon: "mdi:video-vintage",
      //order: 8,
      hide: true,
    },
  },
  {
    name: "video_xplay_:id",
    path: "/video/xplay/:id",
    component: "self",
    meta: {
      title: "播放",
      requiresAuth: false,
      keepAlive: false,
      singleLayout: "basic",
      //icon: "mdi:video-vintage",
      //order: 8,
      hide: true,
    },
  },
];

export default video;
