<template>
  <div>
    <ul v-if="app.inSSR" class="n-menu">
      <li v-for="item in menus">
        <a :href="item.routePath">{{ item.label }}</a>
      </li>
    </ul>
    <template v-else>
      <vertical-mix-sider v-if="isVerticalMix" class="global-sider" />
      <vertical-sider v-else class="global-sider" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from "vue";
import { useThemeStore, useAppStore } from "@/store";
import { VerticalMixSider, VerticalSider } from "./components";

defineOptions({ name: "GlobalSider" });

const theme = useThemeStore();
const app = useAppStore();
const isVerticalMix = computed(() => theme.layout.mode === "vertical-mix");
const menus: App.GlobalMenuOption[] = (getCurrentInstance().root.attrs.menus as any[]) || [];
</script>

<style scoped>
.global-sider {
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
</style>
