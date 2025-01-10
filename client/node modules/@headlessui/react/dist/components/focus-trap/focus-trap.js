import E,{useRef as d}from"react";import{useDisposables as U}from'../../hooks/use-disposables.js';import{useEvent as v}from'../../hooks/use-event.js';import{useEventListener as x}from'../../hooks/use-event-listener.js';import{useIsMounted as g}from'../../hooks/use-is-mounted.js';import{useOnUnmount as N}from'../../hooks/use-on-unmount.js';import{useOwnerDocument as I}from'../../hooks/use-owner.js';import{useServerHandoffComplete as G}from'../../hooks/use-server-handoff-complete.js';import{useSyncRefs as K}from'../../hooks/use-sync-refs.js';import{Direction as L,useTabDirection as W}from'../../hooks/use-tab-direction.js';import{useWatch as b}from'../../hooks/use-watch.js';import{Features as A,Hidden as O}from'../../internal/hidden.js';import{history as F}from'../../utils/active-element-history.js';import{Focus as p,focusElement as f,focusIn as M,FocusResult as V}from'../../utils/focus-management.js';import{match as k}from'../../utils/match.js';import{microTask as C}from'../../utils/micro-task.js';import{forwardRefWithAs as q,render as J}from'../../utils/render.js';function P(t){if(!t)return new Set;if(typeof t=="function")return new Set(t());let n=new Set;for(let e of t.current)e.current instanceof HTMLElement&&n.add(e.current);return n}let X="div";var _=(r=>(r[r.None=1]="None",r[r.InitialFocus=2]="InitialFocus",r[r.TabLock=4]="TabLock",r[r.FocusLock=8]="FocusLock",r[r.RestoreFocus=16]="RestoreFocus",r[r.All=30]="All",r))(_||{});function z(t,n){let e=d(null),o=K(e,n),{initialFocus:l,containers:c,features:r=30,...s}=t;G()||(r=1);let i=I(e);Y({ownerDocument:i},Boolean(r&16));let u=Z({ownerDocument:i,container:e,initialFocus:l},Boolean(r&2));$({ownerDocument:i,container:e,containers:c,previousActiveElement:u},Boolean(r&8));let y=W(),R=v(a=>{let m=e.current;if(!m)return;(B=>B())(()=>{k(y.current,{[L.Forwards]:()=>{M(m,p.First,{skipElements:[a.relatedTarget]})},[L.Backwards]:()=>{M(m,p.Last,{skipElements:[a.relatedTarget]})}})})}),h=U(),H=d(!1),j={ref:o,onKeyDown(a){a.key=="Tab"&&(H.current=!0,h.requestAnimationFrame(()=>{H.current=!1}))},onBlur(a){let m=P(c);e.current instanceof HTMLElement&&m.add(e.current);let T=a.relatedTarget;T instanceof HTMLElement&&T.dataset.headlessuiFocusGuard!=="true"&&(S(m,T)||(H.current?M(e.current,k(y.current,{[L.Forwards]:()=>p.Next,[L.Backwards]:()=>p.Previous})|p.WrapAround,{relativeTo:a.target}):a.target instanceof HTMLElement&&f(a.target)))}};return E.createElement(E.Fragment,null,Boolean(r&4)&&E.createElement(O,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:R,features:A.Focusable}),J({ourProps:j,theirProps:s,defaultTag:X,name:"FocusTrap"}),Boolean(r&4)&&E.createElement(O,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:R,features:A.Focusable}))}let D=q(z),de=Object.assign(D,{features:_});function Q(t=!0){let n=d(F.slice());return b(([e],[o])=>{o===!0&&e===!1&&C(()=>{n.current.splice(0)}),o===!1&&e===!0&&(n.current=F.slice())},[t,F,n]),v(()=>{var e;return(e=n.current.find(o=>o!=null&&o.isConnected))!=null?e:null})}function Y({ownerDocument:t},n){let e=Q(n);b(()=>{n||(t==null?void 0:t.activeElement)===(t==null?void 0:t.body)&&f(e())},[n]),N(()=>{n&&f(e())})}function Z({ownerDocument:t,container:n,initialFocus:e},o){let l=d(null),c=g();return b(()=>{if(!o)return;let r=n.current;r&&C(()=>{if(!c.current)return;let s=t==null?void 0:t.activeElement;if(e!=null&&e.current){if((e==null?void 0:e.current)===s){l.current=s;return}}else if(r.contains(s)){l.current=s;return}e!=null&&e.current?f(e.current):M(r,p.First)===V.Error&&console.warn("There are no focusable elements inside the <FocusTrap />"),l.current=t==null?void 0:t.activeElement})},[o]),l}function $({ownerDocument:t,container:n,containers:e,previousActiveElement:o},l){let c=g();x(t==null?void 0:t.defaultView,"focus",r=>{if(!l||!c.current)return;let s=P(e);n.current instanceof HTMLElement&&s.add(n.current);let i=o.current;if(!i)return;let u=r.target;u&&u instanceof HTMLElement?S(s,u)?(o.current=u,f(u)):(r.preventDefault(),r.stopPropagation(),f(i)):f(o.current)},!0)}function S(t,n){for(let e of t)if(e.contains(n))return!0;return!1}export{de as FocusTrap};
