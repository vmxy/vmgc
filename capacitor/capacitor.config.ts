import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.vmxy.vmgc",
  appName: "vmgc",
  webDir: "../dist",
  server: {
    androidScheme: "http",
  },
  android: {
    overrideUserAgent: "",
    appendUserAgent: "",
    backgroundColor: "#ffffffff",
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true,
    minWebViewVersion: 80,
  },
  cordova: {
    staticPlugins: []
  }
};

export default config;
