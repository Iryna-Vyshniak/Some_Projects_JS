const t=document.querySelector(".js-stop"),e=document.querySelector(".js-stop__stopwatch"),a=document.querySelector(".js-start"),o=document.querySelector(".js-start__stopwatch"),r=document.querySelector(".js-pause__stopwatch"),n=document.querySelector(".js-audio-stop"),s=document.querySelector(".js-audio-start");document.querySelector(".js-audio-pause");let c=null,l=0;const d=()=>{c&&(clearInterval(c),c=null)},u=t=>document.querySelector(".stopwatch").innerText=t;t.addEventListener("click",(t=>{n.play(),d()})),a.addEventListener("click",(t=>{t.currentTarget.classList.toggle("paused"),s.paused?s.play():s.pause(),c?d():(()=>{const t=new Date(Date.now()-l);c=setInterval((()=>{const e=new Date-t;l=e;const a=Math.floor(e%1e3),o=Math.floor(e/1e3%60),r=Math.floor(e/6e4%60),n=Math.floor(e/36e5%24),s=Math.floor(e/864e5),c=String(o).padStart(2,"0"),d=String(r).padStart(2,"0"),p=String(n).padStart(2,"0");u(`${s} days ${p} : ${d} : ${c} : ${a}`)}),0)})()}));const p=t=>document.querySelector(".stopwatch-next").innerText=t;o.addEventListener("click",(t=>{t.currentTarget.classList.toggle("paused"),s.paused?s.play():s.pause(),c?d():(()=>{const t=new Date(Date.now()-l);c=setInterval((()=>{const e=new Date-t;l=e;const a=Math.floor(e%1e3),o=Math.floor(e/1e3%60),r=Math.floor(e/6e4%60),n=Math.floor(e/36e5%24),s=Math.floor(e/864e5),c=String(o).padStart(2,"0"),d=String(r).padStart(2,"0"),u=String(n).padStart(2,"0");p(`${s} days ${u} : ${d} : ${c} : ${a}`)}),0)})()})),r.addEventListener("click",(t=>{d()})),e.addEventListener("click",(t=>{n.play(),d(),l=0,p("0 days 00 : 00 : 00 : 000")}));
//# sourceMappingURL=05-stopwatch.698a8d31.js.map