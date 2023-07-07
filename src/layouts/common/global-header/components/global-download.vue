<template>
  <hover-container class="w-40px h-full">
    <n-dropdown :options="app.apps" trigger="hover" :value="os" @select="download">
      <icon-mdi:download class="text-22px outline-transparent" />
    </n-dropdown>
  </hover-container>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useAppStore } from "@/store";
import { onMounted, computed } from "vue";

const { locale } = useI18n();
const app = useAppStore();
const os = computed(() => {
  var ua = globalThis.navigator?.userAgent,
    platform = globalThis.navigator?.platform || "";
  if (/mac/i.test(platform) || /mac/i.test(ua)) return "Mac";
  if (/linux/i.test(platform) || /linux/i.test(ua)) return "Linux";
  return "Windows";
});
function download(filename) {
   var element = document.createElement("a");
   console.info("filename", filename);
   element.setAttribute("href", filename);
   element.setAttribute("download", filename);
   element.style.display = "none";
   document.body.appendChild(element);
   element.click();
   document.body.removeChild(element);
}

onMounted(() => {
  // app.setLang(locale.value as any);
});
</script>
<style scoped></style>
