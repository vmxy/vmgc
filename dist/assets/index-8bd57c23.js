import{y as Z,z as P,c as L,ag as X,ah as q,A as J,g as S,o as y,e as B,f as g,l as e,j as h,ai as D,h as F,i as n,m as x,F as K,p as Q,t as R,k as v,W as V,S as T,a2 as G,aj as M,w as O,ak as H,a as Y,ad as ee,T as oe,x as te,a7 as ne,al as le}from"./index-cc9450de.js";import{c as se,b as ae}from"./dark-mode-switch.vue_vue_type_script_setup_true_lang-84c6f67f.js";/* empty css                                                         */import{R as re,f as I,g as de,a as W}from"./rule-751bc317.js";import{u as ce}from"./use-loading-95a523dc.js";function ie(f){if(f<=0&&f%1!==0)throw new Error("倒计时的时间应该为一个正整数！");const{bool:l,setTrue:s,setFalse:u}=Z(!1),c=P(0),o=L(()=>!!c.value);let d;function t(_=f){c.value||(u(),c.value=_,d=setInterval(()=>{c.value-=1,c.value<=0&&(clearInterval(d),s())},1e3))}function i(){d=clearInterval(d),c.value=0}return X(i),{counts:c,isCounting:o,start:t,stop:i,isComplete:l}}function j(){const{loading:f,startLoading:l,endLoading:s}=ce(),{counts:u,start:c,isCounting:o}=ie(60),d="获取验证码",t=r=>`${r}秒后重新获取`,i=L(()=>{let r=d;return f.value&&(r=""),o.value&&(r=t(u.value)),r});function _(r){var p,m;let a=!0;return r.trim()===""?((p=window.$message)==null||p.error("手机号码不能为空！"),a=!1):re.test(r)||((m=window.$message)==null||m.error("手机号码格式错误！"),a=!1),a}async function C(r){var m;if(!_(r)||f.value)return;l();const{data:p}=await q(r);p&&((m=window.$message)==null||m.success("验证码发送成功！"),c()),s()}return{label:i,start:c,isCounting:o,getSmsCode:C,loading:f}}function ue(f=152,l=40){const s=P(),u=P("");function c(d){u.value=d}function o(){s.value&&(u.value=pe(s.value,f,l))}return J(()=>{o()}),{domRef:s,imgCode:u,setImgCode:c,getImgCode:o}}function N(f,l){return Math.floor(Math.random()*(l-f)+f)}function E(f,l){const s=N(f,l),u=N(f,l),c=N(f,l);return`rgb(${s},${u},${c})`}function pe(f,l,s){let u="";const c="0123456789",o=f.getContext("2d");if(!o)return u;o.fillStyle=E(180,230),o.fillRect(0,0,l,s);for(let d=0;d<4;d+=1){const t=c[N(0,c.length)];u+=t;const i=N(18,41),_=N(-30,30);o.font=`${i}px Simhei`,o.textBaseline="top",o.fillStyle=E(80,150),o.save(),o.translate(30*d+23,15),o.rotate(_*Math.PI/180),o.fillText(t,-15+5,-15),o.restore()}for(let d=0;d<5;d+=1)o.beginPath(),o.moveTo(N(0,l),N(0,s)),o.lineTo(N(0,l),N(0,s)),o.strokeStyle=E(180,230),o.closePath(),o.stroke();for(let d=0;d<41;d+=1)o.beginPath(),o.arc(N(0,l),N(0,s),1,0,2*Math.PI),o.closePath(),o.fillStyle=E(150,200),o.fill();return u}const _e={height:"1337",width:"1337"},fe=g("path",{id:"path-1",opacity:"1","fill-rule":"evenodd",d:"M1337,668.5 C1337,1037.455193874239 1037.455193874239,1337 668.5,1337 C523.6725684305388,1337 337,1236 370.50000000000006,1094 C434.03835568300906,824.6732385973953 6.906089672974592e-14,892.6277623047779 0,668.5000000000001 C0,299.5448061257611 299.5448061257609,1.1368683772161603e-13 668.4999999999999,0 C1037.455193874239,0 1337,299.544806125761 1337,668.5Z"},null,-1),me={id:"linearGradient-2",x1:"0.79",y1:"0.62",x2:"0.21",y2:"0.86"},ge=["stop-color"],ve=["stop-color"],he=g("g",{opacity:"1"},[g("use",{"xlink:href":"#path-1",fill:"url(#linearGradient-2)","fill-opacity":"1"})],-1),we=S({__name:"corner-top",props:{startColor:{default:"#28aff0"},endColor:{default:"#120fc4"}},setup(f){return(l,s)=>(y(),B("svg",_e,[g("defs",null,[fe,g("linearGradient",me,[g("stop",{offset:"0","stop-color":l.startColor,"stop-opacity":"1"},null,8,ge),g("stop",{offset:"1","stop-color":l.endColor,"stop-opacity":"1"},null,8,ve)])]),he]))}}),Ce={version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",height:"896",width:"967.8852157128662"},xe=g("path",{id:"path-2",opacity:"1","fill-rule":"evenodd",d:"M896,448 C1142.6325445712241,465.5747656464056 695.2579309733121,896 448,896 C200.74206902668806,896 5.684341886080802e-14,695.2579309733121 0,448.0000000000001 C0,200.74206902668806 200.74206902668791,5.684341886080802e-14 447.99999999999994,0 C695.2579309733121,0 475,418 896,448Z"},null,-1),ke={id:"linearGradient-3",x1:"0.5",y1:"0",x2:"0.5",y2:"1"},ye=["stop-color"],be=["stop-color"],$e=g("g",{opacity:"1"},[g("use",{"xlink:href":"#path-2",fill:"url(#linearGradient-3)","fill-opacity":"1"})],-1),Ne=S({__name:"corner-bottom",props:{startColor:{default:"#28aff0"},endColor:{default:"#120fc4"}},setup(f){return(l,s)=>(y(),B("svg",Ce,[g("defs",null,[xe,g("linearGradient",ke,[g("stop",{offset:"0","stop-color":l.startColor,"stop-opacity":"1"},null,8,ye),g("stop",{offset:"1","stop-color":l.endColor,"stop-opacity":"1"},null,8,be)])]),$e]))}}),Se={class:"absolute-lt z-1 wh-full overflow-hidden"},ze={class:"absolute -right-300px -top-900px <sm:(-right-100px -top-1170px)"},Ie={class:"absolute -left-200px -bottom-400px <sm:(-left-100px -bottom-760px)"},Pe=S({__name:"index",props:{themeColor:{}},setup(f){const l=f,s=L(()=>D(l.themeColor,3)),u=L(()=>D(l.themeColor,6));return(c,o)=>(y(),B("div",Se,[g("div",ze,[e(h(we),{"start-color":s.value,"end-color":u.value},null,8,["start-color","end-color"])]),g("div",Ie,[e(h(Ne),{"start-color":u.value,"end-color":s.value},null,8,["start-color","end-color"])])]))}}),Re=S({__name:"other-account",emits:["login"],setup(f,{emit:l}){const s=[{label:"超级管理员",userName:"Super",password:"super123"},{label:"管理员",userName:"Admin",password:"admin123"},{label:"普通用户",userName:"User01",password:"user01123"}];function u(c,o){l("login",{userName:c,password:o})}return(c,o)=>{const d=v.NDivider,t=v.NButton,i=v.NSpace;return y(),F(i,{vertical:!0},{default:n(()=>[e(d,{class:"!mb-0 text-14px text-#666"},{default:n(()=>[x("其他账户登录")]),_:1}),e(i,{justify:"center"},{default:n(()=>[(y(),B(K,null,Q(s,_=>e(t,{key:_.userName,type:"primary",onClick:C=>u(_.userName,_.password)},{default:n(()=>[x(R(_.label),1)]),_:2},1032,["onClick"])),64))]),_:1})]),_:1})}}}),Ue={class:"flex-y-center justify-between"},Le={class:"flex-y-center justify-between"},Me=g("div",{class:"w-12px"},null,-1),Be=S({__name:"index",setup(f){const l=V(),{login:s}=V(),{toLoginModule:u}=T(),c=P(),o=G({userName:"Soybean",password:"soybean123"}),d={password:I.pwd},t=P(!1);async function i(){var a;await((a=c.value)==null?void 0:a.validate());const{userName:C,password:r}=o;s(C,r)}function _(C){const{userName:r,password:a}=C;s(r,a)}return(C,r)=>{const a=v.NInput,p=v.NFormItem,m=v.NCheckbox,k=v.NButton,b=v.NSpace,z=v.NForm;return y(),F(z,{ref_key:"formRef",ref:c,model:o,rules:d,size:"large","show-label":!1},{default:n(()=>[e(p,{path:"userName"},{default:n(()=>[e(a,{value:o.userName,"onUpdate:value":r[0]||(r[0]=w=>o.userName=w),placeholder:"请输入用户名"},null,8,["value"])]),_:1}),e(p,{path:"password"},{default:n(()=>[e(a,{value:o.password,"onUpdate:value":r[1]||(r[1]=w=>o.password=w),type:"password","show-password-on":"click",placeholder:"请输入密码"},null,8,["value"])]),_:1}),e(b,{vertical:!0,size:24},{default:n(()=>[g("div",Ue,[e(m,{checked:t.value,"onUpdate:checked":r[2]||(r[2]=w=>t.value=w)},{default:n(()=>[x("记住我")]),_:1},8,["checked"]),e(k,{text:!0,onClick:r[3]||(r[3]=w=>h(u)("reset-pwd"))},{default:n(()=>[x("忘记密码？")]),_:1})]),e(k,{type:"primary",size:"large",block:!0,round:!0,loading:h(l).loginLoading,onClick:i},{default:n(()=>[x(" 确定 ")]),_:1},8,["loading"]),g("div",Le,[e(k,{class:"flex-1",block:!0,onClick:r[4]||(r[4]=w=>h(u)("code-login"))},{default:n(()=>[x(R(h(M)["code-login"]),1)]),_:1}),Me,e(k,{class:"flex-1",block:!0,onClick:r[5]||(r[5]=w=>h(u)("register"))},{default:n(()=>[x(R(h(M).register),1)]),_:1})])]),_:1}),e(h(Re),{onLogin:_})]),_:1},8,["model"])}}}),Fe=S({name:"ImageVerify",__name:"image-verify",props:{code:{default:""}},emits:["update:code"],setup(f,{expose:l,emit:s}){const u=f,{domRef:c,imgCode:o,setImgCode:d,getImgCode:t}=ue();return O(()=>u.code,i=>{d(i)}),O(o,i=>{s("update:code",i)}),l({getImgCode:t}),(i,_)=>(y(),B("div",null,[g("canvas",{ref_key:"domRef",ref:c,width:"152",height:"40",class:"cursor-pointer",onClick:_[0]||(_[0]=(...C)=>h(t)&&h(t)(...C))},null,512)]))}}),Te={class:"flex-y-center w-full"},Ge=g("div",{class:"w-18px"},null,-1),Ee={class:"pl-8px"},je=S({__name:"index",setup(f){const l=V(),{toLoginModule:s}=T(),{label:u,isCounting:c,loading:o,getSmsCode:d}=j(),t=P(),i=G({phone:"",code:"",imgCode:""}),_=P(""),C={phone:I.phone,code:I.code,imgCode:de(_)};function r(){d(i.phone)}async function a(){var p,m;await((p=t.value)==null?void 0:p.validate()),(m=window.$message)==null||m.success("验证成功!")}return(p,m)=>{const k=v.NInput,b=v.NFormItem,z=v.NButton,w=Fe,A=v.NSpace,$=v.NForm;return y(),F($,{ref_key:"formRef",ref:t,model:i,rules:C,size:"large","show-label":!1},{default:n(()=>[e(b,{path:"phone"},{default:n(()=>[e(k,{value:i.phone,"onUpdate:value":m[0]||(m[0]=U=>i.phone=U),placeholder:"手机号码"},null,8,["value"])]),_:1}),e(b,{path:"code"},{default:n(()=>[g("div",Te,[e(k,{value:i.code,"onUpdate:value":m[1]||(m[1]=U=>i.code=U),placeholder:"验证码"},null,8,["value"]),Ge,e(z,{size:"large",disabled:h(c),loading:h(o),onClick:r},{default:n(()=>[x(R(h(u)),1)]),_:1},8,["disabled","loading"])])]),_:1}),e(b,{path:"imgCode"},{default:n(()=>[e(k,{value:i.imgCode,"onUpdate:value":m[2]||(m[2]=U=>i.imgCode=U),placeholder:"验证码,点击图片刷新"},null,8,["value"]),g("div",Ee,[e(w,{code:_.value,"onUpdate:code":m[3]||(m[3]=U=>_.value=U)},null,8,["code"])])]),_:1}),e(A,{vertical:!0,size:18},{default:n(()=>[e(z,{type:"primary",size:"large",block:!0,round:!0,loading:h(l).loginLoading,onClick:a},{default:n(()=>[x(" 确定 ")]),_:1},8,["loading"]),e(z,{size:"large",block:!0,round:!0,onClick:m[4]||(m[4]=U=>h(s)("pwd-login"))},{default:n(()=>[x("返回")]),_:1})]),_:1})]),_:1},8,["model"])}}}),Ae={class:"w-full text-14px"},De=S({name:"LoginAgreement",__name:"login-agreement",props:{value:{type:Boolean,default:!0}},emits:["update:value","click-protocol","click-policy"],setup(f,{emit:l}){const s=f,u=L({get(){return s.value},set(d){l("update:value",d)}});function c(){l("click-protocol")}function o(){l("click-policy")}return(d,t)=>{const i=v.NCheckbox,_=v.NButton;return y(),B("div",Ae,[e(i,{checked:u.value,"onUpdate:checked":t[0]||(t[0]=C=>u.value=C)},{default:n(()=>[x("我已经仔细阅读并接受")]),_:1},8,["checked"]),e(_,{text:!0,type:"primary",onClick:c},{default:n(()=>[x("《用户协议》")]),_:1}),e(_,{text:!0,type:"primary",onClick:o},{default:n(()=>[x("《隐私权政策》")]),_:1})])}}}),Ve={class:"flex-y-center w-full"},Oe=g("div",{class:"w-18px"},null,-1),He=S({__name:"index",setup(f){const{toLoginModule:l}=T(),{label:s,isCounting:u,loading:c,start:o}=j(),d=P(),t=G({phone:"",code:"",pwd:"",confirmPwd:""}),i={phone:I.phone,code:I.code,pwd:I.pwd,confirmPwd:W(H(t).pwd)},_=P(!1);function C(){o()}async function r(){var a,p;await((a=d.value)==null?void 0:a.validate()),(p=window.$message)==null||p.success("验证成功!")}return(a,p)=>{const m=v.NInput,k=v.NFormItem,b=v.NButton,z=De,w=v.NSpace,A=v.NForm;return y(),F(A,{ref_key:"formRef",ref:d,model:t,rules:i,size:"large","show-label":!1},{default:n(()=>[e(k,{path:"phone"},{default:n(()=>[e(m,{value:t.phone,"onUpdate:value":p[0]||(p[0]=$=>t.phone=$),placeholder:"手机号码"},null,8,["value"])]),_:1}),e(k,{path:"code"},{default:n(()=>[g("div",Ve,[e(m,{value:t.code,"onUpdate:value":p[1]||(p[1]=$=>t.code=$),placeholder:"验证码"},null,8,["value"]),Oe,e(b,{size:"large",disabled:h(u),loading:h(c),onClick:C},{default:n(()=>[x(R(h(s)),1)]),_:1},8,["disabled","loading"])])]),_:1}),e(k,{path:"pwd"},{default:n(()=>[e(m,{value:t.pwd,"onUpdate:value":p[2]||(p[2]=$=>t.pwd=$),type:"password","show-password-on":"click",placeholder:"密码"},null,8,["value"])]),_:1}),e(k,{path:"confirmPwd"},{default:n(()=>[e(m,{value:t.confirmPwd,"onUpdate:value":p[3]||(p[3]=$=>t.confirmPwd=$),type:"password","show-password-on":"click",placeholder:"确认密码"},null,8,["value"])]),_:1}),e(w,{vertical:!0,size:18},{default:n(()=>[e(z,{value:_.value,"onUpdate:value":p[4]||(p[4]=$=>_.value=$)},null,8,["value"]),e(b,{type:"primary",size:"large",block:!0,round:!0,onClick:r},{default:n(()=>[x("确定")]),_:1}),e(b,{size:"large",block:!0,round:!0,onClick:p[5]||(p[5]=$=>h(l)("pwd-login"))},{default:n(()=>[x("返回")]),_:1})]),_:1})]),_:1},8,["model"])}}}),We={class:"flex-y-center w-full"},Ze=g("div",{class:"w-18px"},null,-1),Xe=S({__name:"index",setup(f){const{toLoginModule:l}=T(),{label:s,isCounting:u,loading:c,start:o}=j(),d=P(),t=G({phone:"",code:"",pwd:"",confirmPwd:""}),i={phone:I.phone,code:I.code,pwd:I.pwd,confirmPwd:W(H(t).pwd)};function _(){o()}async function C(){var r,a;await((r=d.value)==null?void 0:r.validate()),(a=window.$message)==null||a.success("验证成功!")}return(r,a)=>{const p=v.NInput,m=v.NFormItem,k=v.NButton,b=v.NSpace,z=v.NForm;return y(),F(z,{ref_key:"formRef",ref:d,model:t,rules:i,size:"large","show-label":!1},{default:n(()=>[e(m,{path:"phone"},{default:n(()=>[e(p,{value:t.phone,"onUpdate:value":a[0]||(a[0]=w=>t.phone=w),placeholder:"手机号码"},null,8,["value"])]),_:1}),e(m,{path:"code"},{default:n(()=>[g("div",We,[e(p,{value:t.code,"onUpdate:value":a[1]||(a[1]=w=>t.code=w),placeholder:"验证码"},null,8,["value"]),Ze,e(k,{size:"large",disabled:h(u),loading:h(c),onClick:_},{default:n(()=>[x(R(h(s)),1)]),_:1},8,["disabled","loading"])])]),_:1}),e(m,{path:"pwd"},{default:n(()=>[e(p,{value:t.pwd,"onUpdate:value":a[2]||(a[2]=w=>t.pwd=w),type:"password","show-password-on":"click",placeholder:"密码"},null,8,["value"])]),_:1}),e(m,{path:"confirmPwd"},{default:n(()=>[e(p,{value:t.confirmPwd,"onUpdate:value":a[3]||(a[3]=w=>t.confirmPwd=w),type:"password","show-password-on":"click",placeholder:"确认密码"},null,8,["value"])]),_:1}),e(b,{vertical:!0,size:"large"},{default:n(()=>[e(k,{type:"primary",size:"large",block:!0,round:!0,onClick:C},{default:n(()=>[x("确定")]),_:1}),e(k,{size:"large",block:!0,round:!0,onClick:a[4]||(a[4]=w=>h(l)("pwd-login"))},{default:n(()=>[x("返回")]),_:1})]),_:1})]),_:1},8,["model"])}}}),qe={class:"flex-y-center w-full"},Je=g("div",{class:"w-18px"},null,-1),Ke=S({__name:"index",setup(f){const{toLoginModule:l}=T(),{label:s,isCounting:u,loading:c,getSmsCode:o}=j(),d=P(),t=G({phone:"",code:"",imgCode:""}),i={phone:I.phone,code:I.code};function _(){o(t.phone)}async function C(){var r,a;await((r=d.value)==null?void 0:r.validate()),(a=window.$message)==null||a.success("验证成功!")}return(r,a)=>{const p=v.NInput,m=v.NFormItem,k=v.NButton,b=v.NSpace,z=v.NForm;return y(),F(z,{ref_key:"formRef",ref:d,model:t,rules:i,size:"large","show-label":!1},{default:n(()=>[e(m,{path:"phone"},{default:n(()=>[e(p,{value:t.phone,"onUpdate:value":a[0]||(a[0]=w=>t.phone=w),placeholder:"手机号码"},null,8,["value"])]),_:1}),e(m,{path:"code"},{default:n(()=>[g("div",qe,[e(p,{value:t.code,"onUpdate:value":a[1]||(a[1]=w=>t.code=w),placeholder:"验证码"},null,8,["value"]),Je,e(k,{size:"large",disabled:h(u),loading:h(c),onClick:_},{default:n(()=>[x(R(h(s)),1)]),_:1},8,["disabled","loading"])])]),_:1}),e(b,{vertical:!0,size:"large"},{default:n(()=>[e(k,{type:"primary",size:"large",block:!0,round:!0,onClick:C},{default:n(()=>[x("确定")]),_:1}),e(k,{size:"large",block:!0,round:!0,onClick:a[2]||(a[2]=w=>h(l)("pwd-login"))},{default:n(()=>[x("返回")]),_:1})]),_:1})]),_:1},8,["model"])}}}),Qe={class:"w-300px sm:w-360px"},Ye={class:"flex-y-center justify-between"},eo={class:"pt-24px"},oo={class:"text-18px text-primary font-medium"},to={class:"pt-24px"},co=S({__name:"index",props:{module:{}},setup(f){const l=f,s=Y(),{title:u}=ne(),c=[{key:"pwd-login",label:M["pwd-login"],component:Be},{key:"code-login",label:M["code-login"],component:je},{key:"register",label:M.register,component:He},{key:"reset-pwd",label:M["reset-pwd"],component:Xe},{key:"bind-wechat",label:M["bind-wechat"],component:Ke}],o=L(()=>{const i={...c[0]},_=c.find(C=>C.key===l.module);return _&&Object.assign(i,_),i}),d=L(()=>s.darkMode?D(s.themeColor,7):s.themeColor),t=L(()=>{const i="#ffffff",_=s.darkMode?.5:.2;return le(i,s.themeColor,_)});return(i,_)=>{const C=se,r=ae,a=v.NGradientText,p=v.NCard;return y(),B("div",{class:"relative flex-center wh-full",style:te({backgroundColor:t.value})},[e(C,{dark:h(s).darkMode,class:"absolute left-48px top-24px z-3 text-20px","onUpdate:dark":h(s).setDarkMode},null,8,["dark","onUpdate:dark"]),e(p,{bordered:!1,size:"large",class:"z-4 !w-auto rounded-20px shadow-sm"},{default:n(()=>[g("div",Qe,[g("header",Ye,[e(r,{class:"text-64px text-primary"}),e(a,{type:"primary",size:28},{default:n(()=>[x(R(h(u)),1)]),_:1})]),g("main",eo,[g("h3",oo,R(o.value.label),1),g("div",to,[e(ee,{name:"fade-slide",mode:"out-in",appear:""},{default:n(()=>[(y(),F(oe(o.value.component)))]),_:1})])])])]),_:1}),e(h(Pe),{"theme-color":d.value},null,8,["theme-color"])],4)}}});export{co as default};