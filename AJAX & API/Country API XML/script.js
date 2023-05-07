'use strict';
// https://restcountries.com/v2/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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
const getCountriesData = function (country) {
  const req = new XMLHttpRequest();
  req.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  req.send();
  req.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    showCountries(data);
    const neighbourReq = new XMLHttpRequest();
    const [ngh] = data.borders;
    neighbourReq.open('GET', `https://restcountries.com/v3.1/alpha/${ngh}`);
    neighbourReq.send();
    neighbourReq.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      showCountries(data2, 'neighbour');
    });
  });
};

getCountriesData('brazil');
