<template>
  <router-link :to="routeHomePath" class="flex-center w-full nowrap-hidden min-w-32px">
    <system-logo class="text-32px text-primary min-w-32px" /> 
    <h2 v-show="!app.isMobile" class="pl-8px text-16px font-bold text-primary transition duration-300 ease-in-out">
      {{ appInfo.title }}
    </h2>
  </router-link>
</template>

<script setup lang="ts">
import { routePath } from "@/router";
import { useAppStore } from "@/store";
import { useAppInfo } from "@/composables"

defineOptions({ name: "GlobalLogo" });

const app = useAppStore();
const appInfo = useAppInfo();
const routeHomePath = routePath("root");
</script>

<style scoped></style>
