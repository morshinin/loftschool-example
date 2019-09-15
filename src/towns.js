/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return new Promise((resolve, reject) => {
        const url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
        let citiesSorted = [];
        let citiesSortedObj = [];

        fetch(url)
            .then(response => {
                response.json()
                    .then(citiesList => {
                        for (const city of citiesList) {
                            citiesSorted.push(city.name);
                        }
                        citiesSorted = citiesSorted.sort();
                        for (let i = 0, len = citiesSorted.length; i < len; i++) {
                            citiesSortedObj.push({ name: citiesSorted[i] });
                        }

                        resolve(citiesSortedObj);
                    })
            })
            .catch(() => {
                reject();
            });
    })
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
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

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
let townsList = [];

loadTowns().then(result => {
    townsList = result;
    loadingBlock.style.display = 'none';
    filterBlock.style.display = 'block';
});

filterInput.addEventListener('keyup', function() {
    // это обработчик нажатия кливиш в текстовом поле
    filterResult.innerHTML = '';

    if (filterInput.value === '') {
        filterResult.innerHTML = '';

        return;
    }

    for (const town of townsList) {
        if (isMatching(town.name, filterInput.value)) {
            const el = document.createElement('div');

            el.innerHTML = town.name;
            filterResult.insertAdjacentElement('beforeend', el);
        }
    }
});

export {
    loadTowns,
    isMatching
};
