const display = document.querySelector(".display");
const clearButton = document.querySelector("#clear");
const plusMinusButton = document.querySelector("#plusMinus");
const percentButton = document.querySelector("#percent");
const zeroButton = document.querySelector("#zero");
const equalsButton = document.querySelector("#equals");
const numberButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operator:not(:last-child)");

let currentOperator = "";
let firstOperand = "";

display.value = "0";

function clear() {
    display.value = "0";
    currentOperator = "";
    firstOperand = "";
}

function plusMinus() {
    if(display.value != "" && display.value != "Error") {
        display.value = display.value * (-1);
    }
}

function percentage() {
    if(display.value != "" && display.value != "Error") {
        display.value = display.value / 100;
    }
}

function appendToDisplay(event) {
    if(display.value === "Error") {
        clear()
    }
    // Decimal button has been clicked
    if(event.target.textContent === ".") {
        // If the display already includes a decimal, ignore the button click (there can only be one decimal point in a number)
        if(display.value.includes(".")) {
            return
        }
        // If the display is empty, add a leading 0 for readability 
        if(display.value === ""){
            display.value = "0"
        }
        // Add the decimal point to the display
        display.value = display.value + event.target.textContent;
    // A number button has been clicked
    } else {
        // If the first digit in the display is a zero and the user is not entering a decimal, replace display with the clicked number (there shouldn't be a leading zero)
        if(display.value[0] === "0" && display.value[1] != ".") {
            display.value = event.target.textContent;
        // Add the number to the display
        } else {
            display.value = display.value + event.target.textContent;
        }
    }
}

function calculate() {

    // Calculate the expression and set the display to the answer
    let secondOperand = Number(display.value)
    if(currentOperator === "+") {
        display.value = (firstOperand + secondOperand);
    } else if(currentOperator === "-") {
        display.value = (firstOperand - secondOperand);
    } else if(currentOperator === "x") {
        display.value = (firstOperand * secondOperand);
    } else if(currentOperator === "/"){
        result = firstOperand / secondOperand;
        // Check for division by zero
        if(Number.isFinite(result)){
            display.value = result;
        } else {
            display.value = "Error";
        }
    }

    // Calculation complete. Reset calculator
    currentOperator = "";
    firstOperand = "";
    operatorButtons.forEach(button => {
        button.style.backgroundColor = "orange";
    });
}

function setState(event) {

    // Reset operator button color to default orange in case there was already an operator button pressed
    operatorButtons.forEach(button => {
        button.style.backgroundColor = "orange";
    });

    // Set the current operator, save the first operand from the display, 
    // change the color of the pressed operator button to the "active" color, and reset display to 0 to prepare for input of the second operand
    currentOperator = event.target.textContent;
    firstOperand = Number(display.value);
    event.target.style.backgroundColor = "#FFD580";
    display.value = "0";
}

clearButton.addEventListener("click", clear);
plusMinusButton.addEventListener("click", plusMinus);
percentButton.addEventListener("click", percentage);
zeroButton.addEventListener("click", appendToDisplay);
equalsButton.addEventListener("click", calculate);
numberButtons.forEach(button => {
    button.addEventListener("click", appendToDisplay);
});
operatorButtons.forEach(button => {
    button.addEventListener("click", setState);
});