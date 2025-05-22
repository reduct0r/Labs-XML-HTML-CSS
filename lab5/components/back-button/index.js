export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document.getElementById("back-button").addEventListener("click", listener);
    }

    getHTML() {
        return `
            <div style="display: flex; justify-content: center; margin-top: 20px;">
                <button id="back-button" style="padding: 0.5rem 1rem; background-color: #FFA115; color: white; border: none; border-radius: 4px;">Назад</button>
            </div>
        `;
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(listener);
    }
}