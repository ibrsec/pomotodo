const welcomeP = document.querySelector(".welcome p");
const welcomeLine = document.querySelector(".welcome p span");


//welcome text animation
const welcomeText = "Welcome!!!";
let welcomeIndex = 1;
writeText();
function writeText  ()  {
    welcomeP.textContent = welcomeText.slice(0,welcomeIndex);
    welcomeIndex++;

    if(welcomeIndex > welcomeText.length){
        welcomeIndex = 0;
    }


    setTimeout(writeText,450);

}


 