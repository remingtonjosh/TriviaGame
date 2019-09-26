// default values

var counter = 0;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var timer;

// next question if timer is up.

function nextQuestion() {
  const isQuestionOver = triviaQuestions.length - 1 === currentQuestion;

  if (isQuestionOver) {
    console.log("Game Over!");
    scoreResults();
  } else {
    currentQuestion++;
    loadQuestion();
  }
}

// setting timer

function clearTime() {
  clearInterval(timer);
  lost++;
  nextQuestion();
}

function countDown() {
  counter--; //decreases time
  $("#time").html("Timer: " + counter);

  if (counter === 0) {
    clearTime(); // When timer goes to 0, it will go to timeUp and clearInterval
  }
}

// display and loading questions

function loadQuestion() {
  counter = 20; // set the counter to 20 sec
  timer = setInterval(countDown, 1000); // setInternal allows you to work with time.

  const question = triviaQuestions[currentQuestion].question; // prints question from var currentquestion 0
  const choices = triviaQuestions[currentQuestion].choices;
  $("#time").html("Timer: " + counter);
  $("#game").html(`<h4> ${question} </h4> ${loadChoices(choices)}`);
}

function loadChoices(choices) {
  var result = "";
  for (var i = 0; i < choices.length; i++) {
    result += `<p class="choices" data-answer="${choices[i]}">${choices[i]}</p>`; // goes all choices and loop.
  }

  return result;
}

// correct or wrong answers go to the next question
//event delegation work around.
$(document).on("click", ".choices", function() {
  const selectedAnswer = $(this).attr("data-answer"); // selected answer get the data answer value
  const correctAnswer = triviaQuestions[currentQuestion].correctAnswer;

  if (correctAnswer === selectedAnswer) {
    clearInterval(timer);
    score++; // wins and adds to score
    nextQuestion(); // if user wins.. go to next quesiton
    console.log("wins");
  } else {
    lost++;
    nextQuestion(); // if user lose.. go to next quesiton
    console.log("lost");
  }

  console.log("yes!", selectedAnswer);
});

function scoreResults() {
  const result = `
    <p>Questions right: ${score} </p>
    <p>Questions wrong: ${lost} </p>
    <p>Total Questions: ${triviaQuestions.length} </p>
    <button class="btn btn-secondary" id="reset">Reset Game</button>

    <br>

    <br>

    <p> Facts: Hawaii is the 50th state. The Iolani Palace generated electricity 2 years before the White house. The Capital of Hawaii is Honolulu. Hawaii was overthrown illegally at gunpoint but was formally apolologized to with the Akaka Bill by USA. Many Hawaiians are still fighting for their lands.  </p>

    `;
  $("#game").html(result);
}

$(document).on("click", "#reset", function() {
  counter = 20;
  currentQuestion = 0;
  score = 0;
  lost = 0;
  timer = null;

  loadQuestion();
});

$("#start").click(function() {
  $("#start").remove();
  $("#time").html(counter);
  loadQuestion();
});
