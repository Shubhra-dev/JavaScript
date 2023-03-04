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
const sections = document.querySelectorAll('.section');
const scrollEffect = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  } else {
    return;
  }
};

const sectionsObs = new IntersectionObserver(scrollEffect, {
  root: null,
  threshold: 0.17,
});

sections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionsObs.observe(section);
});

//Slider

const slides = document.querySelectorAll('.slide');
const slideBtnRight = document.querySelector('.slider__btn--right');
const slideBtnLeft = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.dots');
let currSlide = 0;
let maxSlide = 0;
// dot
const dotBuilder = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide = "${i}"></button>`
    );
  });
};
dotBuilder();
const inactiveDot = function () {
  document
    .querySelectorAll('.dots__dot')
    .forEach(el => el.classList.remove('dots__dot--active'));
};
const activeDot = function (i) {
  document
    .querySelector(`.dots__dot[data-slide ="${i - 1}"]`)
    .classList.add('dots__dot--active');
};
slides.forEach(function (sl, i) {
  sl.style.transform = `translateX(${i * 100}%)`;
  sl.style.overflow = 'hidden';
  maxSlide++;
});
const slideSideRight = function () {
  currSlide++;
  slides.forEach(function (sld, i) {
    if (currSlide === maxSlide) {
      currSlide = 0;
    }
    const slideX = i - currSlide;
    sld.style.transform = `translateX(${slideX * 100}%)`;
  });
  console.log(currSlide);
  inactiveDot();
  activeDot(currSlide);
};
const slideSideLeft = function () {
  currSlide--;
  slides.forEach(function (sl, i) {
    if (currSlide === -1) {
      currSlide = maxSlide - 1;
    }
    const slideX = i - currSlide;
    sl.style.transform = `translateX(${slideX * 100}%)`;
    console.log(currSlide);
    inactiveDot();
    activeDot(currSlide);
  });
};

slideBtnRight.addEventListener('click', function () {
  slideSideRight();
});
slideBtnLeft.addEventListener('click', function () {
  slideSideLeft();
});

document.addEventListener('keydown', function (e) {
  e.key === 'ArrowLeft' && slideSideLeft();
  e.key === 'ArrowRight' && slideSideRight();
});

//Lazy load images

const targetImages = document.querySelectorAll('img[data-src]');

const loadImg = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.05,
});

targetImages.forEach(img => imgObserver.observe(img));