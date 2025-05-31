<?php
header('Content-Type: application/json');

$tasks = file_exists('tasks.json') ? json_decode(file_get_contents('tasks.json'), true) : [];
echo json_encode(['tasks' => $tasks]);
?>