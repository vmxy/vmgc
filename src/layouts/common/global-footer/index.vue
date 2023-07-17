<template>
  <dark-mode-container v-if="!app.inApp" class="flex-center h-full" :inverted="theme.footer.inverted">
    <span>Copyright ©{{ year }} {{ appInfo.title }}</span>
  </dark-mode-container>
</template>

<script setup lang="ts">
import { useThemeStore, useAppStore } from "@/store";
import { computed } from "vue";
import { useAppInfo } from "@/composables";
defineOptions({ name: "GlobalFooter" });
const appInfo = useAppInfo();
const app = useAppStore();
const theme = useThemeStore();
const year = computed(() => new Date().getFullYear());
</script>

<style scoped></style>
