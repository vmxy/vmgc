import zhCN from "./zh-cn";
import en from "./en";
import kmKH from "./km-KH";

const locales = {
  "zh-CN": zhCN,
  en: en,
  "km-KH": kmKH,
};

export type LocaleKey = keyof typeof locales;
export const langList: { label: string; key: string }[] = [];
for (let key in locales) {
  let locale = locales[key];
  langList.push({
    label: locale.language,
    key: key,
  });
  console.info("langList", langList)
}
export default locales;
