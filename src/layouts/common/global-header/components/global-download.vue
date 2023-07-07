<template>
  <hover-container class="w-40px h-full">
    <n-dropdown :options="app.apps" trigger="hover" :value="os" @select="download">
      <icon-mdi:download class="text-22px outline-transparent" />
    </n-dropdown>
  </hover-container>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store";
import { onMounted, computed } from "vue";

const app = useAppStore();
const os = computed(() => {
  var ua = globalThis.navigator?.userAgent,
    platform = globalThis.navigator?.platform || "";
  if (/mac/i.test(platform) || /mac/i.test(ua)) return "Mac";
  if (/linux/i.test(platform) || /linux/i.test(ua)) return "Linux";
  return "Windows";
});
function download(url: string) {
  let element = document.createElement("a");
  let filename = url.replace(/^.*\//g, "");
  console.info("filename", url);
  element.setAttribute("href", url);
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
