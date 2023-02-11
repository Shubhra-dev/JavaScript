'use strict';

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

let currentScore = 0;

btRoll.addEventListener('click', function () {
  const dicePoint = Math.trunc(Math.random() * 6) + 1;

  diceElement.src = `dice-${dicePoint}.png`;
  diceElement.classList.remove('hidden');
  if (dicePoint !== 1) {
    currentScore += dicePoint;
    current0Element.textContent = currentScore;
  } else {
    currentScore = 0;
  }
});
