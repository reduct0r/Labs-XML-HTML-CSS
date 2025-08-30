(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function e(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=e(r);fetch(r.href,i)}})();class p{constructor(){this.baseUrl="http://localhost:3000"}getStocks(){return`${this.baseUrl}/stocks`}getStockById(t){return`${this.baseUrl}/stocks/${t}`}updateStockById(t){return`${this.baseUrl}/stocks/${t}`}}const a=new p;class m{async get(t){try{const e=await fetch(t);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return await e.json()}catch(e){throw console.error("Ошибка при выполнении GET-запроса:",e),e}}async patch(t,e){try{const o=await fetch(t,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);return await o.json()}catch(o){throw console.error("Ошибка при выполнении PATCH-запроса:",o),o}}}const c=new m;class u{constructor(t){this.parent=t}render(t,e){const o=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",o),document.getElementById(`card-${t.id}`).addEventListener("click",e)}getAttributeColor(t){switch(t.toLowerCase()){case"strength":return"#C23C2A";case"agility":return"#0DAB60";case"intelligence":return"#37A1C3";case"universal":return"#D1B109";default:return"#fff"}}getHTML(t){const e=this.getAttributeColor(t.attribute||"universal");return`
            <div id="card-${t.id}" class="hero-card" data-id="${t.id}">
                <img src="${t.src}" alt="${t.title}" style="width: 100%; height: auto;">
                <div class="hero-overlay">
                    <div class="hero-info">
                        <div class="attribute-icon" style="background-color: ${e};"></div>
                        <span class="hero-name">${t.title}</span>
                    </div>
                </div>
            </div>
        `}}class f{constructor(t){this.parent=t}getHTML(t){return`
            <div style="max-width: 800px; margin: 2rem auto; padding: 2rem; border-radius: 0; box-shadow: 0 2px 12px rgba(0,0,0,0.2); background: #0a0e17; color: #fff;">
                <img src="${t.src}" alt="icon" style="width: 100%; max-height: 300px; object-fit: cover; margin-bottom: 1.5rem;">
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
                            <input type="text" id="title-input" value="${t.title}" style="width: 100%; padding: 0.5rem; background: #111; color: #fff; border: 1px solid #333; border-radius: 0;" />
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label for="text-input" style="color: #ccc;">Краткое описание:</label>
                            <input type="text" id="text-input" value="${t.text}" style="width: 100%; padding: 0.5rem; background: #111; color: #fff; border: 1px solid #333; border-radius: 0;" />
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label for="description-input" style="color: #ccc;">Подробное описание:</label>
                            <textarea id="description-input" style="width: 100%; height: 150px; padding: 0.5rem; background: #111; color: #fff; border: 1px solid #333; border-radius: 0;">${t.description||""}</textarea>
                        </div>
                        <button type="submit" style="padding: 0.5rem 1rem; background-color: #A91E22; color: white; border: none; border-radius: 0;">Сохранить</button>
                    </form>
                </div>
            </div>
        `}render(t){const e=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",e)}}class g{constructor(t){this.parent=t}addListeners(t){document.getElementById("back-button").addEventListener("click",t)}getHTML(){return`
            <div style="display: flex; justify-content: center; margin-top: 20px;">
                <button id="back-button" style="padding: 0.5rem 1rem; background-color: #A91E22; color: white; border: none; border-radius: 0;">Назад</button>
            </div>
        `}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class h{constructor(t,e){this.parent=t,this.id=e}async getData(){try{const t=await c.get(a.getStockById(this.id));this.renderData(t)}catch(t){console.error("Ошибка при получении данных:",t)}}get pageRoot(){return document.getElementById("product-page")}getHTML(){return'<div id="product-page"></div>'}clickBack(){new d(this.parent).render()}renderData(t){new f(this.pageRoot).render(t),document.getElementById("edit-form").addEventListener("submit",async i=>{i.preventDefault();const s={title:document.getElementById("title-input").value,text:document.getElementById("text-input").value,description:document.getElementById("description-input").value};try{await c.patch(a.updateStockById(this.id),s),this.getData()}catch(l){console.error("Ошибка при обновлении данных:",l)}}),new g(this.pageRoot).render(this.clickBack.bind(this))}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.getData()}}class d{constructor(t){this.parent=t,this.query="",this.attribute="",this.complexity=""}clickCard(t){const e=t.target.closest("[data-id]");if(!e)return;const o=e.dataset.id;new h(this.parent,o).render()}async getData(){let t=a.getStocks(),e=[];this.query.trim()&&e.push(`title=${encodeURIComponent(this.query.trim())}`),this.attribute&&e.push(`attribute=${this.attribute}`),this.complexity&&e.push(`complexity=${this.complexity}`),e.length>0&&(t+=`?${e.join("&")}`);try{const o=await c.get(t);this.renderData(o||[])}catch(o){console.error("Ошибка при получении данных:",o)}}get pageRoot(){return document.getElementById("main-page")}getHTML(){return`
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Skranji:wght@700&display=swap');
                body {
                    background-color: #0000;
                    margin: 0;
                    font-family: 'Skranji', sans-serif;
                    background-image: url('https://playdota.s3.amazonaws.com/2017/05/1157_d60285d1b16f5bdbb2c9d28d1c347130.png');
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                }
                .hero-card {
                    position: relative;
                    width: 100%;
                    cursor: pointer;
                }
                .hero-card img {
                    width: 100%;
                    height: auto;
                    display: block;
                }
                .hero-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.6);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    display: flex;
                    align-items: flex-end;
                    padding: 10px;
                    box-sizing: border-box;
                }
                .hero-card:hover .hero-overlay {
                    opacity: 1;
                }
                .hero-info {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .attribute-icon {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                }
                .hero-name {
                    color: #fff;
                    font-size: 1.2rem;
                    font-weight: bold;
                }
                #main-page {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
                    gap: 1.5rem;
                }
                @media (max-width: 1200px) {
                    #main-page {
                        grid-template-columns: repeat(4, 1fr);
                    }
                }
                @media (max-width: 900px) {
                    #main-page {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
                .filter-btn {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    border: none;
                    cursor: pointer;
                    transition: transform 0.3s;
                }
                .filter-btn.selected {
                    transform: scale(1.2);
                    border: 2px solid #fff;
                }
                .comp-btn {
                    background-color: #fff;
                    color: #000;
                    font-weight: bold;
                }
                .header-btn {
                    background: transparent;
                    border: none;
                    color: #fff;
                    font-size: 1.32rem;
                    cursor: pointer;
                    transition: color 0.3s;
                }
                .header-btn:hover {
                    color: #ddd;
                }
                #search-input, .comp-btn, .filter-btn, footer p {
                    font-family: Arial, sans-serif !important;
                }
            </style>
            <header style="background-color: transparent; padding: 1rem 2rem; display: flex; align-items: center; margin-bottom: 1rem;">
                <img src="https://i.pinimg.com/originals/39/e4/a6/39e4a6655afbc1f1d212f1a0f8d04976.png" style="height: 40px; margin-right: 10px;">
                <span style="font-family: 'Skranji', sans-serif; color: #fff; font-size: 2rem; margin-right: 1rem;">DOTA 2</span>
                <nav style="display: flex; gap: 1.5rem;">
                  <button class="header-btn">Игра</button>
                  <button class="header-btn">Герои</button>
                  <button class="header-btn">Новости</button>
                  <button class="header-btn">Киберспорт</button>
                </nav>
                <button class="header-btn" style="margin-left: auto;">Войти</button>
            </header>
            <div style="max-width: 1200px; margin: 0 auto; padding: 1rem; color: #fff; text-align: center; margin-bottom: 2rem;">
                <h1 style="font-size: 2.625rem; margin-bottom: 1rem; font-family: 'Skranji', sans-serif;">Выберите героя</h1>
                <p style="font-size: 1.26rem; line-height: 1.5; font-family: 'Skranji', sans-serif;">Список героев в Dota 2 огромен и безгранично разнообразен: здесь вы встретите и магов-тактиков, и свирепых громил, и хитроумных негодяев. Их невероятные способности и сокрушительные ульты непременно приведут вас к победе.</p>
            </div>
            <div style="max-width: 1200px; margin: 0 auto; padding: 1rem; background-color: #0000; color: #fff;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; background-color: rgba(50, 50, 50, 0.7); padding: 0.5rem; border-radius: 4px; flex-wrap: wrap;">
                    <span style="color: #fff; font-size: 1.2rem; font-weight: bold; font-family: 'Skranji', sans-serif;">ФИЛЬТРЫ</span>
                    <div style="display: flex; flex: 1; justify-content: center; align-items: center; gap: 2rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="color: #fff; font-size: 1rem; font-family: 'Skranji', sans-serif;">Атрибут</span>
                            <button id="attr-all" class="filter-btn" style="background-color: #ccc;"></button>
                            <button id="attr-strength" class="filter-btn" style="background-color: #C23C2A;"></button>
                            <button id="attr-agility" class="filter-btn" style="background-color: #0DAB60;"></button>
                            <button id="attr-intelligence" class="filter-btn" style="background-color: #37A1C3;"></button>
                            <button id="attr-universal" class="filter-btn" style="background-color: #D1B109;"></button>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="color: #fff; font-size: 1rem; font-family: 'Skranji', sans-serif;">Сложность</span>
                            <button id="comp-all" class="filter-btn comp-btn" style="font-size: 0.8rem;">All</button>
                            <button id="comp-1" class="filter-btn comp-btn" style="font-size: 0.8rem;">1</button>
                            <button id="comp-2" class="filter-btn comp-btn" style="font-size: 0.8rem;">2</button>
                            <button id="comp-3" class="filter-btn comp-btn" style="font-size: 0.8rem;">3</button>
                        </div>
                    </div>
                    <input 
                        id="search-input" 
                        type="text" 
                        placeholder="Search Heroes..." 
                        style="
                            padding: 0.5rem 1rem;
                            width: 200px;
                            border: 1px solid #333;
                            outline: none;
                            font-size: 1rem;
                            background-color: #111;
                            color: #fff;
                        "
                        onfocus="this.style.borderColor='#A91E22';"
                        onblur="this.style.borderColor='#333';"
                    />
                </div>
                <div id="main-page" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(256px, 1fr)); gap: 1.5rem;"></div>
            </div>
            <footer style="background-color: #000; padding: 1rem; text-align: center; color: #ccc; margin-top: 2rem;">
                <p>&copy; 2025 Valve Corporation. All rights reserved.</p>
            </footer>
        `}renderData(t){this.pageRoot.innerHTML="",t.forEach(e=>{new u(this.pageRoot).render(e,this.clickCard.bind(this))})}addEventListeners(){const t=document.getElementById("search-input");t.addEventListener("input",()=>{this.query=t.value,this.getData()});const e=document.querySelectorAll('[id^="attr-"]');e.forEach(r=>{r.addEventListener("click",()=>{e.forEach(i=>i.classList.remove("selected")),r.classList.add("selected"),this.attribute=r.id.replace("attr-","")==="all"?"":r.id.replace("attr-",""),this.getData()})});const o=document.querySelectorAll('[id^="comp-"]');o.forEach(r=>{r.addEventListener("click",()=>{o.forEach(i=>i.classList.remove("selected")),r.classList.add("selected"),this.complexity=r.id.replace("comp-","")==="all"?"":r.id.replace("comp-",""),this.getData()})})}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML()),this.addEventListeners(),this.getData()}}const b=document.getElementById("root"),y=new d(b);y.render();
