let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = Date.now() - difference;
        timerInterval = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'Pause';
        startStopBtn.classList.remove('start');
        startStopBtn.classList.add('pause');
        running = true;
    } else {
        clearInterval(timerInterval);
        difference = Date.now() - startTime;
        startStopBtn.textContent = 'Start';
        startStopBtn.classList.remove('pause');
        startStopBtn.classList.add('start');
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    startTime = 0;
    updatedTime = 0;
    difference = 0;
    running = false;
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('pause');
    startStopBtn.classList.add('start');
    display.textContent = '00:00:00';
    laps.innerHTML = '';
    lapCounter = 0;
}

function updateDisplay() {
    updatedTime = Date.now() - startTime;
    display.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    let date = new Date(time);
    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
    let seconds = String(date.getUTCSeconds()).padStart(2, '0');
    let milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function addLap() {
    if (running) {
        lapCounter++;
        let lapTime = formatTime(updatedTime);
        let lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapItem);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', addLap);
