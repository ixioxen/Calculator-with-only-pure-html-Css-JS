let currentInput = '';
let yardPrice = '';
let inchPrice = '';
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
    }else if(currentInput == '' && text !== ''){
         expression.textContent = text + '+';
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

    // ui design handling
    let textLength = expression.textContent.length;
    if(textLength <= 20 ){
        expression.style.fontSize = '30px';
    }else{
        expression.style.fontSize = '20px';
    }
}
renderCarpet();

// number button
cNums.forEach(cNum => {
    cNum.addEventListener('click',function(event){
    if(currentInput == '' && event.target.textContent === '0'){
        return;
    }
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

// carpet Dot validatoion
carpetDot.addEventListener('click',function(){
    if(currentInput.includes('.')){
        return;
    }else{
        currentInput += '.';
    }
    renderCarpet()
});

// dellete button
cDel.addEventListener('click',function(){
    if(currentInput !== ''){
        currentInput = currentInput.slice(0, -1);
    }else if(pieces.length > 0){
        currentInput = pieces.pop();
        showPlus = false;  
    }
    console.log(currentInput);
    console.log(pieces)
    
    renderCarpet()
});

// clear features 
cClear.addEventListener('click',function(){
    pieces = [];
    currentInput = '';
    renderCarpet();
})

// calculation
function carpetCalculation(){
    let totalYard = 0;
    let totalInch = 0;
    pieces.forEach(pieceItem => {
        let parts = pieceItem.split('.');
        let yard = Number(parts[0]);
        let inch = Number(parts[1] || 0);
        totalYard += yard;
        totalInch += inch;
    });
    let extraYard = Math.floor(totalInch / 36);
    let extraInch = totalInch % 36;
    totalYard += extraYard;
    totalInch = extraInch;
    return{
        totalYard,
        totalInch
    };
};

// 3600 button
// cOperators.forEach(cOperator => {
//     cOperator.addEventListener('click',function(event){
//         if(event.target.textContent == 3600 ){
            


//         }
//     })
// })