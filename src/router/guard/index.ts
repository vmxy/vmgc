import type { Router } from "vue-router";
import { useTitle } from "@vueuse/core";
import { t } from "@/locales";
import { createPermissionGuard } from "./permission";
const ssr = import.meta.env.SSR;
const AppTitle = import.meta.env.VITE_APP_TITLE;
/**
 * 路由守卫函数
 * @param router - 路由实例
 */
export function createRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    if (!ssr) {
      // 开始 loadingBar
      globalThis.$loadingBar?.start();
      globalThis.parent?.postMessage({ event: "router", data: { url: to.fullPath } }, "*");
    }
    // 页面跳转权限处理
    await createPermissionGuard(to, from, next);
  });
  router.afterEach((to) => {
    // 设置document title
    let subTitle = to.meta.i18nTitle ? t(to.meta.i18nTitle) : to.meta.title;
    useTitle(AppTitle + " - " + subTitle);
    // 结束 loadingBar
    ssr || globalThis.$loadingBar?.finish();
    if (!ssr) {
      globalThis.document?.querySelector("#appLoading")?.remove();
    }
  });
}
