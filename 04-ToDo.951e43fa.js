var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){o[e]=t},e.parcelRequired7c6=n);var r={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let a;const d=new Uint8Array(16);function c(){if(!a&&(a="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!a))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return a(d)}const i=[];for(let e=0;e<256;++e)i.push((e+256).toString(16).slice(1));function s(e,t=0){return(i[e[t+0]]+i[e[t+1]]+i[e[t+2]]+i[e[t+3]]+"-"+i[e[t+4]]+i[e[t+5]]+"-"+i[e[t+6]]+i[e[t+7]]+"-"+i[e[t+8]]+i[e[t+9]]+"-"+i[e[t+10]]+i[e[t+11]]+i[e[t+12]]+i[e[t+13]]+i[e[t+14]]+i[e[t+15]]).toLowerCase()}var l=function(e,t,o){if(r.randomUUID&&!t&&!e)return r.randomUUID();const n=(e=e||{}).random||(e.rng||c)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,t){o=o||0;for(let e=0;e<16;++e)t[o+e]=n[e];return t}return s(n)},u=n("fSYTq");l();const p=document.querySelector(".js-form-todo"),f=document.querySelector(".js-todo-list");let m=[];const y=()=>{localStorage.setItem("todos",JSON.stringify(m))},h=()=>{const e=m.map((e=>(({id:e,value:t,checked:o})=>`\n<li data-id="${e}" class="todo-list__item">\n      <input type="checkbox" name="checkbox" class="todo-list__input" ${o?"checked":""}/>\n      <span>${t}</span>\n      <div class="btn-wrapper">\n          <button data-action="delete" class="todo-list__btn">\n            <i data-action="delete" class="fa-sharp fa-solid fa-trash"></i>\n          </button>\n          <button data-action="view" class="todo-list__btn">\n           <i data-action="view" class="fa fa-sticky-note" aria-hidden="true"></i>\n          </button>\n      </div>\n    </li>`)(e))).join("");f.innerHTML="",f.insertAdjacentHTML("beforeend",e)};(()=>{try{m=JSON.parse(localStorage.getItem("todos"))||[]}catch(e){console.log("error happened:",e.message),m=[]}})(),h(),p.addEventListener("submit",(e=>{e.preventDefault();const t=e.currentTarget.elements.text,{value:o}=t,n={id:l(),value:o,checked:!1};console.log(n),m.push(n),t.value="",y(),h()})),f.addEventListener("click",(e=>{const{action:t}=e.target.dataset,o=e.target.closest("li"),{id:n}=(null==o?void 0:o.dataset)||{};switch(t){case"delete":(e=>{m=m.filter((t=>t.id!==e)),console.log("delete"),y(),h()})(n);break;case"view":(e=>{const t=u.modalToDo.element().querySelector(".text"),o=u.modalToDo.element().querySelector("h4");t.textContent=e,o.textContent=document.querySelector("input + span").textContent,u.modalToDo.show()})(n);break;case"check":(e=>{m=m.map((t=>t.id===e?{...t,checked:!t.checked}:t)),y(),h()})(n)}}));
//# sourceMappingURL=04-ToDo.951e43fa.js.map
