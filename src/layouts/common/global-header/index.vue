<template>
  <dark-mode-container class="global-header flex-y-center h-full" :inverted="theme.header.inverted">
    <global-logo v-if="app.inSSR || showLogo" class="h-full ml-5px" :style="{ width: theme.sider.width + 'px' }" />
    <div :class="showQuickMenu ? 'w-128px' : 'w-85%'" style="max-width: calc(100% - 60px);">
      <header-menu v-if="showHeaderMenu" />
      <div v-else class="flex-1-hidden flex-y-center h-full mr-4">
        <menu-collapse v-if="showMenuCollapse || isSmallScreen" />
        <global-breadcrumb v-if="theme.header.crumb.visible && !isSmallScreen" />
      </div>
    </div>

    <!--div v-if="!showHeaderMenu" class="flex-1-hidden flex-y-center h-full">
      <menu-collapse v-if="showMenuCollapse || isMobile" />
      <global-breadcrumb v-if="theme.header.crumb.visible && !isMobile" />
    </div>
    <header-menu v-else /-->

    <div v-if="!app.inSSR" class="flex justify-end h-full w-full">
      <global-search />
    </div>

    <div v-if="showQuickMenu" class="flex justify-end h-full mr-20px">
      <global-refresh />
      <global-goback />
      <!--github-site /-->
      <full-screen />
      <theme-mode />
      <toggle-lang />
      <system-message />
      <setting-button v-if="showButton" />
      <user-avatar v-if="app.isLogin" />
    </div>
  </dark-mode-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore, useAppStore } from "@/store";
import { useBasicLayout } from "@/composables";
import GlobalLogo from "../global-logo/index.vue";
import GlobalSearch from "../global-search/index.vue";
import {
  FullScreen,
  GithubSite,
  GlobalBreadcrumb,
  HeaderMenu,
  MenuCollapse,
  SettingButton,
  SystemMessage,
  ThemeMode,
  UserAvatar,
  ToggleLang,
  GlobalRefresh,
  GlobalGoback
} from "./components";

defineOptions({ name: "GlobalHeader" });

interface Props {
  /** 显示logo */
  showLogo: App.GlobalHeaderProps["showLogo"];
  /** 显示头部菜单 */
  showHeaderMenu: App.GlobalHeaderProps["showHeaderMenu"];
  /** 显示菜单折叠按钮 */
  showMenuCollapse: App.GlobalHeaderProps["showMenuCollapse"];
}

defineProps<Props>();
const app = useAppStore();
const theme = useThemeStore();
const { isMobile, isSmallScreen } = useBasicLayout();

const showButton = import.meta.env.PROD && import.meta.env.VITE_VERCEL !== "Y";
const showQuickMenu = computed(() => {
  return !app.inSSR && !app.isMobile;
});
</script>

<style scoped lang="scss">
.global-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
  overflow: hidden;
}
</style>
