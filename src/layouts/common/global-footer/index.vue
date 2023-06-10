<template>
  <dark-mode-container class="flex-center h-full" :inverted="theme.footer.inverted">
    <span>Copyright ©{{ year }} VMGC</span>
  </dark-mode-container>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/store";
import { computed } from 'vue';

defineOptions({ name: "GlobalFooter" });

const theme = useThemeStore();
const year = computed(()=>new Date().getFullYear());
</script>

<style scoped></style>
