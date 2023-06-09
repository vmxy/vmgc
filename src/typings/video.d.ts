/** 用户相关模块 */
declare namespace NVideo {
  interface VideoState {
    tv: {
      list: VideoInfo[];
      detail?: VideoDetail;
    };
    years: Code[];
    sorts: Code[];
  }
  interface Query {
    cata?: 'movie' | 'tv' | 'anime' | 'variety' | 'sport' | 'doc';
    /** 分类  */
    class?: string;
    /** 第几页 */
    pageNo?: number;
    type?: string;
    year?: string;
    /** 搜索记事 */
    q?: string;
  }
  interface QueryTop {
    type: 'hot' | 'rec';
    pageNo?: number;
    pageSize?: number;
  }

  interface Banner {
    img: string;
    url: string;
    label: string;
  }
  interface VideoInfo {
    id: string;
    /** 标题 */
    title: string;
    logo: string;
    quality: number;
    desc: string;
  }
  interface VideoDetail {
    id: string;
    /** 标题 */
    title: string;
    logo: string;
    quality: number;
    /** 视频摘要 */
    desc: string;
    year: number;
    /** 更新时间 */
    updateAt: number;
    /** 地区 */
    area: string;
    /** 分类 */
    class: string;
    type: string;
    /** 导演 */
    directors: string[];
    actors: string[];
    updateAt: number;
    /** 线路 */
    lines: Line[];
  }
  interface Line {
    id: string;
    label: string;
    items: LineItem[];
  }
  interface LineItem {
    label: string;
    id: string;
  }
  interface Res {
    id: string;
    /** 标题 */
    title: string;
    logo: string;
    quality: number;
    year: number;
    class: string;
    type: string;
    /** 线路 */
    lines: Line[];
    url: string;
    vid: string;
  }
}
