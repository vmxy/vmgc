import * as vue from "vue";
//import AppLoading from "./components/common/app-loading.vue";
import { setupDirectives } from "./directives";
import { setupRouter } from "./router";
import { setupAssets } from "./plugins";
import { setupStore } from "./store";
import { setupI18n } from "./locales";
const ssr = import.meta.env.SSR;
globalThis.ssr = ssr;
console.info("=====================ssr", ssr);

globalThis.wait = async (ttl: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ttl);
  });
};
export function createApp(opts: { Page: any; context?: any }) {
  console.info("============createApp", "ssr=" + ssr);
  const { Page, context } = opts;
  // import assets: js、css
  setupAssets();

  // app loading
  //const appLoading = vue.createApp(AppLoading);
  //appLoading.mount("#appLoading");

  //const app = vue.createApp(App);
  const app = ssr ? vue.createSSRApp(Page) : vue.createApp(Page);

  // store plugin: pinia
  setupStore(app);

  // vue custom directives
  setupDirectives(app);

  // vue router
  const router = setupRouter(app);
  if (!ssr) globalThis.router = router;
  setupI18n(app);

  //appLoading.unmount();

  // mount app
  //app.mount("#app");
  return {
    app,
    router,
  };
}
