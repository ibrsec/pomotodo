import './assets/css/style.css';
import './public/src/joke.js';
import {getData} from './public/src/localStorage.js';
import {setColorTheme} from './public/src/setgetColors.js';
import {getColorValues} from './public/src/setgetColors.js';
import {dragdropFunc} from './public/src/dragdrop.js';

const tasksContainer = document.getElementById("task-container");
const activeTaskBelowTimer = document.querySelector(".active-task p");

import './public/src/time.js';
import './public/src/addeditTasks.js';


getData();
 
dragdropFunc();
  
const AllLiTasks = document.querySelectorAll("#task-container li");

//at refresh screen the active task
AllLiTasks.forEach((item) => {
  if (item.classList.contains("active")) {
    activeTaskBelowTimer.textContent = item.getAttribute("data-task");
  }
});

//at refresh bring the color value from local storage
//and dinamic color input when task is active
const allColorINputs = document.querySelectorAll(".color-span input")

tasksContainer.addEventListener("input", function(e) {
    if(e.target.id == "color-input"){
        localStorage.setItem(`${e.target.closest("li").getAttribute("data-task")}`, e.target.value );
    }

    //color change should be active just when parent task is active
    if(e.target.closest("li").classList.contains("active")){

      setColorTheme(e.target.value);
    }



})

getColorValues();



