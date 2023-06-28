import dayjs from "dayjs";
import { defineConfig, loadEnv } from "vite";

const viteEnv = loadEnv("production", process.cwd()) as unknown as ImportMetaEnv;
const ssr = viteEnv.VITE_SSR == "Y";
/** 项目构建时间 */
const PROJECT_BUILD_TIME = JSON.stringify(dayjs().format("YYYY-MM-DD HH:mm:ss"));

const viteDefine: { [key: string]: string } = {
  PROJECT_BUILD_TIME,
  /*   __dirname: ssr
    ? `(()=>{
    const __filename = require("url").fileURLToPath(import.meta.url);
    console.log('__filename: ', __filename)
    const __dirname = require("path").dirname(__filename);
    console.log('__dirname: ', __dirname);
    return __dirname;
  })()`
    : "__dirname", */
};
if (ssr) {
/*   viteDefine.__dirname = `(()=>{
    const __filename = require("url").fileURLToPath(import.meta.url);
    console.log('__filename: ', __filename)
    const __dirname = require("path").dirname(__filename);
    console.log('__dirname: ', __dirname);
    return __dirname;
  })()`; */
}

export { viteDefine };
