!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var o={id:e,exports:{}};return r[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},t.parcelRequired7c6=o),o.register("8slrw",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e){if(Array.isArray(e))return e}})),o.register("7AJDX",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}})),o.register("ifqQW",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}})),o.register("auk6i",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t){if(!e)return;if("string"==typeof e)return n.default(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n.default(e,t)};var r,n=(r=o("8NIkP"))&&r.__esModule?r:{default:r}})),o.register("8NIkP",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}}));var i={};Object.defineProperty(i,"__esModule",{value:!0}),i.default=function(e,t){return a.default(e)||u.default(e,t)||c.default(e,t)||l.default()};var a=s(o("8slrw")),u=s(o("7AJDX")),l=s(o("ifqQW")),c=s(o("auk6i"));function s(e){return e&&e.__esModule?e:{default:e}}var f,d=o("dyT35"),v={};Object.defineProperty(v,"__esModule",{value:!0}),v.default=function(e){return e&&e.constructor===Symbol?"symbol":typeof e};var m="Expected a function",p=/^\s+|\s+$/g,y=/^[-+]0x[0-9a-f]+$/i,g=/^0b[01]+$/i,b=/^0o[0-7]+$/i,_=parseInt,j="object"==typeof t&&t&&t.Object===Object&&t,w="object"==typeof self&&self&&self.Object===Object&&self,x=j||w||Function("return this")(),S=Object.prototype.toString,O=Math.max,T=Math.min,h=function(){return x.Date.now()};function L(e,t,r){var n,o,i,a,u,l,c=0,s=!1,f=!1,d=!0;if("function"!=typeof e)throw new TypeError(m);function v(t){var r=n,i=o;return n=o=void 0,c=t,a=e.apply(i,r)}function p(e){return c=e,u=setTimeout(g,t),s?v(e):a}function y(e){var r=e-l;return void 0===l||r>=t||r<0||f&&e-c>=i}function g(){var e=h();if(y(e))return b(e);u=setTimeout(g,function(e){var r=t-(e-l);return f?T(r,i-(e-c)):r}(e))}function b(e){return u=void 0,d&&n?v(e):(n=o=void 0,a)}function _(){var e=h(),r=y(e);if(n=arguments,o=this,l=e,r){if(void 0===u)return p(l);if(f)return u=setTimeout(g,t),v(l)}return void 0===u&&(u=setTimeout(g,t)),a}return t=k(t)||0,M(r)&&(s=!!r.leading,i=(f="maxWait"in r)?O(k(r.maxWait)||0,t):i,d="trailing"in r?!!r.trailing:d),_.cancel=function(){void 0!==u&&clearTimeout(u),c=0,n=l=o=u=void 0},_.flush=function(){return void 0===u?a:b(h())},_}function M(t){var r=void 0===t?"undefined":e(v)(t);return!!t&&("object"==r||"function"==r)}function k(t){if("number"==typeof t)return t;if(function(t){return"symbol"==(void 0===t?"undefined":e(v)(t))||function(e){return!!e&&"object"==typeof e}(t)&&"[object Symbol]"==S.call(t)}(t))return NaN;if(M(t)){var r="function"==typeof t.valueOf?t.valueOf():t;t=M(r)?r+"":r}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(p,"");var n=g.test(t);return n||b.test(t)?_(t.slice(2),n?2:8):y.test(t)?NaN:+t}f=function(e,t,r){var n=!0,o=!0;if("function"!=typeof e)throw new TypeError(m);return M(r)&&(n="leading"in r?!!r.leading:n,o="trailing"in r?!!r.trailing:o),L(e,t,{leading:n,maxWait:t,trailing:o})};var E=o("2DKYH"),q="feedback-form-state",I=document.querySelector(".js-modal-form");I.addEventListener("click",(function(t){t.preventDefault(),t.target.classList.contains("active")&&t.target.classList.remove("active");!function(){var t=d.create(E.markupForm,{onShow:function(e){e.element().querySelector(".js-modal__close-btn").onclick=e.close,window.addEventListener("keydown",v)},onClose:function(e){window.removeEventListener("keydown",v),setTimeout((function(){I.classList.add("active")}),500)}});t.show();var r=document.querySelector(".feedback-form"),n=r.querySelector(".js-feedback-form__email"),o=r.querySelector(".feedback-form  textarea"),a=r.querySelector(".js-feedback-form__email + span"),u=r.querySelector('[type="submit"]');function l(e){e.preventDefault(),localStorage.getItem(q)&&localStorage.removeItem(q);var t=e.currentTarget.elements,r=t.email,n=t.message;console.log({email:r.value,message:n.value}),e.currentTarget.reset()}function c(e){var t=localStorage.getItem(q);t=t?JSON.parse(t):{},t={email:n.value.trim(),message:o.value.trim()},localStorage.setItem(q,JSON.stringify(t))}function s(){var t=localStorage.getItem(q);t&&(t=JSON.parse(t),Object.entries(t).forEach((function(t){var n=e(i)(t,2),o=n[0],a=n[1];r.elements[o].value=null!=a?a:""})))}function v(e){"Escape"===e.code&&t.close()}function m(e){var t=e.currentTarget,r=e.currentTarget.value;r.includes("@")&&r.includes(".")?(t.classList.add("valid"),t.classList.remove("invalid"),u.disabled=!1):(t.classList.add("invalid"),t.classList.remove("valid"),a.innerHTML=N,setTimeout((function(){a.innerHTML=""}),8e3))}s(),r.addEventListener("submit",l),r.addEventListener("input",e(f)(c,500)),n.addEventListener("blur",m)}()}));var N="<p class=\"error\" style='align-self: center; margin: 5px 0; color: red; text-align: center; font-size: 1rem; font-style: italic;'>Your email must include @ and . </p>"}();
//# sourceMappingURL=03-feedback.144c9517.js.map
