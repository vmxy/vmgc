import { defineStore } from "pinia";
import * as helper from "./helper";
import model from "./models";
import * as service from "@/service";

export const useVideoStore = defineStore("video-store", {
  state: (): NVideo.VideoState => helper.initState(),
  getters: {},
  actions: {
    async toggleFav(data: { id: string; title: string; logo: string; quality: number; desc?: string }) {
      if (!data.id) return false;
      let v = await model.fav?.get(data.id);
      if (v) {
        await model.fav?.delete(data.id);
        return false;
      } else {
        await model.fav?.save(data.id, {
          id: data.id,
          title: data.title,
          logo: data.logo,
          quality: data.quality,
          desc: data.desc,
        });
        return true;
      }
    },
    async saveFav(data: { id: string; title: string; logo: string; quality: number; desc?: string }) {
      await model.fav?.save(data.id, {
        id: data.id,
        title: data.title,
        logo: data.logo,
        quality: data.quality,
        desc: data.desc,
      });
    },
    async findFav(opts: { start: number; limit?: number }) {
      return model.fav?.list({ start: opts.start, limit: opts.limit || 24 }) || [];
    },
    async deleteFav(id: string) {
      model.fav?.delete(id);
    },
    async findFavCount() {
      return model.fav?.listCount() || 0;
    },
    async hasFav(id: string) {
      let v = await model.fav?.get(id);
      return !!v && !!v.id && !!v.title;
    },

    async hasPlayed(id: string) {
      return model.played?.hasPlayed(id);
    },
    async addPlayed(id: string) {
      model.played?.save(id, { id });
    },
    async get(id: string) {
      let detail;
      if (model.video) {
        detail = await model.video?.get(id);
      }
      if (detail) {
        service.fetchVideoDetail(id).then((res) => {
          model.video.save(id, res.data);
        });
      } else {
        let { data } = await service.fetchVideoDetail(id);
        detail = data;
        model.video.save(id, detail);
      }
      return detail;
    },
    async getRes(id: string) {
      let detail;
      if (model.videoRes) {
        detail = await model.videoRes?.get(id);
      }
      if (detail) {
        service.fetchVideoRes(id).then(({data}) => {
          //console.info("xxx", data);
          model.videoRes.save(id, data);
        });
      } else {
        let { data } = await service.fetchVideoRes(id);
        detail = data;
        //console.info("v", data);
        model.videoRes.save(id, detail);
      }
      return detail;
    }
  },
});
