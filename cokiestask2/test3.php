<?php
session_start();
if (!isset($_SESSION['test_started'])) {
    header("Location: index.php");
    exit;
}

// Сохраняем ответы из предыдущей формы
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    for ($i = 5; $i <= 8; $i++) {
        if (isset($_POST["answer$i"])) {
            $_SESSION['answers']["q$i"] = $_POST["answer$i"];
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Вопросы 9-12 | Тестирование</title>
    <link rel="stylesheet" href="style.css">
    <meta charset="utf-8">
</head>
<body>
    <div class="container">
        <h1>Вопросы 9-12 из 12</h1>
        <form action="result.php" method="post">
            
            <!-- Вопрос 9 -->
            <div class="question-block">
                <p>9. Какой из этих языков компилируется в JavaScript?</p>
                <label><input type="radio" name="answer9" value="A" <?= isset($_SESSION['answers']['q9']) && $_SESSION['answers']['q9'] == 'A' ? 'checked' : '' ?> required> A) Python</label>
                <label><input type="radio" name="answer9" value="B" <?= isset($_SESSION['answers']['q9']) && $_SESSION['answers']['q9'] == 'B' ? 'checked' : '' ?>> B) TypeScript</label>
                <label><input type="radio" name="answer9" value="C" <?= isset($_SESSION['answers']['q9']) && $_SESSION['answers']['q9'] == 'C' ? 'checked' : '' ?>> C) Ruby</label>
                <label><input type="radio" name="answer9" value="D" <?= isset($_SESSION['answers']['q9']) && $_SESSION['answers']['q9'] == 'D' ? 'checked' : '' ?>> D) Java</label>
            </div>

            <!-- Вопрос 10 -->
            <div class="question-block">
                <p>10. Что такое REST API?</p>
                <label><input type="radio" name="answer10" value="A" <?= isset($_SESSION['answers']['q10']) && $_SESSION['answers']['q10'] == 'A' ? 'checked' : '' ?> required> A) Язык программирования</label>
                <label><input type="radio" name="answer10" value="B" <?= isset($_SESSION['answers']['q10']) && $_SESSION['answers']['q10'] == 'B' ? 'checked' : '' ?>> B) Архитектурный стиль для создания веб-сервисов</label>
                <label><input type="radio" name="answer10" value="C" <?= isset($_SESSION['answers']['q10']) && $_SESSION['answers']['q10'] == 'C' ? 'checked' : '' ?>> C) Фреймворк для тестирования</label>
                <label><input type="radio" name="answer10" value="D" <?= isset($_SESSION['answers']['q10']) && $_SESSION['answers']['q10'] == 'D' ? 'checked' : '' ?>> D) Система управления базами данных</label>
            </div>

            <!-- Вопрос 11 -->
            <div class="question-block">
                <p>11. Какой метод массива в JavaScript создает новый массив с результатами вызова функции для каждого элемента?</p>
                <label><input type="radio" name="answer11" value="A" <?= isset($_SESSION['answers']['q11']) && $_SESSION['answers']['q11'] == 'A' ? 'checked' : '' ?> required> A) forEach()</label>
                <label><input type="radio" name="answer11" value="B" <?= isset($_SESSION['answers']['q11']) && $_SESSION['answers']['q11'] == 'B' ? 'checked' : '' ?>> B) map()</label>
                <label><input type="radio" name="answer11" value="C" <?= isset($_SESSION['answers']['q11']) && $_SESSION['answers']['q11'] == 'C' ? 'checked' : '' ?>> C) filter()</label>
                <label><input type="radio" name="answer11" value="D" <?= isset($_SESSION['answers']['q11']) && $_SESSION['answers']['q11'] == 'D' ? 'checked' : '' ?>> D) reduce()</label>
            </div>

            <!-- Вопрос 12 -->
            <div class="question-block">
                <p>12. Что такое Promise в JavaScript?</p>
                <label><input type="radio" name="answer12" value="A" <?= isset($_SESSION['answers']['q12']) && $_SESSION['answers']['q12'] == 'A' ? 'checked' : '' ?> required> A) Функция для работы с DOM</label>
                <label><input type="radio" name="answer12" value="B" <?= isset($_SESSION['answers']['q12']) && $_SESSION['answers']['q12'] == 'B' ? 'checked' : '' ?>> B) Объект представляющий завершение или провал асинхронной операции</label>
                <label><input type="radio" name="answer12" value="C" <?= isset($_SESSION['answers']['q12']) && $_SESSION['answers']['q12'] == 'C' ? 'checked' : '' ?>> C) Метод для работы с массивами</label>
                <label><input type="radio" name="answer12" value="D" <?= isset($_SESSION['answers']['q12']) && $_SESSION['answers']['q12'] == 'D' ? 'checked' : '' ?>> D) Специальный тип переменной</label>
            </div>

            <button type="submit" class="finish-btn">Завершить тест</button>
        </form>
        <div class="progress">Прогресс: 3/3 части теста</div>
    </div>
</body>
</html>