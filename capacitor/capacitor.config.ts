import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.vmxy.vmgc",
  appName: "vmgc",
  webDir: "../dist",
  server: {
    androidScheme: "https",
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
};

export default config;
