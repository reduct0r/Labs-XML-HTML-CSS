
class Ajax {
    async get(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Ошибка при выполнении GET-запроса:', error);
            throw error;
        }
    }

    async patch(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error('Ошибка при выполнении PATCH-запроса:', error);
            throw error;
        }
    }
}

export const ajax = new Ajax();

// Метод get стал асинхронным (async), использует fetch и возвращает данные напрямую
// Метод patch также стал асинхронным, отправляет данные через fetch с методом PATCH