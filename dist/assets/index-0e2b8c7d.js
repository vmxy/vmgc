import{g as A,u as B,K as F,J as O,aP as P,z as d,A as V,N as k,G as $,o as s,h as i,i as r,e as f,p as G,l as C,f as x,t as _,F as N,av as I,q as L,k as g}from"./index-cc9450de.js";import{_ as M}from"./loading-empty-wrapper.vue_vue_type_script_setup_true_lang-d457c53f.js";import{_ as E}from"./g-image-cd4f0901.js";/* empty css                                                                */import"./_plugin-vue_export-helper-c27b6911.js";const K={class:"label"},D={class:"tag"},J=["onClick","href"],Z=A({__name:"index",setup(W){const h=B(),u=F(),w=O(),y=P(),m=d(!0),o=d({pageNo:parseInt(u.query.pageNo)||1,pageCount:0,total:0,pageSize:24}),S=d(h.screenWidth<=420?6:10),c=d(h.inSSR?[]:[]);async function R(){m.value=!0;let e=o.value.pageNo||1,t=o.value.pageSize||24,n=(e-1)*t,p=await y.findFav({start:n,limit:t}),l=await y.findFavCount();m.value=!1,c.value=p,o.value.total=l,o.value.pageCount=Math.ceil(l/t)}function b(e){let t=Object.assign({},u.query);return t.pageNo=e+"",u.path+"?"+Object.keys(t).map(n=>n+"="+encodeURIComponent(t[n])).join("&")}async function v(e){let t=o.value.pageCount||1;e=e<1?1:e,e=e>t?t:e;let n=u.path,p=Object.assign({},{pageNo:e});w.push(n+"?"+Object.keys(p).map(l=>l+"="+encodeURIComponent(p[l])).join("&"))}return V(async()=>{R()}),k("ArrowLeft",()=>{v(o.value.pageNo-1)}),k("ArrowRight",()=>{v(o.value.pageNo+1)}),(e,t)=>{const n=E,p=$("router-link"),l=g.NGi,j=g.NGrid,q=M,z=g.NPagination,U=g.NCard;return s(),i(U,{title:e.$t("menu.fav"),class:"shadow-sm mt-16px"},{default:r(()=>[c.value.length>0?(s(),i(j,{key:0,cols:"xs:2 s:2 m:5 l:6 xl:7 2xl:12",responsive:"screen","x-gap":"6 m:12","y-gap":"6 m:12",class:"min-h-500px"},{default:r(()=>[(s(!0),f(N,null,G(c.value,a=>(s(),i(l,{span:"1",key:a.id,class:"min-h-90px"},{default:r(()=>[C(p,{to:"/video/detail/"+a.id,class:"v-item"},{default:r(()=>[C(n,{src:a.logo,alt:a.title},null,8,["src","alt"]),x("p",K,_(a.title),1),x("p",D,_(e.$t("video.updated"))+" "+_(a.quality),1)]),_:2},1032,["to"])]),_:2},1024))),128))]),_:1})):(s(),i(q,{key:1,class:"h-500px",loading:m.value,empty:""},null,8,["loading"])),c.value.length>0?(s(),i(z,{key:2,page:o.value.pageNo,"onUpdate:page":[t[0]||(t[0]=a=>o.value.pageNo=a),v],"page-slot":S.value,"item-count":o.value.total,"page-size":o.value.pageSize,class:"mt-10px"},{label:r(a=>[a.type=="page"?(s(),f("a",{key:0,onClick:I(()=>{},["prevent"]),href:`${b(a.node)}`},_(a.node),9,J)):(s(),f(N,{key:1},[],64))]),_:1},8,["page","page-slot","item-count","page-size"])):L("",!0)]),_:1},8,["title"])}}});export{Z as default};
