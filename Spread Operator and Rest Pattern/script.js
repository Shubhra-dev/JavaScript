'use strict';

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  orderPizza: function (a, b, c) {
    console.log(`pizza with ${a}, ${b} and ${c}`);
  },
  orderPasta: function (...arr) {
    console.log(`Pasta with ${arr}`);
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
//Spread Operators
const array1 = [1, 2, 3];
const array2 = [5, 6, 7];

const mergedArray = [array1, array2];
const mergedArrayBySp = [...array1, ...array2];

console.log(mergedArray);
console.log(mergedArrayBySp);

const pizzaIn = ['Cheese', 'BBQ Chicken', 'Capsicum'];
restaurant.orderPizza(...pizzaIn);
// Destructuring Objects with spread operator

const restaurantCopy = { ...restaurant };
console.log(restaurant, restaurantCopy);
restaurantCopy.name = 'Cafe Bistro EL';
console.log(restaurant.name, restaurantCopy.name);

const extendedRestaurantCopy = {
  founder: 'DD jl',
  ...restaurant,
  dessert: ['doi', 'misti'],
};
console.log(extendedRestaurantCopy);


//Rest Pattern
const [a, b, ...others] = [1, 2, 3, 4, 5, 6];
console.log(a, b, others);

const [aa, , bb, ...others2] = [1, 2, 3, 4, 5, 6]; // never pick skipped element
console.log(aa, bb, others2);

//spread and rest combined in expression
const [pizza, pasta, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

console.log(pizza, pasta, otherFood);
// Rest uses in function
restaurant.orderPasta('Cheese');
restaurant.orderPasta('Cheese', 'Mushroom');
restaurant.orderPasta('Cheese', 'mushroom', 'chicken');

// spread and rest combined in function
restaurant.orderPasta([...restaurant.starterMenu]);

// rest in objects
const { sat, ...weekday } = restaurant.openingHours;
console.log(sat, weekday);
