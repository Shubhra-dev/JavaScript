'use strict';

const imageContainer = document.querySelector('.images');

const wait = function (sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
};