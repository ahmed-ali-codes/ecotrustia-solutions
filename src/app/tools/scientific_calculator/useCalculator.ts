import { useState } from 'react';

type Calculator = {
  displayValue: string;
  firstOperand: number | null;
  waitingForSecondOperand: boolean;
  operator: string | null;
  memory: number;
  history: string;
};

export const useCalculator = () => {
  const [calculator, setCalculator] = useState<Calculator>({
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
    memory: 0,
    history: '',
  });

  const inputDigit = (digit: string) => {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand) {
      setCalculator({
        ...calculator,
        displayValue: digit,
        waitingForSecondOperand: false,
      });
    } else {
      setCalculator({
        ...calculator,
        displayValue: displayValue === '0' ? digit : displayValue + digit,
      });
    }
  };

  const inputDecimal = (dot: string) => {
    if (calculator.waitingForSecondOperand) {
      setCalculator({
        ...calculator,
        displayValue: '0.',
        waitingForSecondOperand: false,
      });
      return;
    }

    if (!calculator.displayValue.includes(dot)) {
      setCalculator({
        ...calculator,
        displayValue: calculator.displayValue + dot,
      });
    }
  };

  const handleOperator = (nextOperator: string) => {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
      setCalculator({
        ...calculator,
        operator: nextOperator,
      });
      return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
      setCalculator({
        ...calculator,
        firstOperand: inputValue,
        waitingForSecondOperand: true,
        operator: nextOperator,
        history: `${inputValue} ${nextOperator}`,
      });
    } else if (operator) {
      const result = calculate(firstOperand!, inputValue, operator);

      setCalculator({
        ...calculator,
        displayValue: `${parseFloat(result.toFixed(7))}`,
        firstOperand: result,
        waitingForSecondOperand: true,
        operator: nextOperator,
        history: `${parseFloat(result.toFixed(7))} ${nextOperator}`,
      });
    }
  };

  const calculate = (
    firstOperand: number,
    secondOperand: number,
    operator: string
  ) => {
    switch (operator) {
      case '+': return firstOperand + secondOperand;
      case '-': return firstOperand - secondOperand;
      case '*': return firstOperand * secondOperand;
      case '/': return secondOperand !== 0 ? firstOperand / secondOperand : NaN;
      case '%': return firstOperand % secondOperand;
      case '^': return Math.pow(firstOperand, secondOperand);
      default: return secondOperand;
    }
  };

  const resetCalculator = () => {
    setCalculator({
      displayValue: '0',
      firstOperand: null,
      waitingForSecondOperand: false,
      operator: null,
      memory: calculator.memory,
      history: '',
    });
  };

  const handleEqual = () => {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && firstOperand !== null) {
      const result = calculate(firstOperand, inputValue, operator);
      setCalculator({
        ...calculator,
        displayValue: `${parseFloat(result.toFixed(7))}`,
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
        history: '',
      });
    }
  };

  const handleScientific = (fn: string) => {
    const current = parseFloat(calculator.displayValue);
    let result: number;

    switch (fn) {
      case 'sin': result = Math.sin(current * (Math.PI / 180)); break;
      case 'cos': result = Math.cos(current * (Math.PI / 180)); break;
      case 'tan': result = Math.tan(current * (Math.PI / 180)); break;
      case 'log': result = Math.log10(current); break;
      case 'ln': result = Math.log(current); break;
      case 'sqrt': result = Math.sqrt(current); break;
      case 'cbrt': result = Math.cbrt(current); break;
      case 'x2': result = Math.pow(current, 2); break;
      case 'x3': result = Math.pow(current, 3); break;
      case '1/x': result = current !== 0 ? 1 / current : NaN; break;
      case 'abs': result = Math.abs(current); break;
      case 'fact': result = factorial(current); break;
      case 'pi': result = Math.PI; break;
      case 'e': result = Math.E; break;
      case '+-': result = -current; break;
      case '%': result = current / 100; break;
      default: return;
    }

    setCalculator({
      ...calculator,
      displayValue: isNaN(result) || !isFinite(result) ? 'Error' : `${parseFloat(result.toFixed(7))}`,
      waitingForSecondOperand: false,
    });
  };

  const factorial = (n: number): number => {
    if (n < 0 || !Number.isInteger(n) || n > 170) return NaN;
    if (n <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  };

  const handleBackspace = () => {
    const { displayValue } = calculator;
    if (displayValue.length > 1) {
      setCalculator({
        ...calculator,
        displayValue: displayValue.slice(0, -1),
      });
    } else {
      setCalculator({
        ...calculator,
        displayValue: '0',
      });
    }
  };

  return {
    calculator,
    inputDigit,
    inputDecimal,
    handleOperator,
    resetCalculator,
    handleEqual,
    handleScientific,
    handleBackspace,
  };
};