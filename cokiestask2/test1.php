<?php
session_start();
if (!isset($_SESSION['test_started'])) {
    header("Location: index.php");
    exit;
}

// Обработка отправки формы
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    for ($i = 1; $i <= 4; $i++) {
        if (isset($_POST["answer$i"])) {
            $_SESSION['answers']["q$i"] = $_POST["answer$i"];
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Вопросы 1-4 | Тестирование</title>
    <link rel="stylesheet" href="style.css">
    <meta charset="utf-8">
</head>
<body>
    <div class="container">
        <h1>Вопросы 1-4 из 12</h1>
        <form action="test2.php" method="post">
            
            <!-- Вопрос 1 -->
            <div class="question-block">
                <p>1. Какой язык используется для стилизации веб-страниц?</p>
                <label><input type="radio" name="answer1" value="A" <?= isset($_SESSION['answers']['q1']) && $_SESSION['answers']['q1'] == 'A' ? 'checked' : '' ?> required> A) HTML</label>
                <label><input type="radio" name="answer1" value="B" <?= isset($_SESSION['answers']['q1']) && $_SESSION['answers']['q1'] == 'B' ? 'checked' : '' ?>> B) CSS</label>
                <label><input type="radio" name="answer1" value="C" <?= isset($_SESSION['answers']['q1']) && $_SESSION['answers']['q1'] == 'C' ? 'checked' : '' ?>> C) SQL</label>
                <label><input type="radio" name="answer1" value="D" <?= isset($_SESSION['answers']['q1']) && $_SESSION['answers']['q1'] == 'D' ? 'checked' : '' ?>> D) Python</label>
            </div>

            <!-- Вопрос 2 -->
            <div class="question-block">
                <p>2. Что такое алгоритм?</p>
                <label><input type="radio" name="answer2" value="A" <?= isset($_SESSION['answers']['q2']) && $_SESSION['answers']['q2'] == 'A' ? 'checked' : '' ?> required> A) Язык программирования</label>
                <label><input type="radio" name="answer2" value="B" <?= isset($_SESSION['answers']['q2']) && $_SESSION['answers']['q2'] == 'B' ? 'checked' : '' ?>> B) Последовательность шагов для решения задачи</label>
                <label><input type="radio" name="answer2" value="C" <?= isset($_SESSION['answers']['q2']) && $_SESSION['answers']['q2'] == 'C' ? 'checked' : '' ?>> C) Тип данных</label>
                <label><input type="radio" name="answer2" value="D" <?= isset($_SESSION['answers']['q2']) && $_SESSION['answers']['q2'] == 'D' ? 'checked' : '' ?>> D) Фреймворк</label>
            </div>

            <!-- Вопрос 3 -->
            <div class="question-block">
                <p>3. Какой тип данных неизменяем в Python?</p>
                <label><input type="radio" name="answer3" value="A" <?= isset($_SESSION['answers']['q3']) && $_SESSION['answers']['q3'] == 'A' ? 'checked' : '' ?> required> A) Список</label>
                <label><input type="radio" name="answer3" value="B" <?= isset($_SESSION['answers']['q3']) && $_SESSION['answers']['q3'] == 'B' ? 'checked' : '' ?>> B) Словарь</label>
                <label><input type="radio" name="answer3" value="C" <?= isset($_SESSION['answers']['q3']) && $_SESSION['answers']['q3'] == 'C' ? 'checked' : '' ?>> C) Кортеж</label>
                <label><input type="radio" name="answer3" value="D" <?= isset($_SESSION['answers']['q3']) && $_SESSION['answers']['q3'] == 'D' ? 'checked' : '' ?>> D) Массив</label>
            </div>

            <!-- Вопрос 4 -->
            <div class="question-block">
                <p>4. Что делает оператор JOIN в SQL?</p>
                <label><input type="radio" name="answer4" value="A" <?= isset($_SESSION['answers']['q4']) && $_SESSION['answers']['q4'] == 'A' ? 'checked' : '' ?> required> A) Удаляет таблицу</label>
                <label><input type="radio" name="answer4" value="B" <?= isset($_SESSION['answers']['q4']) && $_SESSION['answers']['q4'] == 'B' ? 'checked' : '' ?>> B) Объединяет данные из двух таблиц</label>
                <label><input type="radio" name="answer4" value="C" <?= isset($_SESSION['answers']['q4']) && $_SESSION['answers']['q4'] == 'C' ? 'checked' : '' ?>> C) Создает индекс</label>
                <label><input type="radio" name="answer4" value="D" <?= isset($_SESSION['answers']['q4']) && $_SESSION['answers']['q4'] == 'D' ? 'checked' : '' ?>> D) Шифрует данные</label>
            </div>

            <button type="submit" class="next-btn">Далее (вопросы 5-8)</button>
        </form>
        <div class="progress">Прогресс: 1/3 части теста</div>
    </div>
</body>
</html>