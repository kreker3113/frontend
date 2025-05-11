// Функция для анимации чисел
function animateNumber(element, targetNumber, duration) {
    let currentNumber = 0;
    const increment = targetNumber / (duration / 16); // 16ms — время одного кадра

    const interval = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            clearInterval(interval);
            currentNumber = targetNumber; // Убедимся, что число точно равно целевому
        }
        element.textContent = Math.floor(currentNumber); // Обновляем текст
    }, 16); // 16ms — примерно 60 кадров в секунду
}

// Запуск анимации для всех элементов с классом .animatedNumber
function startAnimations() {
    const elements = document.querySelectorAll('.animatedNumber'); // Находим все элементы

    elements.forEach((element) => {
        const targetNumber = parseInt(element.getAttribute('data-target')); // Получаем целевое число
        animateNumber(element, targetNumber, 2000); // Запускаем анимацию
    });
}

// Создаем Intersection Observer
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Если блок .block3 виден, запускаем анимацию
                startAnimations();
                observer.unobserve(entry.target); // Прекращаем наблюдение после запуска
            }
        });
    },
    {
        threshold: 0.5, // Анимация запустится, когда 50% блока будет видно
    }
);

// Находим блок .block3 и начинаем наблюдение
const block3 = document.querySelector('.block3');
if (block3) {
    observer.observe(block3);
}