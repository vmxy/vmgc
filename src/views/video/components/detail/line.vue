<template>
  <n-card :class="`mt-${props.top}px`" class="line" ref="lineRef">
    <div v-if="ssr">
      <div v-for="line in detail.lines" :name="line.id" :tab="line.label">
        <n-space>
          <a v-for="item in line.items" :href="`/video/player/${item.id}`">{{ item.label }}</a>
        </n-space>
      </div>
    </div>
    <n-tabs
      v-if="!ssr"
      :value="selectLineId"
      type="line"
      animated
      trigger="click"
      justify-content="end"
      ref="tabs"
      @update:value="onUpdateTab"
    >
      <template #prefix>
        <n-space>
          <span class="text-24px"> {{ $t("video.detail.line") }} </span>
          <n-button tertiary circle type="error" size="small" text @click="onSort(true)">
            <template #icon>
              <n-icon><icon-mdi-sort-numeric-descending /></n-icon>
            </template>
          </n-button>
          <n-button tertiary circle type="warning" size="small" text @click="onSort(false)">
            <template #icon>
              <n-icon><icon-mdi-sort-numeric-ascending /></n-icon>
            </template>
          </n-button>
          <n-button tertiary circle type="primary" size="small" text @click="showQRCode">
            <template #icon>
              <n-icon><icon-mdi-qrcode-scan /></n-icon>
            </template>
          </n-button>
          <qrcode v-if="!app.inSSR" ref="refQRCode"></qrcode>

          <!--n-select
            v-if="app.isMobile"
            :loading="loading"
            filterable
            :options="items"
            class="w-128px"
            @update:value="openView"
          /-->
        </n-space>
      </template>
      <n-tab-pane v-for="line in detail.lines" :name="line.id" :tab="line.label">
        <!--n-select
          v-if="!app.isMobile"
          class="mb-5px w-128px"
          :loading="loading"
          filterable
          :options="items"
          @update:value="openView"
        /-->
        <n-scrollbar class="max-h-220px">
          <div>
            <n-space size="small" style="text-align: center">
              <router-link v-for="item in line.items" :to="`/video/xplay/${item.id}`">
                <n-button
                  :type="isPlay(item.id) ? 'error' : 'default'"
                  :disabled="selectResId == item.id"
                  :data-href="`/video/xplay/${item.id}`"
                >
                  {{ item.label }}
                </n-button>
              </router-link>
            </n-space>
          </div>
        </n-scrollbar>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup lang="ts">
import { ref, watch, getCurrentInstance, computed, Ref, onMounted } from "vue";
import { useThemeStore, useAppStore } from "@/store";
import { sessionStg } from "@/utils";
const ssr = import.meta.env.SSR;
const theme = useThemeStore();
const app = useAppStore();
const props = defineProps({
  detail: {
    type: Object,
    required: true,
  },
  top: {
    type: Number,
    default: 16,
  },
});
const { proxy } = getCurrentInstance();
const detail: Ref<NVideo.VideoDetail> = ref(<any>props.detail); // || proxy.$root.$attrs.detail
const items = ref([] as Code[]);
const selectLineId = ref("");
const loading = ref(true);
const selectResId = ref(proxy.$route.params.id);
const lineRef = ref<any>();
const refQRCode = ref<any>();

/* const showSameLine = computed(() => {
  if(!lineRef.value) return true;
  let el = lineRef.value.$el as HTMLElement;
  let width = el?.offsetWidth || 480;
  return width >= 1024;
}); */
function isPlay(resId: string) {
  let is = sessionStg.get(("playid-" + resId) as any) == "1";
  return is;
}
function getInitLineId() {
  if (!detail.value || !detail.value?.lines) return "";
  let line = detail.value?.lines?.find((v) => v.items.find((item) => item.id == selectResId.value));
  if (line) return line.id;
  return detail.value?.lines[0]?.id || "";
}
function onUpdateTab(lineId: string) {
  loading.value = false;
  selectLineId.value = lineId;
  let lines = detail.value.lines;
  let selectList = lines.find((v) => v.id == lineId) || lines[0];
  let list = (selectList?.items || []).map((v) => ({
    label: v.label,
    value: v.id,
    disabled: selectResId.value == v.id,
  }));
  items.value.splice(0, items.value.length);
  items.value.push(...list);
}
function onSort(bool: boolean = true) {
  detail.value.lines.forEach((line) => {
    line.items.sort((a, b) => {
      let x = parseInt(a.label.replace(/[^\d]+/g, "")),
        y = parseInt(b.label.replace(/[^\d]+/g, ""));
      return bool ? x - y : y - x;
    });
  });
}
async function showQRCode() {
  let text = globalThis.location?.href || "";
  refQRCode.value.show(text);
}
function openView(id: string) {
  location.href = `/video/player/${id}`;
}
onMounted(() => {
  let lineId = getInitLineId();
  lineId && onUpdateTab(lineId);
});
watch(
  props.detail,
  (nitem) => {
    Object.assign(detail.value, nitem);
    let lineId = getInitLineId();
    lineId && onUpdateTab(lineId);
  },
  { immediate: true },
);
</script>

<style scoped lang="scss">
.line {
  :deep(.inline-block) {
    margin-top: 14px;
  }

  :deep(.n-tabs) {
    max-height: 320px;
  }
}
</style>
