<template>
  <img :src="formatImageUrl(src)" :alt="alt" ref="refImg" referrerPolicy="no-referrer" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
defineOptions({ name: "GImage" });
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
  },
});
const hosts = ["https://img1.iei.one", "https://img2.iei.one", "https://img3.iei.one"];

const refImg = ref<HTMLImageElement>();
function getSourceUrl(url: string) {
  let info: any = /^https?:/i.test(url) ? new URL(url) : {};
  let surl = info.searchParams?.get("url");
  if (surl) url = decodeURIComponent(surl);
  return url;
}
function formatImageUrl(url: string) {
  if (!url) return "/logo.png";
  url = getSourceUrl(url);
  return url;
}
function proxyImageUrl(url: string) {
  url = getSourceUrl(url);
  let host = hosts[Math.floor(Math.random() * hosts.length)];
  return host + "/img/" + url.replace("://", "_--");
}
let isLoadError = false;
function onLoadError(ev) {
  if (isLoadError) return;
  isLoadError = true;
  let url = proxyImageUrl(props.src);
  refImg.value.src = url;
}
onMounted(() => {
  if (!refImg.value) return;
  refImg.value.onabort = onLoadError;
  refImg.value.onerror = onLoadError;
});
</script>

<style scoped lang="scss">
img {
  width: 100%;
}
</style>
