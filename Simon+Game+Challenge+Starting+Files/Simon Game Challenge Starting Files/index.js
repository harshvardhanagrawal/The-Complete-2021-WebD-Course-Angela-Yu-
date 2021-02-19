var state = 0;
var level = 0;
var curr = 1;
$(document).keypress(function(){
    if(state == 1)
    {
        return;
    }
    state = 1;
    playGame();
});

$(".btn").click(function(){
    if(state == 0)
    {
        $("body").css("background-color", "red");
        setTimeout(function(){
            $("body").css("background-color", "#011F3F");
        }, 500);
    }
});

var seq = ["gray"];

function playGame()
{
    seq = ["gray"];
    getNextLevel();
    playNextLevel();
}

function playSound(file)
{
    var file = "sounds/" + file + ".mp3";
    var audio = new Audio(file);
    audio.play();
}

function gameOver()
{
    state = 0;
    level = 0;
    $("body").css("background-color", "red");
    setTimeout(function(){
        $("body").css("background-color", "#011F3F");
    }, 500);
    
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to try again");
}

function playNextLevel()
{
    $(".btn").click(function(event){
        var toBeClicked = seq[curr];

        console.log(seq + " " + curr);
        curr++;
        var x = $(this).attr("id");
        playSound(x);
        if(x != toBeClicked)
        {
            console.log("Expected: " + toBeClicked + ", Got: " + x + ", cur = " + curr);
            $(".btn").off();
            gameOver();
            return;
        }

        else
        {
            if(curr >= seq.length)
            {
                console.log("new level " + curr + " " + seq.length);
                setTimeout(getNextLevel, 500);
            }
        }
    });    
}

function getNextLevel()
{
    curr = 1;
    level++;
    $("#level-title").text("Level " + level);
    var next = Math.floor(Math.random()*4);
    var req;
    switch(next)
    {
        case 0:
            req = "green";
            break;
        case 1:
            req = "red";
            break;
        case 2:
            req = "yellow";
            break;
        case 3:
            req = "blue";
            break;
    }
    seq.push(req);
    console.log(seq);
    var btnId = "#" + req;
    $(btnId).addClass("pressed");
    playSound(req);
    setTimeout( function(){
        $("#"+req).removeClass("pressed");
    }, 500);
}