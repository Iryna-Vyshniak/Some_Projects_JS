function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},t.parcelRequired7c6=o);var i,a=o("9B8F0"),c=/^\s+|\s+$/g,l=/^[-+]0x[0-9a-f]+$/i,u=/^0b[01]+$/i,s=/^0o[0-7]+$/i,f=parseInt,d="object"==typeof t&&t&&t.Object===Object&&t,m="object"==typeof self&&self&&self.Object===Object&&self,v=d||m||Function("return this")(),p=Object.prototype.toString,g=Math.max,b=Math.min,y=function(){return v.Date.now()};function T(e,t,n){var r,o,i,a,c,l,u=0,s=!1,f=!1,d=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function m(t){var n=r,i=o;return r=o=void 0,u=t,a=e.apply(i,n)}function v(e){return u=e,c=setTimeout(T,t),s?m(e):a}function p(e){var n=e-l;return void 0===l||n>=t||n<0||f&&e-u>=i}function T(){var e=y();if(p(e))return L(e);c=setTimeout(T,function(e){var n=t-(e-l);return f?b(n,i-(e-u)):n}(e))}function L(e){return c=void 0,d&&r?m(e):(r=o=void 0,a)}function j(){var e=y(),n=p(e);if(r=arguments,o=this,l=e,n){if(void 0===c)return v(l);if(f)return c=setTimeout(T,t),m(l)}return void 0===c&&(c=setTimeout(T,t)),a}return t=S(t)||0,w(n)&&(s=!!n.leading,i=(f="maxWait"in n)?g(S(n.maxWait)||0,t):i,d="trailing"in n?!!n.trailing:d),j.cancel=function(){void 0!==c&&clearTimeout(c),u=0,r=l=o=c=void 0},j.flush=function(){return void 0===c?a:L(y())},j}function w(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function S(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==p.call(e)}(e))return NaN;if(w(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=w(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(c,"");var n=u.test(e);return n||s.test(e)?f(e.slice(2),n?2:8):l.test(e)?NaN:+e}i=function(e,t,n){var r=!0,o=!0;if("function"!=typeof e)throw new TypeError("Expected a function");return w(n)&&(r="leading"in n?!!n.leading:r,o="trailing"in n?!!n.trailing:o),T(e,t,{leading:r,maxWait:t,trailing:o})};var L=o("fSYTq");let j=null;const x=document.querySelector(".js-modal-form");x.addEventListener("click",(function(t){t.preventDefault(),t.target.classList.contains("active")&&t.target.classList.remove("active");!function(){const t=a.create(L.markupForm,{onShow:e=>{e.element().querySelector(".js-modal__close-btn").onclick=e.close,window.addEventListener("keydown",d)},onClose:e=>{window.removeEventListener("keydown",d),j&&clearTimeout(j),j=setTimeout((()=>{x.classList.add("active")}),500)}});t.show();const n=document.querySelector(".feedback-form"),r=n.querySelector(".js-feedback-form__email"),o=n.querySelector(".feedback-form  textarea"),c=n.querySelector(".js-feedback-form__email + span"),l=n.querySelector('[type="submit"]');function u(e){e.preventDefault(),localStorage.getItem("feedback-form-state")&&localStorage.removeItem("feedback-form-state");const{email:t,message:n}=e.currentTarget.elements;console.log({email:t.value,message:n.value}),e.currentTarget.reset()}function s(e){let t=localStorage.getItem("feedback-form-state");t=t?JSON.parse(t):{},t={email:r.value.trim(),message:o.value.trim()},localStorage.setItem("feedback-form-state",JSON.stringify(t))}function f(){let e=localStorage.getItem("feedback-form-state");e&&(e=JSON.parse(e),Object.entries(e).forEach((([e,t])=>{n.elements[e].value=null!=t?t:""})))}function d(e){"Escape"===e.code&&t.close()}function m(e){const t=e.currentTarget,{value:n}=e.currentTarget;n.includes("@")&&n.includes(".")?(t.classList.add("valid"),t.classList.remove("invalid"),l.disabled=!1):(t.classList.add("invalid"),t.classList.remove("valid"),c.innerHTML=k,j&&clearTimeout(j),j=setTimeout((()=>{c.innerHTML=""}),8e3))}f(),n.addEventListener("submit",u),n.addEventListener("input",e(i)(s,500)),r.addEventListener("blur",m)}()}));const k="<p class=\"error\" style='align-self: center; margin: 5px 0; color: red; text-align: center; font-size: 1rem; font-style: italic;'>Your email must include @ and . </p>";
//# sourceMappingURL=03-feedback.05b69450.js.map