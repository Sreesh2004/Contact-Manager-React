import u,{createContext as m,useContext as D,useMemo as l,useState as T}from"react";import{useEvent as P}from'../../hooks/use-event.js';import{useId as g}from'../../hooks/use-id.js';import{useIsoMorphicEffect as E}from'../../hooks/use-iso-morphic-effect.js';import{useSyncRefs as x}from'../../hooks/use-sync-refs.js';import{forwardRefWithAs as y,render as R}from'../../utils/render.js';let d=m(null);function f(){let r=D(d);if(r===null){let t=new Error("You used a <Description /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(t,f),t}return r}function w(){let[r,t]=T([]);return[r.length>0?r.join(" "):void 0,l(()=>function(e){let i=P(s=>(t(o=>[...o,s]),()=>t(o=>{let p=o.slice(),c=p.indexOf(s);return c!==-1&&p.splice(c,1),p}))),n=l(()=>({register:i,slot:e.slot,name:e.name,props:e.props}),[i,e.slot,e.name,e.props]);return u.createElement(d.Provider,{value:n},e.children)},[t])]}let I="p";function S(r,t){let a=g(),{id:e=`headlessui-description-${a}`,...i}=r,n=f(),s=x(t);E(()=>n.register(e),[e,n.register]);let o={ref:s,...n.props,id:e};return R({ourProps:o,theirProps:i,slot:n.slot||{},defaultTag:I,name:n.name||"Description"})}let h=y(S),G=Object.assign(h,{});export{G as Description,w as useDescriptions};
