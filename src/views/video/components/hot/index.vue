<template>
  <n-card :title="$t('video.top.hot')" class="mt-16px module">
    <n-grid 
      cols="100:1 200:2 300:3 640:4 1024:6 1280:12 "
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
import { ref, onMounted, watch, getCurrentInstance, useSSRContext } from "vue";
import * as service from "@/service";
import { useThemeStore, useAppStore } from "@/store";
const { proxy } = getCurrentInstance();
const app = useAppStore();
const theme = useThemeStore();
const dataList = ref(app.inSSR ? useSSRContext()?.hot || [] : ([] as NVideo.VideoInfo[]));
let dataSource = [];

const props = defineProps({
  limit: {
    type: Number,
    default: 12,
  }
});

onMounted(async () => {
  let { data } = await service.fetchVideoHot({ pageNo: 1, pageSize: props.limit });
  if (!data) return;
  dataSource = data?.list || [];
  showList(theme.screenSize);
});
function showList(ds) {
  //let limit = ds == "xxl" ? 24 : ds == "xl" ? 20 : ds == "l" ? 16 : ds == "m" ? 12 : ds == "s" ? 8 : 4;
  dataList.value = dataSource.slice(0, props.limit);
}

watch(
  () => theme.screenSize,
  (nv) => {
    showList(nv);
  },
);
</script>

<style scoped lang="scss">
.module {
  min-height: 200px;
  .v-item {
    img {
      width: 100%;
      object-fit: cover;
      height: 150px;
    }
  }
}
</style>
