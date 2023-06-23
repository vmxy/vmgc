import{NCard as G,NTabs as O,NTabPane as X}from"naive-ui/dist/index.js";import{defineComponent as v,ref as y,onMounted as g,mergeProps as w,useSSRContext as b,withCtx as d,createVNode as _,resolveDynamicComponent as f,openBlock as p,createBlock as u,Fragment as P,renderList as $}from"vue";import{ssrRenderAttrs as x,ssrRenderComponent as R,ssrRenderList as q,ssrRenderVNode as F}from"vue/server-renderer";import{useScriptTag as C}from"@vueuse/core";const Q="https://api.map.baidu.com/getscript?v=3.0&ak=KSezYymXPth1DIGILRX3oYN9PxbOQQmU&services=&t=20210201100830&s=1",V="https://webapi.amap.com/maps?v=2.0&key=e7bd02bd504062087e6563daf4d6721d",W="https://map.qq.com/api/gljs?v=1.exp&key=A6DBZ-KXPLW-JKSRY-ONZF4-CPHY3-K6BL7",S=v({name:"BaiduMap",__name:"baidu-map",__ssrInlineRender:!0,setup(t){const{load:n}=C(Q),e=y();async function o(){if(await n(!0),!e.value)return;const r=new BMap.Map(e.value),a=new BMap.Point(114.05834626586915,22.546789983033168);r.centerAndZoom(a,15),r.enableScrollWheelZoom()}return g(()=>{o()}),(r,a,m,l)=>{a(`<div${x(w({ref_key:"domRef",ref:e,class:"w-full h-full"},l))}></div>`)}}}),A=S.setup;S.setup=(t,n)=>{const e=b();return(e.modules||(e.modules=new Set)).add("src/views/plugin/map/components/baidu-map.vue"),A?A(t,n):void 0};const h=v({name:"GaodeMap",__name:"gaode-map",__ssrInlineRender:!0,setup(t){const{load:n}=C(V),e=y();async function o(){if(await n(!0),!e.value)return;new AMap.Map(e.value,{zoom:11,center:[114.05834626586915,22.546789983033168],viewMode:"3D"}).getCenter()}return g(()=>{o()}),(r,a,m,l)=>{a(`<div${x(w({ref_key:"domRef",ref:e,class:"w-full h-full"},l))}></div>`)}}}),N=h.setup;h.setup=(t,n)=>{const e=b();return(e.modules||(e.modules=new Set)).add("src/views/plugin/map/components/gaode-map.vue"),N?N(t,n):void 0};const k=v({name:"TencentMap",__name:"tencent-map",__ssrInlineRender:!0,setup(t){const{load:n}=C(W),e=y(null);async function o(){await n(!0),e.value&&new TMap.Map(e.value,{center:new TMap.LatLng(39.98412,116.307484),zoom:11,viewMode:"3D"})}return g(()=>{o()}),(r,a,m,l)=>{a(`<div${x(w({ref_key:"domRef",ref:e,class:"w-full h-full"},l))}></div>`)}}}),B=k.setup;k.setup=(t,n)=>{const e=b();return(e.modules||(e.modules=new Set)).add("src/views/plugin/map/components/tencent-map.vue"),B?B(t,n):void 0};const I=v({__name:"index",__ssrInlineRender:!0,setup(t){const n=[{id:"gaode",label:"高德地图",component:h},{id:"tencent",label:"腾讯地图",component:k},{id:"baidu",label:"百度地图",component:S}];return(e,o,r,a)=>{const m=G,l=O,M=X;o(`<div${x(w({class:"h-full"},a))}>`),o(R(m,{title:"地图插件",class:"h-full shadow-sm rounded-16px","content-style":"overflow:hidden"},{default:d((j,D,K,U)=>{if(D)D(R(l,{type:"line",class:"flex-col-stretch h-full","pane-class":"flex-1-hidden"},{default:d((c,i,Y,Z)=>{if(i)i("<!--[-->"),q(n,s=>{i(R(M,{key:s.id,name:s.id,tab:s.label},{default:d((H,L,z,E)=>{if(L)F(L,_(f(s.component),null,null),z,E);else return[(p(),u(f(s.component)))]}),_:2},Y,Z))}),i("<!--]-->");else return[(p(),u(P,null,$(n,s=>_(M,{key:s.id,name:s.id,tab:s.label},{default:d(()=>[(p(),u(f(s.component)))]),_:2},1032,["name","tab"])),64))]}),_:1},K,U));else return[_(l,{type:"line",class:"flex-col-stretch h-full","pane-class":"flex-1-hidden"},{default:d(()=>[(p(),u(P,null,$(n,c=>_(M,{key:c.id,name:c.id,tab:c.label},{default:d(()=>[(p(),u(f(c.component)))]),_:2},1032,["name","tab"])),64))]),_:1})]}),_:1},r)),o("</div>")}}}),T=I.setup;I.setup=(t,n)=>{const e=b();return(e.modules||(e.modules=new Set)).add("src/views/plugin/map/index.vue"),T?T(t,n):void 0};export{I as default};