<template>
  <n-spin :show="loading" size="large">
    <div>
      <iframe
        v-if="inIframe"
        id="ifa-video"
        :src="playUrl"
        width="100%"
        scrolling="no"
        style="overflow: hidden"
        allowfullscreen
        class="player"
        ref="videoRef"
        @load="onLoad"
      ></iframe>
      <div v-else ref="videoRef" class="player"></div>
    </div>
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
const inIframe = import.meta.env.VITE_VIDEO_IF == "Y";
let player;

function changePlayUrl(url) {
  playUrl.value = url;
}
//initScript();
const destroy = () => {
  if (!player) return;
  isDestroy.value = true;
  player.destroy();
  //videoRef.value.querySelector("div").innerHTML = "";
  player = undefined;
};
async function init(urls: string[]) {
  console.info("init=============", urls);
  if (!urls || urls.length < 1) return;
  let url = urls[0];
  if (!videoRef.value || !url) return;
  if (!!player) destroy();
  //let url = "https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4";
  //url =
  //  "https://m3u.haiwaikan.com/xm3u8/9df98f18a3f5614ef85b0e5369de07a316877bb3ee411965cb32065413c5dae79921f11e97d0da21.m3u8";
  const width = 700;
  let lastPlayTime = parseInt(localStorage.getItem(url)) || 1;
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
    volume: 0.4,
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

  /* if (props.urls.length > 0) {
    //_player.emit("resourceReady", [{ name: "default", url: url }, { name: "720", url: url }]);
    console.info("urls", props.urls);
    _player.emit("resourceReady", props.urls.map((v) => {
      if (typeof (v) === "string") {
        return {
          name: v.replace(/.*\//g, ""),
          url: v
        }
      }
      return v
    }));
  } */
  player.once("ready", () => {
    setTimeout(() => {
      player.currentTime = lastPlayTime;
      player.play();
    }, 200);
  });
  player.once("complete", () => {
    player.pause();
  });
  //player.value = _player;
}
function onLoad() {
  loading.value = false;
  new Event(videoRef.value);
}
function toUrlObject(urls: Array<String | { name: String; url: String }>) {
  urls = (urls || []).filter((v) => !!v);
  let nurls: { url: string; label: string }[] = (urls || []).map((v) => {
    if (typeof v === "string") {
      return {
        label: "720",
        url: v,
      };
    } else {
      return v;
    }
  }) as any[];
  return nurls;
}
function getVideoPlayUrl(id: string) {
  let url = globalThis.VIDEO_URL || import.meta.env.VITE_VIDEO_URL;
  return `${url}?id=${encodeURIComponent(id)}`;
}
onMounted(() => {
  if (!props.res.url) return;
  if (inIframe) {
    changePlayUrl(getVideoPlayUrl(props.res.url));
  } else {
    initScript(() => {
      init([props.res.url]);
    });
  }
});
watch(props.res, (res) => {
  if (!res.url) return;
  if (inIframe) {
    changePlayUrl(getVideoPlayUrl(res.url));
  } else {
    initScript(() => init([res.url]));
  }
});
onBeforeUnmount(() => {
  destroy();
});
onUnmounted(() => {
  destroy();
});

ssr ||
  globalThis.addEventListener("beforeunload", () => {
    console.info("set lastPlayTime", player.currentTime);
    localStorage.setItem(props.res.url, player.currentTime + "");
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
  min-height: 200px;
}
@media screen and (max-width: 640px) {
  .player {
    //height: 358px;
  }
}
@media screen and (min-width: 640px) {
  .player {
    height: 425px;
  }
}
</style>
