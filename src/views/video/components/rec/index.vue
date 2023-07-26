<template>
  <n-card :title="$t('video.top.rec')" class="shadow-sm mt-16px">
    <n-grid
      cols="100:1 200:2 300:3 480:4 640:6 960:8 1024:12 1440:16 2048:24 "
      responsive="self"
      x-gap="3 x:6 s:9 m:12"
      y-gap="3 x:6 s:9 m:12"
    >
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
    required: false,
  },
  limit: {
    type: Number,
    default: 24
  }
});
const id = computed(() => {
  let id = props.id || proxy.$route.params.id;
  id =( id instanceof Array ? id[0] : id ) || "";
  return id;
});
const dataList = ref(app.inSSR ? (proxy.$root.$attrs.hot as any) : ([] as NVideo.VideoInfo[]));

async function loadRec(id) {
  let { data } = await service.fetchVideoRec(id, {pageSize: props.limit});
  dataList.value = data.list.slice(0, props.limit);
}
onMounted(async () => {
  loadRec(id.value);
});
watch(id, (nid) => {
  loadRec(nid);
});
</script>

<style scoped lang="scss"></style>
