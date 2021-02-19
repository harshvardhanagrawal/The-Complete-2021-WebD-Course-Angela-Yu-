var drums = document.getElementsByClassName("drum");
for(var i =0;i < drums.length;i++)
{
    drums[i].addEventListener("click", handleClick);
}

document.addEventListener("keypress", function(event){
    makeSound(event.key);
})

function makeSound(key)
{
    var instrument;
    switch(key)
    {
        case "w":
            instrument = "crash";
            break;
        
        case "a":
            instrument = "kick-bass";
            break;

        case "s":
            instrument = "snare";
            break;

        case "d":
            instrument = "tom-1";
            break;

        case "j":
            instrument = "tom-2";
            break;

        case "k":
            instrument = "tom-3";
        break;

        case "l":
            instrument = "tom-4";
        break;
                
    }
    var audiofile = "sounds/" + instrument + ".mp3";   
    var audio = new Audio(audiofile);
    audio.play();

}

function handleClick()
{
    
    makeSound(this.innerHTML);
}