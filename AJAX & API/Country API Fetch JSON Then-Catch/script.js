'use strict';
// https://restcountries.com/v2/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imageContainer = document.querySelector('.images');

///////////////////////////////////////
const showCountries = function (data, className) {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4></h4>
    <p class="country__row"><span>👫</span>${(
      data.population / 1000000
    ).toFixed(1)}M people</p>
    <p class="country__row"><span>🗣️</span>${
      data.languages[Object.keys(data.languages)[0]]
    }</p>
    <p class="country__row"><span>💰</span>${
      data.currencies[Object.keys(data.currencies)[0]].name
    }</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
// const getCountriesData = function (country) {
//   const req = new XMLHttpRequest();
//   req.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   req.send();
//   req.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     showCountries(data);
//     const neighbourReq = new XMLHttpRequest();
//     const [ngh] = data.borders;
//     neighbourReq.open('GET', `https://restcountries.com/v3.1/alpha/${ngh}`);
//     neighbourReq.send();
//     neighbourReq.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);
//       showCountries(data2, 'neighbour');
//     });
//   });
// };

const getCountriesData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      showCountries(data[0]);
      const ngh = data[0].borders?.[0];
      console.log(!ngh);
      if (!ngh) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${ngh}`);
    })
    .then(response => response.json())
    .then(data => showCountries(data[0], 'neighbour'));
};

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=731171521189182594770x58205`
      );
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Problem With geocode');
      }
      return response.json();
    })
    .then(data => {
      console.log(data.country);
      getCountriesData(data.country);
    })
    .catch(err => {
      console.log(err.message);
    });
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
//whereAmI(-33.933, 18.474);
//whereAmI(52.508, 13.381);
whereAmI();