import{V as d,Y as s,W as i}from"./main-B6az9P7O.js";function c(t){if(t==null)return"";const e=typeof t=="string"?t:typeof t=="number"||typeof t=="boolean"?String(t):t instanceof Date?t.toISOString():JSON.stringify(t);return`"${(/^[=+\-@\t\r]/.test(e)?`'${e}`:e).replace(/"/g,'""')}"`}function f(t,e){const r=e.map(n=>c(n.header)).join(","),o=t.map(n=>e.map(a=>c(a.accessor?a.accessor(n):n[a.key])).join(",")).join(`\r
`);return o?`${r}\r
${o}\r
`:`${r}\r
`}function p(t,e){if(typeof window>"u")return;const r=new Blob(["\uFEFF",e],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(r),n=document.createElement("a");n.href=o,n.download=t,document.body.appendChild(n),n.click(),n.remove(),URL.revokeObjectURL(o)}function u(t,e="csv"){const r=new Date,o=`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}-${String(r.getDate()).padStart(2,"0")}`;return`${t}-${o}.${e}`}async function b(t,e,r,o,n,a){await t({data:{resource:e,rowCount:o.length,details:a}}),p(r,f(o,n))}const S=d({method:"POST"}).middleware([s]).handler(i("efadad4220f15a12f94dc520a2d24405c59cb6340d8567694c8b7ea17cc3b0c8"));export{u as d,b as e,S as r};
//# sourceMappingURL=admin-export.functions-DOSNhmCy.js.map
