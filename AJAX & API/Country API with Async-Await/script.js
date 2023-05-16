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

const getCountriesData = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await res.json();
    showCountries(data[0]);
    const ngh = data[0].borders?.[0];
    console.log(ngh);
    if (!ngh) return;

    const nghC = await fetch(`https://restcountries.com/v3.1/alpha/${ngh}`);
    const nghData = await nghC.json();
    showCountries(nghData[0], 'neighbour');
  } catch (err) {
    console.log(err);
  }
};

const whereAmI = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    const response = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=731171521189182594770x58205`
    );
    const data = await response.json();
    getCountriesData(data.country);
  } catch (err) {
    console.log(err);
  }
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
whereAmI();