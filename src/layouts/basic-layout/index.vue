<template>
  <admin-layout
    :mode="mode"
    :is-mobile="isMobile"
    :scroll-mode="theme.scrollMode"
    :scroll-el-id="app.scrollElId"
    :full-content="app.contentFull"
    :fixed-top="theme.fixedHeaderAndTab"
    :header-height="theme.header.height"
    :tab-visible="theme.tab.visible"
    :tab-height="theme.tab.height"
    :content-class="app.disableMainXScroll ? 'overflow-x-hidden' : ''"
    :sider-visible="siderVisible"
    :sider-collapse="app.siderCollapse"
    :sider-width="siderWidth"
    :sider-collapsed-width="siderCollapsedWidth"
    :footer-visible="theme.footer.visible"
    :fixed-footer="theme.footer.fixed"
    :right-footer="theme.footer.right"
    :tab-class="app.isMobile || !enableTabs ? 'tab-hide' : ''"
    @click-mobile-sider-mask="app.setSiderCollapse(true)"
  >
    <template #header>
      <global-header-search v-if="headerMode == 'search'" v-bind="headerProps" />
      <global-header-home v-else-if="headerMode == 'fav'" v-bind="headerProps" />
      <global-header-home v-else v-bind="headerProps" />
    </template>
    <template #tab>
      <global-tab v-if="!app.inSSR && enableTabs" :show="!app.isMobile && enableTabs" />
    </template>
    <template #sider>
      <global-sider />
    </template>
    <global-content />
    <template #footer>
      <global-footer v-if="!app.isMobile" />
    </template>
  </admin-layout>
  <global-tab-app v-if="app.inApp" />
  <n-back-top :key="theme.scrollMode" :listen-to="`#${app.scrollElId}`" class="z-100" />
  <setting-drawer />
</template>

<script setup lang="ts">
import { AdminLayout } from "@soybeanjs/vue-materials";
import { useAppStore, useThemeStore } from "@/store";
import { useBasicLayout } from "@/composables";
import {
  GlobalContent,
  GlobalFooter,
  GlobalHeaderHome,
  GlobalHeaderSearch,
  GlobalHeaderFav,
  GlobalSider,
  GlobalTab,
  SettingDrawer,
  GlobalTabApp,
} from "../common";
import { onKeyStroke } from "@vueuse/core";

defineOptions({ name: "BasicLayout" });
const ssr = import.meta.env.SSR;
const app = useAppStore();
const theme = useThemeStore();
const enableTabs = import.meta.env.VITE_TABS == "Y";
const inApp = globalThis.env && (globalThis.env.ANDROID || globalThis.env.IOS);
const { mode, headerMode, isMobile, headerProps, siderVisible, siderWidth, siderCollapsedWidth } = useBasicLayout();

if (!ssr) {
  //移动端, 设置为horizontal模式
  theme.setScrollMode("wrapper");
  if (app.isMobile) {
    theme.setLayoutMode("horizontal");
  } else {
    theme.setLayoutMode("vertical");
  }
  globalThis.addEventListener("resize", () => {
    let width = globalThis.innerWidth;
    if (width <= 640) {
      //isMobile.value = true;
      theme.setLayoutMode("horizontal");
    } else {
      //isMobile.value = false;
      theme.setLayoutMode("vertical");
    }
  });

  !ssr &&
    globalThis.document?.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.code === "KeyR") {
        location.reload();
      }
    });
}
</script>

<style lang="scss">
#__SCROLL_EL_ID__ {
  @include scrollbar(1px, #e1e1e1);
  max-width: 100%;
  overflow-x: hidden;
}

.dark #__SCROLL_EL_ID__ {
  @include scrollbar(1px, #555);
}
.tab-hide,
.tab-hide + .soybeanjs-hg8qlw {
  display: none;
  flex-shrink: unset;
  max-height: 5px !important;
}
</style>
