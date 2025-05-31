<?php
session_start();

// Проверка количества попыток
$current_time = time();
if ($_SESSION['login_attempts'] >= 3 && ($current_time - $_SESSION['last_attempt_time']) < 60) {
    header("Location: index.php");
    exit;
}

// Проверка отправки формы
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Пример валидных пользователей (в реальном приложении нужно проверять в БД)
    $valid_users = [
        'admin' => '12345',
        'user1' => 'password1',
        'user2' => 'password2'
    ];
    
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    // Проверка логина и пароля
    if (isset($valid_users[$username]) && $valid_users[$username] === $password) {
        // Успешная авторизация
        $_SESSION['authenticated'] = true;
        $_SESSION['username'] = $username;
        $_SESSION['login_attempts'] = 0;
        header("Location: secretplace.php");
        exit;
    } else {
        // Неудачная попытка
        $_SESSION['login_attempts']++;
        $_SESSION['last_attempt_time'] = $current_time;
        header("Location: index.php?error=1");
        exit;
    }
}

// Если запрос не POST, перенаправляем на форму
header("Location: index.php");
exit;
?>