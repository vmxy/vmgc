import type { MockMethod } from "vite-plugin-mock";
import { banners } from "../model/banner";

const apis: MockMethod[] = [
  {
    url: "/mock/banner",
    method: "get",
    response: (options: Service.MockOption): Service.MockServiceResult<{ list: NVideo.Banner[] }> => {
      const { id, pageNo } = options.query;
      const pageSize = 24;
      const start = ((parseInt(pageNo) || 1) - 1) * pageSize;
      return {
        code: 200,
        message: "ok",
        data: {
          list: banners,
        },
      };
    },
  },
];
//https://vip.ffzyread.com/20230512/11561_0b61b4c2/index.m3u8
export default apis;
