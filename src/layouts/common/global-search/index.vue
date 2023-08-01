<template>
  <div v-if="showInput" class="w-full mt-12px mr-5px">
    <n-input id="q" v-model:value="query.q" placeholder="" :min="1" :max="12" @keydown.enter.native="handleSearch" />
  </div>
  <div v-if="showButton">
    <hover-container class="w-40px h-full" :inverted="theme.header.inverted" @click="handleSearch">
      <icon-uil-search class="text-20px" />
    </hover-container>
    <search-modal v-model:value="searchStore.show" />
  </div>
</template>

<script lang="ts" setup>
import { useThemeStore, useAppStore, useSearchStore } from "@/store";
import { SearchModal } from "./components";
import { ref, getCurrentInstance, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBasicLayout } from "@/composables";
const { mode, headerMode } = useBasicLayout();

defineOptions({ name: "GlobalSearch" });
const props = defineProps({
  showButton: {
    type: Boolean,
    default: true,
  },
  showInput: {
    type: Boolean,
    default: true,
  },
});
const theme = useThemeStore();
const app = useAppStore();
const searchStore = useSearchStore();
const route = useRoute();
const router = useRouter();
const query = ref({
  q: searchStore.q || route.query.q?.toString() || "",
});
function handleSearch() {
  if (!props.showInput) {
    // toggle();
    searchStore.setShow();
  } else {
    let q = query.value.q || (document.querySelector("#q input") as HTMLInputElement)?.value || "";
    let nquery = Object.assign({}, route.query, { q: q });
    nquery.pageNo = "1";
    router.push(
      "/search" +
        "?" +
        Object.keys(nquery)
          .map((key) => key + "=" + encodeURIComponent(nquery[key] as string))
          .join("&"),
    );
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
