<template>
  <dark-mode-container class="global-header flex-y-center h-full" :inverted="theme.header.inverted">
    <global-logo v-if="showLogo" class="h-full ml-10px" :style="{ width: '50px' }" />
    <div class="flex justify-end h-full w-full">
      <global-search />
    </div>

  </dark-mode-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore, useAppStore, useAuthStore } from "@/store";
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
  GlobalGoback,
  GlobalDownload
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
const auth = useAuthStore();
const { isMobile, isSmallScreen } = useBasicLayout();

const showButton = import.meta.env.PROD && import.meta.env.VITE_VERCEL == "Y";
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
