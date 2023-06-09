<template>
  <div v-if="!app.isMobile" class="w-full mt-12px mr-5px">
    <n-input
      v-model:value="searchStore.q"
      placeholder="请输入"
      :min="1"
      :max="12"
      @keydown.enter.native="handleSearch"
    />
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
import { ref, getCurrentInstance } from "vue";

defineOptions({ name: "GlobalSearch" });

const theme = useThemeStore();
const app = useAppStore();
const searchStore = useSearchStore();
const { proxy } = getCurrentInstance();
function handleSearch() {
  if (app.isMobile) {
    // toggle();
    searchStore.setShow();
  } else {
    proxy.$router.push(`/search?q=${encodeURIComponent(searchStore.q)}`);
  }
}
</script>

<style lang="scss" scoped></style>
