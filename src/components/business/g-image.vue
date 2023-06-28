<template>
  <img v-if="lazy" v-lazyimg="formatImageUrl(src)" :alt="alt" referrerPolicy="no-referrer" />
  <img v-else :src="src" :alt="alt" ref="refImg" referrerPolicy="no-referrer" />
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
  lazy: {
    type: Boolean,
    default: true
  }
});

const refImg = ref<HTMLImageElement>();
function getSourceUrl(url: string) {
  let info: any = /^https?:/i.test(url) ? new URL(url) : {};
  let surl = info.searchParams?.get("url");
  if (surl) url = decodeURIComponent(surl);
  return url;
}
function formatImageUrl(url: string) {
  if (!url) return "/box.png";
  url = getSourceUrl(url);
  return url;
}
/* function proxyImageUrl(url: string) {
  url = getSourceUrl(url);
  let host = hosts[Math.floor(Math.random() * hosts.length)];
  return host + "/img/" + url.replace("://", "_--");
} */
let isLoadError = false;
function onLoadError(ev) {
  if (isLoadError) return;
  isLoadError = true;
  //let url = proxyImageUrl(props.src);
  refImg.value.src = "/box.png";
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
