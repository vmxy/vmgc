const EventLists = new Set([
  "v_play",
  "v_playing",
  "v_pause",
  "v_ended",
  "v_error",
  "v_seeking",
  "v_seeked",
  "v_timeupdate",
  "v_waiting",
  "v_canplay",
  "v_canplaythrough",
  "v_durationchange",
  "v_volumechange",
  "v_bufferedChange",
  "v_definitionChange",
  "v_playbackrateChange",
  "v_screenShot",
  "v_requestFullscreen",
  "v_exitFullscreen",
  "v_requestCssFullscreen",
  "v_exitCssFullscreen",
  "v_getRotateFullscreen",
  "v_exitRotateFullscreen",
  "v_controlShow",
  "v_controlHide",
  "v_resize",
]);
export default class Event {
  constructor(readonly ele: HTMLElement) {
    this.init(ele);
  }
  init(ele: HTMLElement) {
    if (!ele) return;
    console.info("======================= init event =========================");
    window.addEventListener("message", (ev) => {
      let { event, data } = ev.data;
      if (EventLists.has(event)) {
        event = event.replace(/^v_/, "");
        switch (event) {
          case "requestCssFullscreen":
            ele.className += "h-full w-full";
            break;
          case "exitCssFullscreen":
            ele.className = ele.className.replace(/(h-full|w-full)/, "");
            break;
          case "resize":
            if (data && data.height) ele.style.height = data.height + "px";
            break;
        }
      }
    });
  }
}
