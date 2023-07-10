import { createApp } from "./main";
import App from "./App.vue";

(async () => {
  let { app, router } = createApp({ Page: App });
  //appLoading.mount("#appLoading");
  
  router.isReady().then(() => {
    globalThis.document?.querySelector("#appLoading")?.remove();
    app.mount("#app");
  });
})();
