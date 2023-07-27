<template>
  <dark-mode-container
    class="tab-app global-tab flex-y-center w-full pl-16px"
    :style="{ height: theme.tab.height + 'px' }"
  >
    <div ref="bsWrapper" class="flex-1-hidden h-full w-full">
      <n-menu v-model:value="activeTab"  mode="horizontal" :options="menuOptions" @update:value="onClick" />
    </div>
  </dark-mode-container>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useElementBounding } from "@vueuse/core";
import { useTabStore, useThemeStore } from "@/store";
import { useDeviceInfo } from "@/composables";
import { ReloadButton, TabDetail } from "./components";
import type { MenuOption } from "naive-ui";

defineOptions({ name: "GlobalTab" });

const route = useRoute();
const router = useRouter();
const theme = useThemeStore();
const tab = useTabStore();
const deviceInfo = useDeviceInfo();

const bsWrapper = ref<HTMLElement>();
const { width: bsWrapperWidth, left: bsWrapperLeft } = useElementBounding(bsWrapper);

const bsScroll = ref<Expose.BetterScroll>();

const canClick = Boolean(deviceInfo.device.type);

function handleScroll(clientX: number) {
  const currentX = clientX - bsWrapperLeft.value;
  const deltaX = currentX - bsWrapperWidth.value / 2;
  if (bsScroll.value) {
    const { maxScrollX, x: leftX } = bsScroll.value.instance;
    const rightX = maxScrollX - leftX;
    const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX);
    bsScroll.value?.instance.scrollBy(update, 0, 300);
  }
}
const activeTab = ref(route.query.headerMode||"home");
const menuOptions: MenuOption[] = [
  {
    label: "首页",
    key: "home",
    // icon: renderIcon(BookIcon)
  },
  {
    label: "搜索",
    key: "search",
    // icon: renderIcon(BookIcon)
  },
  {
    label: "收藏",
    key: "fav",
    // icon: renderIcon(BookIcon)
  },
];
function onClick(key: string,item: MenuOption){
  console.info("click" , key);
  switch(key){
  case "search":
    router.push("/search?headerMode=search");
    break;
  case "fav":
    router.push("/video/fav?headerMode=fav");
    break;
  default:
    router.push("/?headerMode=home");
  }
}
function init() {
  tab.iniTabStore(route);
}

watch(
  () => route.fullPath,
  () => {
    tab.addTab(route);
    tab.setActiveTab(route.fullPath);
  },
);

// 初始化
init();
</script>

<style scoped>
.tab-app {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 9999;

}
.n-menu {
  display: flex;
  justify-content: space-around;
}
.global-tab {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
