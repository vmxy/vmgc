import{j as X,r as p,h as _,m as Y,o as h,a as v,b as o,w as n,e as i,u as y,f as r,n as m,d as x}from"./chunk-b8a590ba.js";import{r as P}from"./chunk-544fb087.js";import"./chunk-101896b7.js";const A={class:"wh-full flex-col-center"},B={class:"flex-center py-12px"},T={class:"flex-center"},W={class:"w-full h-full"},$=["cx","cy","rx","ry"],z=60,G=X({__name:"index",setup(F){const w=P("root"),e={cX:202,cY:102,rX:200,rY:100,strokeWidth:2},g=(()=>{const{rX:l,rY:c,strokeWidth:s}=e,t=(l+s)*2,u=(c+s)*2;return`width:${t}px;height:${u}px;`})(),d=p(0),k=_(()=>{const{rX:l,rY:c}=e,s=l*Math.sin(d.value),t=c*Math.cos(d.value);return`transform: translate3d(${s}px,${t}px,0px)`}),C=p(2),b=2*Math.PI,N=_(()=>b/C.value/z),a=p(null),M=_(()=>a.value!==null),f=()=>{d.value+=N.value,a.value=window.requestAnimationFrame(f)},E=()=>{a.value!==null&&(window.cancelAnimationFrame(a.value),a.value=null)};return(l,c)=>{const s=x.NGradientText,t=x.NButton,u=Y("router-link"),S=x.NCard;return h(),v("div",A,[o(s,{class:"mb-24px",type:"primary",size:28},{default:n(()=>[i("Custom Constant Page")]),_:1}),o(u,{to:{name:y(w)}},{default:n(()=>[o(t,{type:"primary"},{default:n(()=>[i("回到首页")]),_:1})]),_:1},8,["to"]),o(S,{bordered:!1,size:"small",class:"mt-24px rounded-16px shadow-sm"},{default:n(()=>[r("div",B,[o(t,{type:"primary",class:"mr-24px",disabled:M.value,onClick:f},{default:n(()=>[i("开始")]),_:1},8,["disabled"]),o(t,{type:"error",onClick:E},{default:n(()=>[i("暂停")]),_:1})]),r("div",T,[r("div",{class:"relative bg-primary_active",style:m(y(g))},[(h(),v("svg",W,[r("ellipse",{cx:e.cX,cy:e.cY,rx:e.rX,ry:e.rY,style:m({strokeWidth:e.strokeWidth+"px"}),class:"fill-none stroke-primary"},null,12,$)])),r("div",{class:"absolute left-182px top-82px w-40px h-40px bg-red rounded-20px",style:m(k.value)},null,4)],4)])]),_:1})])}}});export{G as default};
