import { BackButtonComponent } from "../../components/back-button/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { InformerComponent } from "../../components/informer/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const designs = {
            1: {
                id: 1,
                src: "./assets/images/photo1.jpg", // Локальное изображение
                title: "Дизайн 1",
                text: "Подробное описание дизайна 1. Современный минимализм с акцентом на простоту и функциональность."
            },
            2: {
                id: 2,
                src: "./assets/images/photo2.jpg", // Локальное изображение
                title: "Дизайн 2",
                text: "Подробное описание дизайна 2. Классический стиль с изысканными деталями и роскошной отделкой."
            }
        };
        return designs[this.id] || designs[1]; // Возвращаем дизайн по id или первый по умолчанию
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `<div id="product-page" class="p-3"></div>`;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const product = new ProductComponent(this.pageRoot);
        product.render(data);

        const informer = new InformerComponent(this.pageRoot);
        informer.render(`Информация о дизайне ${this.id}: актуальный тренд 2025 года.`);
    }
}