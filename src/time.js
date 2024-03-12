
import {setColorTheme} from './setgetColors.js';
import {saveData} from './localStorage.js';


export const startBtn = document.getElementById("start-btn");
export const stopBtn = document.getElementById("stop-btn");
export const resetBtn = document.getElementById("reset-btn");
export const minuteSpan = document.getElementById("minute");
export const secondSpan = document.getElementById("second");
export const activeTaskBelowTimer = document.querySelector(".active-task p");
const tasksContainer = document.getElementById("task-container");


export let timer;
export let count_min = 25;
export let count_sec = 0;
export let count_hour = 0;

export const timerInterval_countdown = () => {
  count_sec--;

  if (count_sec == -1) {
    count_min--;
    count_sec = 59;
  }
  if (count_min == -1) {
    console.log("over");
    Swal.fire("Time is over!");
    stopBtn.click();
    
    //send the pomotime if a pomodoro is finished
    tasksContainer.querySelectorAll("li").forEach((item) => {
      if (item.classList.contains("active")) {
        

        item.setAttribute("data-task-pomo", Number(item.getAttribute("data-task-pomo")) + 1 );
        item.querySelector(".pomo-span").textContent++;
        item.setAttribute("data-task-time", "00:00");
        item.querySelector(".task-time").textContent = "00:00";
      }
    });

  saveData();



    clearInterval(timer);
    count_min = 25;
    count_sec = 0;
    console.log(`${count_hour} : ${count_min} : ${count_sec}`);
    display(count_hour, count_min, count_sec);
    startBtn.disabled = false;
    stopBtn.diabled = true;

    return;
  }

  console.log(`${count_hour} : ${count_min} : ${count_sec}`);
  display(count_hour, count_min, count_sec);

  
}

export const display = (hour, min, sec) => {
  let pretty_sec = sec < 10 ? "0" + sec : sec;
  let pretty_min = min < 10 ? "0" + min : min;
  let pretty_hour = hour < 10 ? "0" + hour : hour;

  minuteSpan.textContent = pretty_min;
  secondSpan.textContent = pretty_sec;
};

export const startBtnFunction = () => {
  if (activeTaskBelowTimer.textContent.length == 0) {
    Swal.fire("You should select a task!");
    return;
  }

  if(tasksContainer.querySelector("li.active").classList.contains("checked")){

    Swal.fire("You are performing a finished task!!!");
    }


  timer = setInterval(timerInterval_countdown, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled = true;

  //start button styles
  document.querySelector("header").style.backgroundColor = "black";
  document.querySelector("header").style.color = "white";
  document.querySelector("#joke .container").style.backgroundColor = "black";
  document.querySelector("#joke .container").style.color = "white";
  document.querySelector("main section .container").style.borderColor = "black";
  document
    .querySelectorAll("section#count-time .container .time-buttons button")
    .forEach((item) => (item.style.backgroundColor = "black"));
  document
    .querySelectorAll("section#count-time .container .time-buttons button")
    .forEach((item) => (item.style.color = "white"));
    
    document.querySelector("section#count-time .container").style.borderColor = "black";


  //show off the task when open the time
  document.querySelector("section#tasks").style.display = "none";
  document.getElementById("click-sound").play()

}

export const stopBtnFunction = () => {

  timer = clearInterval(timer);
  startBtn.disabled = false;
  stopBtn.diabled = true;
  resetBtn.disabled = false;

  //stop button styles
  //show on the task when close the time
  document.querySelector("section#tasks").style.display = "block";

    const choosenColor = [...document.querySelectorAll("li")].filter(item => item.classList.contains("active"))[0].querySelector('#color-input').value;
  setColorTheme(choosenColor);

//   document.querySelector("section#count-time .container").style.borderBottomColor = "transparent";
  


  //send the time to active task
  const countedTime = 
    count_min == 25
      ? "00:00" 
      : `${24 - count_min < 10 ? "0" + (24 - count_min) : 24 - count_min}:${
          60 - count_sec < 10 ? "0" + (60 - count_sec) : 60 - count_sec
        }`;



  console.log("countedTime =", countedTime);

  tasksContainer.querySelectorAll("li").forEach((item) => {
    if (item.classList.contains("active")) {
      
      item.setAttribute("data-task-time", countedTime);
      item.querySelector(".task-time").textContent = countedTime;
    }
  });
  document.getElementById("click-sound").play()

  saveData();
}

export const resetBtnFunction = () =>{
  count_min = 25;
  count_sec = 0;
  display(count_hour, count_min, count_sec);
}



startBtn.addEventListener("click", startBtnFunction);
stopBtn.addEventListener("click", stopBtnFunction);
resetBtn.addEventListener("click", resetBtnFunction);
