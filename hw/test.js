function inverse(arr, n = 0) {
  if (n >= 0) {
    let m = Math.min(n, arr.length); // Ограничиваем количество элементов длиной массива
    let firstPart = arr.slice(0, m); // Берем первые m элементов
    let rest = arr.slice(m);         // Берем оставшиеся элементы
    return firstPart.concat(rest.reverse()); // Объединяем: первые + перевернутые остальные
  } else {
    let k = -n;                      // Берем модуль числа
    let m = Math.min(k, arr.length); // Ограничиваем количество элементов длиной массива
    let firstPart = arr.slice(0, arr.length - m); // Берем элементы до последних m
    let lastPart = arr.slice(arr.length - m);     // Берем последние m элементов
    return firstPart.reverse().concat(lastPart);  // Объединяем: перевернутые первые + последние
  }
}

console.log(inverse([1, 2, 3, 4, 5]));       // [5, 4, 3, 2, 1]
console.log(inverse([1, 2, 3, 4, 5], 2));    // [1, 2, 5, 4, 3]
console.log(inverse([1, 2, 3, 4, 5], -2));   // [3, 2, 1, 4, 5]
console.log(inverse([1, 2, 3], 5));          // [1, 2, 3]
console.log(inverse([1, 2, 3], -5));         // [1, 2, 3]
console.log(inverse([], 3));                 // []

// node test.js