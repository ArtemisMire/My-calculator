const buttons = document.querySelectorAll('.button');
const interactions = document.querySelectorAll('.interaction');
const equal = document.querySelector('#equal');
const output = document.querySelector('#output');
let expression = '';
let currentInput = '';
let lastInput = '';
let parts = [];
let operators = [];
const specMarks = ['+', '-', '*', '/', '=', '.'];
const specNums = /[0-9]/;

function addSymbol(symbol) {
  lastInput = currentInput;
  parts = expression.split(/[\+\-\*\/]/); 
  let lastNumber = parts[parts.length-1];
  if (symbol === '=') return;
  if (expression.length === 0 && ((specMarks.includes(symbol) && symbol !== '-'))) {
    return;
  };
  if ((specMarks.includes(symbol)) && (specMarks.includes(lastInput))) {
    return;
  };
  if (lastNumber === '0' && symbol === '0') return;  
  if (lastNumber === '0' && (symbol !== '.')) expression = expression.replace(/.$/, '');
  if (lastNumber.includes('.') && symbol === '.') return;
  currentInput = symbol;
  expression += symbol;
  output.textContent = expression;
  parts = expression.split(/[\+\-\*\/]/); 
}

function operate(parts, operators) {
  console.log(operators);
  operands = parts.reverse();
  let result = null;
  for (let i of operators) {
    let firstOperand = Number(parts.pop());
    let secondOperand = Number(parts.pop());
    console.log(i);
    switch(i) {
      case '+':
        result = firstOperand + secondOperand;
        break;
      case '-':
        result = firstOperand - secondOperand;
        break;
      case '*' :
        result = firstOperand * secondOperand;
        break;
      case '/' :
        result = firstOperand / secondOperand;
        break;
    };
    parts.push(result);
  };
  result = parts[0];
  if (result % 1 !== 0) result = Math.round(result * 100_000) / 100_000;
  console.log(result);
  return String(result);
}


buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    let arg = button.textContent;
    addSymbol(arg);
  });
});

document.addEventListener('keydown', (e) => {
  let arg = e.key;
  console.log(e.key);
  if (arg === 'Enter') {
    parts = expression.split(/[\+\-\*\/]/); 
    operators = expression.split(/[0-9\.]/);
    parts = parts.filter(function (e) { 
      return e;
    });
    operators = operators.filter(function (e) { 
      return e;
    });
    
    if ((parts.length - operators.length) === 1 && operators.length !== 0) {
      expression = operate(parts, operators);
      output.textContent = expression;
    };
  };
  if (arg === 'Backspace') {
    expression = expression.replace(/.$/, '');
    output.textContent = expression;
    if (!specMarks.includes(currentInput)) parts.pop();
    currentInput = expression[expression.length-1];
  };
  console.log(arg)
  if (specMarks.includes(arg) || specNums.test(arg)) addSymbol(arg);
})

equal.addEventListener('click', (e) => {
  parts = expression.split(/[\+\-\*\/]/); 
  operators = expression.split(/[0-9\.]/);

  parts = parts.filter(function (e) { 
    return e;
  });
  operators = operators.filter(function (e) { 
    return e;
  });
  
  if ((parts.length - operators.length) === 1 && operators.length !== 0) {
    expression = operate(parts, operators);
    output.textContent = expression;
  };
});

interactions.forEach(interaction => {
  interaction.addEventListener('click', (e) => {
    target = interaction.textContent;
    switch(target) {
      case 'AC':
        expression = '';
        currentInput = '';
        lastInput = '';
        currentInput = '';
        output.textContent = '';
        break;
      case 'C':
        expression = expression.replace(/.$/, '');
        output.textContent = expression;
        if (!specMarks.includes(currentInput)) parts.pop();
        currentInput = expression[expression.length-1];
        break;
    };
  });
});
