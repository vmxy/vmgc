import dayjs from "dayjs";
import { Buffer } from "buffer";

/** 项目构建时间 */
const PROJECT_BUILD_TIME = JSON.stringify(dayjs().format("YYYY-MM-DD HH:mm:ss"));

export const viteDefine = {
  PROJECT_BUILD_TIME,
  Buffer,
};
