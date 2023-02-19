// After save score with initials, show list of highscores then Go back(playagain) or clear highscores

// VARIABLE DECLARATIONS////////////////////////////////////////////////
// Stoaring references
var body = document.querySelector("body");
var gui = $(".gui");
var questionEl = document.querySelector(".question");
var startBtn = document.querySelector(".start-btn");
var introEl = document.querySelector(".intro");
var questionTitle = document.createElement("h2");
var choicesEl = document.createElement("ul");
var saveScoreEl = $("#saveScore-container");
var saveScoreForm = document.querySelector("#save-score-form");
var scoreText = document.querySelector(".scoreText");
var score;
var timerEl = $(".timer-container");
var timerText = document.querySelector(".timerText");
var msgDiv = document.createElement("div");
var msg = document.createElement("h4");
var hr = document.createElement("hr");
var highscoresEl = $("#highscore-container");
var highscoreList = document.querySelector("#highscore-list");
var highscores = []; //array
var highscoreBtns = $("#highscore-container");
var showHighscoresBtn = $(".showHighscores-container");
var isHighscore;
var gameOverText = document.createElement("h2");
gameOverText.classList.add("text-center");
var isgameOver = false;
var isGame = false;
var isReady = true;
var isMsg = false;
var isTrue = true;
var startOverBtn = document.createElement("button");
startOverBtn.classList.add("btn");
startOverBtn.classList.add("start-btn");
var questionNum = 0;
var timer = 100;
// array of objects with questions, answers choices and correct answer
var questions = [
  {
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["A. <script>", "B. <javascript>", "C. <js>", "D. <scripting>"],
    correctAnswer: 0,
  },
  {
    title: "Where is the correct place to insert a JavaScript?",
    choices: [
      "A. The <body> section",
      "B. The <head> section",
      "C. The <header> section",
      "D. A and B are correct",
    ],
    correctAnswer: 3,
  },
  {
    title:
      "What is the correct syntax for referring to an external script called 'main.js'?",
    choices: [
      "A. <script src='main.js'>",
      "B. <script name='main.js'>",
      "C. <script href='main.js'>",
      "D. <script data='main.js'>",
    ],
    correctAnswer: 0,
  },
  {
    title: "The external JavaScript file must contain the <script> tag.",
    choices: ["A. True", "B. False"],
    correctAnswer: 1,
  },
  {
    title: "How do you write 'Hello World' in an alert box?",
    choices: [
      "A. alert('Hello World');",
      "B. alertBox('Hello World');",
      "C. msgBox('Hello World');",
      "D. msg('Hello World');",
    ],
    correctAnswer: 0,
  },
  {
    title: "How do you create a function in JavaScript?",
    choices: [
      "A. function = myFunction()",
      "B. function : myFunction()",
      "C. function.myFunction()",
    ],
    correctAnswer: 0,
  },
  {
    title: "How do you call a function named 'myFunction'?",
    choices: [
      "A. myfunction()",
      "B. call function myFunction()",
      "C. call myFunction()",
    ],
    correctAnswer: 0,
  },
  {
    title: "How to write an IF statement in JavaScript?",
    choices: [
      "A. if i = 5 then",
      "B. if i = 5",
      "C. if (i == 5)",
      "D. if i === 5 then",
    ],
    correctAnswer: 2,
  },
  {
    title:
      "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
    choices: [
      "A. if i <> 5",
      "B. if (i != 5)",
      "C. if (i <== 5)",
      "D. if i =! 5 then",
    ],
    correctAnswer: 1,
  },
  {
    title: "How does a WHILE loop start?",
    choices: [
      "A. while (i <= 10)",
      "B. while (i <= 10; i++)",
      "C. while i = 1 to 10",
    ],
    correctAnswer: 0,
  },
];
// array with shuffle objects, same objects of array questions but every time the user start the quiz, the questions are in different order
var shuffleQuestions = [];

