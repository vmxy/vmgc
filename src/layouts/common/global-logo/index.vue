<template>
  <router-link :to="routeHomePath" class="flex-center w-full nowrap-hidden">
    <system-logo class="text-32px text-primary" />
    <h2 v-show="!app.isMobile" class="pl-8px text-16px font-bold text-primary transition duration-300 ease-in-out">
      {{ appInfo.title }}
    </h2>
  </router-link>
</template>

<script setup lang="ts">
import { routePath } from "@/router";
import { t } from "@/locales";
import { useAppStore } from "@/store";
import { useAppInfo } from "@/composables"

defineOptions({ name: "GlobalLogo" });

const app = useAppStore();
const appInfo = useAppInfo();
const routeHomePath = routePath("root");
</script>

<style scoped></style>
