import{a as w,S,i as c}from"./assets/vendor-BIn0hBn5.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const v="https://pixabay.com/api/",P="31963270-0e971a3d68be2b002dee093f0";async function m(t,r=1){const s={key:P,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:15};return(await w.get(v,{params:s})).data}function h(t){return t.map(({webformatURL:r,largeImageURL:s,tags:n,likes:e,views:o,comments:i,downloads:L})=>`
      <li class="photo-card">
        <a href="${r}">
          <img
          class="photo-card__img"
          src="${s}" 
          alt="${n}" 
          loading="lazy" 
          width="320"
          height="212"
          />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <span>${e}</span>
          </p>
          <p class="info-item">
            <b>Views</b>
            <span>${o}</span>
          </p>
          <p class="info-item">
            <b>Comments</b>
            <span>${i}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b>
            <span>${L}</span>
          </p>
        </div>
      </li>
    `).join("")}const q=document.querySelector(".form"),u=document.querySelector(".gallery"),M=document.querySelector(".loader"),y=document.querySelector(".load-more");let a=1,l="",d=0;const g=15,b=new S(".gallery a",{captionsData:"alt",captionDelay:250});q.addEventListener("submit",async t=>{if(t.preventDefault(),l=t.target.elements.searchQuery.value.trim(),!l){c.warning({message:"Please enter a search query"});return}a=1,u.innerHTML="",f(!0),p(!1);try{const r=await m(l,a);if(d=r.totalHits,r.hits.length===0){c.info({message:"Sorry, there are no images matching your search query. Please try again!"});return}const s=h(r.hits);u.innerHTML=s,b.refresh(),p(a*g<d)}catch(r){c.error({message:"Something went wrong. Try again later."}),console.error(r)}finally{f(!1)}});y.addEventListener("click",async()=>{a+=1,f(!0),p(!1);try{const t=await m(l,a);u.insertAdjacentHTML("beforeend",h(t.hits)),b.refresh(),$(),p(a*g<d),a*g>=d&&c.info({message:"We're sorry, but you've reached the end of search results."})}catch{c.error({message:"Something went wrong."})}finally{f(!1)}});function f(t){M.classList.toggle("is-hidden",!t)}function p(t){y.classList.toggle("is-hidden",!t)}function $(){const{height:t}=u.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
