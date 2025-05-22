export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div style="max-width: 800px; margin: 2rem auto; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.2); background: #333; color: #fff;">
                <img src="${data.src}" alt="icon" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 6px; margin-bottom: 1.5rem;">
                <h2 style="font-weight: 700; font-size: 2rem; color: #fff; margin-bottom: 1rem;">${data.title}</h2>
                <p style="font-size: 1.1rem; color: #ccc; margin-bottom: 1.5rem;">${data.text}</p>
                <div style="font-size: 1rem; line-height: 1.6; color: #ccc; margin-bottom: 2rem;">
                    <strong style="color: #fff;">Описание персонажа:</strong>
                    <p>${data.description || "Подробного описания пока нет."}</p>
                </div>
                <div style="margin-top: 2rem;">
                    <h3 style="color: #fff; margin-bottom: 1rem;">Редактировать персонажа</h3>
                    <form id="edit-form">
                        <div style="margin-bottom: 1rem;">
                            <label for="title-input" style="color: #ccc;">Имя:</label>
                            <input type="text" id="title-input" value="${data.title}" style="width: 100%; padding: 0.5rem; background: #444; color: #fff; border: 1px solid #555; border-radius: 4px;" />
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label for="text-input" style="color: #ccc;">Краткое описание:</label>
                            <input type="text" id="text-input" value="${data.text}" style="width: 100%; padding: 0.5rem; background: #444; color: #fff; border: 1px solid #555; border-radius: 4px;" />
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label for="description-input" style="color: #ccc;">Подробное описание:</label>
                            <textarea id="description-input" style="width: 100%; height: 150px; padding: 0.5rem; background: #444; color: #fff; border: 1px solid #555; border-radius: 4px;">${data.description || ''}</textarea>
                        </div>
                        <button type="submit" style="padding: 0.5rem 1rem; background-color: #FFA115; color: white; border: none; border-radius: 4px;">Сохранить</button>
                    </form>
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
    }
}

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.query = "";
        this.limit = 10;
    }

    clickCard(e) {
        const card = e.target.closest("[data-id]");
        if (!card) return;

        const cardId = card.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    getData() {
        let url = stockUrls.getStocks();
        if (this.query.trim()) {
            url += `?title=${encodeURIComponent(this.query.trim())}`;
        }

        ajax.get(url, (data, status) => {
            const limitedData = data ? data.slice(0, this.limit) : [];
            this.renderData(limitedData);
        });
    }

    get pageRoot() {
        return document.getElementById("main-page");
    }

    getHTML() {
        return `
            <header style="background-color: #333; padding: 1rem 2rem; display: flex; align-items: center; border-bottom: 1px solid #555; margin-bottom: 1rem;">
                <div style="font-weight: bold; font-size: 1.5rem; color: #FFA115;">Dota 2 Characters</div>
            </header>
            <div style="max-width: 1200px; margin: 0 auto; padding: 1rem;">
                <div style="margin-bottom: 1rem; display: flex; gap: 1rem;">
                    <input 
                        id="search-input" 
                        type="text" 
                        placeholder="Поиск по имени..." 
                        style="
                            padding: 0.5rem 1rem;
                            flex: 1;
                            border: 1px solid #555;
                            border-radius: 8px;
                            outline: none;
                            font-size: 1rem;
                            background: #444;
                            color: #fff;
                            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                            transition: border 0.2s, box-shadow 0.2s;
                        "
                        onfocus="this.style.borderColor='#FFA115'; this.style.boxShadow='0 0 5px rgba(255,161,21,0.5)'"
                        onblur="this.style.borderColor='#555'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.1)'"
                    />
                    <input 
                        id="limit-input" 
                        type="number" 
                        min="1" 
                        value="${this.limit}" 
                        style="
                            width: 80px;
                            padding: 0.5rem;
                            border: 1px solid #555;
                            border-radius: 8px;
                            outline: none;
                            font-size: 1rem;
                            text-align: center;
                            background: #444;
                            color: #fff;
                        "
                    />
                </div>
                <div id="main-page" style="
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                "></div>
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