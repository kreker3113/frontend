<?php
session_start();

// Проверка авторизации
if (!isset($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true) {
    header("Location: index.php");
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Секретная страница</title>
    <meta charset="utf-8">
</head>
<body>
    <h1>Добро пожаловать, <?= htmlspecialchars($_SESSION['username']) ?>!</h1>
    <p>Это защищенная страница, доступная только авторизованным пользователям.</p>
    <a href="logout.php">Выйти</a>
</body>
</html>