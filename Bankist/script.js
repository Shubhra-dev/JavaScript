'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2023-02-22T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2023-02-17T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

const getCurrentBalance = function (acc) {
  const curB = acc.movements.reduce((acc, cur) => acc + cur, 0);
  return curB;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
//console.log(accounts);
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const updatUI = function (currentAccount) {
  displayApp(currentAccount);
  displayBalance(currentAccount.movements);
  displaySummary(currentAccount.movements);
};
const changeTitleDate = function () {
  const date = new Date();
  const option = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  };
  labelDate.textContent = new Intl.DateTimeFormat('bd-BD', option).format(date);
};
const getDayCount = function (from, to) {
  const dateToMs = 24 * 60 * 60 * 1000;
  return Math.abs(Math.round(from / dateToMs - to / dateToMs));
};

const getDateText = function (date) {
  const curDate = new Date();
  const moveDate = new Date(date);
  //console.log(curDate);
  console.log(date);
  const dayCount = getDayCount(+curDate, +moveDate);
  if (dayCount === 0) {
    return 'Today ';
  } else if (dayCount === 1) {
    return 'YesterDay ';
  } else if (dayCount <= 7) {
    return `${dayCount} days ago `;
  } else {
    return `${String(moveDate.getDate()).padStart(2, 0)}/${String(
      moveDate.getMonth() + 1
    ).padStart(2, 0)}/${moveDate.getFullYear()} `;
  }
};

const displayApp = function (acc) {
  containerMovements.innerHTML = '';
  changeTitleDate();
  acc.movements.forEach(function (mov, i) {
    const dateText = getDateText(acc.movementsDates[i]);
    console.log(dateText);
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } | ${type}</div>
    <div class="movements__date">${dateText}</div>
      <div class="movements__value">${Math.abs(mov)} €</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
const displayBalance = function (movements) {
  const balance = movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${balance.toFixed(2)} €`;
};

const displaySummary = function (movements) {
  const deposit = movements
    .filter(cur => cur > 0)
    .reduce((acc, cur) => acc + cur, 0);
  const withdraw = movements
    .filter(cur => cur < 0)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumIn.textContent = `${deposit.toFixed(2)} €`;
  labelSumOut.textContent = `${Math.abs(withdraw).toFixed(2)} €`;
};

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(Number(inputLoginPin.value));
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back , ${currentAccount.owner}`;
    displayApp(currentAccount);
    updatUI(currentAccount);
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //inputLoginUsername.style.display = inputLoginPin.style.display = 'none';
    containerApp.style.opacity = 100;
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transAmount = Number(inputTransferAmount.value);
  const transAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  if (
    transAmount > 0 &&
    transAccount &&
    transAmount <= getCurrentBalance(currentAccount) &&
    transAccount.username !== currentAccount.username
  ) {
    currentAccount.movements.push(transAmount * -1);
    currentAccount.movementsDates.push(new Date().toISOString());
    transAccount.movements.push(transAmount);
    transAccount.movementsDates.push(new Date().toISOString());
    inputTransferTo.value = inputTransferAmount.value = '';
    inputTransferAmount.blur();
    updatUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if (loanAmount > 0) {
    currentAccount.movements.push(loanAmount);
    currentAccount.movementsDates.push(new Date().toISOString());
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
    updatUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const accIndex = accounts.findIndex(
      acc => acc.pin === Number(inputClosePin.value)
    );
    accounts.splice(accIndex, 1);
    inputCloseUsername.value = inputClosePin.value = '';
    inputClosePin.blur();
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started`;
  }
});

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  const sortTxt = btnSort.textContent;
  //console.log(sortTxt);
  currentAccount.movements.reverse();
  currentAccount.movementsDates.reverse();
  updatUI(currentAccount);
  btnSort.textContent = `${
    sortTxt === '↓ Ascending' ? '↓ Dscending' : '↓ Ascending'
  }`;
});
