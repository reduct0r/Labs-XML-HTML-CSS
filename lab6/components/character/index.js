export class CharacterComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(data) {
        const complexityHTML = '★'.repeat(data.complexity) + '☆'.repeat(3 - data.complexity);

        const html = `
            <div class="product-container">
                <img class="product-image" src="${data.src}">
                <h1 style="text-align: center; margin: 10px 0;">${data.title}</h1>
                <div class="info-holder">
                    <div>Атрибут: <img src="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_${data.attribute}.png" alt="${data.attribute}" style="width: 32px; height: 32px; vertical-align: middle;"></div>
                    <div>Сложность: <span style="color: gold;">${complexityHTML}</span></div>
                </div>
                <div class="text-holder">
                    <p>${data.text}</p>
                </div>
                <div class="text-holder">
                    <p>${data.description}</p>
                </div>
            </div>
        `;
        this.parent.insertAdjacentHTML("beforeend", html);
    }
}