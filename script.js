const passages = [
  {
    title: "Passage 1: Marie Curie",
    text: "Marie Curie is probably the most famous woman scientist who has ever lived...",
    questions: [
      { id: "q1", text: "1. Marie Curie’s husband was a joint winner of both Marie’s Nobel Prizes.", answer: "FALSE" },
      { id: "q2", text: "2. Marie became interested in science when she was a child.", answer: "NOT GIVEN" },
      { id: "q3", text: "3. She was the first woman to win a Nobel Prize.", answer: "TRUE" }
    ]
  },
  {
    title: "Passage 2: Nikola Tesla",
    text: "Nikola Tesla was a Serbian-American inventor known for his contributions...",
    questions: [
      { id: "q4", text: "1. Tesla invented direct current systems.", answer: "FALSE" },
      { id: "q5", text: "2. Tesla worked for Thomas Edison at some point.", answer: "TRUE" },
      { id: "q6", text: "3. He was born in the United States.", answer: "FALSE" }
    ]
  },
  {
    title: "Passage 3: The History of Coffee",
    text: "Coffee is one of the most popular beverages in the world...",
    questions: [
      { id: "q7", text: "1. Coffee was first discovered in South America.", answer: "FALSE" },
      { id: "q8", text: "2. Coffee spread through the Arabian Peninsula.", answer: "TRUE" },
      { id: "q9", text: "3. Coffee is consumed only in the mornings.", answer: "FALSE" }
    ]
  }
];

let currentPassage = 0;
let userAnswers = {};
let isSubmitted = false;
let timerInterval;
let totalSeconds = 60 * 60;

function updateTimer() {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  document.getElementById("timer").textContent = `Time left: ${minutes}:${seconds}`;
  if (totalSeconds <= 0) {
    clearInterval(timerInterval);
    alert("Time's up!");
    submitAnswers();
  } else {
    totalSeconds--;
  }
}

function loadPassage(index) {
  const passage = passages[index];
  const passagePane = document.getElementById('passage-pane');
  const questionList = document.getElementById('question-list');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  const resultsDiv = document.getElementById('results');

  passagePane.innerHTML = `<h2>${passage.title}</h2><p>${passage.text}</p>`;
  questionList.innerHTML = "";

  passage.questions.forEach(q => {
    const li = document.createElement("li");
    li.innerHTML = `
      <label>${q.text}</label><br>
      <input type="text" id="${q.id}" value="${userAnswers[q.id] || ""}" ${isSubmitted ? "disabled" : ""}>
    `;
    questionList.appendChild(li);
  });

  if (!isSubmitted) {
    passage.questions.forEach(q => {
      document.getElementById(q.id).addEventListener("input", function () {
        userAnswers[q.id] = this.value;
      });
    });
  }

  // Show/hide navigation buttons properly
  prevBtn.style.display = index === 0 ? "none" : "inline-block";
  nextBtn.style.display = index === passages.length - 1 ? "none" : "inline-block";
  submitBtn.style.display = (!isSubmitted && index === passages.length - 1) ? "inline-block" : "none";

  resultsDiv.innerHTML = (isSubmitted && index === passages.length - 1) ? document.getElementById("results").innerHTML : "";
}

function changePassage(direction) {
  const newIndex = currentPassage + direction;
  if (newIndex >= 0 && newIndex < passages.length) {
    currentPassage = newIndex;
    loadPassage(currentPassage);
  }
}

function submitAnswers() {
  isSubmitted = true;
  clearInterval(timerInterval);

  let score = 0;
  let total = 0;
  let resultText = "";

  passages.forEach(p => {
    p.questions.forEach(q => {
      const userAnswer = (userAnswers[q.id] || "").trim().toUpperCase();
      if (userAnswer === q.answer) {
        score++;
      } else {
        resultText += `${q.text} — Correct: "${q.answer}"<br>`;
      }
      total++;
    });
  });

  const finalText = `Your score: ${score}/${total}<br><br>${resultText}`;
  document.getElementById("results").innerHTML = finalText;
  loadPassage(currentPassage); // reload with disabled inputs
}

// Highlight selected text
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

// Init
loadPassage(currentPassage);
timerInterval = setInterval(updateTimer, 1000);