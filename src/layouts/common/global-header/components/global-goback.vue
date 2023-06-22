<template>
  <hover-container class="w-40px h-full" tooltip-content="后退" placement="bottom-end" @click="handleGo">
    <icon-mdi-arrow-left class="text-22px" :class="{ 'animate-spin': loading }" />
  </hover-container>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAppStore, useRouteStore } from "@/store";
import { useLoading } from "@/hooks";
defineOptions({ name: "ReloadButton" });

const { loading, startLoading, endLoading } = useLoading();

function handleGo() {
  if(ssr) return;
  globalThis.history.go(-1);
}
</script>

<style scoped></style>
