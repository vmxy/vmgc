const ssr = import.meta.env.SSR;
globalThis.ssr = ssr;
globalThis.env = {ANDROID: true};
import { Buffer } from "buffer";
globalThis.Buffer = Buffer;
globalThis.wait = async (ttl: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), ttl);
  });
};
if (!ssr) {
  import("@ai-lion/liondb").then(({ Model }) => {
    Model.setApp("app");
  });
}

import * as vue from "vue";
//import AppLoading from "./components/common/app-loading.vue";
import { setupDirectives } from "./directives";
import { setupRouter } from "./router";
import { setupAssets } from "./plugins";
import { setupStore } from "./store";
import { setupI18n } from "./locales";

export function createApp(opts: { Page: any }) {
  console.info("============createApp", "ssr=" + ssr);
  const { Page } = opts;
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
