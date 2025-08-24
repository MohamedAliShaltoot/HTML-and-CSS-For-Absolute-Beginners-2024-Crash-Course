// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// quiz state vars

let currentQuestionIndex = 0;
let score = 0;

let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length; // how many questions are there?
maxScoreSpan.textContent = quizQuestions.length; // the maximum score possible

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  scoreSpan.textContent = 0; // current score

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion();
  // renderQuestion();
}

function showQuestion() {
  answerDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent =
    ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answerDisabled) return;

  answerDisabled = true;
  const selectedButton = event.currentTarget;
  const isCorrect = selectedButton.dataset.correct === "true";

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  Array.from(answersContainer.children).forEach((button) => {
    button.classList.add("disabled");
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  finalScoreSpan.textContent = score;
  maxScoreSpan.textContent = quizQuestions.length;
  const percent = (score / quizQuestions.length) * 100;
  if (percent === 100) {
    resultMessage.textContent = "Perfect score! You're a quiz master!";
  } else if (percent >= 80) {
    resultMessage.textContent = "Great job! You scored " + percent + "%.";
  } else {
    resultMessage.textContent =
      "You scored " + percent + "%. Better luck next time!";
  }
  // resultMessage.textContent = score === quizQuestions.length ? "Congratulations! You got all answers correct." : "Better luck next time!";
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
