function eval() {
    // Do not use eval!!!
    return;
}

const operators = {          /*задаю объект с основными операторами*/
    "+" : (a, b) => a + b,
    "-" : (a, b) => a - b,
    "*" : (a, b) => a * b,
    "/": (a, b) => {
        if (b === 0) throw new Error("TypeError: Division by zero.");  /*проверяю деление на 0*/
        return a / b;
      }
}

function calculate(expr) {

    let calcArray = expr.split(" ");

    function calc(element1, element2){
        for (let i = 1; i < calcArray.length - 1; i++) {
            if (calcArray[i] == element1 || calcArray[i] == element2) {
                calcArray[i] = operators[ calcArray[i] ]( +calcArray[i-1], +calcArray[i+1] );
                calcArray.splice(i-1, 3, calcArray[i]);
                i--;
            }
        }
    }
    calc("*", "/");
    calc("+", "-");

    return +calcArray[0];
    }

    function Errors(expr){ /*проверка парности скобок*/
        let bracketOpen = expr.split('').filter(el => el === '(').length;
        let bracketClose = expr.split('').filter(el => el === ')').length;
        if (bracketOpen !== bracketClose) 
        throw new Error("ExpressionError: Brackets must be paired");

    
}

function expressionCalculator(expr) {
    Errors(expr);

    expr = expr.replace(/\s/g, "").replace(/(\*|\/|\+|\-)/g, " $& "); /*удаляю пробелы из строки и перевожу строку в массив*/

    if (expr.match(/\(/g) != null ) {
        for (let i = expr.match(/\(/g).length; i != 0; i--) {
            let calculator = expr.match(/(\([0-9\+\/\*\-. ]+\))/g)[0];
            let expression = calculator.slice( 1, calculator.length-1 );
            expr = expr.replace(calculator, calculate(expression));
        }
    }
  
    return calculate(expr);
}

module.exports = {
    expressionCalculator
}