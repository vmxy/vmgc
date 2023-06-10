import type { MockMethod } from "vite-plugin-mock";
import { videoModel, banners } from "../model/video";

const apis: MockMethod[] = [
  {
    url: "/mock/v/search",
    method: "get",
    response: (options: Service.MockOption): Service.MockServiceResult<{ list: NVideo.VideoInfo[]; page: Page }> => {
      const { id, pageNo } = options.query;
      const pageSize = 24;
      const start = ((parseInt(pageNo) || 1) - 1) * pageSize;
      return {
        code: 200,
        message: "ok",
        data: {
          list: videoModel.slice(start, start + pageSize).map((v) => {
            return {
              id: v.id,
              title: v.title,
              logo: v.logo,
              quality: v.lines[0].items.length,
              desc: v.desc,
            };
          }),
          page: {
            total: videoModel.length,
            pageSize: pageSize,
            pageNo: 1,
            totalPage: Math.ceil(videoModel.length / pageSize),
            //pageCount: Math.floor((videoModel.length - 1) / pageSize) + 1,
          },
        },
      };
    },
  },
  {
    url: "/mock/v/top",
    method: "get",
    response: (options: Service.MockOption): Service.MockServiceResult<{ list: NVideo.VideoInfo[]; page: Page }> => {
      const { type, pageNo } = options.query as NVideo.QueryTop;
      const pageSize = 24;
      const start = ((parseInt(pageNo + "") || 1) - 1) * pageSize;
      return {
        code: 200,
        message: "ok",
        data: {
          list: videoModel.slice(start, start + pageSize).map((v) => {
            return {
              id: v.id,
              title: v.title,
              logo: v.logo,
              quality: v.lines[0].items.length,
              desc: v.desc,
            };
          }),
          page: {
            total: videoModel.length,
            pageSize: pageSize,
            pageNo: 1,
            totalPage: Math.ceil(videoModel.length / pageSize),
            //pageCount: Math.floor((videoModel.length - 1) / pageSize) + 1,
          },
        },
      };
    },
  },
  // 获取用户信息(请求头携带token, 根据token获取用户信息)
  {
    url: "/mock/v/home",
    method: "get",
    response: (
      options: Service.MockOption,
    ): Service.MockServiceResult<{
      movie: NVideo.VideoInfo[];
      tv: NVideo.VideoInfo[];
      anime: NVideo.VideoInfo[];
      hot: NVideo.VideoInfo[];
      banner: NVideo.Banner[];
    }> => {
      // 这里的mock插件得到的字段是authorization, 前端传递的是Authorization字段
      return {
        code: 200,
        message: "",
        data: {
          movie: videoModel,
          tv: videoModel,
          anime: videoModel,
          hot: videoModel,
          banner: banners,
        },
      };
    },
  },
  {
    url: "/mock/v/detail",
    method: "get",
    response: (options: Service.MockOption): Service.MockServiceResult<NVideo.VideoDetail | undefined> => {
      const { id, pageNo } = options.query;
      const pageSize = 24;
      const start = ((parseInt(pageNo) || 1) - 1) * pageSize;
      return {
        code: 200,
        message: "ok",
        data: videoModel.find((v) => v.id == id) || videoModel[0],
      };
    },
  },
  {
    url: "/mock/v/play",
    method: "get",
    response: (options: Service.MockOption): Service.MockServiceResult<any | undefined> => {
      const { id } = options.query;
      const pageSize = 24;
      return {
        code: 200,
        message: "ok",
        data: {
          df: "https://vip.ffzyread.com/20230512/11561_0b61b4c2/index.m3u8",
          "480": "https://vip.ffzyread.com/20230512/11561_0b61b4c2/index.m3u8",
          "720": "https://vip.ffzyread.com/20230512/11561_0b61b4c2/index.m3u8",
        },
      };
    },
  },
];
//https://vip.ffzyread.com/20230512/11561_0b61b4c2/index.m3u8
export default apis;
