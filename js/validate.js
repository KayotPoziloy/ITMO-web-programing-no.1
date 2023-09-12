function validateForm() {
    // Получаем значения X, Y, R из формы
    var xValue = document.querySelector('input[name="x"]:checked');
    var yValue = document.getElementById("y").value;
    var rValue = document.getElementById("r").value;

    // Проверка на некорректные значения
    if (!xValue) {
        alert("Выберите значение X");
        return false; // Блокируем отправку формы, если не отмечен ни один флажок
    }

    if (isNaN(yValue) || yValue < -3 || yValue > 5) {
        alert("Введите корректное значение Y (от -3 до 5).");
        return false;
    }

    if (isNaN(rValue) || rValue < 2 || rValue > 5) {
        alert("Введите корректное значение R (от 2 до 5).");
        return false;
    }

    return {x: xValue.value, y: yValue, r: rValue};
}

function sendDataToServer(data) {

    const xValue = data.x;
    const yValue = data.y;
    const rValue = data.r;

    // Создаем объект FormData для отправки данных на сервер
    const formData = new FormData();
    formData.append("x", xValue.value);
    formData.append("y", yValue);
    formData.append("r", rValue);

    // Отправляем данные на сервер
    fetch(`../php/check_point.php?x=${xValue}&y=${yValue}&r=${rValue}`, {
        method: "GET"
    })
        .then(response => response.text())
        .then(result => {
            // Обработка ответа от сервера
            const resultTable = document.getElementById("resultTable");
            const newRow = resultTable.insertRow(-1); // Добавляем строку в конец таблицы
            newRow.innerHTML = result;
        })
        .catch(error => {
            console.error("Ошибка:", error);
        });
}

// Функция, вызываемая при отправке формы
function handleSubmit(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию
    console.log("Форма отправлена!");
    const data = validateForm();
    if (data) {
        sendDataToServer(data);
    }
}

// Привязываем функцию handleSubmit к событию submit формы
const form = document.querySelector("#myForm");
form.addEventListener("submit", handleSubmit);