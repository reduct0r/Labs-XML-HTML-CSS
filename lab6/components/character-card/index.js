export class CharacterCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
        document.getElementById(`card-${data.id}`).addEventListener("click", listener);
    }

    getAttributeColor(attribute) {
        switch (attribute.toLowerCase()) {
            case 'strength':
                return '#C23C2A';
            case 'agility':
                return '#0DAB60';
            case 'intelligence':
                return '#37A1C3';
            case 'universal':
                return '#D1B109';
            default:
                return '#fff';
        }
    }

    getAttributeIcon(attribute) {
        return `https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_${attribute.toLowerCase()}.png`;
    }

    getHTML(data) {
        return `
            <div id="card-${data.id}" class="hero-card" data-id="${data.id}">
                <img src="${data.src}" alt="${data.title}" style="width: 100%; height: auto;">
                <div class="hero-overlay">
                    <div class="hero-info">
                        <img class="attribute-icon" src="${this.getAttributeIcon(data.attribute || 'universal')}" style="width: 24px; height: 24px;">
                        <span class="hero-name">${data.title}</span>
                    </div>
                </div>
            </div>
        `;
    }
}