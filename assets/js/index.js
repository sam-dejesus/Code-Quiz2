const main = $("#mainDiv");
const titleEl = $("#question-title");
const questionsEl = $("#questions");
const choicesEl = $("#choices");
let allDone = $(".allDone");
let loading = $(".loading");
let alpha = $("#alpha");
const start = $("#start");
const startGame = $("#startGame");
let timerEl = $("#time");
const endTitle = $("#end-title");
const end = $("#end");
const restart = $("#restart");
const save = $("#save");
const scoreDisplay = $("#score-display");
let userName = $("#userName");
const savedPrompt = $("#savedPrompt");
const reset = $('#reset')
const resetDiv = $('#resetDiv')
const resetText = $('#resetText')
const resetBtn = $('#resetBtn')

//
var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log",
  },
  {
    title: "what is javascript?",
    choices: [
      "a coding language",
      "a type of coffee",
      "an api for css",
      "a css framework",
    ],
    answer: "a coding language",
  },
  {
    title: "tailwind and bootstrap are?",
    choices: [
      "are both api",
      "are both css frameworks",
      "A & B",
      "a type of coffee",
    ],
    answer: "are both css frameworks",
  },
  {
    title: "a function inside an object is?",
    choices: ["a class", "super object", "constructor function", "a method"],
    answer: "a method",
  },
  {
    title: "OOP stands for?",
    choices: [
      "object operator procedures",
      "object oriented programing",
      "object order performance",
      "object obstruction programing",
    ],
    answer: "object oriented programing",
  },
  {
    title: "JSON is?",
    choices: [
      "a framework for javascript",
      "an api for javascript",
      "an sdk for javascript",
      "is a lightweight format for storing and transporting data",
    ],
    answer: "is a lightweight format for storing and transporting data",
  },
  {
    title: "what does DOM stand for?",
    choices: [
      "Document Output Model",
      "Document Object Model",
      "Document Object Mode",
      "Document Object Mode",
    ],
    answer: "Document Object Model",
  },
  {
    title: "the insides of a functions parentheses is?",
    choices: ["the target", "the event", "A & B", "the parameters"],
    answer: "the parameters",
  },
  {
    title: "arrays use what type of syntax?",
    choices: ["()", "{}", "[]", ":"],
    answer: "[]",
  },
  {
    title: "which is not a datatype?",
    choices: ["&&", "null", "true", '"Jimmy went to school'],
    answer: "&&",
  },
  {
    title: "which is ?",
    choices: [
      "script src=script.js script",
      "<script>src = script.js<script>",
      "<script scr = script.js><script>",
      "<script src= script.js script>",
    ],
    answer: "<script scr = script.js><script>",
  },
];

//
let existingData = JSON.parse(localStorage.getItem("QuizData")) || [];
var selectedQuestions;
var currentQuestionIndex = 0;
let alphaCount = 0;
let saveClicked = false;
//

let achievementData = JSON.parse(localStorage.getItem("achievements")) || {
  pointsAlpha: false,
  pointsBeta: false,
  pointsOmega: false,
  twentyGames: 0,
};



//sound effects
var backgroundMusic = new Audio('assets/sfx/computer-startup-6331.mp3')
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

backgroundMusic.loop = true;
backgroundMusic.play()

function updateAlpha() {
  if (alphaCount === 101) {
    loading.fadeOut();

    setTimeout(expand, 1000);
  } else {
    alpha.html(alphaCount);
    alphaCount++;
    setTimeout(updateAlpha, 100);
  }
}

updateAlpha();

function expand() {
  allDone.fadeIn(1000);

   start.fadeIn(1000)
}

///------------------------------------

var time = 150;
var result = 0;

startGame.click(() => {

  var form = document.getElementById("difficultyForm");
  var selectedDifficulty = form.querySelector(
    'input[name="difficulty"]:checked'
  );

  let beta = selectedDifficulty.value;

  main.addClass("hide");
  questionsEl.removeClass("hide");

  if (beta === "easy") {
    let questionIndices = [0, 1, 2, 3, 4, 5];
    selectedQuestions = questionIndices.map((index) => questions[index]);
  } else if (beta === "medium") {
    let questionIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    selectedQuestions = questionIndices.map((index) => questions[index]);
    time = 100;
  } else if (beta === "hard") {
    selectedQuestions = questions.slice();
    time = 75;
  } else{
    alert("you have to pick a difficulty");
    return;
  }

  var timerId = setInterval(function () {
    timerEl.text(time);
    time--;
    if (time < 0) {
      clearInterval(timerId);
      timerEl.text("times up");
      timesUp = timerEl.text("times up");
      quizEnd(timesUp);
    }
  }, 1000);

  showQuestion(selectedQuestions);
});

function showQuestion(questions) {
  var currentQuestion = questions[currentQuestionIndex];

  titleEl.text(currentQuestion.title);
  choicesEl.empty();
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    choicesEl.append(choiceNode);
  }
}

function questionClick(event) {
  var buttonEl = event.target;

  // if the clicked element is not a choice button, do nothing.
  if (!buttonEl.matches(".choice")) {
    return;
  }

  // check if user guessed wrong
  if (buttonEl.value !== selectedQuestions[currentQuestionIndex].answer) {
    // penalize time

    time -= 15;

    if (time < 0) {
      time = 0;
    }

    // display new time on page
    timerEl.text(time);

    // play "wrong" sound effect
    sfxWrong.play();
  } else {
    // play "right" sound effect
    sfxRight.play();
    result++;
  }

  currentQuestionIndex++;

  // check if we've run out of questions
  if (time <= 0 || currentQuestionIndex === selectedQuestions.length) {
    quizEnd();
  } else {
    showQuestion(selectedQuestions);
  }
}

choicesEl.click(questionClick);

function quizEnd(timesUp) {
  questionsEl.addClass("hide");
  end.removeClass("hide");
  if (!timesUp) {
    endTitle.text("times up");
  } else {
    endTitle.text("quiz completed");
  }

  if (result >= 5) {
    achievementData.pointsAlpha = true;
  }
  if (result >= 10) {
    achievementData.pointsBeta = true;
  }
  if (result === 15) {
    achievementData.pointsOmega = true;
  }
  achievementData.twentyGames++;
  

  const score = result.toString();
  scoreDisplay.text("Final score: " + score);

  localStorage.setItem("achievements", JSON.stringify(achievementData));

}

save.click(() => {
  const score = result;
  if (saveClicked) {
    alert("You have already saved your data.");
    return;
  }

  if (userName.val() === "") {
    alert("you need to write something in the name box");
    return null;
  } else {
    savedPrompt.removeClass("hide");

    existingData.push({
      userName: userName.val(),
      score: score
    });
    localStorage.setItem("QuizData", JSON.stringify(existingData));
    saveClicked = true;
  }
});

restart.click(() => {
  location.reload();
});

reset.click(()=>{
resetDiv.removeClass('hide')
reset.addClass('hide')
})
resetBtn.click(()=>{


  if(resetText.val()=== "assembly"){
    localStorage.removeItem("QuizData");
    resetDiv.addClass('hide');
    location.reload()

  } else{
    alert("ERROR")
  }
})

let scoreBoard = $('#score-board');
existingData.sort((a, b) => b.score - a.score);
existingData.forEach(data => {
  let post = $('<h2>');
  post.addClass('post')
  post.text(`Name: ${data.userName} Score: ${data.score}`);
  scoreBoard.append(post);
});



