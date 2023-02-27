'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth Scroll Button
btnScroll.addEventListener('click', function (e) {
  //e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Smooth Scroll Nav menu
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed Display
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  const contentNum = clicked.dataset.tab;
  console.log(contentNum);
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${contentNum}`)
    .classList.add('operations__content--active');
});

//Sticky Menu

const nav = document.querySelector('.nav');
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const parent = link.closest('.nav');
    const siblings = parent.querySelectorAll('.nav__link');
    const logo = parent.querySelector('img');

    siblings.forEach(function (el) {
      if (el !== link) {
        el.style.opacity = logo.style.opacity = opacity;
      }
    });
  }
};

nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});


const header = document.querySelector('.header');
const navMargin = nav.getBoundingClientRect().height;

const stickyMenu = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObs = new IntersectionObserver(stickyMenu, {
  root: null,
  threshold: 0,
  rootMargin: `-${navMargin}px`,
});
headerObs.observe(header);

// Section Reveal on Scroll

const sectionsObs = new IntersectionObserver(scrollEffect, {
  root: null,
  threshold: 0.17,
});

sections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionsObs.observe(section);
});

