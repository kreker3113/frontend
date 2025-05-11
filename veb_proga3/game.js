// Инициализация canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const score1Element = document.getElementById('score1');
const score2Element = document.getElementById('score2');

// Игровые переменные
let gameRunning = false;
let score1 = 0;
let score2 = 0;
const maxScore = 5;
let gameOver = false;
let animationFrameId = null;

// Размеры и параметры игры
const TANK_SIZE = 40;
const BULLET_SIZE = 5;
const BULLET_SPEED = 7;
const TANK_SPEED = 3;
const SHOOT_DELAY = 500;

// Объекты танков
const tank1 = {
    x: 100,
    y: canvas.height / 2 - TANK_SIZE / 2,
    width: TANK_SIZE,
    height: TANK_SIZE,
    color: '#4CAF50',
    speed: TANK_SPEED,
    direction: 0, // 0-вверх, 1-вправо, 2-вниз, 3-влево
    lastShot: 0,
    bullets: []
};

const tank2 = {
    x: canvas.width - 100 - TANK_SIZE,
    y: canvas.height / 2 - TANK_SIZE / 2,
    width: TANK_SIZE,
    height: TANK_SIZE,
    color: '#2196F3',
    speed: TANK_SPEED,
    direction: 2,
    lastShot: 0,
    bullets: []
};

// Препятствия (стены)
const walls = [
    { x: 300, y: 100, width: 200, height: 50 },
    { x: 300, y: 450, width: 200, height: 50 },
    { x: 200, y: 250, width: 50, height: 100 },
    { x: 550, y: 250, width: 50, height: 100 }
];

// Взрывы
const explosions = [];

// Управление
const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    arrowup: false,
    arrowdown: false,
    arrowleft: false,
    arrowright: false
};

// Обработчики событий
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);

document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'w' || key === 'a' || key === 's' || key === 'd' ||
        key === 'arrowup' || key === 'arrowdown' || key === 'arrowleft' || key === 'arrowright') {
        keys[key] = true;
    }
    // Стрельба танка 1 (Пробел)
    if (key === ' ' && gameRunning) {
        const now = Date.now();
        if (now - tank1.lastShot > SHOOT_DELAY) {
            tank1.lastShot = now;
            shoot(tank1);
        }
    }
    
    // Стрельба танка 2 (Enter)
    if (key === 'enter' && gameRunning) {
        const now = Date.now();
        if (now - tank2.lastShot > SHOOT_DELAY) {
            tank2.lastShot = now;
            shoot(tank2);
        }
    }
});

document.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'w' || key === 'a' || key === 's' || key === 'd' ||
        key === 'arrowup' || key === 'arrowdown' || key === 'arrowleft' || key === 'arrowright') {
        keys[key] = false;
    }
});

// Основные функции игры
function startGame() {
    if (!gameRunning && !gameOver) {
        gameRunning = true;
        resetTanks();
        gameLoop();
    }
}

function resetGame() {
    gameRunning = false;
    gameOver = false;
    score1 = 0;
    score2 = 0;
    score1Element.textContent = '0';
    score2Element.textContent = '0';
    tank1.bullets = [];
    tank2.bullets = [];
    explosions.length = 0;
    resetTanks();
    draw();
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
}

function resetTanks() {
    tank1.x = 100;
    tank1.y = canvas.height / 2 - TANK_SIZE / 2;
    tank1.direction = 0;
    
    tank2.x = canvas.width - 100 - TANK_SIZE;
    tank2.y = canvas.height / 2 - TANK_SIZE / 2;
    tank2.direction = 2;
}

