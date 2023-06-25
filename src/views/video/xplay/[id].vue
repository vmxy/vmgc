<template>
  <div>
    <n-grid class="player" cols="20" responsive="screen" :item-responsive="true" x-gap="6 m:6" y-gap="6 m:12">
      <n-gi span="20 m:13">
        <g-player :res="res"></g-player>
        <div>
          <p class="text-28px" style="display: inline-block; margin-right: 30px">{{ res.title }}</p>
          <n-button @click="toggleFav(res)">
            <template #icon> <icon-mdi-heart :style="{ color: hasFav ? '#ff0000' : '#ffffff' }" /> </template>
          </n-button>
        </div>
      </n-gi>
      <n-gi span="20 m:7">
        <n-grid cols="10" responsive="screen" :item-responsive="true">
          <n-gi span="10">
            <v-line v-if="res.vid" :detail="res" :top="10"></v-line>
          </n-gi>
        </n-grid>
      </n-gi>
    </n-grid>
    <v-rec :id="res.vid"></v-rec>
    <v-hot></v-hot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, Ref, getCurrentInstance } from "vue";
import * as service from "@/service";
import { useTitle } from "@vueuse/core";
import { VRec, VHot, VLine } from "../components";
import { useAppStore, useVideoStore } from "@/store";

const app = useAppStore();
const video = useVideoStore();
const { proxy } = getCurrentInstance();
const id = computed(() => {
  let id = proxy.$route.params.id;
  return id instanceof Array ? id[0] : id;
});
const res: Ref<NVideo.Res> = ref(app.inSSR ? proxy.$root.$attrs.detail : <any>{ id: "", lines: [] });
const urls: Ref<string[]> = ref([]);
const hasFav = ref(false);
async function toggleFav(data) {
  let has = await video.toggleFav({
    id: data.vid,
    title: data.title,
    logo: data.logo,
    desc: data.desc,
    quality: data.quality,
  });
  hasFav.value = has;
}
onMounted(async () => {
  let data = await fetchDetail(id.value);
  if (!data) return;
  //sessionStg.set(("playid-" + id.value) as any, "1");
  hasFav.value = await video.hasFav(data.vid);
  video.addPlayed(id.value);
});

async function fetchDetail(id: string): Promise<any> {
  if (!id) return;
  globalThis.$loadingBar?.start();
  let { data } = await service.fetchVideoRes(id);
  globalThis.$loadingBar?.finish();
  if (!data) {
    globalThis.$message?.warning("video is no data");
    return;
  }
  Object.assign(res.value, data);
  proxy.$route.meta.title = data.title;
  app.setTitle(data.title);
  urls.value = [data.url];
  return data;
}
</script>

<style scoped lang="scss"></style>
