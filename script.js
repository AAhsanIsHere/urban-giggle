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

  // Always allow navigation buttons after submission
  prevBtn.style.display = index === 0 ? "none" : "inline-block";
  nextBtn.style.display = index === passages.length - 1 ? "none" : "inline-block";

  // Submit only appears at last passage, before submission
  submitBtn.style.display = (!isSubmitted && index === passages.length - 1) ? "inline-block" : "none";

  resultsDiv.innerHTML = (index === passages.length - 1 && isSubmitted)
    ? document.getElementById("results").innerHTML
    : "";
}