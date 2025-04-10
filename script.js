const passages = [
  {
    text: "Marie Curie is probably the most famous woman scientist who has ever lived. Born in Poland in 1867...",
    questions: [
      { id: "q1", text: "1. Marie Curie’s husband was a joint winner of both Marie’s Nobel Prizes.", answer: "FALSE" },
      { id: "q2", text: "2. Marie became interested in science when she was a child.", answer: "NOT GIVEN" },
      { id: "q3", text: "3. She was the first woman to win a Nobel Prize.", answer: "TRUE" }
    ]
  },
  {
    text: "Nikola Tesla was a Serbian-American inventor known for his contributions to the design of the modern alternating current...",
    questions: [
      { id: "q1", text: "1. Tesla invented direct current systems.", answer: "FALSE" },
      { id: "q2", text: "2. Tesla worked for Thomas Edison at some point.", answer: "TRUE" },
      { id: "q3", text: "3. He was born in the United States.", answer: "FALSE" }
    ]
  }
];

let currentPassage = 0;

function loadPassage(index) {
  document.querySelector(".left-pane").innerHTML = `
    <h2>Reading Passage</h2>
    <p>${passages[index].text}</p>
    <div class="navigation-buttons">
      <button id="prevBtn" onclick="changePassage(-1)" style="${index === 0 ? 'display: none;' : ''}">Previous</button>
      <button id="nextBtn" onclick="changePassage(1)" style="${index === passages.length - 1 ? 'display: none;' : ''}">Next</button>
    </div>
  `;

  const questionsHTML = passages[index].questions.map(q => `
    <li>
      <label>${q.text}</label><br>
      <input type="text" id="${q.id}">
    </li>
  `).join('');

  document.querySelector(".right-pane").innerHTML = `
    <h2>Questions</h2>
    <ol>${questionsHTML}</ol>
    <button onclick="submitAnswers()">Submit</button>
    <div id="results"></div>
  `;
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

// Load the first passage
loadPassage(0);