import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            {
                id: 1,
                src: "./assets/images/photo1.jpg", // Локальное изображение
                title: "Дизайн 1",
                text: "Современный минимализм с чистыми линиями и нейтральной палитрой."
            },
            {
                id: 2,
                src: "./assets/images/photo2.jpg", // Локальное изображение
                title: "Дизайн 2",
                text: "Классический стиль с элегантной мебелью и теплыми тонами."
            }
        ];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `<div id="main-page" class="d-flex flex-wrap p-3"></div>`;
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const data = this.getData();
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }
}