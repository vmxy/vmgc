<template>
  <n-card :title="$t('menu.fav')" class="shadow-sm mt-16px">
    <n-grid cols="xs:2 s:2 m:5 l:6 xl:7 2xl:12" responsive="screen" x-gap="6 m:12" y-gap="6 m:12">
      <n-gi span="1" v-for="item in dataList" :key="item.id" class="min-h-90px">
        <router-link :to="'/video/detail/' + item.id" class="v-item">
          <g-image :src="item.logo" :alt="item.title" />
          <p class="label">{{ item.title }}</p>
          <p class="tag">{{ $t("video.updated") }} {{ item.quality }}</p>
        </router-link>
      </n-gi>
    </n-grid>
    <n-pagination
      v-if="dataList.length > 0"
      v-model:page="page.pageNo"
      :page-slot="10"
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
  </n-card>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, getCurrentInstance } from "vue";
import { useAppStore, useVideoStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
const { proxy } = getCurrentInstance();
const app = useAppStore();
const route = useRoute();
const router = useRouter();
const video = useVideoStore();
const page = ref({ pageNo: parseInt(route.query.pageNo as string) || 1, pageCount: 0, total: 0, pageSize: 24 });

const dataList = ref(app.inSSR ? [] : ([] as any[]));

async function loadRec() {
  let pageNo = page.value.pageNo || 1;
  let limit = page.value.pageSize || 24;
  let start = (pageNo - 1) * limit;
  let list = await video.findFav({ start, limit: limit });
  let count = await video.findFavCount();
  console.info("list", list, count);
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
</script>

<style scoped lang="scss"></style>