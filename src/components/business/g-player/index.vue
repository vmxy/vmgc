<template>
  <n-spin :show="loading" size="large">
    <div v-if="inIframe" ref="videoRef" class="player" style="height: 100%">
      <iframe
        id="ifa-video"
        :src="playUrl"
        width="100%"
        scrolling="no"
        style="overflow: hidden"
        allowfullscreen
        class="player"
      ></iframe>
    </div>
    <div v-else ref="videoRef" class="player"></div>
  </n-spin>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, onBeforeUnmount, computed } from "vue";
import { initScript } from "./loadres";
import { useAppStore } from "@/store";
import Event from "./event";
const ssr = import.meta.env.SSR;
const app = useAppStore();
//import 'xgplayer/dist/index.min.css';
//import HlsJsPlayer from 'xgplayer-hls.js';
const props = defineProps({
  res: {
    type: Object,
    required: true,
    default: {},
  },
});
const loading = ref(true);
const playUrl = ref("");
const videoRef = ref<HTMLElement>();
const isDestroy = ref(false);
const PlayerURL = globalThis.VIDEO_URL || (globalThis.env ? "/xplayer.html" : import.meta.env.VITE_VIDEO_URL) || "";
const inIframe = !!PlayerURL;
let player;
let hevent: Event;
//initScript();
const destroy = async () => {
  if (player) {
    isDestroy.value = true;
    player.destroy();
    //videoRef.value.querySelector("div").innerHTML = "";
    player = undefined;
  }

  hevent?.destroy();
  notifyClose();
};
async function notifyClose() {
  let el = document.querySelector("#ifa-video") as HTMLIFrameElement;
  if (el) {
    el?.contentWindow?.postMessage({ event: "close", data: {} }, "*");
    await wait(100);
  }
}
async function playInMe(urls: string[]) {
  if (ssr) return;
  console.info("init=============", urls);
  if (!urls || urls.length < 1) return;
  let url = urls[0];
  if (!videoRef.value || !url) return;
  if (!!player) destroy();
  //url =
  //  "https://m3u.haiwaikan.com/xm3u8/9df98f18a3f5614ef85b0e5369de07a316877bb3ee411965cb32065413c5dae79921f11e97d0da21.m3u8";
  const width = 700;
  const Key = "playTime-" + url;
  let lastPlayTime = parseInt(localStorage.getItem(Key)) || 1;
  let volume = parseFloat(localStorage.getItem("volume")) || 0.3;
  loading.value = false;
  player = new globalThis.Player({
    el: videoRef.value,
    url: url,
    currentTime: lastPlayTime,
    //autoplay: true,
    //playsinline: true,
    playbackRate: [0.5, 0.75, 1, 1.5, 2],
    width: width,
    height: (width * 9) / 16,
    fluid: true,
    volume: volume,
    progressDot: [],
    //screenShot: {name: "图"},
    //download: true,
    pip: true,
    keyShortcut: true,
    playsinline: true,
    enableContextmenu: true,
    lang: /(cn|zh)/i.test(globalThis.navigator?.language) ? "zh" : "en",
    crossOrigin: true,
    plugins: [globalThis.HlsJsPlugin],
  });
  new Event(videoRef.value);

  player.once("ready", () => {
    setTimeout(() => {
      player.currentTime = lastPlayTime;
      player.play();
    }, 200);
  });
  player.once("complete", () => {
    player.pause();
  });
  player.on("volumechange", (v) => {
    localStorage.setItem("volume", player.volume);
  });
  player.on("timeupdate", () => {
    sessionStorage.setItem(Key, player.currentTime);
  });
}
async function playInIframe(url: string) {
  onLoad(document.querySelector("#ifa-video"));
  //let el = createIframe(url);
  console.info("playInIframe", url);
  await notifyClose();
  playUrl.value = url;
}
function onLoad(el) {
  hevent?.destroy();
  loading.value = false;
  el = el || document.querySelector("#ifa-video");
  console.info("===play inframe onload ===", el);
  hevent = new Event(el);
}

function getVideoPlayUrl(id: string) {
  //let url = globalThis.VIDEO_URL || import.meta.env.VITE_VIDEO_URL;
  return `${PlayerURL}?id=${encodeURIComponent(id)}`;
}
onMounted(() => {
  if (!props.res.url) return;
  if (inIframe) {
    playInIframe(getVideoPlayUrl(props.res.url));
  } else {
    initScript(() => {
      playInMe([props.res.url]);
    });
  }
});
watch(props.res, (res) => {
  if (!res.url) return;
  if (inIframe) {
    playInIframe(getVideoPlayUrl(res.url));
  } else {
    initScript(() => {
      playInMe([res.url]);
    });
  }
});
onBeforeUnmount(() => {
  destroy();
});
onUnmounted(() => {
  destroy();
});

/* globalThis.addEventListener("message", (ev) => {
  let { event, data } = ev.data;
  if (event == "video_resize") {
    let ele = document.querySelector("#ifa-video") as HTMLElement;
    if (ele) {
      ele.style.height = data.height + "px";
    }
  }
}); */
</script>

<style scoped lang="scss">
.player {
  min-height: 225px;
  background-color: #000;
}

@media screen and (min-width: 640px) {
  .player {
    min-height: 425px;
  }
}
</style>
