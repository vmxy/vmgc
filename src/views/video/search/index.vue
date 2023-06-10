<template>
  <div>
    <n-spin :show="loading" size="large">
      <n-card class="module-page">
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
              <g-image :src="item.logo" :alt="item.title" />
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
      v-model:page="pageNo"
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
import { ref, onMounted, computed } from "vue";
import { useAppStore, useSearchStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const searchStore = useSearchStore();
const loading = ref(false);

const pageNo = computed(() => {
  let pageNo = parseInt(route.query.pageNo?.toString()) || 1;
  return pageNo;
});

function onOpenNotify() {
  searchStore.setHide();
}
function newUrl(pageNo: number) {
  let nquery = Object.assign({}, route.query);
  nquery.pageNo = pageNo + "";
  nquery.q = searchStore.q;
  return (
    route.path +
    "?" +
    Object.keys(nquery)
      .map((key) => key + "=" + encodeURIComponent(nquery[key] as string))
      .join("&")
  );
}
onMounted(() => {
  let q = route.query.q?.toString();
  let pageNo = parseInt(route.query.pageNo?.toString()) || 1;
  console.info("search q", q, searchStore.q, q == searchStore.q, searchStore.page.pageNo == pageNo);
  if (!q) return;
  if (q == searchStore.q && searchStore.page.pageNo == pageNo) {
    if (searchStore.list.length > 0) return;
  }
  search({ q: q, pageNo: pageNo });
});

async function onUpdatePage(pageNo: number) {
  let path = route.path;
  let nquery = Object.assign({}, { q: searchStore.q, pageNo });
  router.push(
    path +
      "?" +
      Object.keys(nquery)
        .map((key) => key + "=" + encodeURIComponent(nquery[key] as string))
        .join("&"),
  );
}

async function search(opts: { q: string; pageNo: number }) {
  globalThis.$loadingBar?.start();
  loading.value = true;
  await searchStore.search(opts);
  globalThis.$loadingBar?.finish();
  loading.value = false;
}
</script>

<style scoped lang="scss"></style>
