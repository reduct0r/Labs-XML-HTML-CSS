import { stockUrls } from "../../modules/characterUrls.js";
import { ajax } from "../../modules/ajax.js";
import { CharacterPage } from "../character-view/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";

export class EditPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.attribute = null;
        this.complexity = null;
    }

    async getData() {
        try {
            const data = await ajax.get(stockUrls.getStockById(this.id));
            this.renderData(data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }

    get pageRoot() {
        return document.getElementById("edit-page");
    }

    getHTML() {
        return `
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
        `;
    }

    clickBack() {
        const productPage = new CharacterPage(this.parent, this.id);
        productPage.render();
    }

    renderData(item) {
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        this.pageRoot.insertAdjacentHTML('beforeend', `
            <div class="edit-container">
                <h1 style="text-align: center; margin-bottom: 20px;">Редактировать героя</h1>
                <form id="edit-form">
                    <label class="edit-label">Название:</label>
                    <input id="title-input" class="edit-input" type="text" value="${item.title}">
                    <label class="edit-label">Краткое описание:</label>
                    <input id="text-input" class="edit-input" type="text" value="${item.text}">
                    <label class="edit-label">Полное описание:</label>
                    <textarea id="description-input" class="edit-textarea">${item.description}</textarea>
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
        `);

        // Set initial selected
        const attrBtn = document.getElementById(`edit-attr-${item.attribute}`);
        if (attrBtn) attrBtn.classList.add('selected');

        const compBtn = document.getElementById(`edit-comp-${item.complexity}`);
        if (compBtn) compBtn.classList.add('selected');

        // Add listeners for attribute buttons
        const attrButtons = document.querySelectorAll('[id^="edit-attr-"]');
        attrButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                attrButtons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.attribute = btn.id.replace('edit-attr-', '');
            });
        });

        // Add listeners for complexity buttons
        const compButtons = document.querySelectorAll('[id^="edit-comp-"]');
        compButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                compButtons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.complexity = parseInt(btn.id.replace('edit-comp-', ''));
            });
        });

        // Submit form
        document.getElementById('edit-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const updatedData = {
                title: document.getElementById('title-input').value,
                text: document.getElementById('text-input').value,
                description: document.getElementById('description-input').value,
                attribute: this.attribute || item.attribute,
                complexity: this.complexity || item.complexity,
            };
            try {
                await ajax.patch(stockUrls.updateStockById(this.id), updatedData);
                const productPage = new CharacterPage(this.parent, this.id);
                productPage.render();
            } catch (error) {
                console.error('Ошибка при обновлении данных:', error);
            }
        });
    }

    render() {
        this.parent.innerHTML = "";
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);
        this.getData();
    }
}