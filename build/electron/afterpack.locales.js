/**
 * 删除多语言
 * @param {*} context 
 */
exports.default = async function (context) {
  const fs = require("fs");
  const localeDir = context.appOutDir + "/locales/";

 /*  fs.readdir(localeDir, function (err, files) {
    if (!(files && files.length)) return;
    for (let i = 0, len = files.length; i < len; i++) {
      if (!/(zh-CN|en-US)\.pak/i.test(files[i])) {
        console.info("del locale", files[i]);
        fs.unlinkSync(localeDir + files[i]);
      }
    }
  }); */
};
