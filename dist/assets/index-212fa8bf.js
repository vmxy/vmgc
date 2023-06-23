import{g as q,o,e as l,l as e,i as r,F as y,p as b,t as g,q as w,h as E,Y as S,m as i,Z as P,j as u,f as D,_ as I,k as s}from"./index-cc9450de.js";import{u as N}from"./use-loading-95a523dc.js";const W={key:0,class:"pb-16px"},C=D("p",{class:"pb-16px"},"按钮有加载状态。",-1),V=q({__name:"index",setup(T){const{loading:f,startLoading:m,endLoading:_}=N(),h=[{id:0,label:"基础",buttons:[{id:0,props:{},label:"Default"},{id:1,props:{type:"tertiary"},label:"Tertiary"},{id:2,props:{type:"primary"},label:"Primary"},{id:3,props:{type:"info"},label:"Info"},{id:4,props:{type:"success"},label:"Success"},{id:5,props:{type:"warning"},label:"Warning"},{id:6,props:{type:"error"},label:"Error"}],desc:"按钮的 type 分别为 default、primary、info、success、warning 和 error。"},{id:1,label:"次要按钮",buttons:[{id:0,props:{strong:!0,secondary:!0},label:"Default"},{id:1,props:{strong:!0,secondary:!0,type:"tertiary"},label:"Tertiary"},{id:2,props:{strong:!0,secondary:!0,type:"primary"},label:"Primary"},{id:3,props:{strong:!0,secondary:!0,type:"info"},label:"Info"},{id:4,props:{strong:!0,secondary:!0,type:"success"},label:"Success"},{id:5,props:{strong:!0,secondary:!0,type:"warning"},label:"Warning"},{id:6,props:{strong:!0,secondary:!0,type:"error"},label:"Error"},{id:7,props:{strong:!0,secondary:!0,round:!0},label:"Default"},{id:8,props:{strong:!0,secondary:!0,round:!0,type:"tertiary"},label:"Tertiary"},{id:9,props:{strong:!0,secondary:!0,round:!0,type:"primary"},label:"Primary"},{id:10,props:{strong:!0,secondary:!0,round:!0,type:"info"},label:"Info"},{id:11,props:{strong:!0,secondary:!0,round:!0,type:"success"},label:"Success"},{id:12,props:{strong:!0,secondary:!0,round:!0,type:"warning"},label:"Warning"},{id:13,props:{strong:!0,secondary:!0,round:!0,type:"error"},label:"Error"}]},{id:2,label:"次次要按钮",buttons:[{id:0,props:{tertiary:!0},label:"Default"},{id:1,props:{tertiary:!0,type:"primary"},label:"Primary"},{id:2,props:{tertiary:!0,type:"info"},label:"Info"},{id:3,props:{tertiary:!0,type:"success"},label:"Success"},{id:4,props:{tertiary:!0,type:"warning"},label:"Warning"},{id:5,props:{tertiary:!0,type:"error"},label:"Error"},{id:6,props:{tertiary:!0,round:!0},label:"Default"},{id:7,props:{tertiary:!0,round:!0,type:"primary"},label:"Primary"},{id:8,props:{tertiary:!0,round:!0,type:"info"},label:"Info"},{id:9,props:{tertiary:!0,round:!0,type:"success"},label:"Success"},{id:10,props:{tertiary:!0,round:!0,type:"warning"},label:"Warning"},{id:11,props:{tertiary:!0,round:!0,type:"error"},label:"Error"}]},{id:3,label:"次次次要按钮",buttons:[{id:0,props:{quaternary:!0},label:"Default"},{id:1,props:{quaternary:!0,type:"primary"},label:"Primary"},{id:2,props:{quaternary:!0,type:"info"},label:"Info"},{id:3,props:{quaternary:!0,type:"success"},label:"Success"},{id:4,props:{quaternary:!0,type:"warning"},label:"Warning"},{id:5,props:{quaternary:!0,type:"error"},label:"Error"},{id:6,props:{quaternary:!0,round:!0},label:"Default"},{id:7,props:{quaternary:!0,round:!0,type:"primary"},label:"Primary"},{id:8,props:{quaternary:!0,round:!0,type:"info"},label:"Info"},{id:9,props:{quaternary:!0,round:!0,type:"success"},label:"Success"},{id:10,props:{quaternary:!0,round:!0,type:"warning"},label:"Warning"},{id:11,props:{quaternary:!0,round:!0,type:"error"},label:"Error"}]},{id:4,label:"虚线按钮",buttons:[{id:0,props:{dashed:!0},label:"Default"},{id:1,props:{dashed:!0,type:"tertiary"},label:"Tertiary"},{id:2,props:{dashed:!0,type:"primary"},label:"Primary"},{id:3,props:{dashed:!0,type:"info"},label:"Info"},{id:4,props:{dashed:!0,type:"success"},label:"Success"},{id:5,props:{dashed:!0,type:"warning"},label:"Warning"},{id:6,props:{dashed:!0,type:"error"},label:"Error"}]},{id:5,label:"尺寸",buttons:[{id:0,props:{size:"tiny",strong:!0},label:"小小"},{id:1,props:{size:"small",strong:!0},label:"小"},{id:2,props:{size:"medium",strong:!0},label:"不小"},{id:3,props:{size:"large",strong:!0},label:"不不小"}]},{id:6,label:"文本按钮",buttons:[{id:0,props:{text:!0},label:"那车头依然吐着烟",icon:"mdi:train"}]},{id:7,label:"自定义标签按钮",buttons:[{id:0,props:{text:!0,tag:"a",href:"https://github.com/honghuangdc/soybean-admin",target:"_blank",type:"primary"},label:"soybean-admin"}],desc:"你可以把按钮渲染成不同的标签，比如 a标签 。"},{id:8,label:"按钮禁用",buttons:[{id:0,props:{disabled:!0},label:"不许点"}],desc:"按钮可以被禁用"},{id:9,label:"图标按钮",buttons:[{id:0,props:{secondary:!0,strong:!0},label:"+100元",icon:"mdi:cash-100"},{id:0,props:{iconPlacement:"right",secondary:!0,strong:!0},label:"+100元",icon:"mdi:cash-100"}],desc:"在按钮上使用图标。"},{id:10,label:"不同形状按钮",buttons:[{id:0,props:{circle:!0},icon:"mdi:cash-100"},{id:1,props:{round:!0},label:"圆角"},{id:2,props:{},label:"方"}],desc:"按钮拥有不同的形状。"},{id:11,label:"透明背景按钮",buttons:[{id:0,props:{ghost:!0},label:"Default"},{id:1,props:{ghost:!0,type:"tertiary"},label:"Tertiary"},{id:2,props:{ghost:!0,type:"primary"},label:"Primary"},{id:3,props:{ghost:!0,type:"info"},label:"Info"},{id:4,props:{ghost:!0,type:"success"},label:"Success"},{id:5,props:{ghost:!0,type:"warning"},label:"Warning"},{id:6,props:{ghost:!0,type:"error"},label:"Error"}],desc:"Ghost 按钮有透明的背景。"},{id:12,label:"自定义颜色",buttons:[{id:0,props:{color:"#8a2be2"},label:"#8a2be2",icon:"ic:baseline-color-lens"},{id:1,props:{color:"#ff69b4"},label:"#ff69b4",icon:"ic:baseline-color-lens"},{id:2,props:{color:"#8a2be2",ghost:!0},label:"#8a2be2",icon:"ic:baseline-color-lens"},{id:3,props:{color:"#ff69b4",ghost:!0},label:"#ff69b4",icon:"ic:baseline-color-lens"},{id:4,props:{color:"#8a2be2",text:!0},label:"#8a2be2",icon:"ic:baseline-color-lens"},{id:5,props:{color:"#ff69b4",text:!0},label:"#ff69b4",icon:"ic:baseline-color-lens"}],desc:"这两个颜色看起来像毒蘑菇。"}];return(B,v)=>{const x=I,p=s.NButton,d=s.NSpace,n=s.NCard,c=s.NGridItem,k=s.NGrid;return o(),l("div",null,[e(n,{title:"按钮",class:"h-full shadow-sm rounded-16px"},{default:r(()=>[e(k,{cols:"s:1 m:2",responsive:"screen","x-gap":16,"y-gap":16},{default:r(()=>[(o(),l(y,null,b(h,a=>e(c,{key:a.id},{default:r(()=>[e(n,{title:a.label,class:"min-h-180px"},{default:r(()=>[a.desc?(o(),l("p",W,g(a.desc),1)):w("",!0),e(d,null,{default:r(()=>[(o(!0),l(y,null,b(a.buttons,t=>(o(),E(p,P({key:t.id},t.props,{style:`--icon-margin: ${t.props.circle?0:6}px`}),S({default:r(()=>[i(" "+g(t.label),1)]),_:2},[t.icon?{name:"icon",fn:r(()=>[e(x,{icon:t.icon},null,8,["icon"])]),key:"0"}:void 0]),1040,["style"]))),128))]),_:2},1024)]),_:2},1032,["title"])]),_:2},1024)),64)),e(c,{class:"h-180px"},{default:r(()=>[e(n,{title:"加载中",class:"h-full"},{default:r(()=>[C,e(d,null,{default:r(()=>[e(p,{loading:u(f),type:"primary",onClick:u(m)},{default:r(()=>[i("开始加载")]),_:1},8,["loading","onClick"]),e(p,{onClick:u(_)},{default:r(()=>[i("取消加载")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})])}}});export{V as default};