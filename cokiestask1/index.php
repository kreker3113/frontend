<?php
session_start();

// Инициализация счетчика попыток
if (!isset($_SESSION['login_attempts'])) {
    $_SESSION['login_attempts'] = 0;
    $_SESSION['last_attempt_time'] = 0;
}

// Проверка блокировки
$current_time = time();
if ($_SESSION['login_attempts'] >= 3 && ($current_time - $_SESSION['last_attempt_time']) < 60) {
    $error_message = "Вы исчерпали все попытки входа. Пожалуйста, попробуйте через минуту.";
} elseif (isset($_GET['error'])) {
    $remaining_attempts = 3 - $_SESSION['login_attempts'];
    $error_message = "Неверный логин или пароль. Осталось попыток: $remaining_attempts";
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Авторизация</title>
    <meta charset="utf-8">
</head>
<body>
    <h1>Авторизация</h1>
    <?php if (isset($error_message)): ?>
        <p style="color: red;"><?= htmlspecialchars($error_message) ?></p>
    <?php endif; ?>
    
    <form method="post" action="authorize.php">
        <div>
            <label for="username">Логин:</label>
            <input type="text" id="username" name="username" required>
        </div>
        <div>
            <label for="password">Пароль:</label>
            <input type="password" id="password" name="password" required>
        </div>
        <button type="submit">Войти</button>
    </form>
</body>
</html>