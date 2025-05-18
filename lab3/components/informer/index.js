export class InformerComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(message) {
        return `
            <button type="button" class="btn btn-primary position-relative" 
                    data-bs-toggle="popover" 
                    data-bs-content="${message}"
                    data-bs-placement="top"
                    data-bs-trigger="hover">
                Информация
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    !
                </span>
            </button>
        `;
    }

    render(message) {
        const html = this.getHTML(message);
        this.parent.insertAdjacentHTML('beforeend', html);

        // Инициализация Popover
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    }
}