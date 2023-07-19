<template>
  <n-card class="mt-16px min-h-200px" :title="$t('menu.' + props.id)">
    <template #header>
      <router-link :to="`/video/${props.id}`">{{ $t("menu." + props.id) }}</router-link>
    </template>
    <n-grid
      cols="240:1 280:2 480:3 640:4 960:5 1024:6 1440:7 2048:12 "
      responsive="self"
      x-gap="3 x:6 s:9 m:12"
      y-gap="3 x:6 s:9 m:12"
    >
      <n-gi span="1" v-for="item in dataList" :key="item.id">
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
import { ref, computed, Ref, onMounted, defineComponent, getCurrentInstance, useSSRContext } from "vue";
import { useVideoStore, useTabStore, useAppStore } from "@/store";
import * as service from "@/service";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    default: 24,
  },
  q: {
    type: String,
  },
});
const proxy = getCurrentInstance();
const app = useAppStore();
//const tab = useTabStore();
const page = ref({ pageNo: 1, pageCount: 0, total: 0, pageSize: 24 });
const dataList: Ref<NVideo.VideoInfo[]> = ref([]);
if (app.inSSR) {
  //服务端渲染
  let homeData: any = useSSRContext()?.homeData || {};
  switch (props.id) {
    case "tv":
      if (homeData.tv) dataList.value = homeData.tv;
      break;
    case "movie":
      if (homeData.movie) dataList.value = homeData.movie;
      break;
    case "anime":
      if (homeData.anime) dataList.value = homeData.anime;
      break;
    case "sport":
      if (homeData.sport) dataList.value = homeData.sport;
      break;
    case "doc":
      if (homeData.doc) dataList.value = homeData.doc;
      break;
    case "variety":
      if (homeData.doc) dataList.value = homeData.variety;
      break;
    default:
      break;
  }
}
defineComponent({
  setup(props, ctx) {
    return {};
  },
});

onMounted(() => {
  onUpdatePage(1);
});

async function onUpdatePage(pageNo: number) {
  globalThis.$loadingBar?.start();
  let { data } = await service.searchVideo({ cata: <any>props.id, pageNo: pageNo, q: props.q });
  globalThis.$loadingBar?.finish();

  page.value.total = data.page.total;
  page.value.pageSize = data.page.pageSize;
  dataList.value = (data.list || []).slice(0, props.limit);
}
</script>

<style scoped lang="scss"></style>
