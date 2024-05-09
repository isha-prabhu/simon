var buttonColours= ["red", "blue", "green" , "yellow"];

var gamePattern =[];
var userClickedPattern= [];
var userChosenColour = "";

var gameOn = false;
var level = 0;


$(document).keypress(function(){
    if(gameOn == false){
        
        $("h1").text ("Level "+ level);
        nextSequence();
        gameOn = true;
    }
});

$(".btn").on("click", function(){
     var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        
        if(userClickedPattern.length  === (gamePattern.length)){
        setTimeout(function(){
            nextSequence();
        },1000);
     }

    }
    else{

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over")},200);
        
        $("h1").text ("Game Over, Press Any Key to Restart");

        startOver();
    }

    

}
function startOver(){
    level= 0;
    gameOn= false;
    gamePattern =[];
}

function nextSequence(){
    userClickedPattern =[];
    level++;
    $("h1").text ("Level "+ level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


var userChosenColour = "";



function playSound(name){
    var soundURL = "./sounds/" + name +".mp3";
    var audio1 = new Audio(soundURL);
    audio1.play();
}

function animatePress(currentColour){
    var currentButtonClass = "#"+ currentColour;
    $(currentButtonClass).addClass("pressed");

    setTimeout(function(){
        $(currentButtonClass).removeClass("pressed")},100);
    
}