'use strict';

const player0Active = document.querySelector('.player--0');
const player1Active = document.querySelector('.player--1');

const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const name0Element = document.getElementById('name--0');
const name1Element = document.getElementById('name--1');
const diceElement = document.querySelector('.dice');

const btNew = document.querySelector('.btn--new');
const btRoll = document.querySelector('.btn--roll');
const btHold = document.querySelector('.btn--hold');

const updateCurrentScore = function (player, score) {
  player.textContent = score;
};

const addActiveClass = function (player) {
  player.classList.add('player--active');
};
const removeActiveClass = function (player) {
  player.classList.remove('player--active');
};

let currentScore = 0;
let activePlayer = 0;

btRoll.addEventListener('click', function () {
  const dicePoint = Math.trunc(Math.random() * 6) + 1;

  diceElement.src = `dice-${dicePoint}.png`;
  diceElement.classList.remove('hidden');
  if (dicePoint !== 1) {
    currentScore += dicePoint;
    if (activePlayer === 0) {
      updateCurrentScore(current0Element, currentScore);
    } else {
      updateCurrentScore(current1Element, currentScore);
    }
  } else {
    if (activePlayer === 0) {
      updateCurrentScore(current0Element, 0);
      removeActiveClass(player0Active);
      activePlayer = 1;
      addActiveClass(player1Active);
    } else {
      updateCurrentScore(current1Element, 0);
      removeActiveClass(player1Active);
      activePlayer = 0;
      addActiveClass(player0Active);
    }
    currentScore = 0;
  }
});
