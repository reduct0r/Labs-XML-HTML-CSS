export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card m-2" style="width: 18rem;">
                <img src="${data.src}" class="card-img-top" alt="${data.title}" onerror="this.src='https://placehold.co/300x200?text=Image+Not+Found'">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <button class="btn btn-primary" data-id="${data.id}">Подробнее</button>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        document.querySelector(`button[data-id="${data.id}"]`).addEventListener("click", listener);
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}