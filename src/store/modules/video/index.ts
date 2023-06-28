import { defineStore } from "pinia";
import * as helper from "./helper";
import model from "./models";

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
  },
});
