var numberInput = document.querySelector('.number-input');
var rangeIncreased = document.querySelector('.range-increased');
var guessButton = document.querySelector('#guess-button');
var clearButton = document.querySelector('#clear-button');
var yourGuessWas = document.querySelector('#your-guess-was');
var yourGuess = document.querySelector('#display-guess');
var tooHighLow = document.querySelector('#too-high-low');
var maxInput = document.querySelector('.max-input');
var minInput = document.querySelector('.min-input');
var resetButton = document.querySelector('.reset-button');

//Display how many guesses user has made
var guessCount = document.querySelector('.guess-count-value');
guessCount.innerText = 0;
var counter = 0;

//Default random number anbd min/max on page load
var randomNumber = Math.floor(Math.random() * 100 + 1);
var maxInt = 100;
var minInt = 1;

//Guess and clear buttons
guessButton.addEventListener('click', displayGuessInfo);
clearButton.addEventListener('click', clearInput);
resetButton.addEventListener('click', resetPage);

//generate a random number when input fields are typed in or range increases
function generateRandomNumber() {
  maxInt = parseInt(maxInput.value, 10);
  minInt = parseInt(minInput.value, 10);

  if (maxInput.value.length > 0 && minInput.value.length > 0) {
    randomNumber = Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
  }
}

//change input to number and display information to user on correctness of guess
function displayGuessInfo() {
  rangeIncreased.innerText = '';
  
  var guessed = numberInput.value;
  var convertedToInt = parseInt(guessed, 10); 
  
  if (isNaN(convertedToInt)) {
    yourGuessWas.innerText = '';
    yourGuess.innerText = '';
    tooHighLow.innerText = 'This is not a number!';
  } else if (convertedToInt > maxInt || convertedToInt < minInt) {
    yourGuessWas.innerText = '';
    yourGuess.innerText = '';
    tooHighLow.innerText = 'Your number is outside the range!';
  }  else if (convertedToInt > randomNumber) {
    displayUserGuess();
    increaseGuessCount();
    tooHighLow.innerText = 'That is too high';
  } else if (convertedToInt < randomNumber) {
    displayUserGuess();
    increaseGuessCount();
    tooHighLow.innerText = 'That is too low';
  } else if (convertedToInt === randomNumber) {
    displayUserGuess();
    increaseGuessCount();
    increaseRange();
    tooHighLow.innerText = 'BOOM!';
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
  var newMaxInput = parseInt(maxInput.value, 10) + 10;
  maxInput.value = newMaxInput;
  numberInput.max = newMaxInput;

  var newMinInput = parseInt(minInput.value, 10) - 10;
  minInput.value = newMinInput;
  numberInput.min = newMinInput;

  counter = 0;
  generateRandomNumber();
  rangeIncreased.innerHTML = '<p>Your max has increased by <strong>10</strong>!</p><p>Your min has decreased by <strong>10</strong>!</p>';
}

function increaseGuessCount() {
  counter ++;
  guessCount.innerText = counter;
}

//Resets the page when reset is clicked
function resetPage() {
  numberInput.value = '';
  minInput.value = 1;
  maxInput.value = 100;
  yourGuessWas.innerText = '';
  yourGuess.innerText = '';
  tooHighLow.innerText = '';
  rangeIncreased.innerHTML = '';
  guessCount.innerText = 0;
  generateRandomNumber();
}