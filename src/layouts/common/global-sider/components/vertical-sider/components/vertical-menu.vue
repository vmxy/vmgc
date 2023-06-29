<template>
  <n-scrollbar :size="1" ref="refScrollbar" class="flex-1-hidden">
    <n-menu
      :value="activeKey"
      :collapsed="app.siderCollapse"
      :collapsed-width="theme.sider.collapsedWidth"
      :collapsed-icon-size="22"
      :options="menus"
      :expanded-keys="expandedKeys"
      :indent="18"
      :inverted="!theme.darkMode && theme.sider.inverted"
      @update:value="handleUpdateMenu"
      @update:expanded-keys="handleUpdateExpandedKeys"
    />
  </n-scrollbar>
</template>

<script setup lang="ts">
import { computed, ref, watch, useSSRContext } from "vue";
import { useRoute } from "vue-router";
import type { MenuOption } from "naive-ui";
import { useAppStore, useRouteStore, useThemeStore } from "@/store";
import { useRouterPush } from "@/composables";
import { getActiveKeyPathsOfMenus, translateMenuLabel } from "@/utils/router/menu";
import { onMounted } from "vue";

defineOptions({ name: "VerticalMenu" });
const refScrollbar = ref<any>();
const route = useRoute();
const app = useAppStore();
const theme = useThemeStore();
const routeStore = useRouteStore();
const { routerPush } = useRouterPush();
console.info("===routeStore.menus", routeStore.menus);
const menus = computed(() => (ssr ? useSSRContext()?.menus || [] : translateMenuLabel(routeStore.menus as any[])));

const activeKey = computed(() => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string);
const expandedKeys = ref<string[]>([]);

function handleUpdateMenu(_key: string, item: MenuOption) {
  const menuItem = item as App.GlobalMenuOption;
  routerPush(menuItem.routePath);
}

function handleUpdateExpandedKeys(keys: string[]) {
  expandedKeys.value = keys;
}
function setMaxHeightToScroll() {
  if (!refScrollbar.value) return;
  let height = screen.availHeight - 56;
  let ele = refScrollbar.value.$el.nextElementSibling; //.parentElement.querySelector(" .n-scrollbar ");
  ele.style["max-height"] = height + "px";
}
onMounted(() => {
  setMaxHeightToScroll();
});
globalThis.addEventListener("resize", () => {
  setMaxHeightToScroll();
});
watch(
  () => route.name,
  () => {
    expandedKeys.value = getActiveKeyPathsOfMenus(activeKey.value, menus.value);
  },
  { immediate: true },
);
</script>

<style scoped></style>