//FUNCTIONS//////////////////////////////////////////////////
// shuffle the array questions elements
function shuffle(questions) {
  for (let i = questions.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = questions[i];
    questions[i] = questions[j];
    questions[j] = temp;
  }
  //console.log(JSON.stringify(questions));
  return questions;
}
// starts the quiz
function startQuiz() {
  introEl.remove();

  timerEl.removeClass("hidden");
  showHighscoresBtn.removeClass("hidden");
  questionEl.classList.remove("hidden");
  shuffleQuestions = shuffle(questions);

  body.appendChild(questionEl);
  displayQuestions(questionNum);
  countdown(100);
  isgameOver = false;
  isGame = true;
  isMsg = false;
}
//displays the question with its choices
function displayQuestions(questionNum) {
  var displayQuestion = shuffleQuestions[questionNum].title;
  //console.log(displayQuestion);
  questionTitle.textContent = displayQuestion;
  questionTitle.setAttribute("data-question", questionNum);
  questionEl.appendChild(questionTitle);
  if (choicesEl.hasChildNodes()) {
    // choicesEl.removeChild(choicesEl.children[0]);
    while (choicesEl.firstChild) {
      choicesEl.removeChild(choicesEl.lastChild);
    }
  }

  for (var j = 0; j < shuffleQuestions[questionNum].choices.length; j++) {
    var displayAnswers = shuffleQuestions[questionNum].choices[j];
    //console.log(displayAnswers);

    var answerEl = document.createElement("li");
    answerEl.classList.add("pointer");
    answerEl.setAttribute("data-answer", j);
    answerEl.textContent = displayAnswers;
    choicesEl.appendChild(answerEl);
    questionEl.appendChild(choicesEl);
  }
  questionNum++;
  //console.log(questionEl);
}
// displays the correct or wrong message when you click an answer
function displayMessage(type, message) {
  msg.textContent = message;
  msgDiv.setAttribute("class", type);
  msgDiv.appendChild(hr);
  msgDiv.appendChild(msg);
  body.appendChild(msgDiv);
}

// Gets the highscores stored from localStorage and adds it to the array highscores
function storedHighscoresInit() {
  //
  var storedHighscores = JSON.parse(localStorage.getItem("highscores"));
  //
  if (storedHighscores !== null) {
    highscores = storedHighscores;
  }
  //
  renderHighscores();
}
// This function will show the highscores table (highScoresEl) and calls the storeInitials and renderHighScores
function showHighscoresList() {
  questionEl.classList.add("hidden");
  introEl.classList.add("hidden");
  timerEl.addClass("hidden");
  showHighscoresBtn.addClass("hidden");
  msgDiv.classList.add("hidden");
  highscoresEl.removeClass("hidden");
  clearInterval();
  isGame = false;
  isgameOver = false;
  //timer = 0;
  storeInitials();
  renderHighscores();

  //clearInterval(timeInterval);
}
// Stores the initials with socre as an array of objects in to the LocaStorage
function storeInitials() {
  //
  localStorage.setItem("highscores", JSON.stringify(highscores));
}
// Displays the list of highscores
function renderHighscores() {
  // TODO:
  highscoreList.innerHTML = "";
  //scoreCountSpan.textContent;
  highscores.sort(compare);
  //
  for (var i = 0; i < highscores.length; i++) {
    var initials = highscores[i].initials;

    var li = document.createElement("li");
    var place = i + 1;
    li.textContent = place + ". " + initials;
    li.setAttribute("data-index", i);
    li.classList.add("list-number");

    var scoreDisplay = document.createElement("span");
    scoreDisplay.textContent = highscores[i].score;

    li.appendChild(scoreDisplay);
    highscoreList.appendChild(li);
  }
}
// Compares the score property value of each object to sort the objects from high to lower score
function compare(a, b) {
  if (a.score < b.score) {
    return 1;
  }
  if (a.score > b.score) {
    return -1;
  }
  return 0;
}

//starts the countdown and changes the timer every 1000ms
function countdown(time) {
  timer = time;
  timeInterval = setInterval(function () {
    timer--;
    timerText.textContent = timer;

    // console.log(timer);
    if (timer <= 0) {
      clearInterval(timeInterval);
      console.log("is game" + isGame);
      if (isGame) {
        isgameOver = true;
      }
      gameOver(isgameOver);
      console.log(isgameOver);
    }
  }, 1000);
}

