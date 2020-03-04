 var buttonColours = ["red", "blue", "green", "yellow"];
 var gamePattern = [];
 var userClickedPattern = [];
var level = 0;


function start() {
  $("h1").text("Press A Key to Start");
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

$(document).on("keydown", function() {
  nextSequence();
});

function nextSequence() {
  setTimeout(function (){
    level++;
    console.log(level);
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

    animatePress(randomChosenColour);
    playSound(randomChosenColour);
  }, 1000);

}

$(".btn").on("click", function(event) {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);

  console.log(gamePattern.length +"---"+ userClickedPattern.length);

  if (gamePattern.length == userClickedPattern.length) {
    checkAnswer();
  }
});

function playSound(color) {
  var audio = new Audio("sounds/"+color+".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  //32. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer() {
  var gameColor = gamePattern[level-1];
  var userSelectedColor = userClickedPattern[level-1];

  console.log(gameColor + "___" + userSelectedColor);
  if (gameColor == userSelectedColor) {
    userClickedPattern = [];
    nextSequence();
  } else {
    playSound("wrong");
    start();
  }
}
