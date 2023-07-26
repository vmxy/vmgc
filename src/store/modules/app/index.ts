import { nextTick, provide } from "vue";
import { defineStore } from "pinia";
import { LAYOUT_SCROLL_EL_ID } from "@soybeanjs/vue-materials";
import { langList } from "@/locales/lang";
import { localStg } from "@/utils";
import { useTitle } from "@vueuse/core";
import pkg from "~/package.json";

interface AppState {
  /** 滚动元素的id */
  scrollElId: string;
  /** 主体内容全屏 */
  contentFull: boolean;
  /** 禁用主体内容的水平方向的滚动 */
  disableMainXScroll: boolean;
  /** 重载页面(控制页面的显示) */
  reloadFlag: boolean;
  /** 项目配置的抽屉可见状态 */
  settingDrawerVisible: boolean;
  /** 侧边栏折叠状态 */
  siderCollapse: boolean;
  /** vertical-mix模式下 侧边栏的固定状态 */
  mixSiderFixed: boolean;

  /** 当前 语言 */
  lang: string;
  /** 支持语言列表 */
  langs: { label: string; key: string }[];
  inSSR: boolean;
  /** 是否是手机 */
  isMobile: boolean;

  screenWidth: number;
  /** 下载安装包 */
  apps: { label: string; key: string }[];
  inApp: boolean;
  inElectron: boolean;
  headerStyle: string;
}
const ssr = import.meta.env.SSR;
const language = globalThis.navigator?.language || "zh-CN";
export const useAppStore = defineStore("app-store", {
  state: (): AppState => {
    return {
      scrollElId: LAYOUT_SCROLL_EL_ID,
      contentFull: false,
      disableMainXScroll: false,
      reloadFlag: true,
      settingDrawerVisible: false,
      siderCollapse: true,
      mixSiderFixed: false,
      lang: localStg.get("lang") || (langList[language] ? language : "zh-CN"),
      langs: langList,
      inSSR: ssr,
      isMobile: ssr ? false : globalThis.innerWidth <= 640,
      screenWidth: ssr ? 1024 : globalThis.innerWidth,
      apps: [
        { label: "Windows", key: `/apps/${pkg.name}-v${pkg.version}.exe` },
        { label: "Mac", key: `/apps/${pkg.name}-v${pkg.version}.dmg` },
        { label: "Linux", key: `/apps/${pkg.name}-v${pkg.version}.AppImage` },
      ],
      inApp: !!globalThis.env?.ANDROID || !!globalThis.env?.IOS || !!globalThis.env?.ELECTRON,
      inElectron: !!globalThis.env?.ELECTRON,
      headerStyle: "",
    };
  },
  actions: {
    initWatch() {
      if (ssr) return;
      globalThis.addEventListener("resize", () => {
        this.isMobile = globalThis.innerWidth <= 640;
        this.screenWidth = globalThis.innerWidth;
      });
    },
    /**
     * 获取滚动配置
     */
    getScrollConfig() {
      if (ssr) return {};
      const scrollEl = globalThis.document?.querySelector(`#${this.scrollElId}`);

      const { scrollLeft = 0, scrollTop = 0 } = scrollEl || {};

      return {
        scrollEl,
        scrollLeft,
        scrollTop,
      };
    },
    /**
     * 重载页面
     * @param duration - 重载的延迟时间(ms)
     */
    async reloadPage(duration = 0) {
      this.reloadFlag = false;
      await nextTick();
      if (duration) {
        setTimeout(() => {
          this.reloadFlag = true;
        }, duration);
      } else {
        this.reloadFlag = true;
      }
      setTimeout(() => {
        globalThis.document?.documentElement.scrollTo({ left: 0, top: 0 });
      }, 100);
    },
    /** 打开设置抽屉 */
    openSettingDrawer() {
      this.settingDrawerVisible = true;
    },
    /** 关闭设置抽屉 */
    closeSettingDrawer() {
      this.settingDrawerVisible = false;
    },
    /** 切换抽屉可见状态 */
    toggleSettingDrawerVisible() {
      this.settingDrawerVisible = !this.settingDrawerVisible;
    },
    /** 设置侧边栏折叠状态 */
    setSiderCollapse(collapse: boolean) {
      this.siderCollapse = collapse;
    },
    /** 折叠/展开 侧边栏折叠状态 */
    toggleSiderCollapse() {
      this.siderCollapse = !this.siderCollapse;
    },
    /** 设置 vertical-mix模式下 侧边栏的固定状态 */
    setMixSiderIsFixed(isFixed: boolean) {
      this.mixSiderFixed = isFixed;
    },
    /** 设置 vertical-mix模式下 侧边栏的固定状态 */
    toggleMixSiderFixed() {
      this.mixSiderFixed = !this.mixSiderFixed;
    },
    /** 设置主体是否禁用滚动 */
    setDisableMainXScroll(disable: boolean) {
      this.disableMainXScroll = disable;
    },
    /** 设置主体内容全屏 */
    setContentFull(full: boolean) {
      this.contentFull = full;
    },
    setLang(lang: I18nType.langType) {
      this.lang = lang;
      localStg.set("lang", lang);
    },
    setTitle(title: string) {
      let AppTitle = import.meta.env.VITE_APP_TITLE;
      let ntitle = title + " - " + AppTitle;
      useTitle(ntitle);
      if (globalThis.window != globalThis.parent) {
        globalThis.parent.postMessage({ event: "env", data: { title: ntitle } }, "*");
      }
    }
  },
});
