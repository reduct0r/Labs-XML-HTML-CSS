window.onload = function(){ 
    // Переменные для операндов, выбранной операции и результата
    let a = '';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;
    // Для накопительного вычисления (повторное нажатие "=")
    let lastB = '';
    
    // Переменная для «памяти» накопления (M+ и M–)
    let memory = 0;
    
    // Окно вывода результата
    const outputElement = document.getElementById("result");
    
    // Список объектов кнопок-цифр (id начинаются с btn_digit_)
    const digitButtons = document.querySelectorAll('[id^="btn_digit_"]');
    
    function updateOutput(value) {
        // Если длина результата слишком велика, форматируем его
        const strVal = value.toString();
        if(strVal.length > 13){
            outputElement.innerHTML = Number(value).toPrecision(13);
        } else {
            outputElement.innerHTML = strVal;
        }
    }
    
    function onDigitButtonClicked(digit) {
        if (selectedOperation === null) {
            if (digit === '.' && a.includes('.')) return;
    
            if (a === '0' && digit !== '.') {
                a = digit;
            } else {
                a += digit;
            }
            updateOutput(a === '' ? 0 : a);
        } else {
            if (digit === '.' && b.includes('.')) return;
    
            if (b === '0' && digit !== '.') {
                b = digit;
            } else {
                b += digit;
            }
            updateOutput(b === '' ? 0 : b);
        }
    }
    
    
    // Назначение обработчика на все кнопки-цифры
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });
    
    // Обработчики для кнопок операций базовых четырёх операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if(a === '') return;
        selectedOperation = 'x';
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if(a === '') return;
        selectedOperation = '+';
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if(a === '') return;
        selectedOperation = '-';
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if(a === '') return;
        selectedOperation = '/';
    }
    
    // Обработчик кнопки очистки «C»
    document.getElementById("btn_op_clear").onclick = function() { 
        a = '';
        b = '';
        selectedOperation = null;
        expressionResult = '';
        lastB = '';
        updateOutput(0);
    }
    
    // Обработчик кнопки "=" с реализацией накопительного (цепного) вычисления
    document.getElementById("btn_op_equal").onclick = function() { 
        if(a === '') return;
        // Если b пуст, используем сохранённое значение для многократного вычисления
        if(b === '' && lastB !== ''){
            b = lastB;
        }
        if(a === '' || b === '' || !selectedOperation) return;
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b);
                break;
            case '+':
                expressionResult = (+a) + (+b);
                break;
            case '-':
                expressionResult = (+a) - (+b);
                break;
            case '/':
                // Обработка деления на 0
                if(+b === 0){
                    updateOutput("Ошибка");
                    a = ''; b = ''; selectedOperation = null; lastB = '';
                    return;
                }
                expressionResult = (+a) / (+b);
                break;
        }
        
        // Сохраняем значение b для повторного вычисления "=" (накопительное)
        lastB = b;
        a = expressionResult.toString();
        b = '';
        selectedOperation = null;
    
        updateOutput(a);
    }
    
    // Операция смены знака +/- для текущего операнда
    document.getElementById("btn_op_sign").onclick = function() {
        if(selectedOperation === null) {
            if(a !== '') {
                if(a.startsWith('-')){
                    a = a.slice(1);
                } else {
                    a = '-' + a;
                }
                updateOutput(a);
            }
        } else {
            if(b !== '') {
                if(b.startsWith('-')){
                    b = b.slice(1);
                } else {
                    b = '-' + b;
                }
                updateOutput(b);
            }
        }
    }
    
    // Операция вычисления процента – делим текущий операнд на 100
    document.getElementById("btn_op_percent").onclick = function() {
        if(selectedOperation === null) {
            if(a === '') return;
            a = (parseFloat(a) / 100).toString();
            updateOutput(a);
        } else {
            if(b === '') return;
            b = (parseFloat(b) / 100).toString();
            updateOutput(b);
        }
    }
    
    // Кнопка Backspace: удаляет последний символ текущего операнда
    document.getElementById("btn_op_backspace").onclick = function() {
        if(selectedOperation === null) {
            a = a.slice(0, -1);
            updateOutput(a === '' ? 0 : a);
        } else {
            b = b.slice(0, -1);
            updateOutput(b === '' ? 0 : b);
        }
    }
    
    // Операция квадратного корня (√) для текущего операнда
    document.getElementById("btn_op_sqrt").onclick = function() {
        if(selectedOperation === null) {
            if(a === '') return;
            if(parseFloat(a) < 0){
                updateOutput("Ошибка");
                return;
            }
            a = Math.sqrt(parseFloat(a)).toString();
            updateOutput(a);
        } else {
            if(b === '') return;
            if(parseFloat(b) < 0){
                updateOutput("Ошибка");
                return;
            }
            b = Math.sqrt(parseFloat(b)).toString();
            updateOutput(b);
        }
    }
    
    // Операция возведения в квадрат (x²)
    document.getElementById("btn_op_square").onclick = function() {
        if(selectedOperation === null) {
            if(a === '') return;
            a = (Math.pow(parseFloat(a), 2)).toString();
            updateOutput(a);
        } else {
            if(b === '') return;
            b = (Math.pow(parseFloat(b), 2)).toString();
            updateOutput(b);
        }
    }
    
    // Операция факториала (x!)
    document.getElementById("btn_op_fact").onclick = function() {
        // Факториал реализуем только для неотрицательных целых чисел
        function factorial(n) {
            if(n === 0 || n === 1) return 1;
            let f = 1;
            for(let i = 2; i <= n; i++){
                f *= i;
                // Если число слишком большое, можно завершить и сообщить об ошибке
                if(!isFinite(f)) return Infinity;
            }
            return f;
        }
        if(selectedOperation === null) {
            if(a === '') return;
            let num = parseFloat(a);
            if(num < 0 || !Number.isInteger(num)){
                updateOutput("Ошибка");
                return;
            }
            a = factorial(num).toString();
            updateOutput(a);
        } else {
            if(b === '') return;
            let num = parseFloat(b);
            if(num < 0 || !Number.isInteger(num)){
                updateOutput("Ошибка");
                return;
            }
            b = factorial(num).toString();
            updateOutput(b);
        }
    }
    
    document.getElementById("btn_digit_000").onclick = function() {
        if (selectedOperation === null) {

            if(a === '' || a === '0') {
                a = '0';
                updateOutput(a);
                return;
            } else {
                a += '000';
                updateOutput(a);
            }
        } else {

            if(b === '' || b === '0') {
                b = '0';
                updateOutput(b);
                return;
            } else {
                b += '000';
                updateOutput(b);
            }
        }
    }
    
    
    // Накапливаемое сложение (M+): прибавление текущего значения к памяти
    document.getElementById("btn_op_mplus").onclick = function() {
        let current = 0;
        if(selectedOperation === null) {
            if(a !== '') current = parseFloat(a);
        } else {
            if(b !== '') current = parseFloat(b);
        }
        memory += current;
        updateOutput("Память: " + memory);
    }
    
    // Накапливаемое вычитание (M−): вычитание текущего значения из памяти
    document.getElementById("btn_op_mminus").onclick = function() {
        let current = 0;
        if(selectedOperation === null) {
            if(a !== '') current = parseFloat(a);
        } else {
            if(b !== '') current = parseFloat(b);
        }
        memory -= current;
        updateOutput("Память: " + memory);
    }
    
    // Индивидуальная операция – возведение в куб (x³)
    document.getElementById("btn_op_cube").onclick = function() {
        if(selectedOperation === null) {
            if(a === '') return;
            a = (Math.pow(parseFloat(a), 3)).toString();
            updateOutput(a);
        } else {
            if(b === '') return;
            b = (Math.pow(parseFloat(b), 3)).toString();
            updateOutput(b);
        }
    }
    
    // Смена цвета окна результата по нажатию кнопки
    document.getElementById("btn_toggle_result_color").onclick = function() {
        outputElement.classList.toggle("alternate");
    }
};