import { defineConfig, loadEnv } from "vite";
import { createViteProxy, getRootPath, getSrcPath, setupVitePlugins, viteDefine } from "./build";
import { getServiceEnvConfig } from "./.env-config";

export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as ImportMetaEnv;
  const ssr = viteEnv.VITE_SSR == "Y";
  const rootPath = getRootPath();
  const srcPath = getSrcPath();
  console.info("app", rootPath, srcPath, "ssr=" + ssr);
  const isOpenProxy = viteEnv.VITE_HTTP_PROXY === "Y";
  const envConfig = getServiceEnvConfig(viteEnv);

  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        "~": rootPath,
        "@": srcPath,
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
        "naive-ui": "naive-ui/dist",
      },
    },
    define: viteDefine,
    plugins: setupVitePlugins(viteEnv),
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/scss/global.scss" as *;`,
        },
      },
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
      open: false,
      proxy: createViteProxy(isOpenProxy, envConfig),
    },
    optimizeDeps: {
      include: [
        "@antv/data-set",
        "@antv/g2",
        "@better-scroll/core",
        "echarts",
        "swiper",
        "swiper/vue",
        "vditor",
        "wangeditor",
        "xgplayer",
      ],
    },
    ssr: {
      //external: ["naive-ui"],
      //format: "cjs"
      //noExternal: [/vue/, /vue-.*/, "pinia", "naive-ui"],
    },
    legacy: {
      //buildSsrCjsExternalHeuristics: true
    },
    build: {
      emptyOutDir: true,
      //target: "modules",
      outDir: ssr ? "dist-ssr" : "dist",
      //publicDir: "public",
      minify: true,
      cssMinify: true,
      manifest: true,
      ssrManifest: ssr ? true : false,
      //ssr: true,
      reportCompressedSize: false,
      sourcemap: false,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split(".").at(1);
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = "img";
            }
            //if (assetInfo.name.includes("id")) console.info("==========", assetInfo);
            return `assets/${extType}/[name]-[hash][extname]`;
          },
        },
      },
      commonjsOptions: {
        ignoreTryCatch: false,
        //ignoreGlobal: true,
        transformMixedEsModules: true,
        esmExternals: true,
        //defaultIsModuleExports: false,
        sourceMap: false,
        //include: [/node_modules/],
        //extensions: [".js", ".cjs", ".mjs"],
      },
      /*    modulePreload: {
        polyfill: true,
        resolveDependencies: (url: string, deps: string[], { hostId, hostType }) => {
          return deps.filter((dep) => ["vue", "vue-router", "pinia", "naive-ui"].includes(dep));
        }, 
      },*/
    },
  };
});
