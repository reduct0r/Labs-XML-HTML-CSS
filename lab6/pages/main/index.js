import { stockUrls } from "../../modules/characterUrls.js";
import { ajax } from "../../modules/ajax.js";
import { CharacterCardComponent } from "../../components/character-card/index.js";
import { CharacterPage } from "../character-view/index.js";


export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.query = "";
        this.attribute = "";
        this.complexity = "";
    }

    clickCard(e) {
        const card = e.target.closest("[data-id]");
        if (!card) return;

        const cardId = card.dataset.id;
        const productPage = new CharacterPage(this.parent, cardId);
        productPage.render();
    }

    async getData() {
        let url = stockUrls.getStocks();
        let params = [];
        if (this.query.trim()) {
            params.push(`title=${encodeURIComponent(this.query.trim())}`);
        }
        if (this.attribute) {
            params.push(`attribute=${this.attribute}`);
        }
        if (this.complexity) {
            params.push(`complexity=${this.complexity}`);
        }
        if (params.length > 0) {
            url += `?${params.join('&')}`;
        }

        try {
            const data = await ajax.get(url);
            this.renderData(data || []);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }

    get pageRoot() {
        return document.getElementById("main-page");
    }

    getHTML() {
        return `
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
        `;
    }

    renderData(items) {
        this.pageRoot.innerHTML = "";
        items.forEach((item) => {
            const card = new CharacterCardComponent(this.pageRoot);
            card.render(item, this.clickCard.bind(this));
        });
    }

    addEventListeners() {
        const searchInput = document.getElementById("search-input");

        searchInput.addEventListener("input", () => {
            this.query = searchInput.value;
            this.getData();
        });

        // Attribute filters
        const attrButtons = document.querySelectorAll('[id^="attr-"]');
        attrButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                attrButtons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.attribute = btn.id.replace('attr-', '') === 'all' ? '' : btn.id.replace('attr-', '');
                this.getData();
            });
        });
        document.getElementById('attr-all').classList.add('selected');

        // Complexity filters
        const compButtons = document.querySelectorAll('[id^="comp-"]');
        compButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                compButtons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.complexity = btn.id.replace('comp-', '') === 'all' ? '' : btn.id.replace('comp-', '');
                this.getData();
            });
        });
        document.getElementById('comp-all').classList.add('selected');
    }

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());
        this.addEventListeners();
        this.getData();
    }
    
}