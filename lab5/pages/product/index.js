import { stockUrls } from "../../modules/stockUrls.js";
import { ajax } from "../../modules/ajax.js";
import { MainPage } from "../main/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        ajax.get(stockUrls.getStockById(this.id), (data) => {
            this.renderData(data);
        });
    }

    get pageRoot() {
        return document.getElementById("product-page");
    }

    getHTML() {
        return `<div id="product-page"></div>`;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    renderData(item) {
        const product = new ProductComponent(this.pageRoot);
        product.render(item);

        const editForm = document.getElementById('edit-form');
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const updatedData = {
                title: document.getElementById('title-input').value,
                text: document.getElementById('text-input').value,
                description: document.getElementById('description-input').value,
            };
            ajax.patch(stockUrls.updateStockById(this.id), updatedData, (data, status) => {
                if (status === 200) {
                    this.getData();
                } else {
                    console.error('Failed to update');
                }
            });
        });

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));
    }

    render() {
        this.parent.innerHTML = "";
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);
        this.getData();
    }
}