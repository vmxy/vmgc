import{j as q,s as qe,p as H,k as l,m as E,n as Q,q as L,g as k,r as me,t as j,u as T,v as Qe,b as u,w as g,d as _,x as O,y as W,z as Xe,o as h,a as Ze,l as A,A as ye,B as et,C as tt,D as ve,E as nt,F as K,G as rt,H as ot,c as st,I as be,J as Se,K as it,L as at,M as lt,N as _e,O as ut,P as X,i as U,h as ct,Q as ft}from"../chunks/chunk-11420f52.js";import{_ as Z}from"../chunks/chunk-101896b7.js";function P(e){return typeof e!="object"||e===null?!1:Object.getPrototypeOf(e)===null?!0:e.constructor.name==="Object"}function se(e){return"["+e.map(t=>"'"+t+"'").join(", ")+"]"}function V(e,t){const n=Object.getOwnPropertyDescriptor(e,t);return!!n&&!("value"in n)&&!!n.get}function dt(e){return typeof e=="object"&&e!==null&&"then"in e&&q(e.then)}const gt=["default"],ht=["default",...gt],pt=Object.freeze(Object.defineProperty({__proto__:null,exportNames:ht},Symbol.toStringTag,{value:"Module"})),mt=["render"],yt=Object.freeze(Object.defineProperty({__proto__:null,exportNames:mt},Symbol.toStringTag,{value:"Module"})),vt="/*",bt=Object.freeze(Object.defineProperty({__proto__:null,default:vt},Symbol.toStringTag,{value:"Module"})),St=["render"],_t=Object.freeze(Object.defineProperty({__proto__:null,exportNames:St},Symbol.toStringTag,{value:"Module"})),ee={},Re={},Rt={},D={},Pt=[],Pe={},wt=!0,Ot=[],Et={onBeforeRoute:null},Ct=Object.assign({"/pages/all.page.vue":()=>Z(()=>import("./pages_all.page.f874b328.js"),["assets/entries/pages_all.page.f874b328.js","assets/chunks/chunk-101896b7.js","assets/chunks/chunk-b8a590ba.js"])}),Ft={...Ct};ee[".page"]=Ft;const Tt=Object.assign({"/pages/all.page.vue":pt}),xt={...Tt};D[".page"]=xt;const At=Object.assign({"/pages/all.page.server.js":yt}),kt={...At};D[".page.server"]=kt;const It=Object.assign({"/pages/all.page.route.js":bt}),jt={...It};Re[".page.route"]=jt;const Nt=Object.assign({"/pages/all.page.client.js":()=>Z(()=>import("./pages_all.page.client.aaa06616.js"),["assets/entries/pages_all.page.client.aaa06616.js","assets/chunks/chunk-544fb087.js","assets/chunks/chunk-b8a590ba.js","assets/chunks/chunk-101896b7.js","assets/chunks/chunk-2ed0e100.js","assets/chunks/chunk-eaea9dc0.js","assets/css/global-88c8d872.css"])}),$t={...Nt};ee[".page.client"]=$t;const Bt=Object.assign({"/pages/all.page.client.js":_t}),Ht={...Bt};D[".page.client"]=Ht;const Lt=Object.assign({"/pages/all.page.server.js":()=>Z(()=>import("./pages_all.page.server.extractAssets.11798533.js"),["assets/entries/pages_all.page.server.extractAssets.11798533.js","assets/css/index-26c7ff6b.css","assets/css/style-1813d98d.css","assets/css/index-b0f37167.css","assets/css/index-f68fb180.css","assets/css/index-5f82b5c5.css","assets/css/index-6c48486e.css","assets/css/index-91ba3f96.css","assets/css/index-1f6f99e7.css","assets/css/global-88c8d872.css"])}),Wt={...Lt};Pe[".page.server"]=Wt;const Dt=Object.freeze(Object.defineProperty({__proto__:null,isGeneratedFile:wt,neverLoaded:Pe,pageConfigGlobal:Et,pageConfigs:Ot,pageFilesEager:Re,pageFilesExportNamesEager:D,pageFilesExportNamesLazy:Rt,pageFilesLazy:ee,pageFilesList:Pt},Symbol.toStringTag,{value:"Module"}));qe(Dt);function Ut(e){return H(e,"/").pathname}function we(e){return!e.startsWith("/")&&!e.startsWith(".")&&!e.startsWith("?")&&e!==""}function Vt(){var e,t,n,s;const r=!!(!((t=(e=window.__REACT_DEVTOOLS_GLOBAL_HOOK__)===null||e===void 0?void 0:e.renderers)===null||t===void 0)&&t.size),o=!!(!((s=(n=window.__REACT_DEVTOOLS_GLOBAL_HOOK__)===null||n===void 0?void 0:n.rendererInterfaces)===null||s===void 0)&&s.size),i=!!window.__vite_plugin_react_preamble_installed__;return r||o||i}function zt(e,t){return(e==null?void 0:e.message)===(t==null?void 0:t.message)}function $(e){window.location.href=e}function Gt(e){return new Promise(t=>setTimeout(t,e))}function Kt(e,t){let n=!1;return()=>{n||(n=!0,setTimeout(()=>{n=!1,e()},t))}}l(Q());E();const ie=L("navigationState.ts",{}),Yt=k(),Oe={markNavigationChange(){ie.navigationChanged=!0},get noNavigationChangeYet(){return!ie.navigationChanged&&this.isFirstUrl(k())},isFirstUrl(e){return e===Yt}};async function Mt(e,t){const s=me(e,t).filter(o=>o.fileType===".page.server");return await Promise.all(s.map(async o=>{o.exportNames||(l(o.loadExportNames,t),await o.loadExportNames())})),{hasOnBeforeRenderServerSideOnlyHook:s.some(({exportNames:o})=>(l(o),o.includes("onBeforeRender")))}}function Jt(e,t){if(!P(e))return!1;for(const n of Object.keys(e))if(!t.includes(n))return!1;return!0}function qt(e){return typeof e=="object"&&e!==null&&Object.values(e).every(t=>typeof t=="string")}Q()&&E();function Qt(e,t){const s=t.filter(({filesystemRoot:o})=>e.startsWith(o)).sort(j(({filesystemRoot:o})=>o.length))[0];let r;if(s){const{filesystemRoot:o,urlRoot:i}=s,a={pageId:e,filesystemRoot:o,urlRoot:i};l(i.startsWith("/")&&e.startsWith("/")&&o.startsWith("/"),a),l(e.startsWith(o),a),o!=="/"?(l(!o.endsWith("/"),a),r=T(e,o.length,0)):r=e,l(r.startsWith("/"),a),r=i+(i.endsWith("/")?"":"/")+T(r,1,0)}else r=e;return l(r.startsWith("/")),r=r.split("/").filter(o=>o!=="pages"&&o!=="src"&&o!=="index").join("/"),l(!r.includes(".page.")),l(!r.endsWith(".")),r.endsWith("/index")&&(r=T(r,0,-6)),r===""&&(r="/"),l(r.startsWith("/")),l(!r.endsWith("/")||r==="/"),r}async function Xt(e,t,n,s){await Promise.all(e.filter(a=>a.fileType===".page.route").map(a=>{var c;return(c=a.loadFile)===null||c===void 0?void 0:c.call(a)}));const{onBeforeRouteHook:r,filesystemRoots:o}=en(e,t,n);return{pageRoutes:Zt(o,e,t,s),onBeforeRouteHook:r}}function Zt(e,t,n,s){const r=[];let o=[...s];if(n.length>0){l(e===null);const i=!0;n.filter(a=>!a.isErrorPage).forEach(a=>{const c=a.pageId;o=rn(o,c);let f=null;{const m=a.configElements.route;if(m){l("configValue"in m);const p=m.configValue,y=m.configDefinedAt;if(l(y),typeof p=="string")f={pageId:c,comesFromV1PageConfig:i,routeString:p,routeDefinedAt:y,routeType:"STRING"};else{l(q(p));let v=!1;const d=a.configElements.iKnowThePerformanceRisksOfAsyncRouteFunctions;if(d){const w=d.configValue;l(typeof w=="boolean",`${d.configDefinedAt} should be a boolean`),v=w}f={pageId:c,comesFromV1PageConfig:i,routeFunction:p,routeDefinedAt:y,routeType:"FUNCTION",allowAsync:v}}}}if(!f){const{routeFilesystem:m,routeFilesystemDefinedBy:p}=a;l(m),l(m.startsWith("/")),l(p),f={pageId:c,routeFilesystemDefinedBy:p,comesFromV1PageConfig:i,routeString:m,routeDefinedAt:null,routeType:"FILESYSTEM"}}l(f),r.push(f)})}if(n.length===0){l(e);const i=!1;o.filter(a=>!Qe(a)).forEach(a=>{const c=tn(a,t);if(c){const{filePath:f,fileExports:m}=c;if(l(m),u("default"in m,`${f} should have a default export.`),g(m,"default","string")){const p=m.default;u(p.startsWith("/"),`A Route String should start with a leading \`/\` but \`${f}\` has \`export default '${p}'\`. Make sure to \`export default '/${p}'\` instead.`),r.push({pageId:a,comesFromV1PageConfig:i,routeString:p,routeDefinedAt:f,routeType:"STRING"});return}if(g(m,"default","function")){const p=m.default;let y=!1;const v="iKnowThePerformanceRisksOfAsyncRouteFunctions";v in m&&(u(g(m,v,"boolean"),`The export \`${v}\` of ${f} should be a boolean.`),y=m[v]),r.push({pageId:a,comesFromV1PageConfig:i,routeFunction:p,routeDefinedAt:f,allowAsync:y,routeType:"FUNCTION"});return}u(!1,`The default export of ${f} should be a string or a function.`)}else{const f=Qt(a,e);l(f.startsWith("/")),l(!f.endsWith("/")||f==="/"),r.push({pageId:a,comesFromV1PageConfig:i,routeString:f,routeDefinedAt:null,routeFilesystemDefinedBy:`${a}.page.*`,routeType:"FILESYSTEM"})}})}return r}function en(e,t,n){if(t.length>0){if(n.onBeforeRoute){const o=n.onBeforeRoute.configValue;if(o){const i=n.onBeforeRoute.codeFilePath;return l(i),u(q(o),`The hook onBeforeRoute() defined by ${i} should be a function.`),{onBeforeRouteHook:{hookFilePath:i,onBeforeRoute:o},filesystemRoots:null}}}return{onBeforeRouteHook:null,filesystemRoots:null}}let s=null;const r=[];return e.filter(o=>o.fileType===".page.route"&&o.isDefaultPageFile).forEach(({filePath:o,fileExports:i})=>{if(l(i),"onBeforeRoute"in i){u(g(i,"onBeforeRoute","function"),`\`export { onBeforeRoute }\` of ${o} should be a function.`);const{onBeforeRoute:a}=i;s={hookFilePath:`${o} > \`export { onBeforeRoute }\``,onBeforeRoute:a}}"filesystemRoutingRoot"in i&&(u(g(i,"filesystemRoutingRoot","string"),`\`export { filesystemRoutingRoot }\` of ${o} should be a string.`),u(g(i,"filesystemRoutingRoot","string"),`\`export { filesystemRoutingRoot }\` of ${o} is \`'${i.filesystemRoutingRoot}'\` but it should start with a leading slash \`/\`.`),r.push({filesystemRoot:nn(o),urlRoot:i.filesystemRoutingRoot}))}),{onBeforeRouteHook:s,filesystemRoots:r}}function tn(e,t){return t.find(n=>n.pageId===e&&n.fileType===".page.route")}function nn(e){l(e.startsWith("/")),l(!e.endsWith("/"));const t=e.split("/"),n=T(t,0,-1).join("/")||"/";return l(n.startsWith("/")),l(!n.endsWith("/")||n==="/"),n}function rn(e,t){const{length:n}=e;return e=e.filter(s=>s!==t),l(e.length===n-1),e}function Ee(e,t=!0){l(e.urlOriginal),"urlPathname"in e&&l(V(e,"urlPathname")),Object.defineProperty(e,"urlPathname",{get:Fe,enumerable:t,configurable:!0}),"url"in e&&l(V(e,"url")),Object.defineProperty(e,"url",{get:on,enumerable:!1,configurable:!0}),"urlParsed"in e&&l(V(e,"urlParsed")),Object.defineProperty(e,"urlParsed",{get:sn,enumerable:t,configurable:!0})}function Ce(e){let t=e._urlHandler;t||(t=r=>r);const n=t(e.urlOriginal),s=e._baseServer;return l(s.startsWith("/")),H(n,s)}function Fe(){const{pathname:e}=Ce(this),t=e;return l(t.startsWith("/")),t}function on(){return _(!1,"`pageContext.url` is outdated. Use `pageContext.urlPathname`, `pageContext.urlParsed`, or `pageContext.urlOriginal` instead. (See https://vite-plugin-ssr.com/migration/0.4.23 for more information.)",{onlyOnce:!0,showStackTrace:!0}),Fe.call(this)}function sn(){const e=Ce(this),{origin:t,pathname:n,pathnameOriginal:s,search:r,searchAll:o,searchOriginal:i,hash:a,hashOriginal:c}=e,f={origin:t,pathname:n,pathnameOriginal:s,search:r,searchAll:o,searchOriginal:i,hash:a,hashOriginal:c,get hashString(){return _(!1,"`pageContext.urlParsed.hashString` has been renamed to `pageContext.urlParsed.hashOriginal`",{onlyOnce:!0,showStackTrace:!0}),c},get searchString(){return _(!1,"`pageContext.urlParsed.searchString` has been renamed to `pageContext.urlParsed.searchOriginal`",{onlyOnce:!0,showStackTrace:!0}),i}};return ae(f,"hashString"),ae(f,"searchString"),f}function ae(e,t){const n=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(e,t,{...n,enumerable:!1})}function an(e){l(typeof e.urlOriginal=="string"),l(typeof e.urlPathname=="string"),l(P(e.urlParsed)),l(e.urlPathname===e.urlParsed.pathname)}const Te="@",Y=":";function ln(e,t){u(e.startsWith("/")||e==="*",(()=>{t?t=t+" invalid":t="Invalid";const n=[`'${e}'`,e!==""?null:"(empty string)"].filter(Boolean).join(" ");return`${t} Route String ${n}: Route Strings should start with a leading slash '/' (or be '*')`})())}function M(e,t){ln(e),l(t.startsWith("/"));const n=e.split("/"),s=t.split("/"),r={};un(e),e==="*"&&(e="/*");for(let o=0;o<Math.max(n.length,s.length);o++){const i=n[o],a=s[o];if(i==="*")return r["*"]=s.slice(Math.max(1,o)).join("/"),{routeParams:r};if(i&&N(i)){if(_(!i.startsWith(Y),`Outdated Route String \`${e}\`, use \`${e.split(Y).join(Te)}\` instead.`,{showStackTrace:!1,onlyOnce:!0}),!a)return null;r[i.slice(1)]=a}else if((i||"")!==(a||""))return null}return{routeParams:r}}function un(e){const t=e.split("*").length-1;u(t<=1,`Invalid Route String \`${e}\`: Route Strings are not allowed to contain more than one glob character \`*\`.`),u(t===0||t===1&&e.endsWith("*"),`Invalid Route String \`${e}\`: make sure your Route String ends with the glob character \`*\`.`)}function F(e){const t=e.split("/").filter(i=>i!==""&&i!=="*");let n=0;for(const i of t){if(N(i))break;n++}const s=t.filter(i=>!N(i)).length,r=t.filter(i=>N(i)).length,o=e.endsWith("*");return{numberOfParameterSegments:r,numberOfStaticSegmentsBeginning:n,numberOfStaticSegements:s,isCatchAll:o}}function N(e){return e.startsWith(Te)||e.startsWith(Y)}function le(e){const n=M(e,e);return l(n),Object.keys(n.routeParams).length===0}function cn(e){e.sort(fn).sort(O(t=>t.routeType==="FUNCTION"&&!!t.precedence&&t.precedence<0)).sort(O(t=>t.routeType==="STRING"&&le(t.routeString)===!1)).sort(O(t=>t.routeType==="FUNCTION"&&!t.precedence)).sort(O(t=>t.routeType==="STRING"&&le(t.routeString)===!0)).sort(O(t=>t.routeType==="FILESYSTEM")).sort(O(t=>t.routeType==="FUNCTION"&&!!t.precedence&&t.precedence>0))}function fn(e,t){var n,s;{const r=(n=e.precedence)!==null&&n!==void 0?n:0,o=(s=t.precedence)!==null&&s!==void 0?s:0;if(r!==o)return r>o?-1:1}if(!t.routeString||!e.routeString)return 0;{const o=j(i=>F(i).numberOfStaticSegmentsBeginning)(e.routeString,t.routeString);if(o!==0)return o}{const o=j(i=>F(i).numberOfStaticSegements)(e.routeString,t.routeString);if(o!==0)return o}{const o=j(i=>F(i).numberOfParameterSegments)(e.routeString,t.routeString);if(o!==0)return o}{if(F(t.routeString).isCatchAll)return-1;if(F(e.routeString).isCatchAll)return 1}return 0}async function dn(e,t,n,s){an(n);let r=e(n);if(u(!dt(r)||t,`The Route Function ${s} returned a promise; async route functions are opt-in, see https://vite-plugin-ssr.com/route-function#async`),r=await r,r===!1)return null;if(r===!0&&(r={}),u(P(r),`The Route Function ${s} should return a boolean or a plain JavaScript object, instead it returns \`${g(r,"constructor")?r.constructor:r}\`.`),"match"in r){const{match:a}=r;if(u(typeof a=="boolean",`The \`match\` value returned by the Route Function ${s} should be a boolean.`),!a)return null}let o=null;"precedence"in r&&(o=r.precedence,u(typeof o=="number",`The \`precedence\` value returned by the Route Function ${s} should be a number.`)),xe(r,`The \`routeParams\` object returned by the Route Function ${s} should`);const i=r.routeParams||{};return u(!("pageContext"in r),"Providing `pageContext` in Route Functions is prohibited, see https://vite-plugin-ssr.com/route-function#cannot-provide-pagecontext"),l(P(i)),Object.keys(r).forEach(a=>{u(a==="match"||a==="routeParams"||a==="precedence",`The Route Function ${s} returned an object with an unknown key \`{ ${a} }\`. Allowed keys: ['match', 'routeParams', 'precedence'].`)}),{precedence:o,routeParams:i}}function xe(e,t){l(t.endsWith(" should")),g(e,"routeParams")&&(l(t.endsWith(" should")),u(P(e.routeParams),`${t} be a plain JavaScript object.`),u(qt(e.routeParams),`${t} only hold string values.`))}function te(e,{hook:t,errorMessagePrefix:n,isRenderErrorPage:s}){const r=(()=>{if(n)return n;{l(t);const{hookName:o,hookFilePath:i}=t;return l(!o.endsWith(")")),`The \`pageContext\` object provided by the ${o}() hook defined by ${i}`}})();u(W(e),`${r} should be an object instead of \`${typeof e}\``),u(!("_objectCreatedByVitePluginSsr"in e),`${r} shouldn't be the whole \`pageContext\` object, see https://vite-plugin-ssr.com/pageContext-manipulation#do-not-return-entire-pagecontext`),_(!("_pageId"in e),`${r} sets \`pageContext._pageId\` which means that vite-plugin-ssr's routing is overriden. This is an experimental feature: make sure to contact a vite-plugin-ssr maintainer before using this.`,{showStackTrace:!1,onlyOnce:!0}),s||u(!("is404"in e),`${r} sets \`pageContext.is404\` which is forbidden, use \`throw RenderErrorPage()\` instead, see https://vite-plugin-ssr.com/RenderErrorPage`)}async function gn(e,t){const n=await e.onBeforeRoute(t),s=`The onBeforeRoute() hook defined by ${e.hookFilePath}`;if(u(n==null||Jt(n,["pageContext"])&&g(n,"pageContext"),`${s} should return \`null\`, \`undefined\`, or a plain JavaScript object \`{ pageContext: { /* ... */ } }\`.`),n==null)return null;if(u(g(n,"pageContext","object"),`${s} returned \`{ pageContext }\` but pageContext should be a plain JavaScript object.`),g(n.pageContext,"_pageId")&&!g(n.pageContext,"_pageId","null")){const o=`${s} returned \`{ pageContext: { _pageId } }\` but _pageId should be`;u(g(n.pageContext,"_pageId","string"),`${o} a string or null`),u(t._allPageIds.includes(n.pageContext._pageId),`${o} one of following values: \`[${t._allPageIds.map(i=>`'${i}'`).join(", ")}]\`.`)}g(n.pageContext,"routeParams")&&xe(n.pageContext,`${s} returned \`{ pageContext: { routeParams } }\` but routeParams should`);const r={};return g(n.pageContext,"url")&&(_(!1,`${s} returned \`{ pageContext: { url } }\` but \`pageContext.url\` has been renamed to \`pageContext.urlOriginal\`. Return \`{ pageContext: { urlOriginal } }\` instead. (See https://vite-plugin-ssr.com/migration/0.4.23 for more information.)`,{showStackTrace:!1,onlyOnce:!0}),n.pageContext.urlOriginal=n.pageContext.url,delete n.pageContext.url),g(n.pageContext,"urlOriginal")&&(Xe(n.pageContext.urlOriginal,`${s} returned \`{ pageContext: { urlOriginal } }\` but urlOriginal`),h(r,{_urlPristine:t.urlOriginal})),te(n.pageContext,{hook:{hookFilePath:e.hookFilePath,hookName:"onBeforeRoute"}}),h(r,n.pageContext),r}var I;function ue(...e){var t,n;I||(I=(n=(t=globalThis).__brillout_debug_createDebugger)===null||n===void 0?void 0:n.call(t,"vps:routing")),I&&I(...e)}Q()&&E();async function Ae(e){Ee(e);const{pageRoutes:t,onBeforeRouteHook:n}=await Xt(e._pageFilesAll,e._pageConfigs,e._pageConfigGlobal,e._allPageIds);ue("Pages routes:",t);const s={};if(n){const c=await gn(n,e);if(c){if(h(s,c),g(s,"_pageId","string")||g(s,"_pageId","null"))return g(s,"routeParams")?l(g(s,"routeParams","object")):h(s,{routeParams:{}}),h(s,{_routingProvidedByOnBeforeRouteHook:!0,_routeMatches:"CUSTOM_ROUTE"}),{pageContextAddendum:s};h(e,s)}}h(s,{_routingProvidedByOnBeforeRouteHook:!1});const r=e._allPageIds;l(r.length>=0),u(e._pageFilesAll.length>0||e._pageConfigs.length>0,"No *.page.js file found. You must create at least one *.page.js file."),u(r.length>0,"You must create at least one *.page.js file that isn't _default.page.*");const{urlPathname:o}=e;l(o.startsWith("/"));const i=[];await Promise.all(t.map(async c=>{const{pageId:f,routeType:m}=c;if(c.routeType==="FILESYSTEM"){const{routeString:p}=c,y=M(p,o);if(y){const{routeParams:v}=y;i.push({pageId:f,routeParams:v,routeString:p,routeType:m})}return}if(c.routeType==="STRING"){const{routeString:p}=c,y=M(p,o);if(y){const{routeParams:v}=y;l(m==="STRING"),i.push({pageId:f,routeString:p,routeParams:v,routeType:m})}return}if(c.routeType==="FUNCTION"){const{routeFunction:p,allowAsync:y,routeDefinedAt:v}=c,d=await dn(p,y,e,v);if(d){const{routeParams:w,precedence:C}=d;i.push({pageId:f,precedence:C,routeParams:w,routeType:m})}return}l(!1)})),cn(i);const a=i[0];if(ue(`Route matches for URL \`${o}\` (in precedence order):`,i),h(s,{_routeMatches:i}),!a)return h(s,{_pageId:null,routeParams:{}}),{pageContextAddendum:s};{const{routeParams:c}=a;l(P(c)),h(s,{_pageId:a.pageId,routeParams:a.routeParams})}return{pageContextAddendum:s}}const ce=["urlPathname","urlParsed"],hn=["Page","pageExports","exports"];function ke(e){[...hn,...ce].forEach(n=>{n in e&&(ce.includes(n)?(l(n.startsWith("url")),_(!1,`\`pageContext.${n}\` is already available in the browser when using Client Routing; including \`${n}\` in \`passToClient\` has no effect.`,{showStackTrace:!1,onlyOnce:!0})):_(!1,`\`pageContext.${n}\` is a built-in that cannot be overriden; including \`${n}\` in \`passToClient\` has no effect.`,{showStackTrace:!1,onlyOnce:!0}),delete e[n])})}const pn="/";function mn(e,t,n){const{pathnameOriginal:s,searchOriginal:r,hashOriginal:o}=H(e,pn);e.startsWith("/")&&l(e===`${s}${r||""}${o||""}`,{url:e});const i=s.endsWith("/");let a;return n&&s!=="/"?(i?a=T(s,0,-1):a=s,l(!a.endsWith("/"),{url:e}),l(a!=="")):a=s+(i?"":"/")+"index",l(a),a=a+t,`${a}${r||""}${o||""}`}const yn=".pageContext.json",vn=!1;function bn(e){return mn(e,yn,vn)}function Sn(e,t,n){l(!n.endsWith(" "));const s=[],r=Object.keys(e);for(const o of r)t.includes(o)||s.push(o);u(s.length===0,[n,"returned an object with following unknown keys:",se(s)+".","Only following keys are allowed:",se(t)+"."].join(" "))}function _n(e,t){if(e==null)return;const n=`The onBeforeRender() hook defined by ${t}`;u(P(e),`${n} should return a plain JavaScript object or \`undefined\`/\`null\``),Sn(e,["pageContext"],n),e.pageContext&&te(e.pageContext,{hook:{hookName:"onBeforeRender",hookFilePath:t}})}async function Rn(e){return e._isFirstRenderAttempt&&Oe.isFirstUrl(e.urlOriginal)?(l(g(e,"_isFirstRenderAttempt","true")),Pn(e)):(l(g(e,"_isFirstRenderAttempt","false")),On(e))}async function Pn(e){const t=Ze();return ke(t),h(t,{isHydration:!0,_comesDirectlyFromServer:!0}),h(t,await A(e._pageFilesAll,e._pageConfigs,t._pageId)),t}async function wn(e){const t=ye(e._pageFilesAll,e._pageConfigs);if(!t)throw new Error("No error page");const n={isHydration:!1,_pageId:t,_pageContextRetrievedFromServer:null,_comesDirectlyFromServer:!1};return h(n,await A(e._pageFilesAll,e._pageConfigs,n._pageId)),n}async function On(e){let t={};h(t,{isHydration:!1}),h(t,await Fn(e)),h(t,await A(e._pageFilesAll,e._pageConfigs,t._pageId));const n=await En({...e,...t});if(l([!0,!1].includes(n._comesDirectlyFromServer)),n._isError){t={},l(n._comesDirectlyFromServer===!0),l(g(n,"is404","boolean")),l(g(n,"pageProps","object")),l(g(n.pageProps,"is404","boolean")),l(!("serverSideError"in n));const s=ye(e._pageFilesAll,e._pageConfigs);return l(s),h(t,{isHydration:!1,_pageId:s}),h(t,n),h(t,await A(e._pageFilesAll,e._pageConfigs,t._pageId)),t}else return h(t,n),t}async function En(e){const t=et(e,"onBeforeRender");if(t){const s=t.hookFn,r={_comesDirectlyFromServer:!1,_pageContextRetrievedFromServer:null},o=tt({...e,...r},!0),i=await ve(()=>s(o),"onBeforeRender",t.hookFilePath);_n(i,t.hookFilePath);const a=i==null?void 0:i.pageContext;return h(r,a),r}if(await Cn(e)){const s=await An(e),r={};return Object.assign(r,s),h(r,{_comesDirectlyFromServer:!0,_pageContextRetrievedFromServer:s}),r}return{_comesDirectlyFromServer:!1,_pageContextRetrievedFromServer:null}}async function Cn(e){if(e._pageConfigs.length>0){const t=nt(e._pageId,e._pageConfigs);return!!K(t,"onBeforeRender")&&t.configElements.onBeforeRender.configEnv==="server-only"}else{const{hasOnBeforeRenderServerSideOnlyHook:t}=await Mt(e._pageFilesAll,e._pageId);return t}}async function Fn(e){const n=(await Ae(e)).pageContextAddendum;if(!n._pageId){const s=new Error("No routing match");throw Tn(s),s}return l(g(n,"_pageId","string")),n}function Tn(e){h(e,{_is404:!0})}function xn(e){return W(e)&&e._is404===!0}async function An(e){var t;const n=bn((t=e._urlPristine)!==null&&t!==void 0?t:e.urlOriginal),s=await fetch(n);{const a=s.headers.get("content-type"),c=a&&a.includes("application/json");if(!c&&s.status===404){$(e.urlOriginal);const f=new Error("Page doesn't exist");throw Object.assign(f,{_abortRendering:!0}),f}u(c,`Wrong HTTP Response Header \`content-type\` value for URL ${n} (it should be \`application/json\` but we got \`${a}\`). Make sure to use \`pageContext.httpResponse.contentType\`, see https://github.com/brillout/vite-plugin-ssr/issues/191`)}const r=await s.text(),o=rt(r);if("serverSideError"in o)throw ot("`pageContext` could not be fetched from the server as an error occurred on the server; check your server logs.");l(g(o,"pageContext"));const i=o.pageContext;return l(P(i)),l(g(i,"_pageId","string")),ke(i),i}function Ie(){const e="/";return l(kn(e)),e}function kn(e){return e.startsWith("/")}const z=L("createPageContext.ts",{});async function je(e){z.pageFilesData||(z.pageFilesData=await st(!0));const{pageFilesAll:t,allPageIds:n,pageConfigs:s,pageConfigGlobal:r}=z.pageFilesData,o=Ie();l(be(o));const i={_objectCreatedByVitePluginSsr:!0,_urlHandler:null,_baseServer:o,_isProduction:!0,_pageFilesAll:t,_pageConfigs:s,_pageConfigGlobal:r,_allPageIds:n};return h(i,e),Ee(i),i}async function Ne(e){const t=await je({urlOriginal:e}),n=await Ae(t),s=t._pageFilesAll,r=t._pageConfigs;if(!("pageContextAddendum"in n))return{pageId:null,pageFilesAll:s,pageConfigs:r};const o=n.pageContextAddendum._pageId;return o?{pageId:o,pageFilesAll:s,pageConfigs:r}:{pageId:null,pageFilesAll:s,pageConfigs:r}}function x(e){return e.fileType===".css"?[]:e.exportNames?e.exportNames:(l(e.fileExports,e.filePath),Object.keys(e.fileExports))}function In({pageFilesClientSide:e,pageFilesServerSide:t,pageId:n}){return{isHtmlOnly:s(),isClientRouting:o()};function s(){return t.some(a=>a.pageId===n&&a.fileType===".page")?(r(),!1):!(!t.some(a=>a.pageId===n&&a.fileType===".page.server")||e.some(a=>a.pageId===n&&a.fileType===".page.client"&&x(a).includes("render")))}function r(){const i=e.some(a=>x(a).includes("render"));u(i,["No client-side `render()` hook found.","See https://vite-plugin-ssr.com/render-modes for more information.",["Loaded client-side page files (none of them `export { render }`):",...e.map((a,c)=>` (${c+1}): ${a.filePath}`)].join(`
`)].join(" "))}function o(){return e.some(a=>x(a).includes("clientRouting"))}}function jn({pageFilesClientSide:e,pageFilesServerSide:t,isHtmlOnly:n,isClientRouting:s}){let r=[];const o=t.filter(a=>!e.includes(a)),i=[];if(i.push(...e.map(a=>({id:a.filePath,onlyAssets:!1,eagerlyImported:!1}))),i.push(...o.map(a=>({id:a.filePath,onlyAssets:!0,eagerlyImported:!1}))),n)r=e.map(a=>a.filePath);else{const a=Nn(s);i.push({id:a,onlyAssets:!1,eagerlyImported:!1}),r=[a]}return{clientEntries:r,clientDependencies:i}}function Nn(e){return e?"@@vite-plugin-ssr/dist/esm/client/router/entry.js":"@@vite-plugin-ssr/dist/esm/client/entry.js"}function $n(e,t){let n=Se(e,t);const s=me(e,t),{isHtmlOnly:r,isClientRouting:o}=In({pageFilesClientSide:n,pageFilesServerSide:s,pageId:t});r&&(n=n.filter(c=>c.isEnv("CLIENT_ONLY")&&!x(c).includes("render")),n=Hn(n));const{clientEntries:i,clientDependencies:a}=jn({pageFilesClientSide:n,pageFilesServerSide:s,isHtmlOnly:r,isClientRouting:o});return{isHtmlOnly:r,isClientRouting:o,clientEntries:i,clientDependencies:a,pageFilesClientSide:n,pageFilesServerSide:s}}async function Bn(e,t,{sharedPageFilesAlreadyLoaded:n}){const s=Se(e,t);await Promise.all(s.map(async r=>{var o;l(r.isEnv("CLIENT_ONLY")||r.isEnv("CLIENT_AND_SERVER")),!(n&&r.isEnv("CLIENT_AND_SERVER"))&&await((o=r.loadExportNames)===null||o===void 0?void 0:o.call(r))}))}function Hn(e){const t=[];for(const n of e)if(t.push(n),x(n).includes("overrideDefaultPages"))break;return t}function Ln(e,t,n){var s;if(e){const r=(s=it(e,"clientRouting","boolean"))!==null&&s!==void 0?s:!1,o=!!K(e,"onRenderClient"),i=!!K(e,"Page")&&e.configElements.Page.configEnv!=="server-only";return{isClientSideRenderable:o&&i,isClientRouting:r}}else{const{isHtmlOnly:r,isClientRouting:o}=$n(t,n);return{isClientSideRenderable:!r,isClientRouting:o}}}async function $e(e){const{pageId:t,pageFilesAll:n,pageConfigs:s}=await Ne(e);if(!t)return!1;await Bn(n,t,{sharedPageFilesAlreadyLoaded:!1});const r=at(s,t),{isClientSideRenderable:o,isClientRouting:i}=Ln(r,n,t);return o&&i}function Be(e){const t=e.getAttribute("href");return!!(t===null||t===""||we(t)||Wn(e)||Dn(t)||!Un(t)||!lt(t))}function Wn(e){const t=e.getAttribute("target"),n=e.getAttribute("rel");return t==="_blank"||t==="_external"||n==="external"||e.hasAttribute("download")}function Dn(e){if(e.startsWith("#"))return!0;const t=n=>n.split("#")[0];return!!(e.includes("#")&&t(e)===t(window.location.href))}function Un(e){const t=Ie();l(be(t));const{hasBaseServer:n}=H(e,t);return n}function Vn(e,t){let n=zn(e,t);return n==="viewport"&&!e._isProduction&&(_e(!1,"Viewport prefetching is disabled in development",{onlyOnce:!0}),n="hover"),{prefetchStaticAssets:n}}function zn(e,t){{const n=Gn(t);if(n!==null)return n}if("prefetchLinks"in e.exports&&u(!1,"`export { prefetchLinks }` is deprecated, use `export { prefetchStaticAssets }` instead."),"prefetchStaticAssets"in e.exports){const{prefetchStaticAssets:n}=e.exports;if(n===!1)return!1;if(n==="hover")return"hover";if(n==="viewport")return"viewport";const s="prefetchStaticAssets value should be false, 'hover', or 'viewport'";u(P(n),s);const r=Object.keys(n);u(r.length===1&&r[0]==="when",s);const{when:o}=n;if(o==="HOVER"||o==="VIEWPORT"){const i=o.toLowerCase();return _(!1,`prefetchStaticAssets value \`{ when: '${o}' }\` is outdated: set prefetchStaticAssets to '${i}' instead`,{onlyOnce:!0,showStackTrace:!1}),i}u(!1,s)}return"hover"}function Gn(e){const t=e.getAttribute("data-prefetch-static-assets"),n=e.getAttribute("data-prefetch");if(t===null&&n===null)return null;const s="The attribute data-prefetch is outdated, use data-prefetch-static-assets instead.";if(t){if(u(n===null,s),t==="hover"||t==="viewport")return t;if(t==="false")return!1;u(!1,`data-prefetch-static-assets has value "${t}" but it should instead be "false", "hover", or "viewport"`)}if(n){if(l(!t),_(!1,s,{showStackTrace:!1,onlyOnce:!0}),n==="true")return"viewport";if(n==="false")return"hover";u(!1,`data-prefetch has value "${n}" but it should instead be "true" or "false"`)}l(!1)}const He=new Map;function Le(e){const t=De(e);return He.has(t)}function We(e){const t=De(e);He.set(t,!0)}function De(e){return Ut(e)}E();const fe=new Map;async function G(e){if(u(ut(),"prefetch() only works with Client Routing, see https://vite-plugin-ssr.com/prefetch"),u(!we(e),`You are trying to prefetch the URL ${e} of another domain which cannot be prefetched`),Le(e))return;We(e);const{pageId:t,pageFilesAll:n,pageConfigs:s}=await Ne(e);if(t)try{await A(n,s,t)}catch(r){if(X(r))J(r,!0);else throw r}}function Kn(e){We(e.urlOriginal),[...document.getElementsByTagName("A")].forEach(async n=>{if(fe.has(n))return;fe.set(n,!0);const s=n.getAttribute("href");if(Be(n))return;l(s);try{if(!await $e(s))return}catch{return}if(Le(s))return;const{prefetchStaticAssets:r}=Vn(e,n);if(r){if(r==="hover")n.addEventListener("mouseover",()=>G(s)),n.addEventListener("touchstart",()=>G(s),{passive:!0});else if(r==="viewport"){const o=new IntersectionObserver(i=>{i.forEach(a=>{a.isIntersecting&&(G(s),o.disconnect())})});o.observe(n)}}else return})}function Ue(){let e=window.history.state;e||(e={});let t=!1;"timestamp"in e||(t=!0,e.timestamp=ze()),"scrollPosition"in e||(t=!0,e.scrollPosition=Ve()),Ge(e),t&&re(e)}function ne(){const e=window.history.state||{};return Ge(e),e}function Ve(){return{x:window.scrollX,y:window.scrollY}}function ze(){return new Date().getTime()}function de(){const e=Ve(),t=ne();re({...t,scrollPosition:e})}function Yn(e,t){if(t)re(ne(),e);else{const n=ze();Mn({timestamp:n,scrollPosition:null},e)}}function Ge(e){if(l(W(e)),"timestamp"in e){const{timestamp:t}=e;l(typeof t=="number")}if("scrollPosition"in e){const{scrollPosition:t}=e;t!==null&&l(g(t,"x","number")&&g(t,"y","number"))}}function re(e,t){window.history.replaceState(e,"",t??null)}function Mn(e,t){window.history.pushState(e,"",t)}E();const Jn=L("navigate.ts",{});function qn(e){Jn.navigate=e}const Ke="__isRenderErrorPageException";function ge(e){return Qn(e),typeof e=="object"&&e!==null&&Ke in e}function Ye({pageContext:e}={}){{const n=this;u(!(typeof n=="object"&&(n==null?void 0:n.constructor)===Ye),"Don't use the `new` operator: use `throw RenderErrorPage()` instead of `throw new RenderErrorPage()`.")}te(e,{errorMessagePrefix:"The `pageContext` object provided by `throw RenderErrorPage({ pageContext })`",isRenderErrorPage:!0});const t=new Error("RenderErrorPage");return h(t,{pageContext:e,[Ke]:!0}),t}function Qn(e){u(e!==Ye,"Missing parentheses `()` in `throw RenderErrorPage`: it should be `throw RenderErrorPage()`.")}const S=L("useClientRouter.ts",{previousState:B()});sr();Ue();function J(e,t){l(X(e)),S.clientRoutingIsDisabled=!0,t&&console.log(e),_e(!1,["Failed to fetch static asset.","This usually happens when a new frontend is deployed.","Falling back to Server Routing.","(The next page navigation will use Server Routing instead of Client Routing.)"].filter(Boolean).join(" "),{onlyOnce:!0})}function Xn(){rr(),Zn((r,{keepScrollPosition:o})=>{s({scrollTarget:o?"preserve-scroll":"scroll-to-top-or-hash",url:r,isBackwardNavigation:!1,checkClientSideRenderable:!0})}),er((r,o)=>{s({scrollTarget:r,isBackwardNavigation:o})}),qn(async(r,{keepScrollPosition:o=!1,overwriteLastHistoryEntry:i=!1}={})=>{await s({scrollTarget:o?"preserve-scroll":"scroll-to-top-or-hash",url:r,overwriteLastHistoryEntry:i,isBackwardNavigation:!1,checkClientSideRenderable:!0})});let e=0,t,n=!1;s({scrollTarget:"preserve-scroll",isBackwardNavigation:null});return;async function s({scrollTarget:r,url:o=k(),overwriteLastHistoryEntry:i=!1,isBackwardNavigation:a,checkClientSideRenderable:c}){var f;if(S.clientRoutingIsDisabled){$(o);return}if(c){let b;try{b=await $e(o)}catch(R){if(ge(R))b=!0;else throw R}if(!b){$(o);return}}const m={urlOriginal:o,isBackwardNavigation:a},p=++e;l(p>=1),p>1&&n===!1&&((f=S.onPageTransitionStart)===null||f===void 0||f.call(S,m),n=!0);let y=!1;const v=()=>p===1&&y===!1?!1:p!==e,d=await je(m);if(v())return;const w=p===1;h(d,{_isFirstRenderAttempt:w});let C;try{C=await Rn(d)}catch(b){if(console.error(b),pe(b,d))return;ge(b)?(h(d,{is404:!0}),h(d,b.pageContext)):h(d,{is404:xn(b)});try{C=await wn(d)}catch(R){if(pe(R,d)||(w||setTimeout(()=>{window.location.pathname=o},0),zt(b,R)))return;throw R}}if(h(d,C),U(d,"onPageTransitionStart"),S.onPageTransitionStart=d.exports.onPageTransitionStart,d.exports.hydrationCanBeAborted?y=!0:_(!Vt(),"You seem to be using React; we recommend setting `hydrationCanBeAborted` to `true`, see https://vite-plugin-ssr.com/clientRouting",{showStackTrace:!1,onlyOnce:!0}),!v()&&(t&&await t,!v())){if(tr(o,i),Oe.markNavigationChange(),l(t===void 0),t=(async()=>{await ct(d,!0),Kn(d)})(),await t,t=void 0,d._isFirstRenderAttempt){U(d,"onHydrationEnd");const{onHydrationEnd:b}=d.exports;if(b){const R=d.exportsAll.onHydrationEnd[0].exportSource;l(R),await ve(()=>b(d),"onHydrationEnd",R)}}else p===e&&(d.exports.onPageTransitionEnd&&(U(d,"onPageTransitionEnd"),d.exports.onPageTransitionEnd(d)),n=!1);Me(r),oe(),S.initialRenderIsDone=!0}}}function Zn(e){document.addEventListener("click",t);return;async function t(r){if(!n(r))return;const o=s(r.target);if(!o)return;const i=o.getAttribute("href");if(Be(o))return;l(i),r.preventDefault();const a=![null,"false"].includes(o.getAttribute("keep-scroll-position"));e(i,{keepScrollPosition:a})}function n(r){return r.button===0&&!r.ctrlKey&&!r.shiftKey&&!r.altKey&&!r.metaKey}function s(r){for(;r.tagName!=="A";){const{parentNode:o}=r;if(!o)return null;r=o}return r}}function er(e){window.addEventListener("popstate",()=>{const t=B(),n=t.historyState.scrollPosition||"scroll-to-top-or-hash",s=t.urlWithoutHash===S.previousState.urlWithoutHash,r=!t.historyState.timestamp||!S.previousState.historyState.timestamp?null:t.historyState.timestamp<S.previousState.historyState.timestamp;S.previousState=t,s?window.history.state===null?(Ue(),S.previousState=B()):Me(n):e(n,r)})}function tr(e,t){k()!==e&&(oe(),Yn(e,t),S.previousState=B())}function B(){return{urlWithoutHash:k({withoutHash:!0}),historyState:ne()}}function Me(e){if(e==="preserve-scroll")return;let t;if(e==="scroll-to-top-or-hash"){const n=or();if(n&&n!=="top"){const s=document.getElementById(n)||document.getElementsByName(n)[0];if(s){s.scrollIntoView();return}}t={x:0,y:0}}else l("x"in e&&"y"in e),t=e;nr(t)}function nr(e){const t=()=>window.scrollTo(e.x,e.y),n=()=>window.scrollX===e.x&&window.scrollY===e.y;n()||(t(),!n()&&requestAnimationFrame(()=>{t(),!n()&&setTimeout(async()=>{if(t(),n())return;const s=new Date().getTime();for(;;)if(await Gt(10),t(),n()||new Date().getTime()-s>100)return},0)}))}function rr(){window.addEventListener("scroll",Kt(de,Math.ceil(1e3/3)),{passive:!0}),Je(de)}function or(){let{hash:e}=window.location;return e===""?null:(l(e.startsWith("#")),e=e.slice(1),e)}function sr(){he(),Je(he),ir(()=>S.initialRenderIsDone&&oe())}function oe(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual")}function he(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="auto")}function Je(e){window.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&e()})}function ir(e){window.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&e()})}function pe(e,t){return!!(W(e)&&e._abortRendering||ar(e,t))}function ar(e,t){if(!X(e))return!1;if(t._isFirstRenderAttempt)throw J(e,!1),e;return J(e,!0),$(t.urlOriginal),!0}E();ft(!0);Xn();
