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
          <span v-if="isSingleLine" class="text-24px"> {{ $t("video.detail.line") }} </span>
          <n-button v-if="isSingleLine" type="error" size="small" text @click="onSort(true)">
            <template #icon>
              <n-icon><icon-mdi-sort-numeric-descending /></n-icon>
            </template>
          </n-button>
          <n-button v-if="isSingleLine" type="warning" size="small" text @click="onSort(false)">
            <template #icon>
              <n-icon><icon-mdi-sort-numeric-ascending /></n-icon>
            </template>
          </n-button>
          <n-button
            v-if="!app.isMobile"
            type="primary"
            :size="isSingleLine ? 'small' : 'large'"
            text
            @click="showQRCode"
          >
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
        <n-scrollbar class="max-h-220px" :id="'id-' + line.id" ref="refScroll">
          <g-a
            v-for="item in line.items"
            v-if="line.id == selectLineId"
            :id="'res-' + item.id"
            button
            :disabled="selectResId == item.id"
            :href="`/video/xplay/${item.id}`"
            :type="playeds[item.id] ? 'red' : ''"
          >
            {{ item.label }}
          </g-a>
        </n-scrollbar>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup lang="ts">
import { ref, watch, getCurrentInstance, computed, Ref, onMounted } from "vue";
import { useAppStore, useVideoStore } from "@/store";
import { sessionStg } from "@/utils";
import { useRouter } from "vue-router";
const ssr = import.meta.env.SSR;
const UseServerHost = import.meta.env.VITE_APP_URL || globalThis.env?.innerIP || globalThis.location.host;
const app = useAppStore();
const video = useVideoStore();
const router = useRouter();
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
//const items = ref([] as Code[]);
const selectLineId = ref("");
const loading = ref(true);
const selectResId = ref(proxy.$route.params.id);
const lineRef = ref<any>();
const refQRCode = ref<any>();
const isSingleLine = computed(() => app.screenWidth < 1024);
/* const showSameLine = computed(() => {
  if(!lineRef.value) return true;
  let el = lineRef.value.$el as HTMLElement;
  let width = el?.offsetWidth || 480;
  return width >= 1024;
}); */
function isPlay(resId: string) {
  let is = sessionStg.get(("playid-" + resId) as any) == "1";
  //let is = await video.hasPlayed(resId);
  return is;
}
const playeds = ref({} as { [key: string]: boolean });
async function getInitLineId() {
  if (!detail.value || !detail.value?.lines) return "";
  let line = detail.value?.lines?.find((v) => v.items.find((item) => item.id == selectResId.value));
  if (!line) line = detail.value?.lines[0];
  if (line && !ssr) {
    for (let item of line.items) {
      let has = await video.hasPlayed(item.id);
      playeds.value[item.id] = has;
    }
  }
  return line?.id || "";
}
function onUpdateTab(lineId: string) {
  loading.value = false;
  selectLineId.value = lineId;

  setTimeout(() => {
    if (ssr) return;
    let scroll = proxy.$refs["refScroll"] as any;
    let ele = globalThis.document.querySelector("#res-" + selectResId.value) as HTMLElement;
    if (scroll && ele) {
      let s = scroll[0];
      s.scrollTo({ top: ele.offsetTop });
    }
  }, 100);
  /*   let lines = detail.value.lines;
  let selectList = lines.find((v) => v.id == lineId) || lines[0];
  let list = (selectList?.items || []).map((v) => ({
    label: v.label,
    value: v.id,
    disabled: selectResId.value == v.id,
  }));
  items.value = list;  */
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
  if (text.startsWith("http://127.0.0.1") || text.startsWith("http://localhost")) {
    const APPURL = import.meta.env.VITE_APP_URL || "";
    if (APPURL) {
      let server = /^https?:/i.test(APPURL) ? APPURL : "https://" + APPURL;
      text = text.replace(/^http:\/\/[a-z0-9\.]+:\d+/g, `${server}`);
    } else {
      let server = globalThis.env?.innerIP || globalThis.location.host;
      server = /^https?:/i.test(APPURL) ? APPURL : "http://" + APPURL;
      text = text.replace(/^http:\/\/[a-z0-9\.]+:\d+/g, `${server}`);
    }
  }
  refQRCode.value.show(text);
}
function openPlay(url: string) {
  let e = globalThis.event as Event;
  console.info("e", e);
  //location.href = `/video/player/${id}`;
  e.preventDefault();
  e.stopPropagation();
  router.push(url);
}
onMounted(async () => {
  let lineId = await getInitLineId();
  lineId && onUpdateTab(lineId);
});
watch(
  props.detail,
  async (nitem) => {
    Object.assign(detail.value, nitem);
    let lineId = await getInitLineId();
    lineId && onUpdateTab(lineId);
  },
  { immediate: true },
);
</script>

<style scoped lang="scss">
.box-a {
  display: inline-block;
  padding: 3px 7px;
  box-sizing: border-box;
  //border-image: linear-gradient(to bottom, transparent 50%, #5a5959 50%) 0 0 100%/1px 0;
  margin: 3px 3px;
  position: relative;
}
.box-a::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  border: 1px solid #5a5959;
  transform-origin: 0 0;
  transform: scale(0.5);
}
.box-a-red {
  background-color: #bf1067;
}
.box-a-disabled {
  cursor: not-allowed;
  user-select: none;
  pointer-events: none;
  background-color: #5a5959 !important;
}
.line {
  :deep(.inline-block) {
    margin-top: 14px;
  }

  :deep(.n-tabs) {
    max-height: 320px;
  }
}
</style>
