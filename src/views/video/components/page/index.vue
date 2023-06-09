<template>
  <div>
    <v-option :id="props.id" @search="onSearch"></v-option>
    <n-spin :show="loading" size="large">
      <n-card class="mt-16px module-page">
        <template #header> </template>
        <n-grid
          v-if="dataList.length > 0"
          cols="xs:2 s:4 m:5 l:6 xl:7 2xl:12"
          responsive="screen"
          x-gap="3 x:6 s:9 m:12"
          y-gap="3 x:6 s:9 m:12"
        >
          <n-gi v-for="item in dataList" :key="item.id" span="1" class="min-h-90px">
            <router-link :to="'/video/detail/' + item.id" class="v-item">
              <g-image :src="item.logo" class="img"></g-image>
              <p class="label">{{ item.title }}</p>
              <p class="tag">{{ $t("video.updated") }} {{ item.quality }}</p>
            </router-link>
          </n-gi>
        </n-grid>
        <loading-empty-wrapper v-else class="h-360px" :loading="loading" empty />
      </n-card>
    </n-spin>
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
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed, Ref, onMounted } from "vue";
import { useAppStore } from "@/store";
import { VOption } from "../";
import * as service from "@/service";
import { useRoute, useRouter } from "vue-router";
import { formatImageUrl } from "@/utils";

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
const route = useRoute();
const router = useRouter();
const app = useAppStore();
const page = ref({ pageNo: parseInt(route.query.pageNo as string) || 1, pageCount: 0, total: 0, pageSize: 24 });
const dataList: Ref<NVideo.VideoInfo[]> = ref([]);
const loading = ref(true);
const query = ref({
  class: (route.query.class as string) || "all",
  type: (route.query.type as string) || "all",
  year: (route.query.year as string) || "all",
});

function newUrl(pageNo: number) {
  let nquery = Object.assign({}, route.query);
  nquery.pageNo = pageNo + "";
  nquery.id = props.id;
  nquery.class = query.value.class;
  nquery.type = query.value.type;
  nquery.year = query.value.year;
  return (
    route.path +
    "?" +
    Object.keys(nquery)
      .map((key) => key + "=" + encodeURIComponent(nquery[key] as string))
      .join("&")
  );
}
onMounted(() => {
  search({ ...query.value, pageNo: page.value.pageNo });
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
function onSearch(opts) {
  query.value.class = opts.class || "all";
  query.value.type = opts.type || "all";
  query.value.year = opts.year || "all";
  onUpdatePage(page.value.pageNo);
}
async function search(opts: { cata?: string; type?: string; class?: string; year?: string; pageNo: number }) {
  page.value.pageNo = opts.pageNo;
  query.value.class = opts.class || "all";
  query.value.type = opts.type || "all";
  query.value.year = opts.year || "all";
  globalThis.$loadingBar?.start();
  loading.value = true;
  let { data } = await service.searchVideo({
    cata: <any>props.id || "tv",
    class: opts.class, //
    type: opts.type,
    year: opts.year,
    pageNo: opts.pageNo,
    q: props.q,
  });
  globalThis.$loadingBar?.finish();
  loading.value = false;

  page.value.total = data.page.total;
  page.value.pageSize = data.page.pageSize;
  dataList.value = (data.list || []).slice(0, props.limit);
}
</script>

<style scoped lang="scss">
.module-page {
  min-height: 200px;
}
</style>
