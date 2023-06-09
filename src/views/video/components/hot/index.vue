<template>
  <n-card :title="$t('video.top.hot')" class="mt-16px module">
    <n-grid cols="xs:2 s:4 m:6 l:8 xl:12" responsive="screen" x-gap="6 m:12" y-gap="6 m:12">
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
import { ref, onMounted, defineProps, watch, getCurrentInstance } from "vue";
import * as service from "@/service";
import { useThemeStore, useAppStore } from "@/store";
const { proxy } = getCurrentInstance();
const app = useAppStore();
const theme = useThemeStore();
const dataList = ref(app.inSSR ? (proxy.$root.$attrs.hot as any) : ([] as NVideo.VideoInfo[]));
let dataSource = [];

onMounted(async () => {
  let { data } = await service.fetchVideoHot({ pageNo: 1 });
  dataSource = data.list;
  showList(theme.screenSize);
});
function showList(ds) {
  let limit = ds == "xxl" ? 12 : ds == "xl" ? 10 : ds == "l" ? 8 : ds == "m" ? 6 : ds == "s" ? 4 : 2;
  dataList.value = dataSource.slice(0, limit);
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
