const previousOpText = document.querySelector("[data-previousOp]");
const currentOpText = document.querySelector("[data-currentOp]");
const clearButton = document.querySelector("[data-clear]");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation-button]");
const backspaceButton = document.querySelector("[data-backspace]");
const equalButton = document.querySelector("[data-equal]");

class Calculator {
  constructor(previousOpText, currentOpText) {
    this.previousOpText = previousOpText;
    this.currentOpText = currentOpText;
    this.clear();
  }

  formatDisplayNum(number) {
    const stringNumber = number.toString();

    const integerDigit = parseFloat(stringNumber.split(".")[0]);
    const decimalDigit = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigit)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigit.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigit != null) {
      return `${integerDisplay}.${decimalDigit}`;
    } else {
      return integerDisplay;
    }
  }

  backspace() {
    this.currentOp = this.currentOp.toString().slice(0, -1);
  }

  calculate() {
    let result;

    const previousOpFloat = parseFloat(this.previousOp);
    const currentOpFloat = parseFloat(this.currentOp);

    if (isNaN(previousOpFloat) || isNaN(currentOpFloat)) return;

    switch (this.operation) {
      case "+":
        result = previousOpFloat + currentOpFloat;
        break;

      case "-":
        result = previousOpFloat - currentOpFloat;
        break;

      case "*":
        result = previousOpFloat * currentOpFloat;
        break;

      case "÷":
        result = previousOpFloat / currentOpFloat;
        break;

      default:
        break;
    }

    this.currentOp = result;
    this.operation = undefined;
    this.previousOp = "";
  }

  chooseOperation(operation) {
    if (this.currentOp === "") return;

    if (this.previousOp != "") {
      this.calculate();
    }

    this.operation = operation;

    this.previousOp = this.currentOp;
    this.currentOp = "";
  }

  addNumber(number) {
    if (this.currentOp.includes(".") && number === ".") return;
    this.currentOp = `${this.currentOp}${number.toString()}`;
  }

  clear() {
    this.previousOp = "";
    this.currentOp = "";
    this.operation = undefined;
  }

  updateTela() {
    this.previousOpText.innerText = `${this.formatDisplayNum(this.previousOp)}${
      this.operation || ""
    }`;
    this.currentOpText.innerText = this.formatDisplayNum(this.currentOp);
  }
}

const calculator = new Calculator(previousOpText, currentOpText);

for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.addNumber(numberButton.innerText);
    calculator.updateTela();
  });
}

for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateTela();
  });
}

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateTela();
});

equalButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateTela();
});

backspaceButton.addEventListener("click", () => {
  calculator.backspace();
  calculator.updateTela();
});
