/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0, len = array.length; i < len; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let newArray = [];

    for (let i = 0, len = array.length; i < len; i++) {
        newArray.push(fn(array[i], i, array));
    }

    return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
// function reduce(array, fn, initial) {
//     for (let i of array) {
//         initial = fn(initial, i);
//     }
//
//     return initial;
// }
function reduce(array, callback, initialVal = array[0]) {
    let i = (initialVal === array[0] ? 1 : 0);

    for (; i < array.length; i++) {
        initialVal = callback(initialVal, array[i], i, array);
    }

    return initialVal;
}
/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let props = Object.getOwnPropertyNames(obj);

    for (let i = 0; i < props.length; i++) {
        props[i] = props[i].toUpperCase();
    }

    return props;
}
/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to) {
    let newArr = [];

    if (to > array.length) {
        to = array.length;
    }

    if (from < 0 && to === undefined) {
        if (Math.abs(from) > array.length) {
            from = -array.length;
        }
        for (let i = array.length + from; i < array.length; i++) {
            newArr.push(array[i]);
        }
    } else if (from < 0 && to < 0) {
        if (Math.abs(from) > array.length) {
            from = -array.length;
        }

        if (Math.abs(to) > array.length) {
            to = array.length - Math.abs(to);
        }

        for (let i = array.length + from, j = array.length - Math.abs(to); i < j; i++) {
            newArr.push(array[i]);
        }
    } else if (to === 0) {
        for (let i = from, j = to; i < j; i++) {
            newArr.push(array[i]);
        }
    } else if (to < 0) {
        for (let i = from, j = array.length - Math.abs(to); i < j; i++) {
            newArr.push(array[i]);
        }
    } else if (from < 0 && (Math.abs(from) > array.length) && to !== 'undefined') {
        for (let i = 0, j = to; i < j; i++) {
            newArr.push(array[i]);
        }
    } else {
        for (let i = from, j = to || array.length; i < j; i++) {
            newArr.push(array[i]);
        }
    }

    return newArr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(target, prop, val) {
            return target[prop] = val * val;
        }
    })
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
