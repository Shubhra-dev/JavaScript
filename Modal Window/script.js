'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const showModals = document.querySelectorAll('.show-modal');
const closeModal = document.querySelector('.close-modal');

const closeModalF = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
for (let i = 0; i < showModals.length; i++) {
  showModals[i].addEventListener('click', function () {
    console.log('Click');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
}

closeModal.addEventListener('click', closeModalF);
overlay.addEventListener('click', closeModalF);


