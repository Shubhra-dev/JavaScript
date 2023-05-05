'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Workout {
  id = Date.now();
  date = new Date();
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapEvent;
  #workout = [];

  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevation);
    containerWorkouts.addEventListener('click', this._movePopUp.bind(this));
  }
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Can get location');
        }
      );
    }
  }
  _viewMap(coord) {
    this.#map = L.map('map').setView(coord, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
  }
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    this._viewMap([latitude, longitude]);
  }
  _showForm(me) {
    form.classList.remove('hidden');
    inputDistance.focus();
    this.#mapEvent = me;
  }
  _hideForm() {
    inputDistance.value =
      inputCadence.value =
      inputDuration.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => {
      form.style.display = 'grid';
    }, 1000);
  }
  _toggleElevation() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkout(e) {
    const allValidNumber = (...inp) =>
      inp.every(input => Number.isFinite(input));
    const allPositive = (...inp) => inp.every(input => input > 0);
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let activity;
    e.preventDefault();

    if (type === 'running') {
      const cadence = +inputCadence.value;
      if (
        !(
          allValidNumber(distance, duration, cadence) &&
          allPositive(distance, duration, cadence)
        )
      ) {
        return alert('Numbers are not valid');
      }
      activity = new Running([lat, lng], distance, duration, cadence);
    }
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !(
          allValidNumber(distance, duration, elevation) &&
          allPositive(distance, duration)
        )
      ) {
        return alert('Numbers are not valid');
      }
      activity = new Cycling([lat, lng], distance, duration, elevation);
    }

    //push workout on workouts list
    this.#workout.push(activity);
    //display marker
    this._renderMarker(activity, type);
    //render new workout
    this._renderWorkout(activity, type);
    //hide the form
    this._hideForm();
    //save to local storage
  }
  _renderMarker(workout, type) {
    const date = String(workout.date);
    const activity = type[0].toUpperCase() + type.slice(1);
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${type}-popup`,
        })
      )
      .setPopupContent(
        ` ${type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${activity} on ${date.slice(
          4,
          10
        )}`
      )
      .openPopup();
  }
  _renderWorkout(workout, type) {
    const date = String(workout.date);
    const activity = type[0].toUpperCase() + type.slice(1);
    let html = `
    <li class="workout workout--${type}" data-id="${workout.id}">
      <h2 class="workout__title"> ${activity} on ${date.slice(4, 10)}</h2>
      <div class="workout__details">
        <span class="workout__icon">${type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
    `;
    if (type === 'running') {
      html += `
      <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.pace}</span>
      <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
    </div>
  </li>`;
    }
    if (type === 'cycling') {
      html += `
      <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>`;
    }

    form.insertAdjacentHTML('afterend', html);
  }
  _movePopUp(e) {
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const workoutItem = this.#workout.find(
      work => work.id === +workoutEl.dataset.id
    );
    this.#map.setView(workoutItem.coords, 13, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }
}
const app = new App();
