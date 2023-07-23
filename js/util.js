const ALERT_SHOW_TIME = 5000;

const getRandomInteger = (a,b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomMassive = (min, max, length) => {
  const massive = [];
  for (let i = 0; i < length; i++){
    let currentValue = getRandomInteger(min, max);
    while(massive.includes(currentValue)){
      currentValue = getRandomInteger(min, max);
    }
    massive.push(currentValue);
  }
  return massive;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscape = (evt) => evt.key === 'Escape';

export { createRandomMassive, isEscape, showAlert};
