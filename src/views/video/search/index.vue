<template>
  <div class="mt-10px">
    <n-spin :show="loading" size="large">
      <n-card class="mt-16px module-page">
        <template #header> </template>
        <n-grid
          v-if="searchStore.list.length > 0"
          cols="xs:2 s:4 m:5 l:6 xl:7 2xl:12"
          responsive="screen"
          x-gap="3 x:6 s:9 m:12"
          y-gap="3 x:6 s:9 m:12"
        >
          <n-gi v-for="item in searchStore.list" :key="item.id" span="1" class="min-h-90px">
            <router-link :to="'/video/detail/' + item.id" class="v-item" @click="onOpenNotify">
              <img :src="item.logo" :alt="item.desc" />
              <p class="label">{{ item.title }}</p>
              <p class="tag">{{ $t("video.updated") }} {{ item.quality }}</p>
            </router-link>
          </n-gi>
        </n-grid>
        <loading-empty-wrapper v-else class="h-360px" :loading="loading" empty />
      </n-card>
    </n-spin>
    <n-pagination
      v-if="searchStore.list.length > 0"
      v-model:page="searchStore.page.pageNo"
      :page-slot="10"
      :item-count="searchStore.page.total"
      :page-size="searchStore.page.pageSize"
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
import "../components/style.scss";
import { ref, computed, Ref, onMounted } from "vue";
import { useAppStore, useSearchStore } from "@/store";
import * as service from "@/service";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const searchStore = useSearchStore();
const app = useAppStore();
//const page = ref({ pageNo: parseInt(route.query.pageNo as string) || 1, pageCount: 0, total: 0, pageSize: 24 });
//const dataList: Ref<NVideo.VideoInfo[]> = ref([]);
const loading = ref(true);
const query = ref({
  q: (route.query.q as string) || "all",
});
function onOpenNotify() {
  searchStore.setHide();
}
function newUrl(pageNo: number) {
  let nquery = Object.assign({}, route.query);
  nquery.pageNo = pageNo + "";
  nquery.q = query.value.q;
  return (
    route.path +
    "?" +
    Object.keys(nquery)
      .map((key) => key + "=" + encodeURIComponent(nquery[key] as string))
      .join("&")
  );
}
onMounted(() => {
  let pageNo = parseInt(route.query.pageNo as string) || 1;
  search({ ...query.value, pageNo: pageNo });
});

async function onUpdatePage(pageNo: number) {
  let path = route.path;
  let nquery = Object.assign({}, query.value, { pageNo });
  router.push(
    path +
      "?" +
      Object.keys(nquery)
        .map((key) => key + "=" + encodeURIComponent(nquery[key] as string))
        .join("&"),
  );
}

async function search(opts: { q: string; pageNo: number }) {
  //page.value.pageNo = opts.pageNo;
  query.value.q = opts.q || "";

  globalThis.$loadingBar?.start();
  loading.value = true;
  await searchStore.search(opts);
  /*   let { data } = await service.searchVideo({
    pageNo: opts.pageNo,
    q: opts.q,
  }); */
  globalThis.$loadingBar?.finish();
  loading.value = false;

  //page.value.total = searchStore.page.total;
  //page.value.pageSize = searchStore.page.pageSize;
  /* dataList.value = searchStore.list || []; */
}
</script>

<style scoped lang="scss">
.module-page {
}
</style>
