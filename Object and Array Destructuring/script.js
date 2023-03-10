'use strict';
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (stInd, mInd) {
    return [this.starterMenu[stInd], this.mainMenu[mInd]];
  },
  
  getOrder: function ({ startIndex, mainIndex = 0, time = 20, address }) {
    console.log(
      `You got a order of ${this.starterMenu[startIndex]} & ${this.mainMenu[mainIndex]}, which will deliver at ${address} in ${time}`
    );
  },
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};
// Destructuring Objects
const { mainMenu, openingHours, categories } = restaurant;
console.log(mainMenu, openingHours, categories);

//Chnaging the variable name
const { mainMenu: mainCr, openingHours: hours, categories: tags } = restaurant;
console.log(mainCr, hours, tags);

// Nested destructuring
const {
  fri: { open, close },
} = hours;
console.log(open, close);

// Default values
const { fri = [], sat = [], sun = [] } = hours;
console.log(fri, sat, sun);

//Method caling with destructuring obj
const obj2 = {
  mainIndex: 2,
  time: 22,
  address: 'Dhaka,Bd',
  startIndex: 1,
};
restaurant.getOrder(obj2);

restaurant.getOrder({
  address: 'Dhaka,Bd',
  startIndex: 2,
});

// Destructuring Arrays
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// Switching variables

[main, secondary] = [secondary, main];
console.log(main, secondary);

// Receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
