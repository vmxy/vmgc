import{NCard as _}from"naive-ui/dist/index.js";import{defineComponent as v,ref as d,onMounted as y,onUnmounted as x,mergeProps as R,withCtx as C,createVNode as g,useSSRContext as w}from"vue";import{ssrRenderAttrs as P,ssrRenderComponent as b}from"vue/server-renderer";import S from"xgplayer";const i=v({__name:"index",__ssrInlineRender:!0,setup(o){const e=d(),t=d();function a(){if(!e.value)return;const n="https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4";t.value=new S({el:e.value,url:n,playbackRate:[.5,.75,1,1.5,2],fluid:!0})}function u(){var n;(n=t.value)==null||n.destroy()}return y(()=>{a()}),x(()=>{u()}),(n,r,c,m)=>{const p=_;r(`<div${P(R({class:"h-full"},m))}>`),r(b(p,{title:"视频播放器插件",class:"h-full shadow-sm rounded-16px"},{default:C((h,s,k,f)=>{if(s)s(`<div class=""${f}></div>`);else return[g("div",{ref_key:"domRef",ref:e,class:""},null,512)]}),_:1},c)),r("</div>")}}}),l=i.setup;i.setup=(o,e)=>{const t=w();return(t.modules||(t.modules=new Set)).add("src/views/plugin/video/index.vue"),l?l(o,e):void 0};export{i as default};