// saves the score and adds it as text to the scoreText element
function saveScore(score) {
  //console.log("Save score");
  questionEl.remove();
  saveScoreEl.removeClass("hidden");
  showHighscoresBtn.addClass("hidden");
  timerEl.addClass("hidden");
  scoreText.textContent = score;
  isMsg = false;
}
// When countdown ends and you havent finished the quiz, displays a GaME OVER message and a button to start over the quiz
function gameOver(isgameOver) {
  if (isgameOver) {
    timerText.textContent = timer;
    questionEl.remove();
    gameOverText.textContent = "GAME OVER";
    body.appendChild(gameOverText);
    if (isMsg) {
      body.removeChild(msgDiv);
    }
    startOverBtn.textContent = "Start Over";
    body.appendChild(startOverBtn);
    startOverBtn.addEventListener("click", handleStartOver);
    isgameOver = true;
  } else if (isHighscore) {
    timerText.textContent = timer;
  }
}
// When you start over the quiz this function declaration runs and shows you the Welcome screen
function handleStartOver() {
  //console.log("Start Over");
  introEl.classList.remove("hidden");
  isReady = true;
  showHighscoresBtn.removeClass("hidden");
  timerEl.addClass("hidden");
  //timer = 0;
  if (timer > 0) {
    clearInterval();
  }
  highscoresEl.addClass("hidden");
  console.log("lo escondo?");
  if (isgameOver) {
    body.removeChild(gameOverText);
    body.removeChild(startOverBtn);
  }
  body.appendChild(introEl);
  timer = 100;
  timerText.textContent = timer;
}

//EVENT LISTENERS/////////////////////////////////////////////
//Adds an eventListener to the start button to start the quiz
startBtn.addEventListener("click", function () {
  startQuiz();
});
// The DOM has an eventListener for the Enter key to start the Quiz only in the Welcome Screen
document.addEventListener("keypress", function (event) {
  console.log("enter");
  if (isReady) {
    if (event.key === "Enter") {
      startQuiz();
      isReady = false;
    }
  }
});
// Each answer choice has an eventListener to check if is the right answer
choicesEl.addEventListener("click", function (event) {
  var choice = event.target;
  // Check if the clicked element was an li
  if (choice.matches("li")) {
    // Get the current value of the li's data-state attribute

    var questionNum = questionTitle.getAttribute("data-question");
    var selectedChoice = choice.getAttribute("data-answer");

    if (selectedChoice == questions[questionNum].correctAnswer) {
      console.log("Si es baby");
      questionNum++;
      if (questionNum < questions.length) {
        displayQuestions(questionNum);
        displayMessage("correct", "Correct Answer");
        isMsg = true;
      } else {
        console.log("Youre done. Yei");
        displayMessage("correct", "Correct Answer");
        isMsg = true;
        clearInterval(timeInterval);
        saveScore(timer);
        score = timer;
        console.log("user score" + score);
      }
      //questionEl.remove();
    } else {
      console.log("No es baby");
      questionNum++;
      timer = timer - 10;
      displayMessage("incorrect", "Wrong Answer");
      isMsg = true;
      if (questionNum < questions.length) {
        displayQuestions(questionNum);
      } else {
        displayMessage("incorrect", "Wrong Answer");
        isMsg = true;
        clearInterval(timeInterval);
        saveScore(timer);
        score = timer;
        timerText.textContent = timer;
        console.log("user score" + score);
      }
    }
  }
});
// Adds an eventlistener for the save score button to save the initials input
saveScoreForm.addEventListener("click", function (event) {
  event.preventDefault();

  //console.log("Save score");

  //grab de userinput
  var userInitials = $("#initials-input").val();
  var userScore = score;

  console.log(userScore);

  var userHighscores = {
    initials: userInitials,
    score: userScore,
  };

  if (!userInitials) {
    console.log(" Add your initials");
    return; //exits out of the function
  }

  // TODO: Describe the purpose of the following lines of code.
  highscores.push(userHighscores);
  userInitials.value = "";

  saveScoreEl.addClass("hidden");
  highscoresEl.removeClass("hidden");
  timerEl.addClass("hidden");

  body.removeChild(msgDiv);
  //console.log("User Input:", userInitials);

  // Clear input fields
  $('input[name="initials-input"]').val("");
  // TODO: What will happen when the following functions are called?
  storeInitials();
  renderHighscores();
});
// when the button with the class start-over-btn from the highscore table is clicked you go back to the Welcome screen
highscoreBtns.on("click", ".start-over-btn", handleStartOver);

// when the clear highscore btn from the highscore table is clicked it clears all the scores from Local storage and removes them from list table
highscoreBtns.on("click", ".clear-highscore-btn", function clearLocalStorage() {
  localStorage.clear();
  highscoreList.innerHTML = "";
  highscores = [];
});
// when the button with the class show-highscores-btn from the Show highscore container is clicked, it will display the highscore table list
showHighscoresBtn.on("click", ".show-highscores-btn", showHighscoresList);

//calls the function storedHighscoresInit to store the data from LocalStorage
storedHighscoresInit();
