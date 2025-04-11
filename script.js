const passages = [
  {
    title: "Passage 1: Marie Curie",
    text: "Marie Curie is probably the most famous woman scientist who has ever lived. Born in Poland in 1867...",
    questions: [
      { id: "q1", text: "1. Marie Curie’s husband was a joint winner of both Marie’s Nobel Prizes.", answer: "FALSE" },
      { id: "q2", text: "2. Marie became interested in science when she was a child.", answer: "NOT GIVEN" },
      { id: "q3", text: "3. She was the first woman to win a Nobel Prize.", answer: "TRUE" }
    ]
  },
  {
    title: "Passage 2: Nikola Tesla",
    text: "Nikola Tesla was a Serbian-American inventor known for his contributions to the design of the modern alternating current...",
    questions: [
      { id: "q1", text: "1. Tesla invented direct current systems.", answer: "FALSE" },
      { id: "q2", text: "2. Tesla worked for Thomas Edison at some point.", answer: "TRUE" },
      { id: "q3", text: "3. He was born in the United States.", answer: "FALSE" }
    ]
  },
  {
    title: "Passage 3: The History of Coffee",
    text: "Coffee is one of the most popular beverages in the world. It originated in Ethiopia and spread through the Arabian Peninsula...",
    questions: [
      { id: "q1", text: "1. Coffee was first discovered in South America.", answer: "FALSE" },
      { id: "q2", text: "2. Coffee spread through the Arabian Peninsula.", answer: "TRUE" },
      { id: "q3", text: "3. Coffee is consumed only in the mornings.", answer: "FALSE" }
    ]
  }
];

let currentPassage = 0;

function loadPassage(index) {
  const passagePane = document.getElementById('passage-pane');
  const questionList = document.getElementById('question-list');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitControls = document.getElementById('submit-controls');
  const resultsDiv = document.getElementById('results');

  passagePane.innerHTML = `
    <h2>${passages[index].title}</h2>
    <p>${passages[index].text}</p>
  `;

  questionList.innerHTML = "";
  passages[index].questions.forEach(q => {
    const li = document.createElement("li");
    li.innerHTML = `
      <label>${q.text}</label><br>
      <input type="text" id="${q.id}">
    `;
    questionList.appendChild(li);
  });

  prevBtn.style.display = index === 0 ? "none" : "inline-block";
  nextBtn.style.display = index === passages.length - 1 ? "none" : "inline-block";
  submitControls.style.display = index === passages.length - 1 ? "block" : "none";
  resultsDiv.innerHTML = "";
}

function changePassage(direction) {
  currentPassage += direction;
  loadPassage(currentPassage);
}

function submitAnswers() {
  let score = 0;
  let total = passages[currentPassage].questions.length;
  let resultText = "";

  passages[currentPassage].questions.forEach(q => {
    const userAnswer = document.getElementById(q.id).value.trim().toUpperCase();
    if (userAnswer === q.answer) {
      score++;
    } else {
      resultText += `${q.text} — Correct: "${q.answer}"<br>`;
    }
  });

  resultText = `Your score: ${score}/${total}<br><br>` + resultText;
  document.getElementById("results").innerHTML = resultText;
}

// Highlight selection inside the left pane
document.addEventListener('mouseup', function () {
  const selection = window.getSelection();
  if (selection.rangeCount > 0 && selection.toString().length > 0) {
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.backgroundColor = "yellow";
    range.surroundContents(span);
    selection.removeAllRanges();
  }
});

// Timer
let totalSeconds = 60 * 60;
function updateTimer() {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  document.getElementById("timer").textContent = `Time left: ${minutes}:${seconds}`;
  totalSeconds--;
  if (totalSeconds >= 0) {
    setTimeout(updateTimer, 1000);
  } else {
    alert("Time's up!");
    submitAnswers();
  }
}

// Initialize
loadPassage(0);
updateTimer();