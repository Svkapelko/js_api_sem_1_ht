// Урок 1. Dom-дерево
/* Вы разрабатываете веб-страницу для отображения расписания занятий в спортивном клубе. Каждое занятие имеет название, время проведения, максимальное количество участников и текущее количество записанных участников.

1. Создайте веб-страницу с заголовком "Расписание занятий" и областью для отображения занятий.

2. Загрузите информацию о занятиях из предоставленных JSON-данных. Каждое занятие должно отображаться на странице с указанием его названия, времени проведения, максимального количества участников и текущего количества записанных участников.

3. Пользователь может нажать на кнопку "Записаться" для записи на занятие. Если максимальное количество участников уже достигнуто, кнопка "Записаться" становится неактивной.

4. После успешной записи пользователя на занятие, обновите количество записанных участников и состояние кнопки "Записаться".

5. Запись пользователя на занятие можно отменить путем нажатия на кнопку "Отменить запись". После отмены записи, обновите количество записанных участников и состояние кнопки.

6. Все изменения (запись, отмена записи) должны сохраняться и отображаться в реальном времени на странице.

7. При разработке используйте Bootstrap для стилизации элементов. */


const classesData = [
    {
        id: 1,
        title: 'Functional',
        time: '25.12.2025 10:00',
        maxParticipantsNumber: 8,
        currentParticipantsNumber: 2
    },
    {
        id: 2,
        title: 'TRX',
        time: '27.12.2025 12:00',
        maxParticipantsNumber: 8,
        currentParticipantsNumber: 5
    },
    {
        id: 3,
        title: 'Yoga',
        time: '29.12.2025 18:00',
        maxParticipantsNumber: 8,
        currentParticipantsNumber: 8
    }
];

// Получаем элементы из DOM
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.classes-container');


    // Функция для создания элемента занятия
    function createClassesItem(item) {

        const classesDiv = document.createElement("div");
        classesDiv.classList.add("classes-item");

        const titleSpan = document.createElement("span");
        titleSpan.textContent = item.title;
        classesDiv.appendChild(titleSpan);

        const timeSpan = document.createElement("span");
        timeSpan.textContent = item.time;
        classesDiv.appendChild(timeSpan);

        let participantsNumber = document.createElement("span");
        participantsNumber.setAttribute('data-id', item.id);
        participantsNumber.classList.add('number');
        participantsNumber.textContent = `${item.currentParticipantsNumber}/${item.maxParticipantsNumber}`;
        classesDiv.appendChild(participantsNumber);

        const button = document.createElement("button");   
        button.setAttribute('data-id', item.id);

        const cancelBtn = document.createElement('button'); 
        cancelBtn.className = 'cancel-btn';                  
        cancelBtn.setAttribute('data-id', item.id);         
        cancelBtn.textContent = 'Отменить запись';    
        

        if (item.currentParticipantsNumber >= item.maxParticipantsNumber) {
            button.classList.add("disabled");
            cancelBtn.classList.add("disabled");
            button.textContent = "Мест нет. Выберите пожалуйста другое занятие.";
        } else {
            button.textContent = "Записаться";
            button.addEventListener('click', () => manageRegisterClick(item.id));
            cancelBtn.onclick = () => manageUnregisterClick(item.id);
        }

        classesDiv.appendChild(button);
        classesDiv.appendChild(cancelBtn);
        return classesDiv;
    }

    // Функция для обновления кнопки после регистрации/отмены
    function updateButton(id) {
        const item = classesData.find(i => i.id === Number(id));
        const button = document.querySelector(`.classes-item button[data-id="${id}"]`);
        const cancelBtn = document.querySelector(`.classes-item button.cancel-btn[data-id="${id}"]`);
        let participantsNumberElem = document.querySelector(`.number[data-id="${id}"]`);

        if (item.currentParticipantsNumber > item.maxParticipantsNumber) {
            button.classList.add("disabled");
            button.textContent = "Мест нет. Выберите пожалуйста другое занятие.";
            cancelBtn.classList.add("disabled");
            /*cancelBtn.style.display = "none";  // скрываем кнопку "Отменить запись", если мест больше нет*/
        } else {
            button.classList.remove("disabled");
            button.textContent = "Вы успешно записаны";
            cancelBtn.style.display = '';      // показываем кнопку "Отменить запись", если есть свободные места
        }

        // Обновляем количество участников
        participantsNumberElem.textContent = `${item.currentParticipantsNumber}/${item.maxParticipantsNumber}`;

    }

    // Функция для обработки клика на кнопку "Записаться"
    function manageRegisterClick(id) {
        const item = classesData.find(i => i.id === id);

        // добавили флаг isRegistered, который показывает, записался ли пользователь на данное занятие, изначально установлен в false.
        if (!item.isRegistered && item.currentParticipantsNumber < item.maxParticipantsNumber) {
            item.currentParticipantsNumber ++;
            item.isRegistered = true;
            updateButton(id);
        }       
    }

    // Функция для обработки клика на кнопку "Отменить запись"
    function manageUnregisterClick(id) {
        const cancelBtn = document.querySelector(`.classes-item button.cancel-btn[data-id="${id}"]`);
        const item = classesData.find(i => i.id === id);
        if (item.isRegistered && item.currentParticipantsNumber > 0) {
            item.currentParticipantsNumber --;
            cancelBtn.textContent = "Ваша запись отменена";
            item.isRegistered = false;
            updateButton(id);
        }
    }

    // Отображение всех занятий
    classesData.forEach(item => {
        const classesItem = createClassesItem(item);
        container.appendChild(classesItem);
    })
});










