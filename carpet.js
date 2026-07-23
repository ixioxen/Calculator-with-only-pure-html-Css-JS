let currentInput = '';
let price = '';
let showPlus = false;
let pieces = [];

const cNums = document.querySelectorAll('.carpetNumber');
const cClear = document.querySelector('#carpetClear');
const cDel = document.querySelector('#carpetDel');
const totoalQuanity = document.querySelector('#totalQuanity');
const totalYard = document.querySelector('#totalYard');
const totalAmount = document.querySelector('#totalAmount');
const expression = document.querySelector('#expression');
const cOperators = document.querySelectorAll('.carpetOperator');
const carpetDot = document.querySelector('#carpetDot');
const addPiece = document.querySelector('#addPiece');

function renderCarpet(){

    let text = pieces.join(" + ");

    if(text === "" && currentInput === ""){
        expression.textContent = "0";
    }
    else if(showPlus){
        expression.textContent = text + " + ";
    }
    else if(text !== "" && currentInput !== ""){
        expression.textContent = text + " + " + currentInput;
    }
    else{
        expression.textContent = currentInput;
    }

}
renderCarpet();

// number button
cNums.forEach(cNum => {
    cNum.addEventListener('click',function(event){
        currentInput += event.target.textContent;
        showPlus = false;
        renderCarpet();
    });
});

// + button 
addPiece.addEventListener('click',function(){
    if(currentInput === '') return;
    showPlus = true;
    pieces.push(currentInput);
    currentInput = '';
    renderCarpet()
});





