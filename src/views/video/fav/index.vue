<template>
  <div class="">
    <n-grid
      v-if="dataList.length > 0"
      cols="240:1 280:2 480:3 640:4 1024:6 1280:12 "
      responsive="self"
      x-gap="6 m:12"
      y-gap="6 m:12"
      class="min-h-250px h-full" 
    >
      <n-gi span="1" v-for="item in dataList" :key="item.id" class="min-h-90px max-h-250px">
        <router-link :to="'/video/detail/' + item.id" class="v-item">
          <g-image :src="item.logo" :alt="item.title" />
          <p class="label">{{ item.title }}</p>
          <p class="tag">{{ $t("video.updated") }} {{ item.quality }}</p>
        </router-link>
      </n-gi>
    </n-grid>
    <loading-empty-wrapper v-else class="h-500px" :loading="loading" empty />

    <n-pagination
      v-if="dataList.length > 0"
      v-model:page="page.pageNo"
      :page-slot="maxShowPage"
      :item-count="page.total"
      :page-size="page.pageSize"
      class="mt-10px"
      @update:page="onUpdatePage"
    >
      <template #label="info">
        <template v-if="info.type == 'page'">
          <a @click.prevent="() => {}" :href="`${newUrl(info.node)}`"> {{ info.node }} </a>
        </template>
        <template v-else> </template>
      </template>
    </n-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, getCurrentInstance } from "vue";
import { useAppStore, useVideoStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import { onKeyStroke, useDebounceFn } from "@vueuse/core";

const { proxy } = getCurrentInstance();
const app = useAppStore();
const route = useRoute();
const router = useRouter();
const video = useVideoStore();
const loading = ref(true);
const page = ref({ pageNo: parseInt(route.query.pageNo as string) || 1, pageCount: 0, total: 0, pageSize: 24 });
const maxShowPage = ref(app.screenWidth <= 420 ? 6 : 10);
const dataList = ref(app.inSSR ? [] : ([] as any[]));

async function loadRec() {
  loading.value = true;
  let pageNo = page.value.pageNo || 1;
  let limit = page.value.pageSize || 24;
  let start = (pageNo - 1) * limit;
  let list = await video.findFav({ start, limit: limit });
  let count = await video.findFavCount();
  loading.value = false;
  dataList.value = list;
  page.value.total = count;
  page.value.pageCount = Math.ceil(count / limit);
}
function newUrl(pageNo: number) {
  let nquery = Object.assign({}, route.query);
  nquery.pageNo = pageNo + "";
  return (
    route.path +
    "?" +
    Object.keys(nquery)
      .map((key) => key + "=" + encodeURIComponent(nquery[key] as string))
      .join("&")
  );
}
async function onUpdatePage(pageNo: number) {
  let pageCount = page.value.pageCount || 1;
  pageNo = pageNo < 1 ? 1 : pageNo;
  pageNo = pageNo > pageCount ? pageCount : pageNo;
  let path = route.path;
  let nquery = Object.assign({}, { pageNo });
  router.push(
    path +
      "?" +
      Object.keys(nquery)
        .map((key) => key + "=" + encodeURIComponent(nquery[key] as string))
        .join("&"),
  );
}
onMounted(async () => {
  loadRec();
});

onKeyStroke("ArrowLeft", () => {
  onUpdatePage(page.value.pageNo - 1);
});
onKeyStroke("ArrowRight", () => {
  onUpdatePage(page.value.pageNo + 1);
});
</script>

<style scoped lang="scss">
@media screen and (max-width: 480px) {
  :deep(.n-pagination) {
    justify-content: space-around;
    width: 100%;
  }
}
</style>
