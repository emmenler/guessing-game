'use strict';

// This array stores min and max values, if new values are set i simply add them to the end of array and use the new ones
const arrMinMax = [1, 20];

// These are default min and max values
let minRange = arrMinMax[arrMinMax.length - 2];
let maxRange = arrMinMax[arrMinMax.length - 1];

// These are score and highscore values
let currentScore = maxRange - minRange + 1;
let currentHighScore = 0;

// This variable stores the random number that user needs to guess and is reset when you restart the game
let hiddenNumber = Math.trunc(Math.random() * maxRange) + 1;

// These are active elements selector variables
const restartBtn = document.querySelector('.btn-restart');
const restartSaveBtn = document.querySelector('.btn-save');
const submitGuessBtn = document.querySelector('.btn-submit');
const inputGuessInp = document.querySelector('.input-guess');
const openMenuBtn = document.querySelector('.btn-menu');
const closeMenuBtn = document.querySelector('.btn-menu-close');

// These are display-only elements selector variables
const hiddenNumberEl = document.querySelector('.hidden-number');
const minRangeEl = document.querySelector('.min-range');
const maxRangeEl = document.querySelector('.max-range');
const statusMsgEl = document.querySelector('.msg-status');
const scoreValueEl = document.querySelector('.value-score');
const highscoreValueEl = document.querySelector('.value-highscore');
const bodyEl = document.querySelector('body');

// This is game-relied event handler
submitGuessBtn.addEventListener('click', submitGuess);

// These are restart event handlers
restartBtn.addEventListener('click', restartGame);
// restartSaveBtn.addEventListener('click');

// These are menu-relied event handlers
openMenuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);

// These are keybord global event handlers

// This function checks if the guess is correct or not after pressing submit button
function submitGuess() {
  const guess = Number(inputGuessInp.value);
  console.log(`guess = ${guess}`);
  if (guess < minRange || guess > maxRange) {
    statusMsgEl.textContent = `Your guess is not in range!`;
  } else if (guess !== hiddenNumber) {
    countScore();
    if (currentScore > 0) {
      wrongGuess(guess);
    } else {
      statusMsgEl.textContent = `Game over :(`;
      displayLose();
      submitGuessBtn.removeEventListener('click', submitGuess);
    }
  } else if (guess === hiddenNumber && currentScore > 0) {
    statusMsgEl.textContent = `Correct!`;
    displayWin();
    submitGuessBtn.removeEventListener('click', submitGuess);
  }
}

// This function checks if guess is higher or lower than the rigth number and displays an according message
function wrongGuess(guess) {
  if (guess > hiddenNumber) {
    statusMsgEl.textContent = `Too hot!`;
    displayHot();
  } else if (guess < hiddenNumber) {
    statusMsgEl.textContent = `Too cold!`;
    displayCold();
  }
}

// This function checks is score is higher than 0 and if true reduces score by 1
function countScore() {
  if (currentScore > 0) {
    currentScore--;
    document.querySelector('.value-score').textContent = currentScore;
  }
}

// This function checks if current score > current highscore. If true it sets highscore to current score
function countHighScore(score) {
  if (score > currentHighScore) {
    currentHighScore = score;
    highscoreValueEl.textContent = currentHighScore;
  }
}

// These functions change the appearance of the ui depending on the guess when player submits his guess.
function displayWin() {
  openMenuBtn.classList.remove('cold', 'hot');
  hiddenNumberEl.textContent = hiddenNumber;
  countHighScore(currentScore);
  bodyEl.style.backgroundColor = '#cfeb88';
  openMenuBtn.classList.add('win');
}

function displayLose() {
  openMenuBtn.classList.remove('cold', 'hot');
  bodyEl.style.backgroundColor = '#50657b';
  openMenuBtn.classList.add('lose');
}

function displayCold() {
  openMenuBtn.classList.remove('hot');
  bodyEl.style.backgroundColor = '#a8b6b2';
  openMenuBtn.classList.add('cold');
}

function displayHot() {
  openMenuBtn.classList.remove('cold');
  bodyEl.style.backgroundColor = '#ff945f';
  openMenuBtn.classList.add('hot');
}

// This is restart function that resets the game with CURRENT ranges, while saving the highscore
function restartGame() {
  openMenuBtn.classList.remove('win', 'lose', 'cold', 'hot');
  bodyEl.style.backgroundColor = '#fcccb4';
  hiddenNumberEl.textContent = `?`;
  hiddenNumber = Math.trunc(Math.random() * maxRange) + 1;
  console.log(`secret num Res = ${hiddenNumber}`);

  statusMsgEl.textContent = `Take a guess...`;
  scoreValueEl.textContent = maxRange;
  inputGuessInp.value = ``;

  submitGuessBtn.addEventListener('click', submitGuess);
}

// This is restart & save function that resets the game with new max and min. It will run when player presses the 'Save and restart' button in settings menu.
function restartSaveGame() {}

function openMenu() {
  document.querySelector('.game-settings').classList.remove('hidden');
  document.querySelector('.overlay').classList.remove('hidden');
}

// Tests
console.log(`min = ${minRange}`);
console.log(`max = ${maxRange}`);
console.log(`secret num = ${hiddenNumber}`);