function gameLoop() {
    update();
    draw();
    
    if (gameRunning && !gameOver) {
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}

// Функции обновления игры
function update() {
    updateTankMovement(tank1, 'w', 'a', 's', 'd');
    updateTankMovement(tank2, 'arrowup', 'arrowleft', 'arrowdown', 'arrowright');
    
    updateBullets(tank1);
    updateBullets(tank2);
    
    updateExplosions();
}

function updateTankMovement(tank, upKey, leftKey, downKey, rightKey) {
    if (keys[upKey]) {
        tank.direction = 0;
        if (!checkCollision(tank, 0, -tank.speed)) {
            tank.y -= tank.speed;
        }
    }
    if (keys[downKey]) {
        tank.direction = 2;
        if (!checkCollision(tank, 0, tank.speed)) {
            tank.y += tank.speed;
        }
    }
    if (keys[leftKey]) {
        tank.direction = 3;
        if (!checkCollision(tank, -tank.speed, 0)) {
            tank.x -= tank.speed;
        }
    }
    if (keys[rightKey]) {
        tank.direction = 1;
        if (!checkCollision(tank, tank.speed, 0)) {
            tank.x += tank.speed;
        }
    }
}

function checkCollision(tank, dx, dy) {
    const newX = tank.x + dx;
    const newY = tank.y + dy;
    
    // Границы canvas
    if (newX < 0 || newX + tank.width > canvas.width || 
        newY < 0 || newY + tank.height > canvas.height) {
        return true;
    }
    
    // Стены
    for (const wall of walls) {
        if (newX < wall.x + wall.width &&
            newX + tank.width > wall.x &&
            newY < wall.y + wall.height &&
            newY + tank.height > wall.y) {
            return true;
        }
    }
    
    return false;
}

function shoot(tank) {
    const bullet = {
        x: tank.x + tank.width / 2 - BULLET_SIZE / 2,
        y: tank.y + tank.height / 2 - BULLET_SIZE / 2,
        width: BULLET_SIZE,
        height: BULLET_SIZE,
        speed: BULLET_SPEED,
        direction: tank.direction,
        color: tank.color
    };
    
    // Корректировка позиции пули
    switch (tank.direction) {
        case 0: bullet.y -= tank.height / 2; break;
        case 1: bullet.x += tank.width / 2; break;
        case 2: bullet.y += tank.height / 2; break;
        case 3: bullet.x -= tank.width / 2; break;
    }
    
    tank.bullets.push(bullet);
}

function updateBullets(tank) {
    for (let i = tank.bullets.length - 1; i >= 0; i--) {
        const bullet = tank.bullets[i];
        
        // Движение пули
        switch (bullet.direction) {
            case 0: bullet.y -= bullet.speed; break;
            case 1: bullet.x += bullet.speed; break;
            case 2: bullet.y += bullet.speed; break;
            case 3: bullet.x -= bullet.speed; break;
        }
        
        // Проверка границ
        if (bullet.x < 0 || bullet.x > canvas.width || 
            bullet.y < 0 || bullet.y > canvas.height) {
            tank.bullets.splice(i, 1);
            continue;
        }
        
        // Проверка стен
        let hitWall = false;
        for (const wall of walls) {
            if (bullet.x < wall.x + wall.width &&
                bullet.x + bullet.width > wall.x &&
                bullet.y < wall.y + wall.height &&
                bullet.y + bullet.height > wall.y) {
                hitWall = true;
                break;
            }
        }
        
        if (hitWall) {
            tank.bullets.splice(i, 1);
            continue;
        }
        
        // Проверка попадания в танк
        const targetTank = tank === tank1 ? tank2 : tank1;
        if (bullet.x < targetTank.x + targetTank.width &&
            bullet.x + bullet.width > targetTank.x &&
            bullet.y < targetTank.y + targetTank.height &&
            bullet.y + bullet.height > targetTank.y) {
            
            createExplosion(targetTank, bullet.color);
            tank.bullets.splice(i, 1);
            
            // Обновление счета
            if (tank === tank1) {
                score1++;
                score1Element.textContent = score1;
            } else {
                score2++;
                score2Element.textContent = score2;
            }
            
            // Проверка победы
            if (score1 >= maxScore || score2 >= maxScore) {
                gameOver = true;
                showWinner();
                return;
            }
            
            // Сброс позиций
            setTimeout(resetTanks, 500);
            break;
        }
    }
}

function createExplosion(tank, color) {
    explosions.push({
        x: tank.x + tank.width / 2,
        y: tank.y + tank.height / 2,
        radius: 20,
        alpha: 1,
        color: color
    });
}

function updateExplosions() {
    for (let i = explosions.length - 1; i >= 0; i--) {
        explosions[i].alpha -= 0.05;
        explosions[i].radius += 1;
        
        if (explosions[i].alpha <= 0) {
            explosions.splice(i, 1);
        }
    }
}

function showWinner() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = '48px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    
    const winner = score1 >= maxScore ? 'ЗЕЛЕНЫЙ ТАНК' : 'СИНИЙ ТАНК';
    ctx.fillText(`ПОБЕДИТЕЛЬ: ${winner}!`, canvas.width / 2, canvas.height / 2 - 30);
    
    ctx.font = '24px Arial';
    ctx.fillText('Нажмите "Сбросить" для новой игры', canvas.width / 2, canvas.height / 2 + 30);
}

// Функции отрисовки
function draw() {
    // Очистка
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Рисование стен
    ctx.fillStyle = '#777';
    walls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
    
    // Рисование танков
    drawTank(tank1);
    drawTank(tank2);
    
    // Рисование пуль
    tank1.bullets.forEach(bullet => {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
    
    tank2.bullets.forEach(bullet => {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
    
    // Рисование взрывов
    explosions.forEach(explosion => {
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 200, 0, ${explosion.alpha})`;
        ctx.fill();
    });
}

function drawTank(tank) {
    // Корпус
    ctx.fillStyle = tank.color;
    ctx.fillRect(tank.x, tank.y, tank.width, tank.height);
    
    // Дуло
    ctx.fillStyle = '#333';
    const barrelLength = 20;
    let barrelX = tank.x + tank.width / 2;
    let barrelY = tank.y + tank.height / 2;
    let barrelWidth = 5, barrelHeight = 5;
    
    switch (tank.direction) {
        case 0: // Вверх
            barrelHeight = -barrelLength;
            barrelY -= barrelLength / 2;
            break;
        case 1: // Вправо
            barrelWidth = barrelLength;
            barrelX += barrelLength / 2;
            break;
        case 2: // Вниз
            barrelHeight = barrelLength;
            barrelY += barrelLength / 2;
            break;
        case 3: // Влево
            barrelWidth = -barrelLength;
            barrelX -= barrelLength / 2;
            break;
    }
    
    ctx.fillRect(barrelX - barrelWidth / 2, barrelY - barrelHeight / 2, barrelWidth, barrelHeight);
}

// Начальная отрисовка
draw();