import{o as s,e as l,f as t,g as I,c as b,z as N,h as y,i,l as e,F as k,p as w,n as E,_ as V,k as h,j as $}from"./index-cc9450de.js";import{_ as L}from"./web-site-link.vue_vue_type_script_setup_true_lang-c60f676c.js";import{_ as M}from"./_plugin-vue_export-helper-c27b6911.js";const j={width:"1em",height:"1em",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"3","stroke-linecap":"round","stroke-linejoin":"round",class:"prefix__prefix__feather prefix__prefix__feather-cast"},F=t("path",{d:"M2 16.1A5 5 0 015.9 20M2 12.05A9 9 0 019.95 20M2 8V6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2h-6M2 20h.01"},null,-1),A=[F];function S(u,a){return s(),l("svg",j,A)}const U={name:"local-cast",render:S},z={class:"inline-block",width:"1em",height:"1em",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"3","stroke-linecap":"round","stroke-linejoin":"round"},O=t("path",{d:"M22 12h-4l-3 9L9 3l-3 9H2"},null,-1),P=[O];function H(u,a){return s(),l("svg",z,P)}const R={name:"local-activity",render:H},T={key:0,class:"grid grid-cols-9 h-auto overflow-auto"},X=["onClick"],q=I({name:"IconSelect",__name:"icon-select",props:{value:{},icons:{},emptyIcon:{default:"mdi:apps"}},emits:["update:value"],setup(u,{emit:a}){const d=u,r=b({get(){return d.value},set(n){a("update:value",n)}}),m=b(()=>r.value||d.emptyIcon),_=N(""),x=b(()=>d.icons.filter(n=>n.includes(_.value)));function f(n){r.value=n}return(n,p)=>{const v=V,o=h.NInput,g=h.NEmpty,B=h.NPopover;return s(),y(B,{placement:"bottom-end",trigger:"click"},{trigger:i(()=>[e(o,{value:r.value,"onUpdate:value":p[0]||(p[0]=c=>r.value=c),readonly:"",placeholder:"点击选择图标"},{suffix:i(()=>[e(v,{icon:m.value,class:"text-30px p-5px"},null,8,["icon"])]),_:1},8,["value"])]),header:i(()=>[e(o,{value:_.value,"onUpdate:value":p[1]||(p[1]=c=>_.value=c),placeholder:"搜索图标"},null,8,["value"])]),default:i(()=>[x.value.length>0?(s(),l("div",T,[(s(!0),l(k,null,w(x.value,c=>(s(),l("span",{key:c,onClick:ne=>f(c)},[e(v,{icon:c,class:E(["border-1px border-#d9d9d9 text-30px m-2px p-5px cursor-pointer",{"border-primary":r.value===c}])},null,8,["icon","class"])],8,X))),128))])):(s(),y(g,{key:1,class:"w-306px",description:"你什么也找不到"}))]),_:1})}}});const D=M(q,[["__scopeId","data-v-058e6abd"]]),C=["mdi:emoticon","mdi:ab-testing","ph:alarm","ph:android-logo","ph:align-bottom","ph:archive-box-light","uil:basketball","uil:brightness-plus","uil:capture","mdi:apps-box","mdi:alert","mdi:airballoon","mdi:airplane-edit","mdi:alpha-f-box-outline","mdi:arm-flex-outline","ic:baseline-10mp","ic:baseline-access-time","ic:baseline-brightness-4","ic:baseline-brightness-5","ic:baseline-credit-card","ic:baseline-filter-1","ic:baseline-filter-2","ic:baseline-filter-3","ic:baseline-filter-4","ic:baseline-filter-5","ic:baseline-filter-6","ic:baseline-filter-7","ic:baseline-filter-8","ic:baseline-filter-9","ic:baseline-filter-9-plus"],G={class:"h-full"},J={class:"grid grid-cols-10"},K={class:"mt-50px"},Q=t("h1",{class:"mb-20px text-18px font-500"},"Icon图标选择器",-1),W=t("div",{class:"pb-12px text-16px"}," 在src/assets/svg-icon文件夹下的svg文件，通过在template里面以 icon-local-{文件名} 直接渲染, 其中icon-local为.env文件里的 VITE_ICON_LOCAL_PREFFIX ",-1),Y={class:"grid grid-cols-10"},Z={class:"mt-5px flex-x-center"},ee={class:"mt-5px flex-x-center"},te=t("div",{class:"py-12px text-16px"},"通过SvgIcon组件动态渲染, 菜单通过meta的localIcon属性渲染自定义图标",-1),se={class:"grid grid-cols-10"},ie=I({__name:"index",setup(u){const a=N(""),d=["custom-icon","activity","at-sign","cast","chrome","copy","wind"];return(r,m)=>{const _=V,x=D,f=L,n=h.NCard,p=R,v=U;return s(),l("div",G,[e(n,{title:"Icon组件示例",class:"shadow-sm rounded-16px"},{footer:i(()=>[e(f,{label:"iconify地址：",link:"https://icones.js.org/",class:"mt-10px"})]),default:i(()=>[t("div",J,[(s(!0),l(k,null,w($(C),o=>(s(),l("div",{key:o,class:"mt-5px flex-x-center"},[e(_,{icon:o,class:"text-30px"},null,8,["icon"])]))),128))]),t("div",K,[Q,e(x,{value:a.value,"onUpdate:value":m[0]||(m[0]=o=>a.value=o),icons:$(C)},null,8,["value","icons"])])]),_:1}),e(n,{title:"自定义图标示例",class:"mt-10px shadow-sm rounded-16px"},{default:i(()=>[W,t("div",Y,[t("div",Z,[e(p,{class:"text-40px text-success"})]),t("div",ee,[e(v,{class:"text-20px text-error"})])]),te,t("div",se,[(s(),l(k,null,w(d,(o,g)=>t("div",{key:g,class:"mt-5px flex-x-center"},[e(_,{"local-icon":o,class:"text-30px text-primary"},null,8,["local-icon"])])),64))])]),_:1})])}}});export{ie as default};