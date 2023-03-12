let timerInterval;
let startTime;
let elapsedTime = 0;
let workLog = [];

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 10);
    document.getElementById("startButton").disabled = true;
    document.getElementById("pauseButton").disabled = false;
    document.getElementById("resumeButton").disabled = true;
    document.getElementById("stopButton").disabled = false;

    // var audio = new Audio('path/to/alarm/sound.mp3');

    // setInterval(function() {
    //     // Play a sound or display a message to indicate the alarm has gone off
    //    audio.play();
    //    alert("Alarm!");
    // }, 12000); // Set the interval to 2 minutes (120000 milliseconds)
}

function pauseTimer() {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    document.getElementById("startButton").disabled = true;
    document.getElementById("pauseButton").disabled = true;
    document.getElementById("resumeButton").disabled = false;
    document.getElementById("stopButton").disabled = false;
}

function resumeTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 10);
    document.getElementById("startButton").disabled = true;
    document.getElementById("pauseButton").disabled = false;
    document.getElementById("resumeButton").disabled = true;
    document.getElementById("stopButton").disabled = false;
}

function stopTimer() {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    const date = new Date().toLocaleDateString();
    const startTimeString = new Date(startTime).toLocaleTimeString();
    const endTimeString = new Date(Date.now()).toLocaleTimeString();
    const durationString = formatDuration(elapsedTime);
    workLog.push({ date, startTime: startTimeString, endTime: endTimeString, duration: durationString });
    renderLog();
    elapsedTime = 0;
    document.getElementById("timer").textContent = "00:00:00";
    document.getElementById("startButton").disabled = false;
    document.getElementById("pauseButton").disabled = true;
    document.getElementById("resumeButton").disabled = true;
    document.getElementById("stopButton").disabled = true;
}

function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    document.getElementById("timer").textContent = formatDuration(elapsedTime);
}

function formatDuration(duration) {
    const milliseconds = Math.floor(duration % 1000 / 10);
    const seconds = Math.floor(duration / 1000 % 60);
    const minutes = Math.floor(duration / 1000 / 60 % 60);
    const hours = Math.floor(duration / 1000 / 60 / 60);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

function pad(number) {
    return number.toString().padStart(2, "0");
}

function renderLog() {
    const tbody = document.querySelector("#log table tbody");
    tbody.innerHTML = "";
    for (let i = 0; i < workLog.length; i++) {
        const row = document.createElement("tr");
        const dateCell = document.createElement("td");
        const startTimeCell = document.createElement("td");
        const endTimeCell = document.createElement("td");
        const durationCell = document.createElement("td");
        dateCell.textContent = workLog[i].date;
        startTimeCell.textContent = workLog[i].startTime;
        endTimeCell.textContent = workLog[i].endTime;
        durationCell.textContent = workLog[i].duration;
        row.appendChild(dateCell);
        row.appendChild(startTimeCell);
        row.appendChild(endTimeCell);
        row.appendChild(durationCell);
        tbody.appendChild(row);
    }
}

    