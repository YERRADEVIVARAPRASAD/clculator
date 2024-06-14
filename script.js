let displayValue = "0";
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
  const display = document.getElementById("display");
  display.textContent = displayValue;
}

updateDisplay();

function inputDigit(digit) {
  if (waitingForSecondOperand === true) {
    displayValue = digit;
    waitingForSecondOperand = false;
  } else {
    displayValue = displayValue === "0" ? digit : displayValue + digit;
  }
  updateDisplay();
}

function inputDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
    updateDisplay();
  }
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(displayValue);

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstOperand = result;
  }

  waitingForSecondOperand = true;
  operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
  switch (operator) {
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "*":
      return firstOperand * secondOperand;
    case "/":
      return firstOperand / secondOperand;
    case "%":
      return firstOperand % secondOperand;
    default:
      return secondOperand;
  }
}

function performOperation() {
  const inputValue = parseFloat(displayValue);

  if (operator && firstOperand !== null) {
    displayValue = calculate(firstOperand, inputValue, operator);
    firstOperand = null;
    operator = null;
    updateDisplay();
  }
}

function clearDisplay() {
  displayValue = "0";
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay();
}

// Add event listeners for button clicks
document.querySelectorAll(".digits button")
  .forEach(button => {
    button.addEventListener("click", () => {
      inputDigit(button.textContent);
    });
  });

document.querySelectorAll(".operators button")
  .forEach(button => {
    button.addEventListener("click", () => {
      handleOperator(button.textContent);
    });
  });

document.querySelector(".decimal")
  .addEventListener("click", inputDecimal);

document.querySelector(".equal")
  .addEventListener("click", performOperation);
