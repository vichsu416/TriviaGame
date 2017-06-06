var start;
var game;
var counter = 15;
var questions = ["In what place was Christmas once illegal?", "In California, it is illegal to eat oranges while doing what?", "Coulrophobia means fear of what?", "How many dimples are there on a regular golf ball?", "Which of the following is the longest running American animated TV show?", "Every year, over 8,800 people injure themselves with what apparently harmless, tiny object?", "How many pounds of pressure do you need to rip off your ear?", "What are the odds of being killed by space debris?"];
var answer = [["Brazil", "England", "France", "Russia"], ["Gardening","Working on a computer","Driving","Bathing"], ["Jews", "Sacred Things", "Clowns", "Old People"], ["377","418","336","294"], ["Rugrats", "TV Funhouse", "Pokemon", "Simpsons"], ["Pencil","Knife","Toothpick","Baseball bat"], ["17", "7", "2", "11"], ["1 in 5 billion","1 in 10 billion","1 in 5 million","1 in 1 trillion"]];
var correctAnswers = ["B. England", "D. Bathing", "C. Clowns", "C. 336", "A. Rugrats", "C. Toothpick", "B. 7", "A. 1 in 5 billion"];
var questionCounter = 0;
var clock;
var correct = 0;
var incorrect = 0;
var unanswered = 0;

$(document).ready(function() {


function StartScreen() {
    start = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
    $(".mainArea").html(start);
}

StartScreen();



$("body").on("click", ".start-button", function(event){
    generateHTML();
    timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
   
    selectedAnswer = $(this).text();
    if(selectedAnswer === correctAnswers[questionCounter]) {
        //alert("correct");

        clearInterval(clock);
        generateWin();
    }
    else {
        //alert("wrong answer!");
        clearInterval(clock);
        generateLoss();
    }
}); 

$("body").on("click", ".reset-button", function(event){
    resetGame();
}); 

});  

function LossDueToTimeOut() {
    unanswered++;
    game = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>";
    $(".mainArea").html(game);
    setTimeout(wait, 2000); 
}

function generateWin() {
    correct++;
    game = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>";
    $(".mainArea").html(game);
    setTimeout(wait, 2000);  
}

function generateLoss() {
    incorrect++;
    game = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>";
    $(".mainArea").html(game);
    setTimeout(wait, 2000); 
}

function generateHTML() {
    game = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>15</span></p><p class='text-center'>" + questions[questionCounter] + "</p><p class='first-answer answer'>A. " + answer[questionCounter][0] + "</p><p class='answer'>B. "+answer[questionCounter][1]+"</p><p class='answer'>C. "+answer[questionCounter][2]+"</p><p class='answer'>D. "+answer[questionCounter][3]+"</p>";
    $(".mainArea").html(game);
}

function wait() {
    if (questionCounter < 7) {
    questionCounter++;
    generateHTML();
    counter = 15;
    timerWrapper();
    }
    else {
        finalScreen();
    }
}

function timerWrapper() {
    clock = setInterval(fifteen, 1000);
    function fifteen() {
        if (counter === 0) {
            clearInterval(clock);
            LossDueToTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function finalScreen() {
    game = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Result:" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correct + "</p>" + "<p class = 'summary-wrong'>Wrong Answers: " + incorrect + "</p>" + "<p class = 'summary-unanswered'>Unanswered: " + unanswered + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".mainArea").html(game);
}

function resetGame() {
    questionCounter = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    counter = 15;
    generateHTML();
    timerWrapper();
}
