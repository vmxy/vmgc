import { request } from "../request";

/**
 * 获取列表数据
 * @param id
 * @returns
 */
export function searchVideo(query: NVideo.Query) {
  let qs = [];
  query = Object.assign({ pageNo: 1 }, query);
  Object.keys(query || {}).forEach((k) => query[k] && qs.push(k + "=" + encodeURIComponent(query[k])));
  return request.get<{ list: NVideo.VideoInfo[]; page: Page }>(`/v/search?${qs.join("&")}`);
}

/** 最热数据 */
export function fetchVideoHot(query: SearchPage) {
  let qs = [];
  query = Object.assign({ page: 1 }, query);
  Object.keys(query || {}).forEach((k) => query[k] && qs.push(k + "=" + encodeURIComponent(query[k])));
  return request.get<{ list: NVideo.VideoInfo[]; page: Page }>(`/v/hot?${qs.join("&")}`).catch((err) => {
    return { data: { list: [] } };
  });
}
/** 最热数据 */
export function fetchVideoRec(vid: string, page: {pageSize: number}) {
  return request.get<{ list: NVideo.VideoInfo[]; page: Page }>(`/v/rec/${vid}?pageSize=${page.pageSize}`);
}

export function fetchVideoDetail(id: string) {
  return request.get<NVideo.VideoDetail>(`/v/detail/${id}`);
}
export function fetchVideoRes(id: string) {
  return request.get<NVideo.Res>(`/v/res/${id}`);
}
export function fetchVideoPlay(id: string) {
  return request.get<NVideo.VideoDetail>(`/v/play/${id}`);
}
