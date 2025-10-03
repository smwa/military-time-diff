const startTimeElement = document.getElementById('starttime');
const endTimeElement = document.getElementById('endtime');
const calculatedElement = document.getElementById('calculated');

const regexNonDigits = /\D/g;

const cleanupTimeInput = (input) => {
  const newInput = input.replace(regexNonDigits, '').padStart(4, '0');
  const firstHalf = parseInt(newInput.substring(0, 2), 10);
  const secondHalf = parseInt(newInput.substring(2, 4), 10);
  return [firstHalf, secondHalf];
};

const recalculate = () => {
  const startTime = cleanupTimeInput(startTimeElement.value);
  const endTime = cleanupTimeInput(endTimeElement.value);

  if (
    startTimeElement.value.length < 3
    || endTimeElement.value.length < 3
    || startTimeElement.value.length > 4
    || endTimeElement.value.length > 4
    || startTime[0] >= 24
    || endTime[0] >= 24
    || startTime[1] >= 60
    || endTime[1] >= 60
  ) {
    calculatedElement.innerText = '...';
    return;
  }

  if (endTime[0] < startTime[0]) {
    // Handle crossing midnight
    endTime = [endTime[0] + 24, endTime[1]];
  }
  let endMinutes = endTime[0] * 60 + endTime[1];
  const startMinutes = startTime[0] * 60 + startTime[1];

  if (endMinutes - startMinutes < 0.0) {
    endMinutes += 24 * 60;
  }

  const hours = ((endMinutes - startMinutes) / 60.0).toFixed(2);
  calculatedElement.innerText = `${hours}`;
}

if (startTimeElement != null) {
  startTimeElement.onchange = recalculate;
  startTimeElement.onkeyup = recalculate;
  startTimeElement.onpaste = recalculate;
  startTimeElement.oninput = recalculate;

  startTimeElement.onfocus = (e) => {
    e.target.select();
  }
}

if (endTimeElement != null) {
  endTimeElement.onchange = recalculate;
  endTimeElement.onkeyup = recalculate;
  endTimeElement.onpaste = recalculate;
  endTimeElement.oninput = recalculate;

  endTimeElement.onfocus = (e) => {
    e.target.select();
  }
}



const countupStartTimeElement = document.getElementById('countupstarttime');
const countupHoursElement = document.getElementById('countuphours');


const recalculateCountup = () => {
  const startTime = cleanupTimeInput(countupStartTimeElement.value);
  const hours = parseFloat(countupHoursElement.value);


  if (
    countupStartTimeElement.value.length < 3
    || countupStartTimeElement.value.length > 4
    || startTime[0] >= 24
    || startTime[1] >= 60
    || isNaN(hours)
  ) {
    calculatedElement.innerText = '...';
    return;
  }

  startTime[0] += Math.floor(hours);
  const min = Math.round(Math.ceil(hours) - Math.floor(hours) * 60.0);
  startTime[1] += min;
  if (startTime[1] >= 60) {
    startTime[0] += 1;
    startTime[1] -= 60;
  }
  if (startTime[0] >= 24) {
    startTime[0] -= 24;
  }

  calculatedElement.innerText = `${startTime[0]}:${startTime[1]}`;
}

if (countupStartTimeElement != null) {
  countupStartTimeElement.onchange = recalculateCountup;
  countupStartTimeElement.onkeyup = recalculateCountup;
  countupStartTimeElement.onpaste = recalculateCountup;
  countupStartTimeElement.oninput = recalculateCountup;

  countupStartTimeElement.onfocus = (e) => {
    e.target.select();
  }
}

if (countupHoursElement != null) {
  countupHoursElement.onchange = recalculateCountup;
  countupHoursElement.onkeyup = recalculateCountup;
  countupHoursElement.onpaste = recalculateCountup;
  countupHoursElement.oninput = recalculateCountup;

  countupHoursElement.onfocus = (e) => {
    e.target.select();
  }
}
