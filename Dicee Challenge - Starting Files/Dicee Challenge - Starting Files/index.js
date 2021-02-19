function insertImage(value, classn)
{
    var imgc = document.getElementsByClassName(classn);
    var imgname = "images/dice" + value + ".png";
    imgc[0].setAttribute("src", imgname);
}

var a = Math.floor(Math.random()*6) + 1;
var b = Math.floor(Math.random()*6) + 1;
insertImage(a, "img1");
insertImage(b, "img2");
var resultText = document.getElementsByClassName("result")[0];

if(a < b)
{
    resultText.textContent = "Player 2 Wins!";
}

else if(a > b)
{
    resultText.textContent = "Player 1 Wins!";
}

else{
    resultText.textContent = "It's a draw!";
}

