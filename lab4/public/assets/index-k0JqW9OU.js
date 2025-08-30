(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function e(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=e(r);fetch(r.href,a)}})();class h{constructor(){this.baseUrl="http://localhost:3000"}getStocks(){return`${this.baseUrl}/stocks`}getStockById(t){return`${this.baseUrl}/stocks/${t}`}updateStockById(t){return`${this.baseUrl}/stocks/${t}`}}const d=new h;class b{async get(t){try{const e=await fetch(t);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return await e.json()}catch(e){throw console.error("Ошибка при выполнении GET-запроса:",e),e}}async patch(t,e){try{const i=await fetch(t,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!i.ok)throw new Error(`HTTP error! status: ${i.status}`);return await i.json()}catch(i){throw console.error("Ошибка при выполнении PATCH-запроса:",i),i}}}const l=new b;class f{constructor(t){this.parent=t}render(t,e){const i=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",i),document.getElementById(`card-${t.id}`).addEventListener("click",e)}getAttributeColor(t){switch(t.toLowerCase()){case"strength":return"#C23C2A";case"agility":return"#0DAB60";case"intelligence":return"#37A1C3";case"universal":return"#D1B109";default:return"#fff"}}getAttributeIcon(t){return`https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_${t.toLowerCase()}.png`}getHTML(t){return`
            <div id="card-${t.id}" class="hero-card" data-id="${t.id}">
                <img src="${t.src}" alt="${t.title}" style="width: 100%; height: auto;">
                <div class="hero-overlay">
                    <div class="hero-info">
                        <img class="attribute-icon" src="${this.getAttributeIcon(t.attribute||"universal")}" style="width: 24px; height: 24px;">
                        <span class="hero-name">${t.title}</span>
                    </div>
                </div>
            </div>
        `}}class m{constructor(t){this.parent=t}addListeners(t){document.getElementById("back-button").addEventListener("click",t)}getHTML(){return`
            <div style="position: absolute; top: 10px; left: 10px;">
                <button id="back-button" style="padding: 0.5rem 1rem; background-color: #A91E22; color: white; border: none; border-radius: 0;">Назад</button>
            </div>
        `}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class y{constructor(t,e){this.parent=t,this.id=e,this.attribute=null,this.complexity=null}async getData(){try{const t=await l.get(d.getStockById(this.id));this.renderData(t)}catch(t){console.error("Ошибка при получении данных:",t)}}get pageRoot(){return document.getElementById("edit-page")}getHTML(){return`
            <style>
                .edit-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: rgba(50, 50, 50, 0.7);
                    border-radius: 8px;
                    color: white;
                }
                .edit-label {
                    display: block;
                    margin-bottom: 5px;
                }
                .edit-input {
                    width: 100%;
                    padding: 0.5rem;
                    margin-bottom: 10px;
                    background: #111;
                    color: white;
                    border: 1px solid #333;
                    border-radius: 4px;
                }
                .edit-textarea {
                    width: 100%;
                    height: 150px;
                    padding: 0.5rem;
                    margin-bottom: 10px;
                    background: #111;
                    color: white;
                    border: 1px solid #333;
                    border-radius: 4px;
                }
                .filter-group {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                }
                .filter-label {
                    margin-right: 10px;
                    min-width: 100px;
                }
                .save-btn {
                    padding: 0.5rem 1rem;
                    background-color: #A91E22;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .save-btn:hover {
                    background-color: #c82a2f;
                }
                .save-btn:active {
                    transform: scale(0.98);
                }
                .filter-btn {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    border: 1px solid gray;
                    cursor: pointer;
                    transition: transform 0.3s;
                    background-color: transparent;
                    background-size: cover;
                    background-position: center;
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
                @media (max-width: 600px) {
                    .filter-group {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }
            </style>
            <div id="edit-page" style="position: relative;"></div>
        `}clickBack(){new p(this.parent,this.id).render()}renderData(t){new m(this.pageRoot).render(this.clickBack.bind(this)),this.pageRoot.insertAdjacentHTML("beforeend",`
            <div class="edit-container">
                <h1 style="text-align: center; margin-bottom: 20px;">Редактировать героя</h1>
                <form id="edit-form">
                    <label class="edit-label">Название:</label>
                    <input id="title-input" class="edit-input" type="text" value="${t.title}">
                    <label class="edit-label">Краткое описание:</label>
                    <input id="text-input" class="edit-input" type="text" value="${t.text}">
                    <label class="edit-label">Полное описание:</label>
                    <textarea id="description-input" class="edit-textarea">${t.description}</textarea>
                    <div class="filter-group">
                        <span class="filter-label">Атрибут:</span>
                        <div style="display: flex; gap: 0.5rem;">
                            <button type="button" id="edit-attr-strength" class="filter-btn" style="background-image: url('https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png');"></button>
                            <button type="button" id="edit-attr-agility" class="filter-btn" style="background-image: url('https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png');"></button>
                            <button type="button" id="edit-attr-intelligence" class="filter-btn" style="background-image: url('https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png');"></button>
                            <button type="button" id="edit-attr-universal" class="filter-btn" style="background-image: url('https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_universal.png');"></button>
                        </div>
                    </div>
                    <div class="filter-group">
                        <span class="filter-label">Сложность:</span>
                        <div style="display: flex; gap: 0.5rem;">
                            <button type="button" id="edit-comp-1" class="filter-btn comp-btn" style="font-size: 0.8rem;">1</button>
                            <button type="button" id="edit-comp-2" class="filter-btn comp-btn" style="font-size: 0.8rem;">2</button>
                            <button type="button" id="edit-comp-3" class="filter-btn comp-btn" style="font-size: 0.8rem;">3</button>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: center; margin-top: 20px;">
                        <button type="submit" class="save-btn">Сохранить</button>
                    </div>
                </form>
            </div>
        `);const i=document.getElementById(`edit-attr-${t.attribute}`);i&&i.classList.add("selected");const r=document.getElementById(`edit-comp-${t.complexity}`);r&&r.classList.add("selected");const a=document.querySelectorAll('[id^="edit-attr-"]');a.forEach(o=>{o.addEventListener("click",()=>{a.forEach(c=>c.classList.remove("selected")),o.classList.add("selected"),this.attribute=o.id.replace("edit-attr-","")})});const s=document.querySelectorAll('[id^="edit-comp-"]');s.forEach(o=>{o.addEventListener("click",()=>{s.forEach(c=>c.classList.remove("selected")),o.classList.add("selected"),this.complexity=parseInt(o.id.replace("edit-comp-",""))})}),document.getElementById("edit-form").addEventListener("submit",async o=>{o.preventDefault();const c={title:document.getElementById("title-input").value,text:document.getElementById("text-input").value,description:document.getElementById("description-input").value,attribute:this.attribute||t.attribute,complexity:this.complexity||t.complexity};try{await l.patch(d.updateStockById(this.id),c),new p(this.parent,this.id).render()}catch(u){console.error("Ошибка при обновлении данных:",u)}})}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.getData()}}class x{constructor(t){this.parent=t}render(t){const e="★".repeat(t.complexity)+"☆".repeat(3-t.complexity),i=`
            <div class="product-container">
                <img class="product-image" src="${t.src}">
                <h1 style="text-align: center; margin: 10px 0;">${t.title}</h1>
                <div class="info-holder">
                    <div>Атрибут: <img src="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_${t.attribute}.png" alt="${t.attribute}" style="width: 32px; height: 32px; vertical-align: middle;"></div>
                    <div>Сложность: <span style="color: gold;">${e}</span></div>
                </div>
                <div class="text-holder">
                    <p>${t.text}</p>
                </div>
                <div class="text-holder">
                    <p>${t.description}</p>
                </div>
            </div>
        `;this.parent.insertAdjacentHTML("beforeend",i)}}class p{constructor(t,e){this.parent=t,this.id=e}async getData(){try{const t=await l.get(d.getStockById(this.id));this.renderData(t)}catch(t){console.error("Ошибка при получении данных:",t)}}get pageRoot(){return document.getElementById("product-page")}getHTML(){return`
            <style>
                .product-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: rgba(50, 50, 50, 0.7);
                    border-radius: 8px;
                    color: white;
                }
                .product-image {
                    max-width: 100%;
                    border-radius: 8px;
                }
                .info-holder {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin: 10px 0;
                    padding: 10px;
                    background-color: rgba(0, 0, 0, 0.5);
                    border-radius: 4px;
                }
                .text-holder {
                    padding: 10px;
                    background-color: rgba(0, 0, 0, 0.5);
                    border-radius: 4px;
                    margin-bottom: 10px;
                }
                .edit-btn {
                    padding: 0.5rem 1rem;
                    background-color: #A91E22;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .edit-btn:hover {
                    background-color: #c82a2f;
                }
                @media (max-width: 600px) {
                    .info-holder {
                        flex-direction: column;
                    }
                }
            </style>
            <div id="product-page" style="position: relative;"></div>
        `}clickBack(){new g(this.parent).render()}clickEdit(){new y(this.parent,this.id).render()}renderData(t){new m(this.pageRoot).render(this.clickBack.bind(this)),new x(this.pageRoot).render(t),this.pageRoot.insertAdjacentHTML("beforeend",`
            <div style="display: flex; justify-content: center; margin-top: 20px;">
                <button id="edit-button" class="edit-btn">Редактировать</button>
            </div>
        `),document.getElementById("edit-button").addEventListener("click",this.clickEdit.bind(this))}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.getData()}}class g{constructor(t){this.parent=t,this.query="",this.attribute="",this.complexity=""}clickCard(t){const e=t.target.closest("[data-id]");if(!e)return;const i=e.dataset.id;new p(this.parent,i).render()}async getData(){let t=d.getStocks(),e=[];this.query.trim()&&e.push(`title=${encodeURIComponent(this.query.trim())}`),this.attribute&&e.push(`attribute=${this.attribute}`),this.complexity&&e.push(`complexity=${this.complexity}`),e.length>0&&(t+=`?${e.join("&")}`);try{const i=await l.get(t);this.renderData(i||[])}catch(i){console.error("Ошибка при получении данных:",i)}}get pageRoot(){return document.getElementById("main-page")}getHTML(){return`
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
                    border: 1px solid gray;
                    cursor: pointer;
                    transition: transform 0.3s;
                    background-color: transparent;
                    background-size: cover;
                    background-position: center;
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
                            <button id="attr-all" class="filter-btn comp-btn" style="font-size: 0.8rem; background-color: #ccc; border-radius: 50%; width: 30px; height: 30px;">All</button>
                            <button id="attr-strength" class="filter-btn" style="background-image: url('https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png');"></button>
                            <button id="attr-agility" class="filter-btn" style="background-image: url('https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png');"></button>
                            <button id="attr-intelligence" class="filter-btn" style="background-image: url('https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png');"></button>
                            <button id="attr-universal" class="filter-btn" style="background-image: url('https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_universal.png');"></button>
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
        `}renderData(t){this.pageRoot.innerHTML="",t.forEach(e=>{new f(this.pageRoot).render(e,this.clickCard.bind(this))})}addEventListeners(){const t=document.getElementById("search-input");t.addEventListener("input",()=>{this.query=t.value,this.getData()});const e=document.querySelectorAll('[id^="attr-"]');e.forEach(r=>{r.addEventListener("click",()=>{e.forEach(a=>a.classList.remove("selected")),r.classList.add("selected"),this.attribute=r.id.replace("attr-","")==="all"?"":r.id.replace("attr-",""),this.getData()})}),document.getElementById("attr-all").classList.add("selected");const i=document.querySelectorAll('[id^="comp-"]');i.forEach(r=>{r.addEventListener("click",()=>{i.forEach(a=>a.classList.remove("selected")),r.classList.add("selected"),this.complexity=r.id.replace("comp-","")==="all"?"":r.id.replace("comp-",""),this.getData()})}),document.getElementById("comp-all").classList.add("selected")}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML()),this.addEventListeners(),this.getData()}}const v=document.getElementById("root"),k=new g(v);k.render();
