<template>
  <div v-if="(app.inApp && app.isMobile) || !app.isMobile" class="w-full mt-12px mr-5px">
    <n-input v-model:value="query.q" placeholder="请输入" :min="1" :max="12" @keydown.enter.native="handleSearch" />
  </div>
  <div>
    <hover-container
      class="w-40px h-full"
      tooltip-content="搜索"
      :inverted="theme.header.inverted"
      @click="handleSearch"
    >
      <icon-uil-search class="text-20px" />
    </hover-container>
    <search-modal v-model:value="searchStore.show" />
  </div>
</template>

<script lang="ts" setup>
import { useThemeStore, useAppStore, useSearchStore } from "@/store";
import { SearchModal } from "./components";
import { ref, getCurrentInstance, watch } from "vue";
import { useRoute } from "vue-router";
import { useBasicLayout } from "@/composables";
const { mode, headerMode } = useBasicLayout();

defineOptions({ name: "GlobalSearch" });

const theme = useThemeStore();
const app = useAppStore();
const searchStore = useSearchStore();
const route = useRoute();
const { proxy } = getCurrentInstance();
const query = ref({
  q: searchStore.q || route.query.q?.toString() || "",
});
function handleSearch() {
  if (app.isMobile && !app.inApp) {
    // toggle();
    searchStore.setShow();
  } else {
    proxy.$router.push(`/search?q=${encodeURIComponent(query.value.q)}`);
  }
}
watch(
  () => route.fullPath,
  () => {
    let q = route.query.q?.toString() || "";
    if (q) query.value.q = q;
  },
);
</script>

<style lang="scss" scoped></style>
