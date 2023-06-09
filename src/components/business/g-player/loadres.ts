let initScriptState = false;
export async function initScript(callback?: () => void) {
  if (initScriptState) return;
  initScriptState = true;
  //globalThis.Player = Player;
  await loadCss(
    //
    "https://unpkg.byted-static.com/xgplayer/3.0.1/dist/index.min.css", //
    "https://cdn.jsdelivr.net/npm/xgplayer@3.0.1/dist/index.min.css", //
    "/js/xgplayer/index.css",
  );
  await loadScript(
    //
    "https://unpkg.byted-static.com/xgplayer/3.0.1/dist/index.min.js", //
    "https://cdn.jsdelivr.net/npm/xgplayer@3.0.1/dist/index.min.js", //
    "/js/xgplayer/index.js",
  );
  await loadScript(
    //
    "https://unpkg.byted-static.com/xgplayer-hls.js/3.0.0-alpha.1/dist/index.min.js", //
    //"https://cdn.jsdelivr.net/npm/xgplayer-hls.js@2.6.4/dist/index.js",//不兼容,等3.0.0
    "/js/xgplayer/hlsjs.js",
  );
  callback && callback();
}
async function loadCss(...urls: string[]) {
  return new Promise((resolve, reject) => {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = urls[0];
    document.body.appendChild(link);
    link.onload = () => resolve(undefined);
    link.onerror = link.onabort = () => {
      if (urls.length < 1) return reject();
      loadCss(...urls.slice(1));
    };
  });
}
async function loadScript(...urls: string[]) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = urls[0];
    document.body.appendChild(script);
    script.onload = () => resolve(undefined);
    script.onerror = script.onabort = () => {
      if (urls.length < 1) return reject();
      loadCss(...urls.slice(1));
    };
  });
}
