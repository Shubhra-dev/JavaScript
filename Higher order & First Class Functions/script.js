'use strict';
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//higher order Functions -> functions taking as a parameter
const transFormer = function (str, fun) {
  console.log(`Original : ${str}`);

  console.log(`Transformed: ${fun(str)}`);

  console.log(`Transformed by: ${fun.name}`);
};

//first class function -> functions use as value
transFormer('JavaScript is the best!!!!!', upperFirstWord);
transFormer('JavaScript is the best!!!!!', oneWord);

////higher order Functions -> functions returns function

const greeting = function (greet) {
  return function (name) {
    console.log(`${greet} ${name}`);
  };
};

const greetHi = greeting('Hi');
greetHi('Adam');
greeting('Hello')('Mr');
