import { renderToString } from "@vue/server-renderer";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr/server";
import { createApp } from "@/main";
import axios from "axios";
export { render };
import nodeUrl from "url";
import { createCache } from "@/utils";
import routes from "@/router/modules/video";
import { transformAuthRouteToMenu } from "@/utils/router/menu";

const CachePageData = createCache({ ttl: 5 * 60 * 1000 });
const API_SERVER = process.env.VITE_API_SERVER || "";
const Menus = transformAuthRouteToMenu(routes);

Object.defineProperties(import.meta.env, {
  VITE_API_SERVER: {
    value: API_SERVER,
    writable: false,
  },
});

console.info("env==>", import.meta.env.MODE, "API_SERVER=", API_SERVER);

async function render(pageContext) {
  const { Page, urlPathname: url } = pageContext;
  let info = nodeUrl.pathToFileURL(url);
  console.info("req", url);
  let context = { menus: Menus };
  //let apiPrefix = import.meta.env.DEV ? "/mock" : "/api";
  if (/^\/video\/(detail|xplay)\/[a-z0-9]+/i.test(url)) {
    let model = /\/detail\//.test(url) ? "detail" : "xplay";
    let id = url.replace(/^\/video\/(detail|xplay)\//i, "").replace(/[^a-z0-9]+$/i, "");
    let vid = model == "detail" ? id : "";
    if (id) {
      let data = model == "detail" ? await getDetail(id) : await getRes(id);
      if (data) {
        context = Object.assign(context, { id, detail: data });
        vid = model == "detail" ? id : data.vid;
      }
    }
    let hot = await getHot();
    let rec = await getRec(vid);
    context.hot = hot;
    context.rec = rec;
  } else if (/\/(search)|(video\/search)/i.test(url)) {
    //搜索
    let q = info.searchParams.get("q");
    let pageNo = info.searchParams.get("pageNo") || 1;
    let data = await search(q, pageNo);
    context.searchData = data;
  } else if (/\/(home)/i.test(url)) {
    const homeData = await getHome();
    context.homeData = Object.assign({}, homeData);
  }
  const { app, router } = createApp({
    Page: Page,
    //context: context,
  });
  router.push(pageContext.urlPathname);
  await router.isReady();

  let appHtml = "";
  //console.info("renderToString context", context);
  appHtml = await renderToString(app, context).catch((err) => err.message);
  const descriptionTag = `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=false">
    <script type="text/javascript">
      function __defindProperty(target, field, value){
        Object.defineProperty(target, field, {value: value, writable: false});
      }
      const API_SERVER="${API_SERVER}";
      __defindProperty(window, "API_SERVER", API_SERVER);
    </script>
  `;
  //const appLoadingHtml = await renderToString(appLoading); //${dangerouslySkipEscape(appHtml)}
  return escapeInject`<!DOCTYPE html>
    <html>
      <head>
        ${dangerouslySkipEscape(descriptionTag)}
      </head>
      <body>
        <div id="appLoading" style="position: fixed;width: 100%;height: 100%; left: 0;top: 0; z-index: 9999;background:#fff;">
          <div style="display: flex;flex-wrap: wrap; justify-content: center;align-items: center; width:100%; height: 100%; text-align: center;">
              <img src="/loading.gif" width="100px"/>
          </div>
        </div>
        <div id="app">
          ${dangerouslySkipEscape(appHtml)}
        </div>
      </body>
    </html>`;
}
async function getDetail(id) {
  return axios(`${API_SERVER}/api/v/detail/${id}`, { responseType: "json" }) //
    .then((res) => res.data.data || {})
    .catch((err) => ({}));
}
async function getRes(id) {
  return axios(`${API_SERVER}/api/v/res/${id}`, { responseType: "json" }) //
    .then((res) => res.data.data || {})
    .catch((err) => ({}));
}
async function getHot() {
  let list =
    CachePageData.get("hot") ||
    (await axios(`${API_SERVER}/api/v/hot`, { responseType: "json" }) //
      .then((res) => {
        let data = res.data.data || { list: [] };
        return data.list;
      })
      .catch((err) => []));
  CachePageData.set("host", list);
  return list;
}
async function getRec(vid) {
  let list =
    CachePageData.get("rec-" + vid) ||
    (await axios(`${API_SERVER}/api/v/rec/${vid}`, { responseType: "json" }) //
      .then((res) => {
        let data = res.data.data || { list: [] };
        return data.list;
      })
      .catch((err) => []));
  CachePageData.set("rec-" + vid, list);
  return list;
}
async function search(q, pageNo) {
  return axios(`${API_SERVER}/api/v/search?q=${encodeURIComponent(q)}&pageNo=${pageNo || 1}`, { responseType: "json" }) //
    .then((res) => {
      let data = res.data.data || {};
      return data;
    })
    .catch((err) => ({}));
}

async function getHome() {
  console.info("get home", API_SERVER);
  let data =
    CachePageData.get("home") ||
    (await axios(`${API_SERVER}/api/v/xhome`, { responseType: "json" }) //
      .then((res) => {
        let data = res.data.data || {};
        return data;
      })
      .catch((err) => ({})));
  CachePageData.set("home", data);
  return data;
}
