import{defineComponent as l,ref as d,onMounted as h,mergeProps as v,useSSRContext as I}from"vue";import{ssrRenderAttrs as x}from"vue/server-renderer";import{_ as y}from"./chunk-c27b6911.js";const c=l({name:"GImage",__name:"g-image",__ssrInlineRender:!0,props:{src:{type:String,required:!0},alt:{type:String}},setup(t){const i=t,r=["https://img1.iei.one","https://img2.iei.one","https://img3.iei.one"],n=d();function m(e){var s;let a=(s=(/^https?:/i.test(e)?new URL(e):{}).searchParams)==null?void 0:s.get("url");return a&&(e=decodeURIComponent(a)),e}function _(e){return e?(e=m(e),e):"/logo.png"}function g(e){return e=m(e),r[Math.floor(Math.random()*r.length)]+"/img/"+e.replace("://","_--")}let u=!1;function p(e){if(u)return;u=!0;let o=g(i.src);n.value.src=o}return h(()=>{n.value&&(n.value.onabort=p,n.value.onerror=p)}),(e,o,a,s)=>{o(`<img${x(v({src:_(t.src),alt:t.alt,ref_key:"refImg",ref:n,referrerPolicy:"no-referrer"},s))} data-v-47c058c2>`)}}});const f=c.setup;c.setup=(t,i)=>{const r=I();return(r.modules||(r.modules=new Set)).add("src/components/business/g-image.vue"),f?f(t,i):void 0};const C=y(c,[["__scopeId","data-v-47c058c2"]]);export{C as _};