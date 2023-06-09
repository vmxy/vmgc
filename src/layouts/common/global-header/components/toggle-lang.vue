<template>
  <hover-container class="w-40px h-full">
    <n-dropdown :options="app.langs" trigger="hover" :value="app.lang" @select="handleSelect">
      <icon-cil:language class="text-22px outline-transparent" />
    </n-dropdown>
  </hover-container>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useAppStore } from "@/store";
import { onMounted } from "vue";

const { locale } = useI18n();
const app = useAppStore();
const handleSelect = (key: string) => {
  let lang = key as I18nType.langType;
  locale.value = lang;
  app.setLang(lang);
};
onMounted(() => {
 // app.setLang(locale.value as any);
});
</script>
<style scoped></style>
