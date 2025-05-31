<?php
session_start();
// Очищаем предыдущие ответы при начале нового теста
if (!isset($_GET['restart'])) {
    $_SESSION['answers'] = [];
    $_SESSION['test_started'] = true;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Тестирование знаний программирования</title>
    <link rel="stylesheet" href="style.css">
    <meta charset="utf-8">
</head>
<body>
    <div class="container">
        <h1>Тестирование знаний языков программирования</h1>
        <p>Тест содержит 12 вопросов по основам программирования.</p>
        <p>Выберите один правильный ответ для каждого вопроса.</p>
        <a href="test1.php" class="start-btn">Начать тест</a>
    </div>
</body>
</html>