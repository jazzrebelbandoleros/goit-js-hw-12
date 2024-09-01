import{a as f,S as v,i as c}from"./assets/vendor-136cb9f3.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();f.defaults.baseURL="https://pixabay.com/api/";const y=(o,e)=>{const s={params:{key:"45589223-69f3ad275007a1fe85231a89e",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15}};return f.get("",s)},p=({webformatURL:o,largeImageURL:e,tags:s,likes:a,views:t,comments:r,downloads:i})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${e}">
        <img
        class="gallery-image"
        src="${o}"
        alt="${s}"/>
      </a>
      <ul class="gallary-descr">
        <li class="gallary-descr-item">
          <h2 class="gallary-descr-item-title">Likes</h2>
          <p class="gallary-descr-item-num">${a}</p>
        </li>
        <li class="gallary-descr-item">
          <h2 class="gallary-descr-item-title">Views</h2>
          <p class="gallary-descr-item-num">${t}</p>
        </li>
        <li class="gallary-descr-item">
          <h2 class="gallary-descr-item-title">Comments</h2>
          <p class="gallary-descr-item-num">${r}</p>
        </li>
        <li class="gallary-descr-item">
          <h2 class="gallary-descr-item-title">Downloads</h2>
          <p class="gallary-descr-item-num">${i}</p>
        </li>
      </ul>
  </li>
  `,n=document.querySelector(".js-search-form"),d=document.querySelector(".js-gallery"),h=document.querySelector(".js-loader"),u=document.querySelector(".js-load-more");let l=1,m="",b=0,g=0;const L=new v(".gallery a",{captionDelay:250,captionPosition:"bottom",captionsData:"alt"}),C=async o=>{try{if(o.preventDefault(),h.classList.remove("is-hidden"),m=n.elements.user_query.value.trim(),!m){c.error({message:"Enter what we are looking for",position:"topRight",backgroundColor:"#EF4040",messageColor:"#fafafb",iconColor:"#fafafb"});return}l=1;const e=await y(m,l);if(e.data.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#EF4040",messageColor:"#fafafb",iconColor:"#fafafb"}),u.classList.add("is-hidden"),d.innerHTML="",n.reset();return}const s=e.data.hits.map(a=>p(a)).join("");d.innerHTML=s,b=d.querySelector("li").getBoundingClientRect().height,g=Math.ceil(e.data.totalHits/15),l>=g&&c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),u.classList.remove("is-hidden"),L.refresh()}catch(e){console.log(e)}finally{n.reset(),h.classList.add("is-hidden")}},S=async o=>{try{l++;const e=await y(m,l),s=e.data.hits.map(a=>p(a)).join("");d.insertAdjacentHTML("beforeend",s),L.refresh(),scrollBy({top:b*2,behavior:"smooth"}),g=Math.ceil(e.data.totalHits/15),l>=g&&(u.classList.add("is-hidden"),c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(e){console.log(e)}};n.addEventListener("submit",C);u.addEventListener("click",S);
//# sourceMappingURL=commonHelpers.js.map
