System.register(["./index-legacy-CifFlaku.js"],(function(e,t){"use strict";var r,o,a,n,l,c,d,s,u,i,p,f;return{setters:[e=>{r=e._,o=e.d,a=e.u,n=e.g,l=e.r,c=e.o,d=e.c,s=e.w,u=e.a,i=e.b,p=e.t,f=e.G}],execute:function(){var t=document.createElement("style");t.textContent=".card[data-v-fb0581e6]{margin-bottom:16px;cursor:pointer}\n",document.head.appendChild(t);const b=o({props:{report:{type:Object,default:()=>({})}},setup(e){const t=a();return{toReportView:e=>{t.push(`/tabs/report/${e}`)},borderColor:n((()=>{let t;return"200"===e.report.healthStatus?t="var(--danger-color)":"300"===e.report.healthStatus?t="var(--accent-color)":"Хвороба"===e.report.healthStatus&&(t="var(--disease-color)"),{borderLeft:`3px solid ${t}`}}))}}});e("R",r(b,[["render",function(e,t,r,o,a,n){const b=l("ion-card-title"),h=l("ion-card-subtitle"),m=l("ion-card-header"),_=l("ion-card-content"),v=l("ion-card");return c(),d(v,{class:"card",onClick:t[0]||(t[0]=t=>e.toReportView(e.report.id)),style:f(e.borderColor)},{default:s((()=>[u(m,null,{default:s((()=>[u(b,null,{default:s((()=>[i(p(e.report.nickname),1)])),_:1}),u(h,null,{default:s((()=>[i(p(e.report.name),1)])),_:1})])),_:1}),u(_,null,{default:s((()=>[i(p(e.report.description),1)])),_:1})])),_:1},8,["style"])}],["__scopeId","data-v-fb0581e6"]]))}}}));
