<template>
  <n-card :title="$t('video.top.rec')" class="shadow-sm mt-16px">
    <n-grid cols="xs:2 s:2 m:5 l:6 xl:7 2xl:12" responsive="screen" x-gap="6 m:12" y-gap="6 m:12">
      <n-gi span="1" v-for="item in dataList" :key="item.id" class="min-h-90px">
        <router-link :to="'/video/detail/' + item.id" class="v-item">
          <g-image :src="item.logo" :alt="item.title" />
          <p class="label">{{ item.title }}</p>
          <p class="tag">{{ $t("video.updated") }} {{ item.quality }}</p>
        </router-link>
      </n-gi>
    </n-grid>
  </n-card>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, getCurrentInstance } from "vue";
import * as service from "@/service";
import { useAppStore } from "@/store";
const { proxy } = getCurrentInstance();
const app = useAppStore();
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const id = computed(() => {
  let id = props.id || proxy.$route.params.id;
  return id instanceof Array ? id[0] : id;
});
const dataList = ref(app.inSSR ? (proxy.$root.$attrs.hot as any) : ([] as NVideo.VideoInfo[]));

async function loadRec(id) {
  let { data } = await service.fetchVideoRec(id);
  dataList.value = data.list.slice(0, 24);
}
onMounted(async () => {
  loadRec(id.value);
});
watch(id, (nid) => {
  loadRec(nid);
});
</script>

<style scoped lang="scss"></style>
