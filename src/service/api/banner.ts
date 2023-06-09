import { request } from "../request";

/**
 * 获取列表数据
 * @param id
 * @returns
 */
export function fetchBanerList() {
  return request.get<{ list: NVideo.Banner[] }>(`/banner`);
}
