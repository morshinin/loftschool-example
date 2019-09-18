/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    const filterTerm = filterNameInput.value;

    listTable.innerHTML = '';

    filterCookies(filterTerm);
});

/**
 * Проверяет содержится ли кусок текста в строке
 * @param full
 * @param chunk
 * @returns {boolean}
 */
function isMatching(full, chunk) {
    let result = false;
    const len = full.length;

    full = full.toLowerCase();
    chunk = chunk.toLowerCase();

    for (let i = 0; i < len; i++) {
        if (full.slice(i, chunk.length + i) === chunk) {
            result = true;
        }
    }

    return result;
}

/**
 * Получает куки
 * @returns {Array}
 */
function getCookies() {
    return document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev.push({ name: name, value: value });

        return prev;
    }, []);
}

/**
 * Выводит отфильтрованные куки
 * @param filterTerm
 */
function filterCookies(filterTerm) {
    const cookieList = getCookies();

    for (let i = 0, len = cookieList.length; i < len; i++) {
        if (isMatching(cookieList[i].name, filterTerm) || isMatching(cookieList[i].value, filterTerm)) {
            renderCookie(cookieList[i].name, cookieList[i].value);
        }
    }
}

/**
 * Создает строку, наполняет данными и выводит на странице
 * @param name
 * @param value
 */
function renderCookie(name, value) {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdValue = document.createElement('td');
    const tdButton = document.createElement('td');
    const btn = document.createElement('button');

    tdName.innerText = name;
    tdValue.innerText = value;
    btn.innerText = 'X';
    tdButton.appendChild(btn);

    btn.addEventListener('click', () => {
        deleteCookie(name);
    });

    tr.appendChild(tdName);
    tr.appendChild(tdValue);
    tr.appendChild(tdButton);

    if (name !== '') {
        listTable.appendChild(tr);
    }
}

/**
 * Удаляет куку
 * @param cookieName
 */
function deleteCookie(cookieName) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    renderCookieTable();
}

renderCookieTable();

/**
 * Выводит таблицу и наполняет ее строками
 */
function renderCookieTable() {
    const cookieList = getCookies();

    listTable.innerHTML = '';

    for (let i = 0, len = cookieList.length; i < len; i++) {
        renderCookie(cookieList[i].name, cookieList[i].value);
    }
}

addButton.addEventListener('click', e => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    if (addNameInput.value === '' || addValueInput.value === '') {
        const div = document.createElement('div');

        div.innerText = 'Поле не должно быть пустым';
        homeworkContainer.insertAdjacentElement('afterbegin', div);
        e.preventDefault();
    }

    document.cookie = `${addNameInput.value}=${addValueInput.value}`;

    renderCookieTable();
});
