<template>
  <div>
    <n-grid class="player" cols="20" responsive="screen" :item-responsive="true" x-gap="6 m:6" y-gap="6 m:12">
      <n-gi span="20 m:13">
        <g-c-player :res="res"></g-c-player>
        <div>
          <p class="text-28px">{{ res.title }}</p>
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
import { GCPlayer } from "@/components";
import { useAppStore } from "@/store";
import { sessionStg } from "@/utils";
const app = useAppStore();
const { proxy } = getCurrentInstance();
const id = computed(() => {
  let id = proxy.$route.params.id;
  return id instanceof Array ? id[0] : id;
});
const res: Ref<NVideo.Res> = ref(app.inSSR ? proxy.$root.$attrs.detail : <any>{ id: "", lines: [] });
const urls: Ref<string[]> = ref([]);
onMounted(async () => {
  await fetchDetail(id.value);
  sessionStg.set(("playid-" + id.value) as any, "1");
});

async function fetchDetail(id: string): Promise<any> {
  globalThis.$loadingBar?.start();
  let { code, data } = await service.fetchVideoRes(id);
  globalThis.$loadingBar?.finish();
  if (!data) {
    globalThis.$message?.warning("video is no data");
    return;
  }
  Object.assign(res.value, data);
  proxy.$route.meta.title = data.title;
  useTitle(data.title);
  urls.value = [data.url];
  return data;
}
</script>

<style scoped lang="scss"></style>
