<template>
  <hover-container class="w-40px h-full" tooltip-content="全屏" :inverted="theme.header.inverted" @click="toggle">
    <icon-gridicons-fullscreen-exit v-if="isFullscreen" class="text-22px" />
    <icon-gridicons-fullscreen v-else class="text-22px" />
  </hover-container>
</template>

<script lang="ts" setup>
import { useFullscreen } from "@vueuse/core";
import { useThemeStore } from "@/store";

defineOptions({ name: "FullScreen" });

const { isFullscreen, toggle } = useFullscreen();
const theme = useThemeStore();
</script>

<style scoped></style>
