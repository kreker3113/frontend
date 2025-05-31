<?php
header('Content-Type: application/json');

$response = ['success' => false, 'error' => ''];

$taskName = $_POST['taskName'] ?? '';
$taskDescription = $_POST['taskDescription'] ?? '';

if (empty($taskName) || empty($taskDescription)) {
    $response['error'] = 'Все поля обязательны для заполнения';
    echo json_encode($response);
    exit;
}

// Сохранение задачи в файл
$tasks = file_exists('tasks.json') ? json_decode(file_get_contents('tasks.json'), true) : [];
$tasks[] = ['name' => $taskName, 'description' => $taskDescription];

if (file_put_contents('tasks.json', json_encode($tasks, JSON_PRETTY_PRINT))) {
    $response['success'] = true;
} else {
    $response['error'] = 'Ошибка сохранения задачи';
}

echo json_encode($response);
?>