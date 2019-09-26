$(document).ready(function() {
  var options = [
    {
      question:
        "Pupusas, handmade thick stuffed corn tortillas, are a traditional dish from what country?",
      choice: ["Ethiopia", "El Salvadore", "Peru", "Guatamala"],
      answer: 1,
      photo: "assets/images/pupusas.jpg"
    },
    {
      question:
        "What popular soda beverage was originally developed as a mixer for whiskey?",
      choice: ["Mountain Dew", "Sprite", "7-UP", "Coke"],
      answer: 0,
      photo: "assets/images/mtdew.gif"
    },
    {
      question: "Kopi luwak is a very expensive type of what?",
      choice: ["Spice", "Caviar", "Coffee", "Rice variety"],
      answer: 2,
      photo: "assets/images/coffee.gif"
    },
    {
      question: "Which is not an ingredient in a Harvey Wallbanger cocktail?",
      choice: ["Orange Juice", "Vodka", "Sour Mix", "Galliano"],
      answer: 2,
      photo: "assets/images/harvey.jpg"
    },
    {
      question: "How many items are there in a Bakers' Dozen?",
      choice: ["12", "6", "24", "13"],
      answer: 3,
      photo: "assets/images/dozen.jpg"
    },
    {
      question: "What is the most widely eaten fish in the world?",
      choice: ["Tilapia", "Herring", "Sardine", "Tuna"],
      answer: 1,
      photo: "assets/images/herring.jpg"
    },
    {
      question: "Which fruit does not ripen once it has been picked?",
      choice: ["Banana", "Lemon", "Mango", "Apple"],
      answer: 1,
      photo: "assets/images/lemon.gif"
    },
    {
      question: "Which fruit contains the most protein per 100 calories?",
      choice: ["Guava", "Avocado", "Banana", "Blackberries"],
      answer: 0,
      photo: "assets/images/guava.gif"
    }
  ];

  var correctCount = 0;
  var wrongCount = 0;
  var unanswerCount = 0;
  var timer = 20;
  var intervalId;
  var userGuess = "";
  var running = false;
  var qCount = options.length;
  var pick;
  var index;
  var newArray = [];
  var holder = [];

  $("#reset").hide();
  //click start button to start game
  $("#start").on("click", function() {
    $("#start").hide();
    displayQuestion();
    runTimer();
    for (var i = 0; i < options.length; i++) {
      holder.push(options[i]);
    }
  });
  //timer start
  function runTimer() {
    if (!running) {
      intervalId = setInterval(decrement, 1000);
      running = true;
    }
  }
  //timer countdown
  function decrement() {
    $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
    timer--;

    //stop timer if reach 0
    if (timer === 0) {
      unanswerCount++;
      stop();
      $("#answerblock").html(
        "<p>Time is up! The correct answer is: " +
          pick.choice[pick.answer] +
          "</p>"
      );
      hidepicture();
    }
  }

  //timer stop
  function stop() {
    running = false;
    clearInterval(intervalId);
  }
  //randomly pick question in array if not already shown
  //display question and loop though and display possible answers
  function displayQuestion() {
    //generate random index in array
    index = Math.floor(Math.random() * options.length);
    pick = options[index];

    //	if (pick.shown) {
    //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
    //		displayQuestion();
    //	} else {
    //		console.log(pick.question);
    //iterate through answer array and display
    $("#questionblock").html("<h2>" + pick.question + "</h2>");
    for (var i = 0; i < pick.choice.length; i++) {
      var userChoice = $("<div>");
      userChoice.addClass("answerchoice");
      userChoice.html(pick.choice[i]);
      //assign array position to it so can check answer
      userChoice.attr("data-guessvalue", i);
      $("#answerblock").append(userChoice);
      //		}
    }

    //click function to select answer and outcomes
    $(".answerchoice").on("click", function() {
      //grab array position from userGuess
      userGuess = parseInt($(this).attr("data-guessvalue"));

      //correct guess or wrong guess outcomes
      if (userGuess === pick.answer) {
        stop();
        correctCount++;
        userGuess = "";
        $("#answerblock").html("<p>Correct!</p>");
        hidepicture();
      } else {
        stop();
        wrongCount++;
        userGuess = "";
        $("#answerblock").html(
          "<p>Wrong! The correct answer is: " +
            pick.choice[pick.answer] +
            "</p>"
        );
        hidepicture();
      }
    });
  }

  function hidepicture() {
    $("#answerblock").append("<img src=" + pick.photo + ">");
    newArray.push(pick);
    options.splice(index, 1);

    var hidpic = setTimeout(function() {
      $("#answerblock").empty();
      timer = 20;

      //run the score screen if all questions answered
      if (wrongCount + correctCount + unanswerCount === qCount) {
        $("#questionblock").empty();
        $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
        $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
        $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
        $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
        $("#reset").show();
        correctCount = 0;
        wrongCount = 0;
        unanswerCount = 0;
      } else {
        runTimer();
        displayQuestion();
      }
    }, 3000);
  }

  $("#reset").on("click", function() {
    $("#reset").hide();
    $("#answerblock").empty();
    $("#questionblock").empty();
    for (var i = 0; i < holder.length; i++) {
      options.push(holder[i]);
    }
    runTimer();
    displayQuestion();
  });
});
