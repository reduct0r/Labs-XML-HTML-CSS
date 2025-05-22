import { stockUrls } from "../../modules/stockUrls.js";
import { ajax } from "../../modules/ajax.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.query = "";
        this.limit = 20;
    }

    clickCard(e) {
        const card = e.target.closest("[data-id]");
        if (!card) return;

        const cardId = card.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    async getData() {
        let url = stockUrls.getStocks();
        if (this.query.trim()) {
            url += `?title=${encodeURIComponent(this.query.trim())}`;
        }

        try {
            const data = await ajax.get(url);
            const limitedData = data ? data.slice(0, this.limit) : [];
            this.renderData(limitedData);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }

    get pageRoot() {
        return document.getElementById("main-page");
    }

    getHTML() {
        return `
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
    `;
    }

    renderData(items) {
        this.pageRoot.innerHTML = "";
        items.forEach((item) => {
            const card = new ProductCardComponent(this.pageRoot);
            card.render(item, this.clickCard.bind(this));
        });
    }

    addEventListeners() {
        const searchInput = document.getElementById("search-input");
        const limitInput = document.getElementById("limit-input");

        searchInput.addEventListener("input", () => {
            this.query = searchInput.value;
            this.getData();
        });

        limitInput.addEventListener("input", () => {
            const value = parseInt(limitInput.value, 10);
            this.limit = isNaN(value) || value < 1 ? 1 : value;
            this.getData();
        });
    }

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());
        this.addEventListeners();
        this.getData();
    }
}

// Метод getData стал асинхронным (async).
// Вызов ajax.get теперь использует await, и данные обрабатываются напрямую без коллбека.