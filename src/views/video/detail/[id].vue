<template>
  <div>
    <v-info :detail="detail"></v-info>
    <v-line :detail="detail"></v-line>
    <v-rec :id="detail.id"></v-rec>
    <v-hot></v-hot>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, computed } from "vue";
import { ref, onMounted, Ref, watch } from "vue";
import * as service from "@/service";
import { VHot, VRec, VInfo, VLine } from "../components";
import { useTitle } from "@vueuse/core";
import { useAppStore, useVideoStore } from "@/store";

const app = useAppStore();
const video = useVideoStore();
const { proxy } = getCurrentInstance();
const id = computed(() => {
  let id = proxy.$route.params.id;
  return id instanceof Array ? id[0] : id || "";
});
const detail: Ref<NVideo.VideoDetail> = ref(app.inSSR ? proxy.$root.$attrs.detail : Object.assign({ id: id.value })); // proxy.$root.$attrs.detail

onMounted(() => {
  fetchDetail(id.value);
});
async function fetchDetail(id: string) {
  globalThis.$loadingBar?.start();
  let { data } = await service.fetchVideoDetail(id);
  console.info("detail===", data);
  globalThis.$loadingBar?.finish();
  if (!data) {
    video.deleteFav(id);
    return data;
  }
  Object.assign(detail.value, data);
  proxy.$route.meta.title = data.title;
  app.setTitle(data.title);
  return data;
}
/* watch(id, (val) => {
  fetchDetail(val);
}, {
  immediate: true
}); */
</script>

<style scoped></style>
