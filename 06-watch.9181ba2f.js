const t=document.querySelector(".date-day"),e=document.querySelector(".date"),o=document.querySelector(".date-month"),r=document.querySelector(".date-year"),n=document.querySelector(".digital-clock"),a=document.querySelector("#hours__arrow"),c=document.querySelector("#minutes__arrow"),u=document.querySelector("#seconds__arrow"),d=["Неділя","Понеділок","Вівторок","Середа","Четвер","Пятниця","Субота"],s=["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"];setInterval((()=>{const g=new Date,l=d[g.getDay()],S=g.getDate(),y=s[g.getMonth()],m=g.getFullYear();t.textContent=l,e.textContent=S,o.textContent=y,r.textContent=m;const i=g.getHours().toString().padStart(2,"0"),q=g.getMinutes().toString().padStart(2,"0"),$=g.getSeconds().toString().padStart(2,"0");n.textContent=`${i} : ${q} : ${$}`;const _=6*g.getSeconds(),x=6*g.getMinutes(),C=30*g.getHours()+.5*g.getMinutes();u.style.transform=`rotate(${_}deg)`,c.style.transform=`rotate(${x}deg)`,a.style.transform=`rotate(${C}deg)`}),1e3);
//# sourceMappingURL=06-watch.9181ba2f.js.map