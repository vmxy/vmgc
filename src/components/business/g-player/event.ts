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
  private state = "open";
  constructor(readonly ele: HTMLElement) {
    this.init(ele);
  }
  init(ele: HTMLElement) {
    if (!ele) return;
    const onMessage = (ev) => {
      if (this.state == "destroy") {
        window.removeEventListener("message", onMessage);
        return;
      }
      let { event, data } = ev.data;
      if (!ele || !ele.style) return;
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
            if (data && data.height) {
              ele.style.height = data.height + "px";
              ele.parentElement.style.height = data.height + "px";
            }
            break;
        }
      }
    };
    window.addEventListener("message", onMessage);
   /*  const onOrientationchange = () => {
      if (this.state == "destroy") {
        window.removeEventListener("orientationchange", onOrientationchange);
        return;
      }
      var iframe = document.getElementById("ifa-video");
      const orientation = window.orientation;
      console.info("=====orientationchange", orientation, iframe?.requestFullscreen);
      if (orientation == 90 || orientation == -90) {
        console.info("=====横屏状态");
        iframe?.requestFullscreen && iframe.requestFullscreen();
      } else if (orientation == 180 || orientation == 0) {
        console.info("=====竖屏状态");
        document.exitFullscreen();
      }
     
    }
    window.addEventListener("orientationchange", onOrientationchange); */
  }
  destroy() {
    this.state = "destroy";
  }
}
