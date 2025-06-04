function retry(fn, retries, delay) {
    return new Promise((resolve, reject) => {
        function attempt() {
            fn()
                .then(resolve)
                .catch(error => {
                    if (retries <= 0) {
                        reject(new Error(`Не удалось выполнить запрос после ${retries} попыток: ${error.message}`));
                    } else {
                        console.log(`Попытка не удалась. Осталось попыток: ${retries}. Повтор через ${delay} мс...`);
                        retries--;
                        setTimeout(attempt, delay);
                    }
                });
        }
        attempt();
    });
}

// Пример функции с симуляцией ошибок
function fetchWithError() {
    return new Promise((resolve, reject) => {
        // 70% вероятность ошибки
        if (Math.random() > 0.3) {
            reject(new Error('Симулированная ошибка сервера'));
        } else {
            resolve('Успешный результат');
        }
    });
}

// Тестирование функции retry
retry(fetchWithError, 3, 1000)
    .then(result => console.log('Успех:', result))
    .catch(error => console.log('Ошибка:', error.message));