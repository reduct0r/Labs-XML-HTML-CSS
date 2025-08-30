export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document.getElementById("back-button").addEventListener("click", listener);
    }

    getHTML() {
        return `
            <div style="position: absolute; top: 10px; left: 10px;">
                <button id="back-button" style="padding: 0.5rem 1rem; background-color: #A91E22; color: white; border: none; border-radius: 0;">Назад</button>
            </div>
        `;
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(listener);
    }
}