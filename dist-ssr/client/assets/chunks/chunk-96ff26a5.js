import{j as z,r as I,h as O,z as U,m as $,o as s,a as g,b as _,w as p,u as i,c as d,F as h,v as R,f as y,t as m,A as V,s as E,d as c}from"./chunk-b8a590ba.js";import{_ as F}from"./chunk-19421471.js";import{_ as G}from"./chunk-372590c2.js";/* empty css              */import{h as M,o as P,p as T}from"./chunk-544fb087.js";/* empty css              */import{_ as A}from"./chunk-c27b6911.js";/* empty css              */import"./chunk-101896b7.js";const D={class:"label"},H={class:"tag"},L=["onClick","href"],J=z({__name:"index",setup(K){const l=M(),N=P(),t=T(),u=I(!1),f=O(()=>{var e;return parseInt((e=l.query.pageNo)==null?void 0:e.toString())||1});function q(){t.setHide()}function v(o){let e=Object.assign({},l.query);return e.pageNo=o+"",e.q=t.q,l.path+"?"+Object.keys(e).map(a=>a+"="+encodeURIComponent(e[a])).join("&")}U(()=>{var a,r;let o=(a=l.query.q)==null?void 0:a.toString(),e=parseInt((r=l.query.pageNo)==null?void 0:r.toString())||1;console.info("search q",o,t.q,o==t.q,t.page.pageNo==e),o&&(o==t.q&&t.page.pageNo==e&&t.list.length>0||x({q:o,pageNo:e}))});async function k(o){let e=l.path,a=Object.assign({},{q:t.q,pageNo:o});N.push(e+"?"+Object.keys(a).map(r=>r+"="+encodeURIComponent(a[r])).join("&"))}async function x(o){var e,a;(e=globalThis.$loadingBar)==null||e.start(),u.value=!0,await t.search(o),(a=globalThis.$loadingBar)==null||a.finish(),u.value=!1}return(o,e)=>{const a=G,r=$("router-link"),b=c.NGi,C=c.NGrid,S=F,w=c.NCard,j=c.NSpin,B=c.NPagination;return s(),g("div",null,[_(j,{show:u.value,size:"large"},{default:p(()=>[_(w,{class:"module-page"},{header:p(()=>[]),default:p(()=>[i(t).list.length>0?(s(),d(C,{key:0,cols:"xs:2 s:4 m:5 l:6 xl:7 2xl:12",responsive:"screen","x-gap":"3 x:6 s:9 m:12","y-gap":"3 x:6 s:9 m:12"},{default:p(()=>[(s(!0),g(h,null,R(i(t).list,n=>(s(),d(b,{key:n.id,span:"1",class:"min-h-90px"},{default:p(()=>[_(r,{to:"/video/detail/"+n.id,class:"v-item",onClick:q},{default:p(()=>[_(a,{src:n.logo,alt:n.title},null,8,["src","alt"]),y("p",D,m(n.title),1),y("p",H,m(o.$t("video.updated"))+" "+m(n.quality),1)]),_:2},1032,["to"])]),_:2},1024))),128))]),_:1})):(s(),d(S,{key:1,class:"h-360px",loading:u.value,empty:""},null,8,["loading"]))]),_:1})]),_:1},8,["show"]),i(t).list.length>0?(s(),d(B,{key:0,page:f.value,"onUpdate:page":[e[0]||(e[0]=n=>f.value=n),k],"page-slot":10,"item-count":i(t).page.total,"page-size":i(t).page.pageSize,class:"mt-10px"},{label:p(n=>[n.type=="page"?(s(),g("a",{key:0,onClick:V(()=>{},["prevent"]),href:`${v(n.node)}`},m(n.node),9,L)):(s(),g(h,{key:1},[],64))]),_:1},8,["page","item-count","page-size"])):E("",!0)])}}}),ne=A(J,[["__scopeId","data-v-7bced922"]]);export{ne as default};
