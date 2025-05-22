(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function e(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=e(o);fetch(o.href,i)}})();class u{constructor(){this.baseUrl="http://localhost:3000"}getStocks(){return`${this.baseUrl}/stocks`}getStockById(t){return`${this.baseUrl}/stocks/${t}`}updateStockById(t){return`${this.baseUrl}/stocks/${t}`}}const c=new u;class p{async get(t){try{const e=await fetch(t);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return await e.json()}catch(e){throw console.error("Ошибка при выполнении GET-запроса:",e),e}}async patch(t,e){try{const r=await fetch(t,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);return await r.json()}catch(r){throw console.error("Ошибка при выполнении PATCH-запроса:",r),r}}}const a=new p;class m{constructor(t){this.parent=t}render(t,e){const r=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",r),document.getElementById(`click-card-${t.id}`).addEventListener("click",e)}getHTML(t){return`
            <div class="card" style="width: 300px; background: #333; color: #fff;">
                <img class="card-img-top" src="${t.src}" alt="картинка" style="object-fit: cover; height: 180px;"/>
                <div class="card-body" style="display: flex; flex-direction: column; gap: 8px;">
                    <h5 class="card-title" style="margin-bottom: 0; color: #fff;">${t.title}</h5>
                    <p class="card-text" style="flex-grow: 1; font-size: 0.9rem; color: #ccc;">${t.text}</p>
                    <button 
                        id="click-card-${t.id}" 
                        data-id="${t.id}"
                        style="
                            padding: 6px 14px;
                            border: 1px solid #ccc;
                            background-color: #fff;
                            border-radius: 4px;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            color: #737373;
                        " onmouseover="this.style.color='#FFA115'" onmouseout="this.style.color='#737373'">
                        Открыть персонажа
                    </button>
                </div>
            </div>
        `}}class g{constructor(t){this.parent=t}getHTML(t){return`
            <div style="max-width: 800px; margin: 2rem auto; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.2); background: #333; color: #fff;">
                <img src="${t.src}" alt="icon" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 6px; margin-bottom: 1.5rem;">
                <h2 style="font-weight: 700; font-size: 2rem; color: #fff; margin-bottom: 1rem;">${t.title}</h2>
                <p style="font-size: 1.1rem; color: #ccc; margin-bottom: 1.5rem;">${t.text}</p>
                <div style="font-size: 1rem; line-height: 1.6; color: #ccc; margin-bottom: 2rem;">
                    <strong style="color: #fff;">Описание персонажа:</strong>
                    <p>${t.description||"Подробного описания пока нет."}</p>
                </div>
                <div style="margin-top: 2rem;">
                    <h3 style="color: #fff; margin-bottom: 1rem;">Редактировать персонажа</h3>
                    <form id="edit-form">
                        <div style="margin-bottom: 1rem;">
                            <label for="title-input" style="color: #ccc;">Имя:</label>
                            <input type="text" id="title-input" value="${t.title}" style="width: 100%; padding: 0.5rem; background: #444; color: #fff; border: 1px solid #555; border-radius: 4px;" />
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label for="text-input" style="color: #ccc;">Краткое описание:</label>
                            <input type="text" id="text-input" value="${t.text}" style="width: 100%; padding: 0.5rem; background: #444; color: #fff; border: 1px solid #555; border-radius: 4px;" />
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label for="description-input" style="color: #ccc;">Подробное описание:</label>
                            <textarea id="description-input" style="width: 100%; height: 150px; padding: 0.5rem; background: #444; color: #fff; border: 1px solid #555; border-radius: 4px;">${t.description||""}</textarea>
                        </div>
                        <button type="submit" style="padding: 0.5rem 1rem; background-color: #FFA115; color: white; border: none; border-radius: 4px;">Сохранить</button>
                    </form>
                </div>
            </div>
        `}render(t){const e=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",e)}}class h{constructor(t){this.parent=t}addListeners(t){document.getElementById("back-button").addEventListener("click",t)}getHTML(){return`
            <div style="display: flex; justify-content: center; margin-top: 20px;">
                <button id="back-button" style="padding: 0.5rem 1rem; background-color: #FFA115; color: white; border: none; border-radius: 4px;">Назад</button>
            </div>
        `}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class f{constructor(t,e){this.parent=t,this.id=e}async getData(){try{const t=await a.get(c.getStockById(this.id));this.renderData(t)}catch(t){console.error("Ошибка при получении данных:",t)}}get pageRoot(){return document.getElementById("product-page")}getHTML(){return'<div id="product-page"></div>'}clickBack(){new d(this.parent).render()}renderData(t){new g(this.pageRoot).render(t),document.getElementById("edit-form").addEventListener("submit",async i=>{i.preventDefault();const s={title:document.getElementById("title-input").value,text:document.getElementById("text-input").value,description:document.getElementById("description-input").value};try{await a.patch(c.updateStockById(this.id),s),this.getData()}catch(l){console.error("Ошибка при обновлении данных:",l)}}),new h(this.pageRoot).render(this.clickBack.bind(this))}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.getData()}}class d{constructor(t){this.parent=t,this.query="",this.limit=20}clickCard(t){const e=t.target.closest("[data-id]");if(!e)return;const r=e.dataset.id;new f(this.parent,r).render()}async getData(){let t=c.getStocks();this.query.trim()&&(t+=`?title=${encodeURIComponent(this.query.trim())}`);try{const e=await a.get(t),r=e?e.slice(0,this.limit):[];this.renderData(r)}catch(e){console.error("Ошибка при получении данных:",e)}}get pageRoot(){return document.getElementById("main-page")}getHTML(){return`
      <header style="background-color: #222; padding: 1rem 2rem; display: flex; align-items: center; border-bottom: 1px solid #444; margin-bottom: 1rem;">
        <div style="font-weight: bold; font-size: 1.5rem; color: #FFD700;">Dota 2 Characters</div>
        <nav style="margin-right: auto; margin-left: 50px;">
          <a href="#" style="margin-left: 1.5rem; text-decoration: none; color: #ccc;" onmouseover="this.style.color='#FFD700'" onmouseout="this.style.color='#ccc'">Главная</a>
          <a href="#" style="margin-left: 1.5rem; text-decoration: none; color: #ccc;" onmouseover="this.style.color='#FFD700'" onmouseout="this.style.color='#ccc'">Персонажи</a>
          <a href="#" style="margin-left: 1.5rem; text-decoration: none; color: #ccc;" onmouseover="this.style.color='#FFD700'" onmouseout="this.style.color='#ccc'">О нас</a>
        </nav>
      </header>

      <div style="max-width: 1200px; margin: 0 auto; padding: 1rem; background-color: #111; color: #fff;">
        <div style="margin-bottom: 1rem; display: flex; gap: 1rem;">
          <input 
            id="search-input" 
            type="text" 
            placeholder="Поиск по имени..." 
            style="
              padding: 0.5rem 1rem;
              flex: 1;
              border: 1px solid #444;
              border-radius: 8px;
              outline: none;
              font-size: 1rem;
              background-color: #333;
              color: #fff;
            "
            onfocus="this.style.borderColor='#FFD700';"
            onblur="this.style.borderColor='#444';"
          />
          <input 
            id="limit-input" 
            type="number" 
            min="1" 
            value="${this.limit}" 
            style="
              width: 80px;
              padding: 0.5rem;
              border: 1px solid #444;
              border-radius: 8px;
              outline: none;
              font-size: 1rem;
              text-align: center;
              background-color: #333;
              color: #fff;
            "
          />
        </div>
        <div id="main-page" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;"></div>
      </div>
    `}renderData(t){this.pageRoot.innerHTML="",t.forEach(e=>{new m(this.pageRoot).render(e,this.clickCard.bind(this))})}addEventListeners(){const t=document.getElementById("search-input"),e=document.getElementById("limit-input");t.addEventListener("input",()=>{this.query=t.value,this.getData()}),e.addEventListener("input",()=>{const r=parseInt(e.value,10);this.limit=isNaN(r)||r<1?1:r,this.getData()})}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML()),this.addEventListeners(),this.getData()}}const y=document.getElementById("root"),b=new d(y);b.render();
