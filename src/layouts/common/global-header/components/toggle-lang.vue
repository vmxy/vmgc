<template>
  <hover-container class="w-40px h-full">
    <n-dropdown :options="langList" trigger="hover" :value="app.lang" @select="handleSelect">
      <icon-cil:language class="text-18px outline-transparent" />
    </n-dropdown>
  </hover-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n"; 
import { localStg } from "@/utils";
import { useAppStore } from "@/store";
import { langList } from "@/locales/lang";

const { locale } = useI18n();
const app = useAppStore();
/* 
const options = [
  {
    label: "中文",
    key: "zh-CN",
  },
  {
    label: "English",
    key: "en",
  },
  {
    label: "ភាសាខ្មែរ",
    key: "km-KH",
  },
]; */
const handleSelect = (key: string) => {
  let lang = key as I18nType.langType;
  //language.value = lang;
  locale.value = lang;
  //localStg.set("lang", lang);
  app.setLang(lang);
};
</script>
<style scoped></style>
