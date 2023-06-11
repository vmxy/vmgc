import type { RouterScrollBehavior } from "vue-router";

export const scrollBehavior: RouterScrollBehavior = (to, from) => {
  return new Promise(async (resolve) => {
    if (ssr) return resolve({});
    const { useAppStore, useTabStore } = await import("@/store");

    const app = useAppStore();
    const tab = useTabStore();

    if (to.hash) {
      const el = globalThis.document?.querySelector(to.hash);
      if (el) {
        resolve({
          el,
          behavior: "smooth",
        });
      }
    }

    const { left, top } = tab.getTabScrollPosition(to.path);
    const scrollPosition = {
      left,
      top,
    };
    const { scrollEl, scrollLeft, scrollTop } = app.getScrollConfig();

    const isFromCached = Boolean(from.meta.keepAlive);
    if (isFromCached) {
      tab.recordTabScrollPosition(from.path, {
        left: scrollLeft,
        top: scrollTop,
      });
    }

    setTimeout(() => {
      if (scrollEl) {
        scrollEl.scrollLeft = scrollPosition.left;
        scrollEl.scrollTop = scrollPosition.top;
      }
    }, 400);
  });
};
