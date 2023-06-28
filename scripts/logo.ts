import fs from "fs";
import themeSettings from "../src/settings/theme.json";

async function updateFavicon(svgPath: string, color: string) {
  const svgStr = fs.readFileSync(svgPath, { encoding: "utf-8" });

  const svgStrWithColor = svgStr.replace(/currentColor/g, color);

  await fs.writeFileSync("./public/favicon.svg", svgStrWithColor);
}

updateFavicon("./src/assets/svg-icon/logo.svg", themeSettings.themeColor);
