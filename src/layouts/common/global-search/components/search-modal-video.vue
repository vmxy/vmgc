<template>
  <n-modal
    v-model:show="show"
    :closable="false"
    close-on-esc
    preset="card"
    footer-style="padding: 0; margin: 0"
    class="fixed left-0 right-0 search-modal"
    :class="[app.isMobile ? 'wh-full top-0px rounded-0' : 'w-600px top-50px']"
    :style="app.isMobile ? 'top:0;bottom: 0; overflow-y: scroll; overflow-x: hidden;' : ''"
  >
    <n-input-group>
      <n-input
        ref="inputRef"
        placeholder=""
        v-model:value="query.q"
        clearable
        @keydown.enter="search"
      >
        <template #prefix>
          <icon-uil-search class="text-15px text-#c2c2c2" />
        </template>
      </n-input>
      <n-button v-if="app.isMobile" type="primary" ghost @click="handleClose">取消</n-button>
    </n-input-group>

    <v-search class="mt-6px"></v-search>
  </n-modal>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, shallowRef, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { onKeyStroke, useDebounceFn } from "@vueuse/core";
import { useRouteStore, useAppStore, useSearchStore } from "@/store";
import VSearch from "@/views/search/index.vue";
defineOptions({ name: "SearchModal" });

interface Props {
  /** 弹窗显隐 */
  value: boolean;
}
const props = defineProps<Props>();

interface Emits {
  (e: "update:value", val: boolean): void;
}

const emit = defineEmits<Emits>();
const app = useAppStore();
const router = useRouter();
const route = useRoute();
const searchStore = useSearchStore();
const activePath = ref("");
const inputRef = ref<HTMLInputElement>();
const query = ref({
  q: searchStore.q || route.query.q?.toString() || "",
});

const show = computed({
  get() {
    return props.value;
  },
  set(val: boolean) {
    emit("update:value", val);
  },
});

watch(show, async (val) => {
  if (val) {
    await nextTick();
    inputRef.value?.focus();
  }
});
watch(
  () => route.fullPath,
  () => {
    let q = route.query.q?.toString() || "";
    if (q) query.value.q = q;
  },
);
/** 查询 */
async function search() {
  let q = query.value.q;
  //let pageNo = parseInt(route.query.pageNo?.toString()) || 1;
  if (!q) return;
  //router.push(`/search?q=` + q + "&pageNo=1");
  let nquery = Object.assign({}, route.query, { q: q, pageNo: 1 });
    router.push(
      "/search" +
        "?" +
        Object.keys(nquery)
          .map((key) => key + "=" + encodeURIComponent(nquery[key] as string))
          .join("&"),
    );
}

function handleClose() {
  show.value = false;
}

onKeyStroke("Escape", handleClose);
//onKeyStroke("Enter", search);
//onKeyStroke("ArrowUp", handleUp);
//onKeyStroke("ArrowDown", handleDown);
</script>

<style lang="scss">

.search-modal {
  .n-card__content:first-child {
    padding: 6px !important;
  }
  :deep(.n-card__content:first-child) {
    padding: 6px !important;
  }
}
</style>
