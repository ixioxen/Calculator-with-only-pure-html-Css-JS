const normalModeBtn = document.querySelector('#normalModeBtn');
const carpetModeBtn = document.querySelector('#carpetModeBtn');
const normalCalculator = document.querySelector('#normalCalculator');
const carpetCalculator = document.querySelector('#carpetCalculator');

carpetCalculator.classList.add('hidden');

carpetModeBtn.addEventListener('click',function(){
    normalCalculator.classList.add('hidden');
    carpetCalculator.classList.remove('hidden');
})
normalModeBtn.addEventListener('click',function(){
    normalCalculator.classList.remove('hidden');
    carpetCalculator.classList.add('hidden');
})