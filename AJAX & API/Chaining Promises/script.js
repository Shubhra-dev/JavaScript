'use strict';

const imageContainer = document.querySelector('.images');

const wait = function (sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imageContainer.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found!'));
    });
  });
let curImg;

createImage('img/img-1.jpg')
  .then(img => {
    curImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    curImg.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    curImg = img;
    console.log('Image 2 loaded');
    return wait(1);
  })
  .catch(err => console.log(err));