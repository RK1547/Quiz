const questions = [
  {
    question: "Which is largest animal in the world ?",
    answers: [
      { text: "Sharks", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world ?",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Sri Lanka", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world ?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antarctica", correct: true },
    ],
  },
  {
    question: "Which is the smallest continent in the world ?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Rome", correct: false },
      { text: "Paris", correct: true },
      { text: "Berlin", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Mars", correct: true },
      { text: "Venus", correct: false },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Leonardo da Vinci", correct: true },
      { text: "Pablo Picasso", correct: false },
      { text: "Vincent van Gogh", correct: false },
      { text: "Michelangelo", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for water?",
    answers: [
      { text: "O2", correct: false },
      { text: "CO2", correct: false },
      { text: "H2O", correct: true },
      { text: "NaCl", correct: false },
    ],
  },
  {
    question: "What is the tallest mountain in the world?",
    answers: [
      { text: "K2", correct: false },
      { text: "Kangchenjunga", correct: false },
      { text: "Mount Everest", correct: true },
      { text: "Makalu", correct: false },
    ],
  },
  {
    question: "Who is credited with inventing the World Wide Web?",
    answers: [
      { text: "Tim Berners-Lee", correct: true },
      { text: "Steve Jobs", correct: false },
      { text: "Bill Gates", correct: false },
      { text: "Mark Zuckerberg", correct: false },
    ],
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const resultElement = document.getElementById("result");
const finalScoreElement = document.getElementById("final-score");
const totalTimeElement = document.getElementById("total-time");
const restartButton = document.getElementById("restart-btn");
const celebrationElement = document.getElementById("celebration");

let currentQuestionIndex = 0;
let score = 0;
let time = 0;
let timerInterval;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  time = 0;
  timerInterval = setInterval(() => {
    time++;
    timerElement.innerText = `Time: ${time}s`;
  }, 1000);
  scoreElement.innerText = `Score: ${score}`;
  resultElement.classList.remove("show");
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    scoreElement.innerText = `Score: ${score}`;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  clearInterval(timerInterval);
  resetState();
  finalScoreElement.innerText = `You scored ${score} out of ${questions.length}!`;
  totalTimeElement.innerText = `Total time taken: ${time} seconds`;
  resultElement.classList.add("show");

  if (score >= 8) {
    triggerCelebration();
  }
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

restartButton.addEventListener("click", startQuiz);

function triggerCelebration() {
  for (let i = 0; i < 50; i++) {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.left = `${Math.random() * 100}%`;
    balloon.style.animationDelay = `${Math.random() * 2}s`;
    celebrationElement.appendChild(balloon);
    balloon.addEventListener("click", () => {
      balloon.style.animation = "burst 0.1s forwards";
      setTimeout(() => {
        balloon.remove();
      }, 100);
    });
  }
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    celebrationElement.appendChild(star);
  }
  setTimeout(() => {
    celebrationElement.innerHTML = "";
  }, 4000);
}

startQuiz();
