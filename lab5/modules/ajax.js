import { stockUrls } from "../../modules/stockUrls.js";

class Ajax {
    get(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

patch(url, data, callback) {
    const xhr = new XMLHttpRequest();
    console.log('Отправка PATCH-запроса на:', url);
    xhr.open('PATCH', url);
    xhr.setRequestHeader('Content-Type', 'application/json');

    try {
        xhr.send(JSON.stringify(data));
        console.log('Данные отправлены:', data);
    } catch (e) {
        console.error('Ошибка при отправке данных:', e);
        callback(null, 500);
        return;
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            console.log('Ответ сервера:', xhr.status, xhr.responseText);
            this._handleResponse(xhr, callback);
        }
    };
}
    _handleResponse(xhr, callback) {
        try {
            const data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
            callback(data, xhr.status);
        } catch (e) {
            console.error('Ошибка парсинга JSON:', e);
            callback(null, xhr.status);
        }
    }
}

export const ajax = new Ajax();