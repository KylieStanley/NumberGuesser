var rangeIncreased = document.querySelector('.range-increased');
var guessButton = document.querySelector('#guess-button');
var clearButton = document.querySelector('#clear-button');
var yourGuessWas = document.querySelector('#guess-value');
var yourGuess = document.querySelector('#display-guess');
var tooHighLow = document.querySelector('#too-high-low');
var numberInput = document.querySelector('.number-input');
var resetButton = document.querySelector('.reset-button');
var randomNumber = Math.floor(Math.random() * 100 + 1);
var maxInt = parseInt(100, 10);
var minInt = parseInt(1, 10);

//generate a random number when input fields are typed in
function generateRandomNumber() {
  var maxInput = document.querySelector('.max-input');
  var minInput = document.querySelector('.min-input');
  maxInput = document.querySelector('.max-input');
  maxInt = parseInt(maxInput.value, 10);
  minInt = parseInt(minInput.value, 10);

  if (maxInput.value.length > 0 && minInput.value.length > 0) {
    randomNumber = Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
  } 
}

clearButton.addEventListener('click', clearInput);
guessButton.addEventListener('click', displayGuessInfo);

//change input to number and display information to user on correctness of guess
function displayGuessInfo() {
  rangeIncreased.innerText = '';
  
  var guessed = numberInput.value;
  var convertedToInt = parseInt(guessed, 10); 
  
  if (isNaN(convertedToInt)) {
    tooHighLow.innerText = 'This is not a number!';
    yourGuessWas.innerText = '';
    yourGuess.innerText = '';
  } else if (convertedToInt > maxInt || convertedToInt < minInt) {
    tooHighLow.innerText = 'Your number is outside the range!';
    yourGuessWas.innerText = '';
    yourGuess.innerText = '';
  } else if (convertedToInt === randomNumber) {
    tooHighLow.innerText = 'BOOM!';
    displayUserGuess();
    increaseRange();
  } else if (convertedToInt > randomNumber) {
    tooHighLow.innerText = 'That is too high';
    displayUserGuess();
  } else if (convertedToInt < randomNumber) {
    tooHighLow.innerText = 'That is too low';
    displayUserGuess();
  }
  enableResetButton();
};

//Display number guessed
function displayUserGuess() {
  yourGuessWas.innerText = 'Your last guess was';
  yourGuess.innerText = numberInput.value;
}

//Clears the input field
function clearInput() {
  numberInput.value = '';
  toggleClearButton();
}

//disables the clear button when field is blank
function toggleClearButton() {
  if (numberInput.value.length === 0) {
    clearButton.disabled = true;
  } else {
    clearButton.disabled = false;
  }
}

//Enables the reset button
function enableResetButton() {
  resetButton.disabled = false;
}


//Increases the range when correct
function increaseRange() {
  var maxInput = document.querySelector('.max-input');
  var newMaxInput = parseInt(maxInput.value, 10) + 10;
  maxInput.value = newMaxInput;
  numberInput.max = newMaxInput;

  var minInput = document.querySelector('.min-input');
  var newMinInput = parseInt(minInput.value, 10) - 10;
  minInput.value = newMinInput;
  numberInput.min = newMinInput;

  generateRandomNumber();
  rangeIncreased.innerHTML = '<p>Your max has increased by <strong>10</strong>!</p><p>Your min has decreased by <strong>10</strong>!</p>';
}

