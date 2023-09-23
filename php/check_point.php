<?php
// Функция проверки попадения точки в область
function checkPoint($x, $y, $r) {
    // Проверка условия попадения
    if (
        ($x >= -1 * $r) && ($x <= 0) &&
        ($y >= 0) && ($y <= $r/2)
    ) {
        return "Да";
    } else if (
        ($x >= 0) && ($x <= $r/2) &&
        ($y >= 0) && ($y <= $r - $x)
    ) {
        return "Да";
    } else if (
        ($x >= 0) && ($x <= $r/2) &&
        ($y <= 0) && ($y >= -1 * $r)
    ) {
        return "Да";
    } else {
        return "Нет";
    }
}

// Получение данных из GET-запроса
$x = $_GET['x'];
$y = $_GET['y'];
$r = $_GET['r'];

// Проверяем, переданы ли параметры X, Y, R в запрос
if($x !== null && $y !== null && $r !== null) {
    // Проверка на корректность данных (например, числовые значения)
    if (is_numeric($x) && is_numeric($y) && is_numeric($r)) {
        if ($r < 2 || $r > 5) {
            echo "Значение R должно быть в диапазоне от 2 до 5.";
            exit;
        }   else {
            // Вызываем функцию для проверки попадания точки
            $result = checkPoint($x, $y, $r);
            $currentTime = date("Y-m-d H:i:s"); // Текущее время
            $executionTime = microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"]; // Время выполнения скрипта

            // Вывод результатов в HTML-форму
            echo "x=$x&y=$y&r=$r&result=$result&currentTime=$currentTime&executionTime=$executionTime";
        }
    } else {
        echo "Некорректные данные";
        exit;
    }
} else {
    echo "Не все данные были переданы";
    exit;
}


