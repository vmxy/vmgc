import { defineStore } from "pinia";
import { sessionStg } from "@/utils";
import { useRoute } from "vue-router";
import { searchVideo } from "@/service";
import model from "../video/models";
let states = sessionStg.get("search");
export const useSearchStore = defineStore("search-store", {
  state: (): SearchState => {
    let route = useRoute();
    let pageNo = parseInt(route.params.pageNo as string) || 1;
    let q = route.params.q as string;
    if (states) {
      if (states.page.pageNo != pageNo || states.q != q) states = null;
    }

    return (
      states || {
        show: false,
        q: "",
        list: [],
        page: {
          pageNo: 1,
          total: 0,
          pageSize: 24,
          totalPage: 0,
        },
      }
    );
  },
  getters: {},
  actions: {
    set(list: NVideo.VideoInfo[], page: Page) {
      this.list = list;
      let total = page.total,
        pageSize = page.pageSize || 24;
      if (list.length < pageSize) {
        total = pageSize * (this.page.pageNo - 1) + list.length;
      }
      this.page.total = total;
      this.page.pageSize = pageSize;
      sessionStg.set("search", this.$state);
    },
    /*     async search(opts: { q: string; pageNo?: number }) {
      //if (opts.q == this.q) return this.list;
      this.q = opts.q;
      this.page.pageNo = opts.pageNo || 1;
      let { data } = await searchVideo(opts);
      this.set(data.list, data.page);
      return data.list;
    }, */
    setHide() {
      this.show = false;
    },
    setShow() {
      this.show = true;
    },
    async search(opts: NVideo.Query): Promise<NVideo.VideoInfo[]> {
      this.q = opts.q;
      this.page.pageNo = opts.pageNo || 1;
      const searchFromLocal = async () => {
        let limit = 24;
        let pageNo = opts.pageNo || 1;
        let start = (pageNo - 1) * limit;
        let list = await model.video.find({ ...opts, start, limit: 24 });
        let total = await model.video.count({});
        return {
          list,
          page: {
            total: total,
            pageNo: pageNo,
            pageSize: limit,
            totalPage: Math.ceil(total / limit),
          },
        };
      };
      let res = await searchVideo(opts);
      let data: any = res.data;
      if (!data) data = await searchFromLocal();
      else {
        let list: NVideo.VideoInfo[] = data.list || [];
        list.forEach((data) => {
          model.video.save(data.id, data);
        });
      }
      this.set(data.list, data.page);
      return data.list;
    },
  },
});
