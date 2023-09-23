
// Извлекаем параметры из URL
const params = new URLSearchParams(window.location.search);
const xValue = params.get("x");
const yValue = params.get("y");
const rValue = params.get("r");
const result = params.get("result");
const executionTime = params.get("executionTime");

// Добавляем результаты в таблицу
const table = document.querySelector("table");
const newRow = table.insertRow(-1);
newRow.innerHTML = `<td>${xValue}</td><td>${yValue}</td><td>${rValue}</td><td>${result}</td><td>${new Date()}</td><td>${executionTime}</td>`;