export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
        document.getElementById(`click-card-${data.id}`).addEventListener("click", listener);
    }

    getHTML(data) {
        return `
            <div class="card" style="width: 300px; background: #333; color: #fff;">
                <img class="card-img-top" src="${data.src}" alt="картинка" style="object-fit: cover; height: 180px;"/>
                <div class="card-body" style="display: flex; flex-direction: column; gap: 8px;">
                    <h5 class="card-title" style="margin-bottom: 0; color: #fff;">${data.title}</h5>
                    <p class="card-text" style="flex-grow: 1; font-size: 0.9rem; color: #ccc;">${data.text}</p>
                    <button 
                        id="click-card-${data.id}" 
                        data-id="${data.id}"
                        style="
                            padding: 6px 14px;
                            border: 1px solid #ccc;
                            background-color: #fff;
                            border-radius: 4px;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            color: #737373;
                        " onmouseover="this.style.color='#FFA115'" onmouseout="this.style.color='#737373'">
                        Открыть персонажа
                    </button>
                </div>
            </div>
        `;
    }
}