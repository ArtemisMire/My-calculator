const buttons = document.querySelectorAll('.button');
const interactions = document.querySelectorAll('.interaction');
const equal = document.querySelector('.equal');
const output = document.querySelector('#output');
const lastExpression = document.querySelector('#lastExpression');
let expression = '';
let lastInput = '';
let parts = [];
let nums = [];
let lastNumber = '';
let lastSymbol =''
const specMarks = ['+', '-', 'x', '÷', '=', '.'];
const specNums = '0123456789';

function addSymbol(symbol) {
  parts = parser(expression); 
  nums = getNums(expression);
  lastSymbol = expression.slice(-1)[0];
  lastInput = parts.slice(-1)[0];
  nums.length >= 1 ? lastNumber = nums.slice(-1)[0] : lastNumber = '';      
  if (symbol === '=') return;
  if (!expression && '+x÷'.includes(symbol)) return;
  if (expression === '0' && symbol ==='0') return;
  if (expression === '0' && specNums.includes(symbol)) expression = expression.replace(/.$/, '');
  if (expression === '-' && !specNums.includes(symbol)) return;
  if (lastNumber === '0' && symbol === '0') return;
  if ('+-x÷'.includes(lastSymbol) && specMarks.includes(symbol) && symbol !== '-') return;
  if (lastSymbol === '.' && !specNums.includes(symbol)) return;
  if (symbol === '.' && lastNumber.includes('.')) return; 
  if (lastNumber === '' && symbol === '.') symbol = '0.';
  if (specMarks.includes(parts[parts.length-2]) && lastSymbol === '-' && symbol === '-') return;
  expression += symbol;
  output.textContent = expressionFormat(expression);
}

function expressionFormat(expression) {
  args = parser(expression);
  let result = ''
  for (let arg of args) {
    if (arg.length === 1 && '+-x÷'.includes(arg)) {
      result += ` ${arg} `;
    } else result += arg;
  }
  return result;
}

function getNums(tokens){
  let args = parser(tokens);
  result = args.filter((token) => !isNaN(token));
  return result;
}

function parser(expression) {
  let tokens = [];
  let num = '';
  for (let i=0; i<expression.length; i++) {
    let ch = expression[i];
    if (specNums.includes(ch)) {
      num += ch;
    } else if (ch === '.' && num && !num.includes('.')) {
      num += ch;
    } else if ('+-x÷'.includes(ch)) {
      if (num) {
        tokens.push(num);
        num = '';
      }

      if (ch === '-' && (i === 0 || '+-x÷'.includes(expression[i-1]))) {
        num = '-';
      } else {
        tokens.push(ch);
      }
    }
  }
  if (num) tokens.push(num);
  return(tokens);
}


buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    let arg = button.textContent;
    addSymbol(arg);
  });
});

document.addEventListener('keydown', (e) => {
  let arg = e.key;
  if (arg === 'Backspace') {
    expression = expression.replace(/.$/, '');
    output.textContent = expressionFormat(expression);
  };
  if (arg === 'Enter') {
    if (parser(expression).length - getNums(expression).length === getNums(expression).length - 1) {
      equalEvent();
    } 
  };
  if (arg === '*') arg = 'x';
  if (arg === '/') arg = '÷';
  if (specMarks.includes(arg) || specNums.includes(arg)) addSymbol(arg);
})

function operate(parts) {
  let firstOperand = null;
  let secondOperand = null;
  let result = null;
  let specificOperators = parts.reduce((counter, part) => {
    if ('x÷'.includes(part)) counter += 1;
    return counter;
  }, 0);
  for (let i=0; i<specificOperators; i++) {
    for (let j of parts) {
      if (!'x÷'.includes(j)) continue;
      firstOperand = Number(parts[parts.indexOf(j)-1]);
      secondOperand = Number(parts[parts.indexOf(j)+1]);
      switch(j) {
        case 'x':
          result = firstOperand * secondOperand;
          parts.splice(parts.indexOf(j)-1, 3, result);
          break;
        case '÷' :
          result = firstOperand / secondOperand;
          parts.splice(parts.indexOf(j)-1, 3, result);
          break;
      }
      break;
    }
  }
  for (let i=0; i<expression.length-1; i++) {
    for (let j of parts) {
      if (!'+-'.includes(j)) continue;
      firstOperand = Number(parts[parts.indexOf(j)-1]);
      secondOperand = Number(parts[parts.indexOf(j)+1]);
      switch(j) {
        case '+' :
          result = firstOperand + secondOperand;
          parts.splice(parts.indexOf(j)-1, 3, result);
          break;
        case '-' :
          result = firstOperand - secondOperand;
          parts.splice(parts.indexOf(j)-1, 3, result);
          break;
      }
      break;
    }
  }
  return parts;
}

function equalEvent() {
  result = operate(parser(expression))[0];
  lastExpression.textContent = expressionFormat(expression);
  if (result === Infinity || isNaN(result)) {
    expression = '';
    output.textContent = 'Error :(';
    return;
  }
  if (result % 1 !== 0) result = (Math.round(result*1000000) / 1000000);
  expression = String(result);
  output.textContent = expression;
}

equal.addEventListener('click', (e) => {
  if (parser(expression).length - getNums(expression).length === getNums(expression).length - 1 && parser.length >= 3) {
    equalEvent();
  }
});

interactions.forEach(interaction => {
  interaction.addEventListener('click', (e) => {
    target = interaction.textContent;
    switch(target) {
      case 'AC':
        expression = '';
        lastInput = '';
        parts = [];
        nums = [];
        lastNumber = '';
        lastSymbol = '';
        lastExpression.textContent = '';
        output.textContent = expression;
        break;
      case 'C':
        expression = expression.replace(/.$/, '');
        output.textContent = expressionFormat(expression);
        break;
    };
  });
});