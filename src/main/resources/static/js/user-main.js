const userEmailSpan = document.querySelector('#user-email');
const userNameSpan = document.querySelectorAll('.user-name');
const userPhoneNumber = document.querySelector('#user-phone-number');
const userPhoneNumberLink = document.querySelector('#user-phone-number-a');
const userRole = document.querySelector('#user-role');
const tableContainer = document.querySelector('.table-container');
const table = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');

const userId = $("meta[name='user-id']").attr("content");
updateUserLinks('.main-user', 'getUserPage', userId);
updateUserLinks('.workout-user', 'getWorkoutPlanPageByUserId', userId);
updateUserLinks('.reports-user', 'getReportOfWorkoutPageByUserId', userId);
updateUserLinks('.nutrition-user', 'getNutritionReportPageByUser', userId);
fetch(`/user/getUserById/${userId}`)
    .then(response => response.json())
    .then(data => {
        for (const elem of userNameSpan) {
            elem.textContent = data.name;
        }
        userEmailSpan.textContent = data.email;
        userPhoneNumber.textContent = data.phoneNumber;
        userPhoneNumberLink.href = 'tel:'+data.phoneNumber;
    });

const theadRow = thead.insertRow();
theadRow.innerHTML =
    '            <th>Вес (кг)</th>\n'+
    '            <th>Обхват ноги (см)</th>\n'+
    '            <th>Обхват руки (см)</th>'+
    '            <th>Обхват бедер (см)</th>'+
    '            <th>Обхват талии (см)</th>\n'+
    '            <th>Обхват грудной клетки (см)</th>'+
    '            <th>Дата</th>'
;
table.appendChild(thead);
tableContainer.appendChild(table);
getMyPhysicalParameters()
function getMyPhysicalParameters() {
    fetch(`/user/getPhysicalParametersByUserId/${userId}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(parameters => {
                const row = tbody.insertRow();
                row.setAttribute('data-cart', JSON.stringify(parameters)); // Добавляем объект cart как атрибут строки
                row.innerHTML = `
                                <td>${parameters.weight}</td>
                                <td>${parameters.armCircumference}</td>
                                <td>${parameters.legGirth}</td>
                                <td>${parameters.chestCircumference}</td>
                                <td>${parameters.hipCircumference}</td>
                                <td>${parameters.waistCircumference}</td>
                                <td>${parameters.date}</td>
                               `
                ;
                table.appendChild(tbody);
                tableContainer.appendChild(table);
            })
        })
        .catch(error => console.error('Ошибка получения данных:', error));
}

function updateUserLinks(selector, path, userId) {
    const elements = document.querySelectorAll(selector);
    for (const elem of elements) {
        elem.href = `/user/${path}/${userId}`;
    }
}