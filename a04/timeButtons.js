const time = {
  hourValue: `${hour()}`,
  minuteValue: `${minute()}`,
  secondValue: `${second()}`,
};
const inputHour = createInput(time.hourValue);
inputHour.position(0, 0);
inputHour.size(20, 24);
inputHour.input(inputEvent('hour'));

const inputMinute = createInput(time.minuteValue);
inputMinute.position(30, 0);
inputMinute.size(20, 24);
inputMinute.input(inputEvent('minute'));

const inputSecond = createInput(time.secondValue);
inputSecond.position(60, 0);
inputSecond.size(20, 24);
inputSecond.input(inputEvent('second'));

const resetBtn = createButton('✕');
resetBtn.position(90, 0);
resetBtn.size(30, 30);
resetBtn.mousePressed(resetBtnEvent);

function resetBtnEvent() {
  time.hourValue = hour();
  time.minuteValue = minute();
  time.secondValue = second();
}

function inputEvent(unit) {
  switch (unit) {
    case 'hour':
      return function () {
        time.hourValue = this.value();
      };
    case 'minute':
      return function () {
        time.minuteValue = this.value();
      };
    case 'second':
      return function () {
        time.secondValue = this.value();
      };

    default:
      return () => console.log('Something failed');
  }
}
