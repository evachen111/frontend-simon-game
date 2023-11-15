const gamePattern = [];
var userClickedPattern = [];

const buttonColours = [];
buttonColours.push("red", "blue", "green", "yellow");

var gameStarts = false;
var level = 0;

function playSound(name){
    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
}

function nextSequence(){
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(50).fadeIn(50);

    playSound(randomChosenColour);
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){ 
        $("#"+currentColour).removeClass("pressed");
      }, 100); 
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(currentLevel>0 ){
            return checkAnswer(currentLevel-1);
        }
        return true;
    }
    else{
        return false;
    }
}

function startOver(){
    level = 0;
    while (gamePattern.length) { gamePattern.pop(); }
    while (userClickedPattern.length) { userClickedPattern.pop(); }
    gameStarts = false;
}

$(".btn").click(function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    if (checkAnswer(userClickedPattern.length-1)){  // check with every click
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){ 
                nextSequence();
              }, 1000); 
            while (userClickedPattern.length) { userClickedPattern.pop(); }
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){ 
            $("body").removeClass("game-over");
          }, 200); 
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
})


$(document).keypress(function(){
    if (!gameStarts){
        nextSequence();
        $("h1").text("Level "+level);
        gameStarts = true;
    }
})



