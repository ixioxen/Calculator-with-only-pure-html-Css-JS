// --- Variables to store calculator state ---
let currentNumber = '';   // the number you are typing now
let previousNumber = '';  // the first number in the calculation
let operator = '';        // the chosen operator (+, -, ×, ÷)

// --- Get elements from the HTML ---
const resultDisplay = document.querySelector('#resultDisplay');
const display = document.querySelector('#display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('#clear');
const delBtn = document.querySelector('#del');
const equalBtn = document.querySelector('#calculate');

// --- Show numbers on the display ---
function render() {
    if (currentNumber === '' && previousNumber === '' && operator === '') {
        display.textContent = '0';
    } else {
        display.textContent = previousNumber + operator + currentNumber;
    }
}

render();

// --- Do the math ---
function calculate() {
    let first = Number(previousNumber);
    let second = Number(currentNumber);
    let result;

    if (operator === '+') {
        result = first + second;
    } else if (operator === '-') {
        result = first - second;
    } else if (operator === '×') {
        result = first * second;
    } else if (operator === '÷') {
        if (second === 0) {
            resultDisplay.textContent = 'Cannot divide by 0';
            currentNumber = '';
            previousNumber = '';
            operator = '';
            render();
            return;
        }
        result = first / second;
    }

    previousNumber = result.toString();
    currentNumber = '';
    operator = '';
    render();
}

// --- Number buttons (0-9) ---
numbers.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
        currentNumber += event.target.textContent;
        render();
    });
});

// --- Operator buttons (+, -, ×, ÷, %) ---
operators.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
        let selectedOperator = event.target.textContent;

        // Percent: turn current number into a decimal (example: 50 → 0.5)
        if (selectedOperator === '%') {
            if (currentNumber !== '') {
                currentNumber = (Number(currentNumber) / 100).toString();
                render();
            }
            return;
        }

        // Decimal point: add "." only once
        if (selectedOperator === '.') {
            if (!currentNumber.includes('.')) {
                if (currentNumber === '') {
                    currentNumber = '0.';
                } else {
                    currentNumber += '.';
                }
                render();
            }
            return;
        }

        // Need a number before choosing an operator
        if (currentNumber === '') {
            // Allow changing operator if one is already selected
            if (operator !== '') {
                operator = selectedOperator;
                render();
            }
            return;
        }

        // If user already has a full expression, calculate first (example: 5 + 3 -)
        if (previousNumber !== '' && operator !== '' && currentNumber !== '') {
            calculate();
        }

        operator = selectedOperator;
        previousNumber = currentNumber;
        currentNumber = '';
        render();
    });
});

// --- AC button: clear everything ---
clearBtn.addEventListener('click', function () {
    currentNumber = '';
    previousNumber = '';
    operator = '';
    resultDisplay.textContent = '';
    render();
});

// --- Del button: remove last character ---
delBtn.addEventListener('click', function () {
    if (currentNumber !== '') {
        currentNumber = currentNumber.slice(0, -1);
    } else if (operator !== '') {
        operator = '';
    } else if (previousNumber !== '') {
        previousNumber = previousNumber.slice(0, -1);
    }
    render();
});

// --- Equal button (=) ---
equalBtn.addEventListener('click', function () {
    if (previousNumber === '' || operator === '' || currentNumber === '') {
        return;
    }

    calculate();
    resultDisplay.textContent = '= ' + previousNumber;

    // Put result into currentNumber so you can keep calculating (example: 8 + 2)
    currentNumber = previousNumber;
    previousNumber = '';
});
