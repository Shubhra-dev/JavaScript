'use strict';

let hiddenNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const changeMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
const changeNumber = function (number) {
  document.querySelector('.number').textContent = number;
};
const changeBackground = function (color) {
  document.querySelector('body').style.backgroundColor = color;
};

document.querySelector('.check').addEventListener('click', function () {
  const userInput = Number(document.querySelector('.guess').value);

  if (!userInput) {
    changeMessage('No Number...');
  } else if (userInput !== hiddenNumber) {
    if (score > 1) {
      changeMessage(
        userInput > hiddenNumber
          ? 'Put a smaller number... '
          : 'Put a bigger number...'
      );
      changeBackground('#8e0606');
      setTimeout(() => {
        changeBackground('#222');
      }, 250);
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      changeMessage('Game Over...');
      document.querySelector('.score').textContent = 0;
      changeNumber(hiddenNumber);
      changeBackground('#8e0606');
    }
  } else if (userInput === hiddenNumber) {
    changeMessage('Correct Answer...');
    changeBackground('#60b347');
    changeNumber(hiddenNumber);
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  document.querySelector('.score').textContent = 20;
  changeMessage('Start Guessing...');
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  changeNumber('?');
  document.querySelector('.guess').value = '';
  hiddenNumber = Math.trunc(Math.random() * 20) + 1;
});
