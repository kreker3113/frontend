document.addEventListener('DOMContentLoaded', function() {
    // Общая функциональность для всех аккордеонов
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // Задание 1: Дата и время (вариант 3)
    function updateDateTime() {
        const now = new Date();
        const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        
        const day = String(now.getDate()).padStart(2, '0');
        const month = months[now.getMonth()];
        const year = now.getFullYear();
        const dayOfWeek = days[now.getDay()];
        
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        document.getElementById('datetime').innerHTML = `
            <div>Сегодня: ${day} ${month} ${year} года</div>
            <div>${dayOfWeek}</div>
            <div>Текущее время: ${hours}:${minutes}:${seconds}</div>
        `;
    }
    
    setInterval(updateDateTime, 1000);
    updateDateTime();

    // Задание 2: Календарь (вариант 3)
    function generateCalendar() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        let calendarHTML = `
            <div class="calendar-header">${months[month]} ${year}</div>
            <div class="calendar-weekdays">
        `;
        
        weekdays.forEach(day => {
            calendarHTML += `<div>${day}</div>`;
        });
        
        calendarHTML += `</div><div class="calendar-days">`;
        
        // Пустые ячейки для дней предыдущего месяца
        for (let i = 1; i < firstDay; i++) {
            calendarHTML += `<div class="calendar-day empty"></div>`;
        }
        
        // Дни текущего месяца
        for (let i = 1; i <= daysInMonth; i++) {
            const dayOfWeek = new Date(year, month, i).getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            calendarHTML += `<div class="calendar-day ${isWeekend ? 'weekend' : ''}">${i}</div>`;
        }
        
        calendarHTML += `</div>`;
        document.getElementById('calendar').innerHTML = calendarHTML;
    }
    
    generateCalendar();

    // Задание 3: Нахождение элементов в DOM (вариант 3 - только списков)
    // В JavaScript файле заменяем функцию countListElements() на следующую:
function countListElements() {
    // Создаем новый список
    const newList = document.createElement('ul');
    newList.className = 'single-list';
    
    // Добавляем в него 5 элементов
    for (let i = 1; i <= 5; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = `Элемент списка ${i}`;
        newList.appendChild(listItem);
    }
    
    // Выводим список и информацию о нем
    const domElementsContainer = document.getElementById('dom-elements');
    domElementsContainer.innerHTML = `
        <p>Создан один список с 5 элементами:</p>
    `;
    domElementsContainer.appendChild(newList);
    
    // Добавляем информацию о количестве дочерних элементов
    const childCountInfo = document.createElement('p');
    childCountInfo.textContent = `Количество дочерних элементов: ${newList.children.length}`;
    domElementsContainer.appendChild(childCountInfo);
}

// Вызываем функцию при загрузке страницы
countListElements();

    // Задание 4: Изменение объекта (вариант 3 - удаление из видимости)
    function randomBlockChange() {
        const blocks = document.querySelectorAll('.change-block');
        const visibleBlocks = Array.from(blocks).filter(block => block.style.display !== 'none');
        
        if (visibleBlocks.length > 0) {
            const randomIndex = Math.floor(Math.random() * visibleBlocks.length);
            const randomBlock = visibleBlocks[randomIndex];
            
            randomBlock.style.transition = 'opacity 0.5s';
            randomBlock.style.opacity = '0';
            
            setTimeout(() => {
                randomBlock.style.display = 'none';
                randomBlock.style.opacity = '1';
            }, 500);
        } else {
            // Если все блоки скрыты, показываем их все
            blocks.forEach(block => {
                block.style.display = '';
            });
        }
    }
    
    setInterval(randomBlockChange, 120);

    // Задание 5: Создание элемента (вариант 3 - список)
    document.getElementById('create-list-btn').addEventListener('click', function() {
        const container = document.getElementById('list-container');
        container.innerHTML = '';
        
        const ul = document.createElement('ul');
        ul.className = 'dynamic-list';
        container.appendChild(ul);
        
        function addListItem() {
            const itemText = prompt('Введите текст для нового пункта списка:');
            if (itemText === null || itemText.trim() === '') return;
            
            const li = document.createElement('li');
            li.textContent = itemText;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '×';
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (confirm(`Удалить пункт "${itemText}"?`)) {
                    li.remove();
                }
            });
            
            li.appendChild(deleteBtn);
            ul.appendChild(li);
            
            li.addEventListener('click', function() {
                const newText = prompt('Изменить текст пункта:', itemText);
                if (newText !== null && newText.trim() !== '') {
                    li.firstChild.textContent = newText;
                }
            });
            
            addListItem();
        }
        
        addListItem();
    });

    // Задание 6: Обработка события (вариант 3 - перебор элементов)
    const eventItems = [
        { type: 'text', content: 'Текст 1' },
        { type: 'text', content: 'Текст 2' },
        { type: 'block', content: 'Блок с информацией' },
        { type: 'image', content: 'https://via.placeholder.com/150' }
    ];
    
    let currentEventItem = 0;
    
    document.getElementById('event-btn').addEventListener('click', function() {
        const container = document.getElementById('event-container');
        container.innerHTML = '';
        
        const item = eventItems[currentEventItem % eventItems.length];
        const element = document.createElement('div');
        element.className = 'event-item';
        
        if (item.type === 'text') {
            element.textContent = item.content;
        } else if (item.type === 'block') {
            element.textContent = item.content;
            element.style.backgroundColor = '#bbdefb';
        } else if (item.type === 'image') {
            const img = document.createElement('img');
            img.src = item.content;
            img.alt = 'Изображение';
            element.appendChild(img);
        }
        
        container.appendChild(element);
        currentEventItem++;
    });

    // Задание 7: Раскрывающееся меню (вариант 3)
    document.querySelector('.menu-title').addEventListener('click', function() {
        const submenu = document.querySelector('.submenu');
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    });
    
    const menuItems = document.querySelectorAll('.submenu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const itemText = this.textContent;
            this.style.transition = 'opacity 0.5s';
            this.style.opacity = '0';
            
            setTimeout(() => {
                this.remove();
                
                const remainingItems = document.querySelectorAll('.submenu li');
                if (remainingItems.length === 0) {
                    document.getElementById('sweets-message').textContent = 'Сладости закончились';
                }
            }, 500);
        });
    });

    // Задание 8: Эффект при наведении (вариант 3)
    // const hoverImage = document.getElementById('hover-image');
    // const hiddenText = document.querySelector('.hidden-text');
    
    // hoverImage.addEventListener('mouseover', function() {
    //     this.style.opacity = '0.5';
    //     hiddenText.style.opacity = '1';
    // });
    
    // hoverImage.addEventListener('mouseout', function() {
    //     this.style.opacity = '1';
    //     hiddenText.style.opacity = '0';
    // });
        

    // Задание 9: Регулярные выражения (вариант 3)
    document.getElementById('registration-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const emailError = document.getElementById('email-error');
        
        // Простая проверка email
        const emailRegex = /.+@.+/;
        
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Email должен содержать символ @';
            document.getElementById('email').style.borderColor = '#d9534f';
        } else {
            emailError.textContent = '';
            document.getElementById('email').style.borderColor = '#4CAF50';
            alert('Форма отправлена!');
        }
    });

    // Задание 10: Обработчик формы (вариант 3)
    document.getElementById('extended-form').addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Проверка логина
        const login = document.getElementById('login').value;
        const loginError = document.getElementById('login-error');
        if (login.length < 4) {
            loginError.textContent = 'Логин должен содержать минимум 4 символа';
            document.getElementById('login').style.borderColor = '#d9534f';
            isValid = false;
        } else {
            loginError.textContent = '';
            document.getElementById('login').style.borderColor = '#4CAF50';
        }
        
        // Проверка пароля
        const password = document.getElementById('password').value;
        const passwordError = document.getElementById('password-error');
        if (password.length < 6) {
            passwordError.textContent = 'Пароль должен содержать минимум 6 символов';
            document.getElementById('password').style.borderColor = '#d9534f';
            isValid = false;
        } else {
            passwordError.textContent = '';
            document.getElementById('password').style.borderColor = '#4CAF50';
        }
        
        // Проверка подтверждения пароля
        const confirmPassword = document.getElementById('confirm-password').value;
        const confirmPasswordError = document.getElementById('confirm-password-error');
        if (password !== confirmPassword) {
            confirmPasswordError.textContent = 'Пароли не совпадают';
            document.getElementById('confirm-password').style.borderColor = '#d9534f';
            isValid = false;
        } else {
            confirmPasswordError.textContent = '';
            document.getElementById('confirm-password').style.borderColor = '#4CAF50';
        }
        
        // Проверка email
        const email = document.getElementById('email').value;
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Введите корректный email (пример: user@example.com)';
            document.getElementById('email').style.borderColor = '#d9534f';
            isValid = false;
        } else {
            emailError.textContent = '';
            document.getElementById('email').style.borderColor = '#4CAF50';
        }
        
        // Проверка телефона
        const phone = document.getElementById('phone').value;
        const phoneError = document.getElementById('phone-error');
        const phoneRegex = /^\+?\d{10,15}$/;
        if (!phoneRegex.test(phone)) {
            phoneError.textContent = 'Введите корректный номер телефона (10-15 цифр)';
            document.getElementById('phone').style.borderColor = '#d9534f';
            isValid = false;
        } else {
            phoneError.textContent = '';
            document.getElementById('phone').style.borderColor = '#4CAF50';
        }
        
        // Проверка даты
        const birthdate = document.getElementById('birthdate').value;
        const birthdateError = document.getElementById('birthdate-error');
        const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
        if (!dateRegex.test(birthdate)) {
            birthdateError.textContent = 'Введите дату в формате ДД.ММ.ГГГГ';
            document.getElementById('birthdate').style.borderColor = '#d9534f';
            isValid = false;
        } else {
            birthdateError.textContent = '';
            document.getElementById('birthdate').style.borderColor = '#4CAF50';
        }
        
        if (isValid) {
            document.getElementById('form-result').innerHTML = `
                <div style="margin-top: 20px; padding: 15px; background-color: #e8f5e9; border-radius: 5px;">
                    <h3>Форма успешно отправлена!</h3>
                    <p><strong>Логин:</strong> ${login}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>ФИО:</strong> ${document.getElementById('full-name').value}</p>
                    <p><strong>Телефон:</strong> ${phone}</p>
                    <p><strong>Дата рождения:</strong> ${birthdate}</p>
                    <p><strong>Факультет:</strong> ${document.getElementById('faculty').value}</p>
                    <p><strong>Кафедра:</strong> ${document.getElementById('department').value}</p>
                </div>
            `;
        }
    });

    // Задание 11: Игра (вариант 3 - крестики-нолики)
    const gameBoard = document.getElementById('game-board');
    const gameStatus = document.getElementById('game-status');
    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    
    // Создаем игровое поле
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'game-cell';
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }
    
    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.dataset.index);
        
        if (boardState[clickedCellIndex] !== '' || !gameActive) return;
        
        boardState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        
        checkGameResult();
    }
    
    function checkGameResult() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        
        let roundWon = false;
        
        for (let i = 0; i < winPatterns.length; i++) {
            const [a, b, c] = winPatterns[i];
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                roundWon = true;
                break;
            }
        }
        
        if (roundWon) {
            gameStatus.textContent = `Игрок ${currentPlayer} победил!`;
            gameActive = false;
            return;
        }
        
        if (!boardState.includes('')) {
            gameStatus.textContent = 'Ничья!';
            gameActive = false;
            return;
        }
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Ход игрока ${currentPlayer}`;
    }
    
    document.getElementById('reset-game').addEventListener('click', resetGame);
    
    function resetGame() {
        currentPlayer = 'X';
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        gameStatus.textContent = `Ход игрока ${currentPlayer}`;
        
        document.querySelectorAll('.game-cell').forEach(cell => {
            cell.textContent = '';
        });
    }
    
    gameStatus.textContent = `Ход игрока ${currentPlayer}`;
});