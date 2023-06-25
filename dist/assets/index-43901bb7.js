import{g as m,o as r,h as d,i as e,f as E,k as s,l as t,m as g,t as b,j as c,e as V,p as h,F as I}from"./index-aab0ccf2.js";const N=E("p",{class:"leading-24px"}," Soybean Admin 是一个基于 Vue3、Vite、Naive UI、TypeScript 的中后台解决方案，它使用了最新的前端技术栈，并提炼了典型的业务模型，页面，包括二次封装组件、动态菜单、权限校验、粒子化权限控制等功能，它可以帮助你快速搭建企业级中后台项目，相信不管是从新技术使用还是其他方面，都能帮助到你。 ",-1),S=m({name:"ProjectIntroduction",__name:"project-introduction",setup(n){return(o,p)=>{const l=s.NCard;return r(),d(l,{title:"关于",bordered:!1,size:"large",class:"rounded-16px shadow-sm"},{default:e(()=>[N]),_:1})}}}),j="vmgc",T="2.0.0",k="commonjs",C="A fresh and elegant admin template, based on Vue3、Vite3、TypeScript、NaiveUI and UnoCSS. 一个基于Vue3、Vite3、TypeScript、NaiveUI and UnoCSS的清新优雅的中后台模版。",R={name:"vmgc",email:"xxx@gm.com",url:"https://github.com/ai-peer/vmgc"},D="MIT",w="https://github.com/ai-peer/vmgc",U={url:"https://github.com/ai-peer/vmgc.git"},z=["Vue","Vue3","admin","admin-template","vue-admin","vue-admin-template","Vite3","Vite","vite-admin","TypeScript","TS","NaiveUI","naive-ui","naive-admin","NaiveUI-Admin","naive-ui-admin","UnoCSS"],A={start:"cross-env VITE_SERVICE_ENV=prod NODE_ENV=production API_SERVER=https://blog.iee.one node server.js",ssr:"cross-env VITE_SERVICE_ENV=dev VITE_SSR=Y API_SERVER=https://blog.iee.one vite",dev:"cross-env VITE_SERVICE_ENV=dev vite","dev:test":"cross-env VITE_SERVICE_ENV=test vite","dev:prod":"cross-env VITE_SERVICE_ENV=prod vite",build:"cross-env VITE_SERVICE_ENV=prod vite build","build:page":"cross-env PROD=true VITE_SERVICE_ENV=prod VITE_BASE_URL=/vmgc vite build","build:ssr":"cross-env PROD=true VITE_SERVICE_ENV=prod VITE_SSR=Y vite build","build:dev":"cross-env VITE_SERVICE_ENV=dev vite build","build:test":"cross-env VITE_SERVICE_ENV=test vite build","build:vercel":"cross-env VITE_HASH_ROUTE=Y VITE_VERCEL=Y vite build",preview:"vite preview",typecheck1:"vue-tsc --noEmit --skipLibCheck",lint:"eslint . --fix",formatx:"soy prettier-format",format:"run-s format:*","format:js":' prettier --write "src/**/*.(ts|js|vue|css|less|scss)"  ',commitx:"soy git-commit",cleanup:"soy cleanup","update-pkg":"soy update-pkg",releasex:"soy release",tsx:"tsx",logo:"tsx ./scripts/logo.ts",preparex:"soy init-git-hooks","git:commit":"ts-node build/git.commit.ts"},P={"@ai-lion/liondb":"^6.1.16","@antv/data-set":"0.11.8","@antv/g2":"4.2.10","@better-scroll/core":"2.5.1","@soybeanjs/vue-materials":"0.2.0","@vueuse/core":"10.1.2",axios:"1.4.0",buffer:"^6.0.3",clipboard:"2.0.11",colord:"2.9.3","crypto-js":"4.1.1",dayjs:"1.11.8",echarts:"5.4.2","form-data":"4.0.0","lodash-es":"4.17.21","lru-cache":"^9.1.2","naive-ui":"2.34.4",pinia:"2.1.3","print-js":"1.6.0","qrcode-with-logos":"^1.0.3",qs:"6.11.2",swiper:"9.3.2","ua-parser-js":"1.0.35",vditor:"3.9.3","vite-plugin-ssr":"^0.4.131",vue:"3.3.4","vue-i18n":"9.2.2","vue-router":"4.2.2",vuedraggable:"4.1.0",wangeditor:"4.7.15",xgplayer:"3.0.4"},B={"@ai-lion/vite-plugin-vue-page-route":"^1.0.3","@amap/amap-jsapi-types":"0.0.13","@iconify/json":"2.2.75","@iconify/vue":"4.1.1","@soybeanjs/cli":"0.5.4","@soybeanjs/vite-plugin-vue-page-route":"0.0.6","@types/bmapgl":"0.0.7","@types/crypto-js":"4.1.1","@types/node":"20.2.5","@types/qs":"6.9.7","@types/ua-parser-js":"0.7.36","@unocss/preset-uno":"0.53.1","@unocss/transformer-directives":"0.53.1","@unocss/vite":"0.53.1","@vitejs/plugin-vue":"4.2.3","@vitejs/plugin-vue-jsx":"3.0.1","cross-env":"7.0.3",eslint:"8.42.0","eslint-config-soybeanjs":"0.4.8",express:"^4.18.2",mockjs:"1.1.0","npm-run-all":"^4.1.5",prettier:"^2.8.8","rollup-plugin-visualizer":"5.9.0",sass:"1.63.2","simple-git-hooks":"^2.8.1",tsx:"3.12.7",typescript:"5.1.3","unplugin-icons":"0.16.3","unplugin-vue-components":"0.25.1",vite:"^4.3.9","vite-plugin-compression":"0.5.1","vite-plugin-mock":"2.9.8","vite-plugin-progress":"0.0.7","vite-plugin-pwa":"0.16.3","vite-plugin-static-copy":"^0.15.0","vite-plugin-svg-icons":"2.0.1","vue-tsc":"1.6.5"},O={patchedDependencies:{"mockjs@1.1.0":"patches/mockjs@1.1.0.patch"}},$={"~/*":"./*","@/*":"./src/*","vue-i18n":"vue-i18n/dist/vue-i18n.cjs.js"},L={name:j,version:T,type:k,description:C,author:R,license:D,homepage:w,repository:U,keywords:z,scripts:A,dependencies:P,devDependencies:B,pnpm:O,"simple-git-hooks":{"commit-msg":"yarn git:commit","pre-commit":""},imports:$},v=L;function y(n){const[o,p]=n;return{name:o,version:p}}const f={name:v.name,version:v.version,dependencies:Object.entries(v.dependencies).map(n=>y(n)),devDependencies:Object.entries(v.devDependencies).map(n=>y(n))},Y=E("a",{class:"text-primary",href:"https://github.com/honghuangdc/soybean-admin",target:"_blank"},"Github地址",-1),q=E("a",{class:"text-primary",href:"https://soybean.pro",target:"_blank"},"预览地址",-1),F=m({name:"ProjectInfo",__name:"project-info",setup(n){const{version:o}=f,p="2023-06-25 09:46:22";return(l,_)=>{const u=s.NTag,a=s.NDescriptionsItem,i=s.NDescriptions,x=s.NCard;return r(),d(x,{title:"项目信息",bordered:!1,size:"small",class:"rounded-16px shadow-sm"},{default:e(()=>[t(i,{"label-placement":"left",bordered:"",size:"small",column:2},{default:e(()=>[t(a,{label:"版本"},{default:e(()=>[t(u,{type:"primary"},{default:e(()=>[g(b(c(o)),1)]),_:1})]),_:1}),t(a,{label:"最后编译时间"},{default:e(()=>[t(u,{type:"primary"},{default:e(()=>[g(b(c(p)),1)]),_:1})]),_:1}),t(a,{label:"Github地址"},{default:e(()=>[Y]),_:1}),t(a,{label:"预览地址"},{default:e(()=>[q]),_:1})]),_:1})]),_:1})}}}),G=m({name:"ProDependency",__name:"pro-dependency",setup(n){const{dependencies:o}=f;return(p,l)=>{const _=s.NDescriptionsItem,u=s.NDescriptions,a=s.NCard;return r(),d(a,{title:"生产环境依赖",bordered:!1,size:"small",class:"rounded-16px shadow-sm"},{default:e(()=>[t(u,{"label-placement":"left",bordered:"",size:"small"},{default:e(()=>[(r(!0),V(I,null,h(c(o),i=>(r(),d(_,{key:i.name,label:i.name},{default:e(()=>[g(b(i.version),1)]),_:2},1032,["label"]))),128))]),_:1})]),_:1})}}}),H=m({name:"DevDependency",__name:"dev-dependency",setup(n){const{devDependencies:o}=f;return(p,l)=>{const _=s.NDescriptionsItem,u=s.NDescriptions,a=s.NCard;return r(),d(a,{title:"开发环境依赖",bordered:!1,size:"small",class:"rounded-16px shadow-sm"},{default:e(()=>[t(u,{"label-placement":"left",bordered:"",size:"small"},{default:e(()=>[(r(!0),V(I,null,h(c(o),i=>(r(),d(_,{key:i.name,label:i.name},{default:e(()=>[g(b(i.version),1)]),_:2},1032,["label"]))),128))]),_:1})]),_:1})}}}),M=m({__name:"index",setup(n){return(o,p)=>{const l=s.NSpace;return r(),d(l,{vertical:!0,size:16},{default:e(()=>[t(c(S)),t(c(F)),t(c(G)),t(c(H))]),_:1})}}});export{M as default};
