import{useEffect as u,useRef as n}from"react";import{microTask as o}from'../utils/micro-task.js';import{useEvent as f}from'./use-event.js';function c(t){let r=f(t),e=n(!1);u(()=>(e.current=!1,()=>{e.current=!0,o(()=>{e.current&&r()})}),[r])}export{c as useOnUnmount};
