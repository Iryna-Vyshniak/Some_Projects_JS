!function(){var t=1e3,e=document.querySelector(".js-stop"),a=document.querySelector(".js-start"),n=document.querySelector(".js-audio-stop"),o=document.querySelector(".js-audio-start"),r=null,c=0,u=function(){r&&(clearInterval(r),r=null)},l=function(t){return document.querySelector(".stopwatch").innerText=t};e.addEventListener("click",(function(t){n.play(),u()})),a.addEventListener("click",(function(e){var a;e.currentTarget.classList.toggle("paused"),o.paused?o.play():o.pause(),r?u():(a=new Date(Date.now()-c),r=setInterval((function(){var e=new Date-a;c=e;var n=Math.floor(e%t),o=Math.floor(e/t%60),r=Math.floor(e/6e4%60),u=Math.floor(e/36e5%24),s=Math.floor(e/864e5),d=String(o).padStart(2,"0"),i=String(r).padStart(2,"0"),f=String(u).padStart(2,"0"),p="".concat(s," days ").concat(f," : ").concat(i," : ").concat(d," : ").concat(n);l(p)}),0))}))}();
//# sourceMappingURL=05-stopwatch.abe18dbf.js.map
