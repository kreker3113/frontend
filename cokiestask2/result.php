<?php
session_start();

// Проверка, что тест был начат
if (!isset($_SESSION['test_started'])) {
    header("Location: index.php");
    exit;
}

// Сохраняем ответы из последней формы
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    for ($i = 9; $i <= 12; $i++) {
        if (isset($_POST["answer$i"])) {
            $_SESSION['answers']["q$i"] = $_POST["answer$i"];
        }
    }
}

// Правильные ответы
$correct_answers = [
    'q1' => 'B', // Python - интерпретируемый язык
    'q2' => 'C', // === - строгое сравнение в JS
    'q3' => 'C', // TypeScript - строго типизированный
    'q4' => 'B', // "22" - конкатенация строк в JS
    'q5' => 'B', // GET - метод для получения данных
    'q6' => 'B', // AJAX - асинхронный обмен данными
    'q7' => 'C', // <script> - тег для JS
    'q8' => 'B', // CSS - язык стилей
    'q9' => 'B', // TypeScript компилируется в JS
    'q10' => 'B', // REST API - архитектурный стиль
    'q11' => 'B', // map() - создает новый массив
    'q12' => 'B'  // Promise - для асинхронных операций
];

// Подсчет правильных ответов
$score = 0;
$total_questions = count($correct_answers);
$results = [];

foreach ($correct_answers as $question => $correct_answer) {
    $user_answer = $_SESSION['answers'][$question] ?? null;
    $is_correct = ($user_answer === $correct_answer);
    
    if ($is_correct) {
        $score++;
    }
    
    $results[$question] = [
        'user_answer' => $user_answer,
        'correct_answer' => $correct_answer,
        'is_correct' => $is_correct
    ];
}

// Очистка сессии после завершения теста
session_unset();
session_destroy();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Результаты тестирования</title>
    <link rel="stylesheet" href="style.css">
    <meta charset="utf-8">
</head>
<body>
    <div class="container">
        <h1>Результаты тестирования</h1>
        
        <div class="result-summary <?= $score >= $total_questions * 0.7 ? 'good' : 'bad' ?>">
            Вы ответили правильно на <?= $score ?> из <?= $total_questions ?> вопросов.
        </div>
        
        <?php if ($score >= $total_questions * 0.8): ?>
            <p class="result-message good">Отличный результат! Вы хорошо знаете основы программирования.</p>
        <?php elseif ($score >= $total_questions * 0.5): ?>
            <p class="result-message medium">Неплохой результат, но есть куда расти.</p>
        <?php else: ?>
            <p class="result-message bad">Вам стоит подтянуть знания. Рекомендуем изучить основы программирования.</p>
        <?php endif; ?>
        
        <h2>Детализация ответов:</h2>
        <div class="answers-details">
            <?php foreach ($results as $question => $result): ?>
                <div class="answer <?= $result['is_correct'] ? 'correct' : 'incorrect' ?>">
                    <p><strong>Вопрос <?= substr($question, 1) ?>:</strong> 
                    Ваш ответ: <?= $result['user_answer'] ?? 'Нет ответа' ?> | 
                    Правильный ответ: <?= $result['correct_answer'] ?></p>
                </div>
            <?php endforeach; ?>
        </div>
        
        <a href="index.php?restart=1" class="restart-btn">Пройти тест еще раз</a>
    </div>
</body>
</html>