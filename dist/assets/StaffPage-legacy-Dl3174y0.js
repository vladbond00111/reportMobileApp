System.register(["./useDatabase-legacy-BMNsChtZ.js","./index-legacy-CifFlaku.js"],(function(a,t){"use strict";var e,r,n,s,f,u,i,c,l,o,d,p,h,b,m,v,y,_,g;return{setters:[a=>{e=a.e},a=>{r=a._,n=a.d,s=a.u,f=a.r,u=a.o,i=a.c,c=a.w,l=a.a,o=a.b,d=a.t,p=a.e,h=a.I,b=a.f,m=a.g,v=a.h,y=a.j,_=a.k,g=a.F}],execute:function(){var t=document.createElement("style");t.textContent=".card[data-v-448bb366]{margin-bottom:16px;cursor:pointer}.unit-titles[data-v-448bb366]{color:var(--ion-color-primary)}.search-bar[data-v-21489e35]{margin-top:18px;padding:8px 16px 0;--border-radius: 8px}[data-v-21489e35] .searchbar-input-container{min-height:50px!important}[data-v-21489e35] .searchbar-input{padding-top:7px!important;padding-left:calc(50% - 90px)!important}[data-v-21489e35] .searchbar-has-focus .searchbar-input,[data-v-21489e35] .searchbar-has-value .searchbar-input{padding-left:42px!important}[data-v-21489e35] .searchbar-has-focus .searchbar-search-icon,[data-v-21489e35] .searchbar-has-value .searchbar-search-icon{left:12px!important}[data-v-21489e35] .searchbar-clear-button{right:6px!important}\n",document.head.appendChild(t);const x=n({props:{staff:{type:Object,default:()=>({})}},setup(a){const t=s();return{toStaffCard:a=>{t.push(`/tabs/staff/${a}`)}}}}),k=n({components:{StaffCard:r(x,[["render",function(a,t,e,r,n,s){const h=f("ion-card-title"),b=f("ion-card-subtitle"),m=f("ion-label"),v=f("ion-card-header"),y=f("ion-card");return u(),i(y,{class:"card",onClick:t[0]||(t[0]=t=>a.toStaffCard(a.staff.id))},{default:c((()=>[l(v,null,{default:c((()=>[l(h,null,{default:c((()=>[o(d(a.staff.nickname),1)])),_:1}),l(b,null,{default:c((()=>[o(d(a.staff.name),1)])),_:1}),l(b,{class:"unit-titles"},{default:c((()=>[a.staff.unit?(u(),i(m,{key:0},{default:c((()=>[o(d(a.staff.unit)+", ",1)])),_:1})):p("",!0),a.staff.unit2?(u(),i(m,{key:1},{default:c((()=>[o(d(a.staff.unit2)+", ",1)])),_:1})):p("",!0),a.staff.unit3?(u(),i(m,{key:2},{default:c((()=>[o(d(a.staff.unit3)+", ",1)])),_:1})):p("",!0),a.staff.unit4?(u(),i(m,{key:3},{default:c((()=>[o(d(a.staff.unit4)+", ",1)])),_:1})):p("",!0),a.staff.unit5?(u(),i(m,{key:4},{default:c((()=>[o(d(a.staff.unit5),1)])),_:1})):p("",!0)])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-448bb366"]]),IonSearchbar:h},setup(){const a=b([]),t=b(""),r=s(),n=m((()=>{if(!t.value)return a.value;const e=t.value.toLowerCase().trim();return a.value.filter((a=>{const t=a.name.toLowerCase().trim(),r=a.nickname.toLowerCase().trim();return t.startsWith(e)||r.startsWith(e)}))}));return v((async()=>{await(async()=>{a.value=await e()})()})),{staffList:a,searchQuery:t,filteredStaff:n,toStaffCard:a=>{r.push(`/tabs/staff/${a}`)}}}});a("default",r(k,[["render",function(a,t,e,r,n,s){const o=f("ion-searchbar"),d=f("staff-card"),p=f("ion-list"),h=f("ion-content"),b=f("ion-page");return u(),i(b,{style:{"margin-top":"56px"}},{default:c((()=>[l(h,{fullscreen:!0},{default:c((()=>[l(o,{class:"search-bar",modelValue:a.searchQuery,"onUpdate:modelValue":t[0]||(t[0]=t=>a.searchQuery=t),placeholder:"Пошук за ПІБ або позивним",animated:!0,debounce:500},null,8,["modelValue"]),l(p,null,{default:c((()=>[(u(!0),y(g,null,_(a.filteredStaff,(a=>(u(),i(d,{staff:a,key:a.id},null,8,["staff"])))),128))])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-21489e35"]]))}}}));