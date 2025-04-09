let timeLeft = 60 * 60; // 1 hour in seconds
const timerElement = document.getElementById('timer');
let currentPassage = 1; // Track the current passage

function updateTimer() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  timerElement.textContent = `Time left: ${minutes}:${seconds}`;
  
  if (timeLeft > 0) {
    timeLeft--;
    setTimeout(updateTimer, 1000);
  } else {
    alert('Time is up!');
    document.querySelectorAll('input[type="text"], button').forEach(element => {
      element.disabled = true; // Disable all inputs and buttons
    });
  }
}

updateTimer();

function previousPassage() {
  if (currentPassage > 1) {
    currentPassage--;
    showPassage();
  }
}

function nextPassage() {
  if (currentPassage < 3) {
    currentPassage++;
    showPassage();
  }
}

function showPassage() {
  // Hide all passages and questions
  document.getElementById('passage1').style.display = 'none';
  document.getElementById('passage2').style.display = 'none';
  document.getElementById('passage3').style.display = 'none';
  document.getElementById('questions1').style.display = 'none';
  document.getElementById('questions2').style.display = 'none';
  document.getElementById('questions3').style.display = 'none';

  // Show the current passage and corresponding questions
  document.getElementById('passage' + currentPassage).style.display = 'block';
  document.getElementById('questions' + currentPassage).style.display = 'block';
}

function submitAnswers() {
  const answers = {
    q1: document.getElementById('q1').value.trim(),
    q2: document.getElementById('q2').value.trim(),
    q3: document.getElementById('q3').value.trim(),
    q4: document.getElementById('q4').value.trim(),
    q5: document.getElementById('q5').value.trim(),
    q6: document.getElementById('q6').value.trim(),
    q7: document.getElementById('q7').value.trim(),
  };

  const correctAnswers = {
    q1: "FALSE",
    q2: "NOT GIVEN",
    q3: "TRUE",
    q4: "TRUE",
    q5: "FALSE",
    q6: "TRUE",
    q7: "FALSE",
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
  
  result += `Score: ${score} out of 7`;
  document.getElementById('results').textContent = result;
}