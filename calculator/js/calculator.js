let runningTotal = 0; //what was previously on screen
let buffer = '0'; // what is currently on screen
let previousOperator = '';

const screen = document.querySelector('.screen');

function buttonClick(value) {
    //handle number and symbols differently
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
        }
    else {
        handleNumber(value);
    }
    //replace the text inside the screen section with what is on buffer
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol) {
        case 'C': 
            cleanAll();
            break;
        case '←':
            cleanOne(buffer);
            break;
        case '+':
            handleMath('+');
            break;
        case '−':
            handleMath('−');
            break;
        case '×':
            handleMath('×');
            break;
        case '÷':
            handleMath('÷');
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            else {
                flushOperation(parseInt(buffer));
                buffer = runningTotal;
                //clean old values
                previousOperator = null;
                runningTotal = 0;
            }
    }
}

function handleMath(symbol) {
    if (buffer === '0'){
        //do nothing
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal == 0) {
        runningTotal = intBuffer;
    }
    else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}


function flushOperation(intBuffer){
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    }
    else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    }
    else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    }
    else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if (buffer === '0') {
        buffer = numberString;
    }
    else {
        buffer += numberString;
    }
}

function cleanOne(){
    if (buffer.length > 1){
        buffer = Array.from(buffer).slice(0,-1).join('');
    }
    else {
        buffer = '0';
    }
}

function cleanAll(){
    buffer = '0';
    runningTotal = 0;
}



function init() {
    //whenever a 'click' event happens inside 'calc-buttons' it will trigger the function buttonClick with the event information, in our case the innerText of the event target
    document.querySelector('.calc-buttons')
        .addEventListener("click", function(event){
            buttonClick(event.target.innerText);
        })
}

init();
