import{g as V,u as I,z as m,A as B,w as q,aN as z,B as L,o as h,h as U,i as f,f as S,e as C,k as w,aP as D,c as O,aT as A,l as c,t as H,x as G,j as k,q as J,P as K}from"./index-a4a25dc6.js";import{V as M,b as Q,_ as W}from"./line-f97a65dc.js";import{_ as X}from"./_plugin-vue_export-helper-c27b6911.js";/* empty css              *//* empty css                                                                */import"./index.vue_vue_type_style_index_0_scoped_f9e0a513_lang-a39cf2e1.js";import{V as Y}from"./index-88f3c3c4.js";import"./g-image-482b5fdc.js";let $=!1;async function P(a){if($)return a&&a();$=!0,await T("https://unpkg.byted-static.com/xgplayer/3.0.1/dist/index.min.css","js/xgplayer/index.css"),await R("https://unpkg.byted-static.com/xgplayer/3.0.1/dist/index.min.js","js/xgplayer/index.js"),await R("https://unpkg.byted-static.com/xgplayer-hls.js/3.0.0-alpha.1/dist/index.min.js","js/xgplayer/hlsjs.js"),a&&a()}async function T(...a){return new Promise((t,i)=>{let e=document.createElement("link");e.rel="stylesheet",e.href=a[0],document.body.appendChild(e),e.onload=()=>t(void 0),e.onerror=e.onabort=()=>{if(a.length<1)return i();T(...a.slice(1))}})}async function R(...a){return new Promise((t,i)=>{let e=document.createElement("script");e.type="text/javascript",e.src=a[0],document.body.appendChild(e),e.onload=()=>t(void 0),e.onerror=e.onabort=()=>{if(a.length<1)return i();T(...a.slice(1))}})}const Z=new Set(["v_play","v_playing","v_pause","v_ended","v_error","v_seeking","v_seeked","v_timeupdate","v_waiting","v_canplay","v_canplaythrough","v_durationchange","v_volumechange","v_bufferedChange","v_definitionChange","v_playbackrateChange","v_screenShot","v_requestFullscreen","v_exitFullscreen","v_requestCssFullscreen","v_exitCssFullscreen","v_getRotateFullscreen","v_exitRotateFullscreen","v_controlShow","v_controlHide","v_resize"]);class N{constructor(t){this.ele=t,this.init(t)}init(t){t&&(console.info("======================= init event ========================="),window.addEventListener("message",i=>{let{event:e,data:r}=i.data;if(Z.has(e))switch(e=e.replace(/^v_/,""),e){case"requestCssFullscreen":t.className+="h-full w-full";break;case"exitCssFullscreen":t.className=t.className.replace(/(h-full|w-full)/,"");break;case"resize":t.style.height=r.height+"px";break}}))}}const ee=["src"],te=V({__name:"index",props:{res:{type:Object,required:!0,default:{}}},setup(a){const t=a;I();const i=m(!0),e=m(""),r=m(),u=m(!1),y=globalThis.VIDEO_URL||(globalThis.env?"/xplayer.html":"https://svbcdn.github.io/xplayer")||"";console.info("=PlayerURL",y);const p=!!y;let l;function x(s){e.value=s}const n=()=>{l&&(u.value=!0,l.destroy(),l=void 0)};async function o(s){var F;if(console.info("init=============",s),!s||s.length<1)return;let d=s[0];if(!r.value||!d)return;l&&n();const v=700,b="playTime-"+d;let j=parseInt(localStorage.getItem(b))||1,E=parseFloat(localStorage.getItem("volume"))||.3;i.value=!1,l=new globalThis.Player({el:r.value,url:d,currentTime:j,playbackRate:[.5,.75,1,1.5,2],width:v,height:v*9/16,fluid:!0,volume:E,progressDot:[],pip:!0,keyShortcut:!0,playsinline:!0,enableContextmenu:!0,lang:/(cn|zh)/i.test((F=globalThis.navigator)==null?void 0:F.language)?"zh":"en",crossOrigin:!0,plugins:[globalThis.HlsJsPlugin]}),new N(r.value),l.once("ready",()=>{setTimeout(()=>{l.currentTime=j,l.play()},200)}),l.once("complete",()=>{l.pause()}),l.on("volumechange",ae=>{localStorage.setItem("volume",l.volume)}),l.on("timeupdate",()=>{sessionStorage.setItem(b,l.currentTime)})}function g(){i.value=!1,new N(r.value)}function _(s){return`${y}?id=${encodeURIComponent(s)}`}return B(()=>{t.res.url&&(p?x(_(t.res.url)):P(()=>{o([t.res.url])}))}),q(t.res,s=>{s.url&&(p?x(_(s.url)):P(()=>{o([s.url])}))}),z(()=>{n()}),L(()=>{n()}),(s,d)=>{const v=w.NSpin;return h(),U(v,{show:i.value,size:"large"},{default:f(()=>[S("div",null,[p?(h(),C("iframe",{key:0,id:"ifa-video",src:e.value,width:"100%",scrolling:"no",style:{overflow:"hidden"},allowfullscreen:"",class:"player",ref_key:"videoRef",ref:r,onLoad:g},null,40,ee)):(h(),C("div",{key:1,ref_key:"videoRef",ref:r,class:"player"},null,512))])]),_:1},8,["show"])}}});const ne=X(te,[["__scopeId","data-v-d7be6fcc"]]),se={class:"text-28px",style:{display:"inline-block","margin-right":"30px"}},_e=V({__name:"[id]",setup(a){const t=I(),i=D(),{proxy:e}=K(),r=O(()=>{let n=e.$route.params.id;return n instanceof Array?n[0]:n}),u=m(t.inSSR?e.$root.$attrs.detail:{id:"",lines:[]}),y=m([]),p=m(!1);async function l(n){let o=await i.toggleFav({id:n.vid,title:n.title,logo:n.logo,desc:n.desc,quality:n.quality});p.value=o}B(async()=>{let n=await x(r.value);n&&(p.value=await i.hasFav(n.vid),i.addPlayed(r.value))});async function x(n){var g,_,s;if(!n)return;(g=globalThis.$loadingBar)==null||g.start();let{data:o}=await A(n);if((_=globalThis.$loadingBar)==null||_.finish(),!o){(s=globalThis.$message)==null||s.warning("video is no data");return}return Object.assign(u.value,o),e.$route.meta.title=o.title,t.setTitle(o.title),y.value=[o.url],o}return(n,o)=>{const g=ne,_=W,s=w.NButton,d=w.NGi,v=w.NGrid;return h(),C("div",null,[c(v,{class:"player",cols:"20",responsive:"screen","item-responsive":!0,"x-gap":"6 m:6","y-gap":"6 m:12"},{default:f(()=>[c(d,{span:"20 m:13"},{default:f(()=>[c(g,{res:u.value},null,8,["res"]),S("div",null,[S("p",se,H(u.value.title),1),c(s,{onClick:o[0]||(o[0]=b=>l(u.value))},{icon:f(()=>[c(_,{style:G({color:p.value?"#ff0000":"#ffffff"})},null,8,["style"])]),_:1})])]),_:1}),c(d,{span:"20 m:7"},{default:f(()=>[c(v,{cols:"10",responsive:"screen","item-responsive":!0},{default:f(()=>[c(d,{span:"10"},{default:f(()=>[u.value.vid?(h(),U(k(M),{key:0,detail:u.value,top:10},null,8,["detail"])):J("",!0)]),_:1})]),_:1})]),_:1})]),_:1}),c(k(Q),{id:u.value.vid},null,8,["id"]),c(k(Y))])}}});export{_e as default};
