<?php
session_start();
if (!isset($_SESSION['test_started'])) {
    header("Location: index.php");
    exit;
}

// Сохраняем ответы из предыдущей формы
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
    <title>Вопросы 5-8 | Тестирование</title>
    <link rel="stylesheet" href="style.css">
    <meta charset="utf-8">
</head>
<body>
    <div class="container">
        <h1>Вопросы 5-8 из 12</h1>
        <form action="test3.php" method="post">
            
            <!-- Вопрос 5 -->
            <div class="question-block">
                <p>5. Что такое MVC?</p>
                <label><input type="radio" name="answer5" value="A" <?= isset($_SESSION['answers']['q5']) && $_SESSION['answers']['q5'] == 'A' ? 'checked' : '' ?> required> A) Язык программирования</label>
                <label><input type="radio" name="answer5" value="B" <?= isset($_SESSION['answers']['q5']) && $_SESSION['answers']['q5'] == 'B' ? 'checked' : '' ?>> B) Архитектурный шаблон</label>
                <label><input type="radio" name="answer5" value="C" <?= isset($_SESSION['answers']['q5']) && $_SESSION['answers']['q5'] == 'C' ? 'checked' : '' ?>> C) База данных</label>
                <label><input type="radio" name="answer5" value="D" <?= isset($_SESSION['answers']['q5']) && $_SESSION['answers']['q5'] == 'D' ? 'checked' : '' ?>> D) Алгоритм сортировки</label>
            </div>

            <!-- Вопрос 6 -->
            <div class="question-block">
                <p>6. Для чего используется Git?</p>
                <label><input type="radio" name="answer6" value="A" <?= isset($_SESSION['answers']['q6']) && $_SESSION['answers']['q6'] == 'A' ? 'checked' : '' ?> required> A) Для управления версиями кода</label>
                <label><input type="radio" name="answer6" value="B" <?= isset($_SESSION['answers']['q6']) && $_SESSION['answers']['q6'] == 'B' ? 'checked' : '' ?>> B) Для написания CSS</label>
                <label><input type="radio" name="answer6" value="C" <?= isset($_SESSION['answers']['q6']) && $_SESSION['answers']['q6'] == 'C' ? 'checked' : '' ?>> C) Для создания анимаций</label>
                <label><input type="radio" name="answer6" value="D" <?= isset($_SESSION['answers']['q6']) && $_SESSION['answers']['q6'] == 'D' ? 'checked' : '' ?>> D) Для работы с базами данных</label>
            </div>

            <!-- Вопрос 7 -->
            <div class="question-block">
                <p>7. Какой протокол используется для безопасной передачи данных?</p>
                <label><input type="radio" name="answer7" value="A" <?= isset($_SESSION['answers']['q7']) && $_SESSION['answers']['q7'] == 'A' ? 'checked' : '' ?> required> A) HTTP</label>
                <label><input type="radio" name="answer7" value="B" <?= isset($_SESSION['answers']['q7']) && $_SESSION['answers']['q7'] == 'B' ? 'checked' : '' ?>> B) FTP</label>
                <label><input type="radio" name="answer7" value="C" <?= isset($_SESSION['answers']['q7']) && $_SESSION['answers']['q7'] == 'C' ? 'checked' : '' ?>> C) HTTPS</label>
                <label><input type="radio" name="answer7" value="D" <?= isset($_SESSION['answers']['q7']) && $_SESSION['answers']['q7'] == 'D' ? 'checked' : '' ?>> D) TCP</label>
            </div>

            <!-- Вопрос 8 -->
            <div class="question-block">
                <p>8. Что такое ORM?</p>
                <label><input type="radio" name="answer8" value="A" <?= isset($_SESSION['answers']['q8']) && $_SESSION['answers']['q8'] == 'A' ? 'checked' : '' ?> required> A) Объектно-реляционное отображение</label>
                <label><input type="radio" name="answer8" value="B" <?= isset($_SESSION['answers']['q8']) && $_SESSION['answers']['q8'] == 'B' ? 'checked' : '' ?>> B) Оптимизация запросов</label>
                <label><input type="radio" name="answer8" value="C" <?= isset($_SESSION['answers']['q8']) && $_SESSION['answers']['q8'] == 'C' ? 'checked' : '' ?>> C) Шифрование данных</label>
                <label><input type="radio" name="answer8" value="D" <?= isset($_SESSION['answers']['q8']) && $_SESSION['answers']['q8'] == 'D' ? 'checked' : '' ?>> D) Создание API</label>
            </div>

            <button type="submit" class="next-btn">Далее (вопросы 9-12)</button>
        </form>
        <div class="progress">Прогресс: 2/3 части теста</div>
    </div>
</body>
</html>