import { stockUrls } from "../../modules/characterUrls.js";
import { ajax } from "../../modules/ajax.js";
import { MainPage } from "../main/index.js";
import { EditPage } from "../edit/index.js";
import { CharacterComponent } from "../../components/character/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";

export class CharacterPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
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
        return document.getElementById("product-page");
    }

    getHTML() {
        return `
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
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    clickEdit() {
        const editPage = new EditPage(this.parent, this.id);
        editPage.render();
    }

    renderData(item) {
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const product = new CharacterComponent(this.pageRoot);
        product.render(item);

        this.pageRoot.insertAdjacentHTML('beforeend', `
            <div style="display: flex; justify-content: center; margin-top: 20px;">
                <button id="edit-button" class="edit-btn">Редактировать</button>
            </div>
        `);
        document.getElementById('edit-button').addEventListener('click', this.clickEdit.bind(this));
    }

    render() {
        this.parent.innerHTML = "";
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);
        this.getData();
    }
}