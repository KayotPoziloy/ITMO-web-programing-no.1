function validateForm() {
    // Получаем значения X, Y, R из формы
    var xValue = document.querySelector('input[name="x"]:checked');
    var yValue = document.getElementById("y").value;
    var rValue = document.getElementById("r").value;

    var errorX = document.getElementById("errorX");
    var errorY = document.getElementById("errorY");
    var errorR = document.getElementById("errorR");

    errorX.textContent = ""; // Сбрасываем текст ошибок
    errorY.textContent = "";
    errorR.textContent = "";

    // Проверка на некорректные значения
    if (!xValue) {
        errorX.textContent = "Выберите значение X";
        return false; // Блокируем отправку формы, если не отмечен ни один флажок
    }

    xValue = parseFloat(xValue.value);

    if (isNaN(xValue) || xValue < -2 || xValue > 2) {
        errorX.textContent = "Введите корректное значение X (от -2 до 2).";
        return false;
    }

    if (isNaN(yValue) || yValue < -3 || yValue > 5) {
        errorY.textContent = "Введите корректное значение Y (от -3 до 5).";
        return false;
    }

    if (isNaN(rValue) || rValue < 2 || rValue > 5) {
        errorR.textContent = "Введите корректное значение R (от 2 до 5).";
        return false;
    }

    return {x: xValue, y: yValue, r: rValue};
}

function sendDataToServer(data) {

    const xValue = data.x;
    const yValue = data.y;
    const rValue = data.r;
    // Засекаем время до отправки запроса
    const startTime = performance.now();

    // Создаем объект FormData для отправки данных на сервер
    const formData = new FormData();
    formData.append("x", xValue);
    formData.append("y", yValue);
    formData.append("r", rValue);

    // Отправляем данные на сервер
    fetch(`../php/check_point.php?x=${xValue}&y=${yValue}&r=${rValue}`, {
        method: "GET"
    })
        .then(response => response.text())
        .then(result => {

            const endTime = performance.now();
            const executionTime = endTime - startTime;

            // Перенаправьте пользователя на страницу results.html с параметрами
            window.location.href = `../html/results.html?x=${xValue}&y=${yValue}&r=${rValue}&result=${result}&executionTime=${executionTime}`;
        })
        .catch(error => {
            console.error("Ошибка:", error);
        });
}

// Функция, вызываемая при отправке формы
function handleSubmit(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию
    const data = validateForm();
    if (data) {
        sendDataToServer(data);
    }
    console.log("Форма отправлена!");
}

// Привязываем функцию handleSubmit к событию submit формы
const form = document.querySelector("#myForm");
form.addEventListener("submit", handleSubmit);