import{j as N,r as x,o as C,c as D,w as e,b as t,e as s,d as o}from"./chunk-b8a590ba.js";import{l as h,g as k,r as d}from"./chunk-544fb087.js";import"./chunk-101896b7.js";const g=N({__name:"index",setup(w){const{routerPush:r}=h(),p=k(),l=x("");function m(){r({name:d("function_tab-detail"),query:{name:"abc"},hash:"#DEMO_HASH"})}function c(n){r({name:d("function_tab-multi-detail"),query:{name:"abc",num:n},hash:"#DEMO_HASH"})}function f(){var n;l.value?p.setActiveTabTitle(l.value):(n=window.$message)==null||n.warning("请输入要设置的标题名称")}return(n,a)=>{const u=o.NButton,b=o.NInput,T=o.NInputGroup,_=o.NSpace,v=o.NCard;return C(),D(_,{vertical:!0,size:16},{default:e(()=>[t(v,{title:"Tab Home",bordered:!1,size:"small",class:"shadow-sm rounded-16px"},{default:e(()=>[t(_,{vertical:!0,size:12},{default:e(()=>[t(u,{onClick:m},{default:e(()=>[s("跳转Tab Detail")]),_:1}),t(u,{onClick:a[0]||(a[0]=i=>c(1))},{default:e(()=>[s("跳转Tab Multi Detail 1")]),_:1}),t(u,{onClick:a[1]||(a[1]=i=>c(2))},{default:e(()=>[s("跳转Tab Multi Detail 2")]),_:1}),t(T,null,{default:e(()=>[t(b,{value:l.value,"onUpdate:value":a[2]||(a[2]=i=>l.value=i)},null,8,["value"]),t(u,{type:"primary",onClick:f},{default:e(()=>[s("设置当前Tab页标题")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}});export{g as default};