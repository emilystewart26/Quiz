const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");
const errorMessage = document.getElementById("error-message");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
  {
    question:
      "Who is credited with inventing the first mechanical calculator?",
    answers: [
      { text: "Charles Babbage", correct: false },
      { text: "Blaise Pascal", correct: true },
      { text: "Isaac Newton", correct: false },
      { text: "Alan Turing", correct: false },
    ],
  },

  {
    question:
      "Which company released the first handheld calculator in 1970?",
    answers: [
      { text: "Hewlett-Packard", correct: false },
      { text: "Casio", correct: false },
      { text: "Texas Instruments", correct: true },
      { text: "Sharp", correct: false },
    ],
  },

  {
    question:
      "What does the AC button typically do on a calculator?",
    answers: [
      { text: "Turns the calculator off", correct: false },
      { text: "Adds current values", correct: false },
      { text: "Clears all input and resets the calculator", correct: true },
      { text: "Activates calculation mode", correct: false },
    ],
  },

  {
    question:
      "What is the main difference between a scientific calculator and a basic calculator?",
    answers: [
      { text: "Scientific calculators have larger screens", correct: false },
      { text: "Scientific calculators can graph equations", correct: false },
      { text: "Scientific calculators are only used by scientists", correct: false },
      { text: "Scientific calculators can perform advanced functions like trigonometry and logarithms", correct: true },
    ],
  },

  {
    question:
      "Which of these is a common feature found in graphing calculators?",
    answers: [
      { text: "Ability to plot mathematical graphs", correct: false },
      { text: "Touchscreen", correct: true },
      { text: "Internet connectivity", correct: false },
      { text: "Solar powered", correct: false },
    ],
  },

];

startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  errorMessage.classList.add("hide");
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1) {
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    errorMessage.classList.remove("hide");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
}