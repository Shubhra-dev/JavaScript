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

const diceHide = function () {
  diceElement.classList.add('hidden');
};
const updateCurrentScore = function (player, score) {
  player.textContent = score;
};
const setTotal = function (player, score) {
  player.textContent = score;
};

const addActiveClass = function (player) {
  player.classList.add('player--active');
};
const removeActiveClass = function (player) {
  player.classList.remove('player--active');
};
const addWinner = function (player) {
  player.classList.add('player--winner');
};

let currentScore = 0;
let activePlayer = 0;
let player0Total = 0;
let player1Total = 0;

btRoll.addEventListener('click', function () {
  if (player0Total <= 100 && player1Total <= 100) {
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
  }
});

btHold.addEventListener('click', function () {
  if (player0Total <= 100 && player1Total <= 100) {
    if (activePlayer === 0) {
      player0Total += currentScore;
      if (player0Total >= 100) {
        setTotal(score0Element, player0Total);
        diceHide();
        addWinner(player0Active);
      } else {
        updateCurrentScore(current0Element, 0);
        removeActiveClass(player0Active);
        activePlayer = 1;
        addActiveClass(player1Active);
        setTotal(score0Element, player0Total);
      }
    } else {
      player1Total += currentScore;
      if (player1Total >= 100) {
        setTotal(score1Element, player1Total);
        diceHide();
        addWinner(player1Active);
      } else {
        updateCurrentScore(current1Element, 0);
        removeActiveClass(player1Active);
        activePlayer = 0;
        addActiveClass(player0Active);
        setTotal(score1Element, player1Total);
      }
    }
    currentScore = 0;
  }
});

btNew.addEventListener('click', function () {
  currentScore = 0;
  activePlayer = 0;
  player0Total = 0;
  player1Total = 0;
  activePlayer = 0;
  player0Active.classList.remove('player--winner');
  player1Active.classList.remove('player--winner');
  diceHide();
  setTotal(score0Element, 0);
  setTotal(score1Element, 0);
  updateCurrentScore(current0Element, 0);
  updateCurrentScore(current1Element, 0);
});
