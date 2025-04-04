const bill = document.querySelector('.bill-input');
const numberOfPeople = document.querySelector('.people-input');
const tipBtn = document.querySelectorAll('.tip-btn');
const peopleValidateText = document.querySelector('.validate-text-people');
const billValidateText = document.querySelector('.validate-text-bill');
const customTip = document.querySelector('.custom-tip');
const calculateBtn = document.querySelector('.btn-calculate');
const displayTipAmount = document.querySelector('.display-tip-amount');
const displayTotalAmount = document.querySelector('.display-total-amount');
const resetBtn = document.querySelector('.btn-reset');
let billAmount = 0;
let tipAmount = 0;
let peopleNumber = 0;
let customTipValue = 0;

resetBtn.disabled = true;
peopleValidateText.style.display = 'none';
billValidateText.style.display = 'none';

const onInput = (e) => {
  billAmount = parseFloat(e.target.value) || 0;
  if (billAmount <= 0) {
    billValidateText.style.display = 'flex';
    billValidateText.style.color = '#ff4545';
    bill.style.border = '2px solid #ff4545';
  } else {
    billValidateText.style.display = 'none';
    bill.style.border = 'none';
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

const inputCustomTip = (e) => {
  customTipValue = parseFloat(e.target.value) || 0;
  tipAmount = (customTipValue / 100) * billAmount;
  tipBtn.forEach((button) => {
    button.classList.remove('active');
  });

  checkResetState();
};

const people = (e) => {
  peopleNumber = parseFloat(e.target.value);
  if (isNaN(peopleNumber) || peopleNumber < 1) {
    peopleValidateText.style.display = 'flex';
    peopleValidateText.style.color = '#ff4545';
    numberOfPeople.style.border = '2px solid #ff4545';
  } else {
    peopleValidateText.style.display = 'none';
    numberOfPeople.style.border = 'none';

    return;
  }

  checkResetState();
};

// Calculate
const calculateTip = (e) => {
  if (
    billAmount <= 0 ||
    peopleNumber <= 0 ||
    isNaN(billAmount) ||
    isNaN(peopleNumber)
  ) {
    alert('Please fill in all fields with valid values.');
    return;
  }

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
  customTipValue = 0;

  bill.value = '';
  customTip.value = '';
  numberOfPeople.value = '';

  displayTipAmount.textContent = '$0.00';
  displayTotalAmount.textContent = '$0.00';

  tipBtn.forEach((button) => {
    button.classList.remove('active');
  });

  checkResetState();
};

const checkResetState = () => {
  if (
    bill.value ||
    numberOfPeople.value ||
    customTip.value ||
    document.querySelector('.active')
  ) {
    resetBtn.disabled = false;
    resetBtn.classList.remove('btn-reset-disabled');
  } else {
    resetBtn.disabled = true;
    resetBtn.classList.add('btn-reset-disabled');
  }
};

checkResetState();

// EventListeners
bill.addEventListener('input', onInput);
customTip.addEventListener('input', inputCustomTip);
numberOfPeople.addEventListener('input', people);
calculateBtn.addEventListener('click', calculateTip);
tipBtn.forEach((button) => button.addEventListener('click', selectTip));
resetBtn.addEventListener('click', resetCalculation);
