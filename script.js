const bill = document.querySelector('.bill-input');
const numberOfPeople = document.querySelector('.people-input');
const tipBtn = document.querySelectorAll('.tip-btn');
const customTip = document.querySelector('.custom.tip');
const calculateBtn = document.querySelector('.btn-calculate');
const displayTipAmount = document.querySelector('.display-tip-amount');
const displayTotalAmount = document.querySelector('.display-total-amount');
const resetBtn = document.querySelector('.btn-reset');
let billAmount = 0;
let tipAmount = 0;
let peopleNumber = 0;

resetBtn.disabled = true;

const onInput = (e) => {
  billAmount = parseFloat(e.target.value) || 0;
  if (billAmount <= 0) {
    alert("Bill can't be 0 or less");
  }

  checkResetState();
};

const selectTip = (e) => {
  let tip = parseFloat(e.target.dataset.percent);
  tipBtn.forEach((button) => button.classList.remove('active'));
  tipAmount = (tip / 100) * billAmount;
  e.target.classList.add('active');

  checkResetState();
};

// const inputCustomTip = (e) => {
//   console.log(e.target.value);
// };

const people = (e) => {
  peopleNumber = parseFloat(e.target.value);
  if (isNaN(peopleNumber) || peopleNumber < 1) {
    alert('Please enter a valid number greater than or equal to 1');
    return;
  }

  checkResetState();
};

// Calculate
const calculateTip = () => {
  let tipPerPerson = tipAmount / peopleNumber;
  displayTipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
  displayTotalAmount.textContent = `$${(
    (billAmount + tipAmount) /
    peopleNumber
  ).toFixed(2)}`;
};

const resetCalculation = () => {
  billAmount = 0;
  tipAmount = 0;
  peopleNumber = 0;

  bill.value = '';
  numberOfPeople.value = '';

  displayTipAmount.textContent = '$0.00';
  displayTotalAmount.textContent = '$0.00';

  tipBtn.forEach((button) => {
    button.classList.remove('active');
  });

  checkResetState();
};

const checkResetState = () => {
  if (bill.value || numberOfPeople.value || document.querySelector('.active')) {
    resetBtn.disabled = false;
    resetBtn.classList.remove('btn-reset-disabled');
  } else {
    resetBtn.disabled = true;
  resetBtn.classList.add('btn-reset-disabled');

  }
};

// EventListeners
bill.addEventListener('change', onInput);
// customTip.addEventListener('change', inputCustomTip);
numberOfPeople.addEventListener('change', people);
calculateBtn.addEventListener('click', calculateTip);
tipBtn.forEach((button) => button.addEventListener('click', selectTip));
resetBtn.addEventListener('click', resetCalculation);
