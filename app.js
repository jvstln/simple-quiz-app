const startSection = document.querySelector("#startSection");
const questionSection = document.querySelector("#questionSection");
const resultSection = document.querySelector("#resultSection");
const startButton = document.querySelector("#startButton");
const restartButton = document.querySelector("#restartButton");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const finishButton = document.querySelector("#finishButton");

/*  THIS IS HOW IT SHOULD WORK
A question is in the format { question, options, correctAnswer, pickedAnswer }
There is a variable `currentQuestionIndex` that tracks the current question
When a user picks an option, change the pickedAnswer property in question[currentQuestionIndex] to the picked option 

calculating total is just counting how many pickedAnswer === correntAnswer
*/

const quizQuestions = [
  {
    question: "What is the capital of Japan?",
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    correctAnswer: "Tokyo",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    correctAnswer: "Mars",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
    correctAnswer: "Harper Lee",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    correctAnswer: "Pacific Ocean",
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Oxygen", "Gold", "Osmium", "Oganesson"],
    correctAnswer: "Oxygen",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Pablo Picasso",
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Claude Monet",
    ],
    correctAnswer: "Leonardo da Vinci",
  },
  {
    question: "Which country is famous for inventing pizza?",
    options: ["France", "Italy", "Greece", "United States"],
    correctAnswer: "Italy",
  },
  {
    question: "How many bones are in the adult human body?",
    options: ["206", "189", "256", "300"],
    correctAnswer: "206",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
  },
  {
    question: "Who discovered gravity?",
    options: [
      "Albert Einstein",
      "Isaac Newton",
      "Galileo Galilei",
      "Nikola Tesla",
    ],
    correctAnswer: "Isaac Newton",
  },
  {
    question: "What is the capital of Canada?",
    options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    correctAnswer: "Ottawa",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: "Au",
  },
  {
    question: "Which famous scientist developed the theory of relativity?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Nikola Tesla",
      "Stephen Hawking",
    ],
    correctAnswer: "Albert Einstein",
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Iron", "Gold", "Diamond", "Your buttocks"],
    correctAnswer: "Diamond",
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "South Korea", "Japan", "Vietnam"],
    correctAnswer: "Japan",
  },
  {
    question: "What is the name of the longest river in the world?",
    options: [
      "Amazon River",
      "Nile River",
      "Yangtze River",
      "Mississippi River",
    ],
    correctAnswer: "Nile River",
  },
  {
    question: "Which sport is known as the 'king of sports'?",
    options: ["Basketball", "Soccer", "Tennis", "Cricket"],
    correctAnswer: "Soccer",
  },
];

let currentQuestionIndex = 0;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
prevButton.addEventListener("click", displayPrevQuestion);
nextButton.addEventListener("click", displayNextQuestion);
finishButton.addEventListener("click", displayResult);

function startQuiz() {
  startSection.classList.add("hidden");
  questionSection.classList.remove("hidden");
  resultSection.classList.add("hidden");

  quizQuestions.forEach((question) => (question.pickedAnswer = null));
  currentQuestionIndex = 0;
  displayQuestion();
}

function restartQuiz() {
  startSection.classList.remove("hidden");
  questionSection.classList.add("hidden");
  resultSection.classList.add("hidden");

  prevButton.classList.remove("hidden");
  nextButton.classList.remove("hidden");
  finishButton.classList.add("hidden");

  quizQuestions.forEach((question) => (question.pickedAnswer = null));
  currentQuestionIndex = 0;
}

function displayResult() {
  startSection.classList.add("hidden");
  questionSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  const score = quizQuestions.reduce(
    (sum, question) =>
      question.correctAnswer === question.pickedAnswer ? sum + 1 : sum,
    0
  );
  const scorePercentage = score / quizQuestions.length; // This should be between 0 and 1

  document.querySelector("#result").innerHTML = `
  You got <span style="font-weight:bold;color:${
    scorePercentage < 0.3
      ? "red"
      : scorePercentage < 0.65
      ? "#ffbb00"
      : "#00c951"
  };">${score}</span> out of <span style="font-weight:bold;">${
    quizQuestions.length
  }</span> question(s)
  `;
}

function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  document.querySelector("#question").textContent = currentQuestion.question;

  // Delete exisiting options
  document.querySelectorAll(".option").forEach((element) => element.remove());

  // Render options
  currentQuestion.options.forEach((option) => {
    const optionButton = document.createElement("button");
    optionButton.classList.add(
      "option",
      option === currentQuestion.pickedAnswer ? "active" : "option"
    );
    optionButton.textContent = option;
    document.querySelector("#options").append(optionButton);

    optionButton.addEventListener("click", (e) => {
      currentQuestion.pickedAnswer = option;
      for (const sibling of e.target.parentElement.children) {
        sibling.classList.remove("active");
      }
      e.target.classList.add("active");
    });
  });

  // Increase progress
  document.querySelector("#progress").textContent = `Question ${
    currentQuestionIndex + 1
  }/${quizQuestions.length}`;
  document.querySelector("#progressBar").style.width = `${
    ((currentQuestionIndex + 1) / quizQuestions.length) * 100
  }%`;
}

function displayNextQuestion() {
  currentQuestionIndex++;
  displayQuestion();

  if (currentQuestionIndex === quizQuestions.length - 1) {
    // if last question, display finish button instead
    prevButton.classList.add("hidden");
    nextButton.classList.add("hidden");
    finishButton.classList.remove("hidden");
  }
}

function displayPrevQuestion() {
  currentQuestionIndex--;
  displayQuestion();

  if (currentQuestionIndex === 0) {
    // if first question, hide back button
    prevButton.classList.add("hidden");
  }
}
