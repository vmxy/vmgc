import{g as c,z as m,A as f,an as _,C as g,o as l,e as p}from"./index-aab0ccf2.js";/* empty css                                                                */import{_ as u}from"./_plugin-vue_export-helper-c27b6911.js";const d=["alt"],v=c({name:"GImage",__name:"g-image",props:{src:{type:String,required:!0},alt:{type:String}},setup(r){const n=m();function a(e){var o;let t=(o=(/^https?:/i.test(e)?new URL(e):{}).searchParams)==null?void 0:o.get("url");return t&&(e=decodeURIComponent(t)),e}function i(e){return e?(e=a(e),e):"/logo.png"}return f(()=>{n.value}),(e,s)=>{const t=_("lazyimg");return g((l(),p("img",{alt:r.alt,ref_key:"refImg",ref:n,referrerPolicy:"no-referrer"},null,8,d)),[[t,i(r.src)]])}}}),U=u(v,[["__scopeId","data-v-36b0ee35"]]);export{U as _};