import m,{createContext as Z,Fragment as $,useContext as J,useEffect as F,useMemo as ee,useRef as c,useState as X}from"react";import{useDisposables as pe}from'../../hooks/use-disposables.js';import{useEvent as E}from'../../hooks/use-event.js';import{useFlags as he}from'../../hooks/use-flags.js';import{useIsMounted as ve}from'../../hooks/use-is-mounted.js';import{useIsoMorphicEffect as ge}from'../../hooks/use-iso-morphic-effect.js';import{useLatestValue as A}from'../../hooks/use-latest-value.js';import{useServerHandoffComplete as te}from'../../hooks/use-server-handoff-complete.js';import{useSyncRefs as ne}from'../../hooks/use-sync-refs.js';import{useTransition as Ce}from'../../hooks/use-transition.js';import{OpenClosedProvider as Ee,State as b,useOpenClosed as re}from'../../internal/open-closed.js';import{classNames as ie}from'../../utils/class-names.js';import{match as _}from'../../utils/match.js';import{Features as be,forwardRefWithAs as W,render as oe,RenderStrategy as y}from'../../utils/render.js';function S(t=""){return t.split(/\s+/).filter(n=>n.length>1)}let I=Z(null);I.displayName="TransitionContext";var Se=(r=>(r.Visible="visible",r.Hidden="hidden",r))(Se||{});function ye(){let t=J(I);if(t===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return t}function xe(){let t=J(M);if(t===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return t}let M=Z(null);M.displayName="NestingContext";function U(t){return"children"in t?U(t.children):t.current.filter(({el:n})=>n.current!==null).filter(({state:n})=>n==="visible").length>0}function se(t,n){let r=A(t),s=c([]),R=ve(),D=pe(),p=E((i,e=y.Hidden)=>{let a=s.current.findIndex(({el:o})=>o===i);a!==-1&&(_(e,{[y.Unmount](){s.current.splice(a,1)},[y.Hidden](){s.current[a].state="hidden"}}),D.microTask(()=>{var o;!U(s)&&R.current&&((o=r.current)==null||o.call(r))}))}),x=E(i=>{let e=s.current.find(({el:a})=>a===i);return e?e.state!=="visible"&&(e.state="visible"):s.current.push({el:i,state:"visible"}),()=>p(i,y.Unmount)}),h=c([]),v=c(Promise.resolve()),u=c({enter:[],leave:[],idle:[]}),g=E((i,e,a)=>{h.current.splice(0),n&&(n.chains.current[e]=n.chains.current[e].filter(([o])=>o!==i)),n==null||n.chains.current[e].push([i,new Promise(o=>{h.current.push(o)})]),n==null||n.chains.current[e].push([i,new Promise(o=>{Promise.all(u.current[e].map(([f,N])=>N)).then(()=>o())})]),e==="enter"?v.current=v.current.then(()=>n==null?void 0:n.wait.current).then(()=>a(e)):a(e)}),d=E((i,e,a)=>{Promise.all(u.current[e].splice(0).map(([o,f])=>f)).then(()=>{var o;(o=h.current.shift())==null||o()}).then(()=>a(e))});return ee(()=>({children:s,register:x,unregister:p,onStart:g,onStop:d,wait:v,chains:u}),[x,p,s,g,d,u,v])}function Ne(){}let Pe=["beforeEnter","afterEnter","beforeLeave","afterLeave"];function ae(t){var r;let n={};for(let s of Pe)n[s]=(r=t[s])!=null?r:Ne;return n}function Re(t){let n=c(ae(t));return F(()=>{n.current=ae(t)},[t]),n}let De="div",le=be.RenderStrategy;function He(t,n){var Q,Y;let{beforeEnter:r,afterEnter:s,beforeLeave:R,afterLeave:D,enter:p,enterFrom:x,enterTo:h,entered:v,leave:u,leaveFrom:g,leaveTo:d,...i}=t,e=c(null),a=ne(e,n),o=(Q=i.unmount)==null||Q?y.Unmount:y.Hidden,{show:f,appear:N,initial:T}=ye(),[l,j]=X(f?"visible":"hidden"),z=xe(),{register:L,unregister:O}=z;F(()=>L(e),[L,e]),F(()=>{if(o===y.Hidden&&e.current){if(f&&l!=="visible"){j("visible");return}return _(l,{["hidden"]:()=>O(e),["visible"]:()=>L(e)})}},[l,e,L,O,f,o]);let k=A({base:S(i.className),enter:S(p),enterFrom:S(x),enterTo:S(h),entered:S(v),leave:S(u),leaveFrom:S(g),leaveTo:S(d)}),V=Re({beforeEnter:r,afterEnter:s,beforeLeave:R,afterLeave:D}),G=te();F(()=>{if(G&&l==="visible"&&e.current===null)throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[e,l,G]);let Te=T&&!N,K=N&&f&&T,de=(()=>!G||Te?"idle":f?"enter":"leave")(),H=he(0),fe=E(C=>_(C,{enter:()=>{H.addFlag(b.Opening),V.current.beforeEnter()},leave:()=>{H.addFlag(b.Closing),V.current.beforeLeave()},idle:()=>{}})),me=E(C=>_(C,{enter:()=>{H.removeFlag(b.Opening),V.current.afterEnter()},leave:()=>{H.removeFlag(b.Closing),V.current.afterLeave()},idle:()=>{}})),w=se(()=>{j("hidden"),O(e)},z),B=c(!1);Ce({immediate:K,container:e,classes:k,direction:de,onStart:A(C=>{B.current=!0,w.onStart(e,C,fe)}),onStop:A(C=>{B.current=!1,w.onStop(e,C,me),C==="leave"&&!U(w)&&(j("hidden"),O(e))})});let P=i,ce={ref:a};return K?P={...P,className:ie(i.className,...k.current.enter,...k.current.enterFrom)}:B.current&&(P.className=ie(i.className,(Y=e.current)==null?void 0:Y.className),P.className===""&&delete P.className),m.createElement(M.Provider,{value:w},m.createElement(Ee,{value:_(l,{["visible"]:b.Open,["hidden"]:b.Closed})|H.flags},oe({ourProps:ce,theirProps:P,defaultTag:De,features:le,visible:l==="visible",name:"Transition.Child"})))}function Fe(t,n){let{show:r,appear:s=!1,unmount:R=!0,...D}=t,p=c(null),x=ne(p,n);te();let h=re();if(r===void 0&&h!==null&&(r=(h&b.Open)===b.Open),![!0,!1].includes(r))throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");let[v,u]=X(r?"visible":"hidden"),g=se(()=>{u("hidden")}),[d,i]=X(!0),e=c([r]);ge(()=>{d!==!1&&e.current[e.current.length-1]!==r&&(e.current.push(r),i(!1))},[e,r]);let a=ee(()=>({show:r,appear:s,initial:d}),[r,s,d]);F(()=>{if(r)u("visible");else if(!U(g))u("hidden");else{let T=p.current;if(!T)return;let l=T.getBoundingClientRect();l.x===0&&l.y===0&&l.width===0&&l.height===0&&u("hidden")}},[r,g]);let o={unmount:R},f=E(()=>{var T;d&&i(!1),(T=t.beforeEnter)==null||T.call(t)}),N=E(()=>{var T;d&&i(!1),(T=t.beforeLeave)==null||T.call(t)});return m.createElement(M.Provider,{value:g},m.createElement(I.Provider,{value:a},oe({ourProps:{...o,as:$,children:m.createElement(ue,{ref:x,...o,...D,beforeEnter:f,beforeLeave:N})},theirProps:{},defaultTag:$,features:le,visible:v==="visible",name:"Transition"})))}function _e(t,n){let r=J(I)!==null,s=re()!==null;return m.createElement(m.Fragment,null,!r&&s?m.createElement(q,{ref:n,...t}):m.createElement(ue,{ref:n,...t}))}let q=W(Fe),ue=W(He),Le=W(_e),qe=Object.assign(q,{Child:Le,Root:q});export{qe as Transition};
