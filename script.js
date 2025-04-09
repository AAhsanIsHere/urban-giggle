// Highlight selected text in the passage
document.querySelector('.left-pane').addEventListener('mouseup', function () {
  const selection = window.getSelection();
  if (selection.toString().length > 0) {
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.backgroundColor = "yellow";
    range.surroundContents(span);
    selection.removeAllRanges();
  }
});

// Timer countdown
let totalSeconds = 60 * 60;
const timerDisplay = document.getElementById('timer');

function updateTimer() {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  timerDisplay.textContent = `Time left: ${minutes}:${seconds}`;
  totalSeconds--;

  if (totalSeconds >= 0) {
    setTimeout(updateTimer, 1000);
  } else {
    alert("Time's up!");
    submitAnswers();
  }
}

updateTimer();

// Submit and check answers
const correctAnswers = {
  q1: "FALSE",
  q2: "NOT GIVEN",
  q3: "TRUE"
};

function submitAnswers() {
  let score = 0;
  let total = Object.keys(correctAnswers).length;
  let resultText = "";

  for (let key in correctAnswers) {
    const userAnswer = document.getElementById(key).value.trim().toUpperCase();
    if (userAnswer === correctAnswers[key]) {
      score++;
    } else {
      resultText += `Question ${key.slice(1)}: Correct answer is "${correctAnswers[key]}"<br>`;
    }
  }

  resultText = `Your score: ${score}/${total}<br><br>` + resultText;
  document.getElementById("results").innerHTML = resultText;
}