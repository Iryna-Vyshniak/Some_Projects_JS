function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},r={},n=t.parcelRequired7c6;null==n&&((n=function(e){if(e in o)return o[e].exports;if(e in r){var t=r[e];delete r[e];var n={id:e,exports:{}};return o[e]=n,t.call(n.exports,n,n.exports),n.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},t.parcelRequired7c6=n);var a=n("cxTnx");const l=document.querySelector(".js-stop"),s=document.querySelector(".js-stop__stopwatch"),c=document.querySelector(".js-start"),d=document.querySelector(".js-start__stopwatch"),u=document.querySelector(".js-pause__stopwatch"),i=document.querySelector(".js-audio-stop"),p=document.querySelector(".js-audio-start");document.querySelector(".js-audio-pause");document.querySelector(".js-time-now").textContent=e(a)().format("dddd, MMMM Do YYYY, h:mm:ss a");let f=null,S=null,y=0;const h=()=>{f&&(clearInterval(f),f=null)},w=e=>document.querySelector(".stopwatch").innerText=e;l.addEventListener("click",(e=>{i.play(),h()})),c.addEventListener("click",(e=>{e.currentTarget.classList.toggle("paused"),p.paused?p.play():p.pause(),f?h():(()=>{const e=new Date(Date.now()-y);f=setInterval((()=>{const t=new Date-e;y=t;const o=Math.floor(t%1e3),r=Math.floor(t/1e3%60),n=Math.floor(t/6e4%60),a=Math.floor(t/36e5%24),l=String(r).padStart(2,"0"),s=String(n).padStart(2,"0"),c=String(a).padStart(2,"0");w(`${c} : ${s} : ${l} : ${o}`)}),0)})()}));const g=e=>document.querySelector(".stopwatch-next").innerText=e,m=()=>{S&&(clearInterval(S),S=null)};d.addEventListener("click",(e=>{e.currentTarget.classList.toggle("paused"),p.paused?p.play():p.pause(),S?m():(()=>{const e=new Date(Date.now()-y);S=setInterval((()=>{const t=new Date-e;y=t;const o=Math.floor(t%1e3),r=Math.floor(t/1e3%60),n=Math.floor(t/6e4%60),a=Math.floor(t/36e5%24),l=Math.floor(t/864e5),s=String(r).padStart(2,"0"),c=String(n).padStart(2,"0"),d=String(a).padStart(2,"0");g(`${l} days ${d} : ${c} : ${s} : ${o}`)}),0)})()})),u.addEventListener("click",(e=>{m()})),s.addEventListener("click",(e=>{i.play(),m(),y=0,g("0 days 00 : 00 : 00 : 000")}));
//# sourceMappingURL=05-stopwatch.50a76887.js.map
