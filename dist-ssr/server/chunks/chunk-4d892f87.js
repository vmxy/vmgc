import{defineComponent as u,ref as d,mergeProps as c,useSSRContext as m}from"vue";import{ssrRenderAttrs as a,ssrRenderAttr as p}from"vue/server-renderer";const n=u({__name:"index",__ssrInlineRender:!0,setup(t){const e=d("https://www.naiveui.com/zh-CN/os-theme/docs/introduction");return(s,o,_,i)=>{o(`<div${a(c({class:"h-full"},i))}><iframe class="wh-full"${p("src",e.value)}></iframe></div>`)}}}),r=n.setup;n.setup=(t,e)=>{const s=m();return(s.modules||(s.modules=new Set)).add("src/views/document/naive/index.vue"),r?r(t,e):void 0};export{n as default};