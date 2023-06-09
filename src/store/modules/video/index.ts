import { defineStore } from "pinia";
import { localStg } from "@/utils";
import * as helper from "./helper";
import * as service from "@/service";
import { ref, Ref } from "vue";

function toLocalDataIndex(page: number) {
  let idx = Math.max((parseInt(page + "") || 1) - 1, 0);
  return idx;
}
export const useVideoStore = defineStore("video-store", {
  state: (): NVideo.VideoState => helper.initState(),
  getters: {},
  actions: {},
});
