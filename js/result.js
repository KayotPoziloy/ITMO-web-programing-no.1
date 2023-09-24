// Извлекаем параметры из URL
const params = new URLSearchParams(window.location.search);
const xValue = params.get("x");
const yValue = params.get("y");
const rValue = params.get("r");
const result = params.get("result");
const currentTime = params.get("currentTime"); // Извлекаем текущее время
const executionTime = params.get("executionTime");

// Создаем объект для текущего результата
const currentResult = {
    x: xValue,
    y: yValue,
    r: rValue,
    result: result,
    currentTime: currentTime,
    executionTime: executionTime
};

// Получаем сохраненные результаты из localStorage (если они есть)
let storedResults = localStorage.getItem('results');

// Если в localStorage нет данных или они не являются массивом, создаем новый массив
if (!storedResults || !Array.isArray(JSON.parse(storedResults))) {
    storedResults = [];
} else {
    storedResults = JSON.parse(storedResults);
}

// Добавляем текущий результат в массив сохраненных результатов
storedResults.push(currentResult);

// Сохраняем обновленный массив в localStorage
localStorage.setItem('results', JSON.stringify(storedResults));

// Отображаем результаты на странице
const table = document.querySelector("table");

// Очищаем таблицу перед добавлением новых результатов
table.innerHTML = '<tr><th>X</th><th>Y</th><th>R</th><th>Результат</th><th>Время</th><th>Время выполнения</th></tr>';

// Добавляем все результаты в таблицу
for (const storedResult of storedResults) {
    if (
        storedResult.x !== null &&
        storedResult.y !== null &&
        storedResult.r !== null &&
        storedResult.result !== null &&
        storedResult.currentTime !== null &&
        storedResult.executionTime !== null
    ) {
        const newRow = table.insertRow(-1);
        newRow.innerHTML = `<td>${storedResult.x}</td><td>${storedResult.y}</td><td>${storedResult.r}</td><td>${storedResult.result}</td><td>${storedResult.currentTime}</td><td>${storedResult.executionTime}</td>`;
    }
}

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", function () {
    const table = document.querySelector("table");
    table.innerHTML = '<tr><th>X</th><th>Y</th><th>R</th><th>Результат</th><th>Время</th><th>Время выполнения</th></tr>'; // Очищаем таблицу
    localStorage.removeItem('results'); // Очищаем localStorage
});
