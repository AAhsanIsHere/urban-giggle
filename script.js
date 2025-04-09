let timeLeft = 60 * 60; // 1 hour in seconds
const timerElement = document.getElementById('timer');

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
  console.log(`Timer updated: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`); // Log the updated time
  
  if (timeLeft > 0) {
    timeLeft--;
    setTimeout(updateTimer, 1000);
  } else {
    alert('Time is up!');
    // Disable inputs or submit the answers automatically if needed
  }
}

updateTimer();

function submitAnswers() {
  const answers = {
    q1: document.getElementById('q1').value.trim(),
    q2: document.getElementById('q2').value.trim(),
    q3: document.getElementById('q3').value.trim(),
  };

  const correctAnswers = {
    q1: "FALSE",
    q2: "NOT GIVEN",
    q3: "TRUE",
  };

  let result = "Your results:\n";
  let score = 0;
  
  for (let q in answers) {
    if (answers[q].toUpperCase() === correctAnswers[q]) {
      result += `${q}: Correct\n`;
      score++;
    } else {
      result += `${q}: Incorrect\n`;
    }
  }
  
  result += `Score: ${score} out of 3`;
  document.getElementById('results').textContent = result;
}