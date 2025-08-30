export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div style="max-width: 800px; margin: 2rem auto; padding: 2rem; border-radius: 0; box-shadow: 0 2px 12px rgba(0,0,0,0.2); background: #0a0e17; color: #fff;">
                <img src="${data.src}" alt="icon" style="width: 100%; max-height: 300px; object-fit: cover; margin-bottom: 1.5rem;">
                <h2 style="font-weight: 700; font-size: 2rem; color: #fff; margin-bottom: 1rem;">${data.title}</h2>
                <p style="font-size: 1.1rem; color: #ccc; margin-bottom: 1.5rem;">${data.text}</p>
                <div style="font-size: 1rem; line-height: 1.6; color: #ccc; margin-bottom: 2rem;">
                    <strong style="color: #fff;">Описание персонажа:</strong>
                    <p>${data.description || "Подробного описания пока нет."}</p>
                </div>
                <div style="margin-top: 2rem;">
                    <h3 style="color: #fff; margin-bottom: 1rem;">Редактировать персонажа</h3>
                    <form id="edit-form">
                        <div style="margin-bottom: 1rem;">
                            <label for="title-input" style="color: #ccc;">Имя:</label>
                            <input type="text" id="title-input" value="${data.title}" style="width: 100%; padding: 0.5rem; background: #111; color: #fff; border: 1px solid #333; border-radius: 0;" />
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label for="text-input" style="color: #ccc;">Краткое описание:</label>
                            <input type="text" id="text-input" value="${data.text}" style="width: 100%; padding: 0.5rem; background: #111; color: #fff; border: 1px solid #333; border-radius: 0;" />
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label for="description-input" style="color: #ccc;">Подробное описание:</label>
                            <textarea id="description-input" style="width: 100%; height: 150px; padding: 0.5rem; background: #111; color: #fff; border: 1px solid #333; border-radius: 0;">${data.description || ''}</textarea>
                        </div>
                        <button type="submit" style="padding: 0.5rem 1rem; background-color: #A91E22; color: white; border: none; border-radius: 0;">Сохранить</button>
                    </form>
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
    }
}
