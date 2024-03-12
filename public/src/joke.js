



const jokeTextElement = document.querySelector("#joke-text");
const jokeBtn = document.getElementById("joke-btn");
const BASEURL_JOKE = "https://icanhazdadjoke.com";

//joke screen
function animatedText(text, element) {
  //welcome text animation
  const welcomeText = text;
  let welcomeIndex = 1;
  writeText();
  function writeText() {
    element.textContent = welcomeText.slice(0, welcomeIndex);
    welcomeIndex++;

    if (welcomeIndex <= welcomeText.length) {
      setTimeout(writeText, 80);
    }
  }
}

//jokeApi
const getAJoke = async (url) => {
  const option = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };
  const response = await fetch(url, option);

  if (response.status === 200) {
    const jsonData = await response.json();
    console.log(jsonData);
    animatedText(jsonData.joke, jokeTextElement);
  }
};
getAJoke(BASEURL_JOKE);

jokeBtn.onclick = () => {
  getAJoke(BASEURL_JOKE);
};
