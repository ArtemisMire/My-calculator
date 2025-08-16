const buttons = document.querySelectorAll('.button');
const numbers = document.querySelectorAll('.num');
const interactions = document.querySelectorAll('.interaction');
const operators = document.querySelectorAll('.operator');
const answer = document.querySelector('#answer');
let firstOperand = '';
let secondOperand = '';
let currentTask = '';
let currentOperator = '';
let currentAnswer = '';
let arguments = [];
let flag = false;
let flag2 = false;

function addSymbol(symbol) {
    const operators = ["+", "-", "*", "/"];
    if (operators.includes(symbol) && operators.includes(expression.slice(-1))) {
      return; 
    }
    currentTask += symbol;
    answer.textContent = expression;
}


buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let arg = button.textContent;
        currentTask += arg;
        answer.textContent = currentTask;
    })
})
numbers.forEach(num => {
    num.addEventListener('click', (e) => {
        let arg = num.textContent;
        if (!flag) firstOperand += arg;
        else secondOperand += arg;
        console.log(getvalues());
    })
})
operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        let arg = operator.textContent;
        if (secondOperand != '' && arg != '=') {
            currentAnswer = getAnswer(firstOperand, secondOperand, arg);
            firstOperand = currentAnswer;
            currentOperator = arg;
            secondOperand = '';
            currentTask = `${currentAnswer} ${currentOperator} `;
            answer.textContent = currentTask;
            flag2 = true;
        }
        if ((!flag || currentOperator === '=') && !flag2) currentOperator = arg;
        if (flag && secondOperand != '') {
            console.log(getvalues());
            console.log('done');
            currentAnswer = getAnswer(firstOperand, secondOperand, currentOperator);
            console.log(currentAnswer);
            firstOperand = currentAnswer;
            secondOperand = '';
            currentOperator = '';
            currentTask = `${currentAnswer} ${currentOperator} `;
            answer.textContent = currentTask;
            flag = false;
        }
        flag2 = false;
        if (currentOperator !== '') flag = true;
    })
})

function getAnswer(firstOperand, secondOperand, operator) {
    let result = null;
    firstOperand = parseInt(firstOperand);
    secondOperand = parseInt(secondOperand);
    switch(operator) {
        case '+' :
            result = firstOperand + secondOperand;
            break;
        case '-' :
            result = firstOperand - secondOperand;
            break;
        case 'x' :
            result = firstOperand * secondOperand;
            break;
        case '÷' :
            result = firstOperand / secondOperand;
            break;
    }
    console.log(firstOperand, secondOperand, operator);
    if (result % 1 != 0) result = (Math.floor(result * 100000) / 100000);
    return result;
}
function getvalues() {
    console.log(firstOperand, secondOperand, ' values');
    console.log(currentOperator);
    console.log(flag);

}

// 0 / 0
// number / 0
// add 1+1+1
// operator as a first enter
// 0 as a first enter 
// 0 as a first enter as number

/*
get num
if ener == operator
get second num
if operator entered
if operator != '='
do math 
first operand = result of math
second operand = ''
add current operator && add him to current answer

*/