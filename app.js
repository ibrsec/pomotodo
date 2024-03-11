const welcomeP = document.querySelector(".welcome p");
const welcomeLine = document.querySelector(".welcome p span");
const jokeTextElement = document.querySelector("#joke-text");
const jokeBtn = document.getElementById("joke-btn");
const BASEURL_JOKE = "https://icanhazdadjoke.com";
const timeContainer = document.querySelector("#count-time .container");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
const countMinute_time = 1;
const minuteSpan = document.getElementById("minute");
const secondSpan = document.getElementById("second");
const taskInput = document.getElementById("task-input");
taskInput.focus();
const taskAddBtn = document.getElementById("task-add-btn");
const tasksContainer = document.getElementById("task-container");

const activeTaskBelowTimer = document.querySelector(".active-task p");

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
getAJoke(BASEURL_JOKE)
jokeBtn.onclick = () => {
  getAJoke(BASEURL_JOKE);
};

let timer;

startBtn.addEventListener("click", () => {
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

  


});

stopBtn.addEventListener("click", () => {

  timer = clearInterval(timer);
  startBtn.disabled = false;
  stopBtn.diabled = true;
  resetBtn.disabled = false;

  //stop button styles
//   document.querySelector("header").style.backgroundColor = "#74abb9";
//   document.querySelector("header").style.color = "black";
//   document.querySelector("#joke .container").style.backgroundColor = "#74abb9";
//   document.querySelector("#joke .container").style.color = "white";
//   document.querySelector("main section .container").style.borderColor =
//     "#74abb9";
//   document
//     .querySelectorAll("section#count-time .container .time-buttons button")
//     .forEach((item) => (item.style.backgroundColor = "#74abb9"));
//   document
//     .querySelectorAll("section#count-time .container .time-buttons button")
//     .forEach((item) => (item.style.color = "black"));

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
});

resetBtn.addEventListener("click", () => {
  count_min = 25;
  count_sec = 0;
  display(count_hour, count_min, count_sec);
});

let min = 1;
let sec = 1;
let hour = 0;

function timerInterval_stopwatch() {
  sec++;
  if (sec == 60) {
    min++;
    sec = 0;
  }
  if (min == 60) {
    hour++;
    min = 0;
  }
  console.log(`${hour} : ${min} : ${sec}`);
  display(hour, min, sec);
}

let count_min = 25;
let count_sec = 0;
let count_hour = 0;
function timerInterval_countdown() {
  count_sec--;

  if (count_sec == -1) {
    count_min--;
    count_sec = 59;
  }
  if (count_min == -1) {
    console.log("over");
    Swal.fire("Time is over!");
    stopBtn.click();
    
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

const display = (hour, min, sec) => {
  let pretty_sec = sec < 10 ? "0" + sec : sec;
  let pretty_min = min < 10 ? "0" + min : min;
  let pretty_hour = hour < 10 ? "0" + hour : hour;

  minuteSpan.textContent = pretty_min;
  secondSpan.textContent = pretty_sec;
};

//todo tasks part
taskAddBtn.addEventListener("click", () => {
  if (!taskInput.value.trim()) {
    return;
  }
  const value = taskInput.value.trim();
  let li = document.createElement("li");
  li.setAttribute("data-task", value);
  li.setAttribute("draggable", true);
  li.classList.add("draggable");
  
  // cancel -> adding data index to tasks
  //   let datainn = [...tasksContainer.querySelectorAll("li")]
  //     .map((item) => item.getAttribute("data-index"))
  //     .reduce((max, current) => (max < current ? current : max), 0);
  
  //   li.setAttribute(
      //     "data-index",
      //     document.querySelector("#task-container").textContent == "" ? 0 : ++datainn
      //   );
      //
      
      //p
      let p = document.createElement("p");
      p.textContent = value;
      li.appendChild(p);
      


  let spanCheck = document.createElement("span");
  spanCheck.classList.add("checkbox");
  li.appendChild(spanCheck);

  let spanDelete = document.createElement("span");
  spanDelete.textContent = "✘";
  spanDelete.classList.add("delete");
  li.appendChild(spanDelete);

  let spanEdit = document.createElement("span");
  spanEdit.textContent = "📝";
  spanEdit.classList.add("edit-span");
  li.appendChild(spanEdit);


  let spanTime = document.createElement("span");
  spanTime.classList.add("task-time");
  li.appendChild(spanTime);

  let spanColor = document.createElement("span");
  spanColor.classList.add("color-span");
  let colorInput = document.createElement("input");
  colorInput.type = "color";
  colorInput.id = "color-input";
  colorInput.value = "#74abb9"; 
  spanColor.appendChild(colorInput);
  li.appendChild(spanColor);

  tasksContainer.appendChild(li);

  localStorage.setItem(value, "#74abb9" );


  //   liTasks = document.querySelectorAll("#task-container li");
  // console.log(liTasks);

  taskInput.value = "";
  taskInput.focus();

  dragdropFunc();

  saveData();

});

taskInput.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    taskAddBtn.click();
  }
});



tasksContainer.addEventListener("click", (e) => {
    if (e.target.className == "delete") {
    e.target.parentElement.remove();
    activeTaskBelowTimer.textContent = "";
    localStorage.removeItem(`${e.target.closest("li").getAttribute("data-task")}`);
  } else if(e.target.className == "edit-span"){
    editWindow(e);
    

  } else if (e.target.className == "checkbox") {
    if (e.target.textContent.length == 0) {
      e.target.textContent = "✔︎";
    } else {
      e.target.textContent = "";
    }
    e.target.parentElement.classList.toggle("checked");
  } else if (e.target.tagName == "LI") {
    e.target.parentElement.querySelectorAll("li").forEach((item) => {
      item.classList.remove("active");
    });
    e.target.classList.add("active");

    //task display below countdown
    activeTaskBelowTimer.textContent =
      e.target.getAttribute("data-task") ?? "-";

      //set the choosed color to ste as style
      const choosenColor = e.target.querySelector("#color-input").value;
        setColorTheme(choosenColor);

        


  }else if( e.target.tagName == "P"){
    e.target.parentElement.parentElement.querySelectorAll("li").forEach((item) => {
      item.classList.remove("active");
    });
    e.target.parentElement.classList.add("active");

    //task display below countdown
    activeTaskBelowTimer.textContent =
      e.target.parentElement.getAttribute("data-task") ?? "-";

      //set the choosed color to ste as style
      const choosenColor = e.target.parentElement.querySelector("#color-input").value;
        setColorTheme(choosenColor);

        

  }
  saveData();




});


const setColorTheme = (choosenColor) => {
  //start button styles
  document.querySelector("header").style.backgroundColor = choosenColor;
  document.querySelector("#joke .container").style.backgroundColor = choosenColor;
  document.querySelector("#joke .container").style.color = choosenColor;
  document.querySelector("main section .container").style.borderColor = choosenColor;
  document
  .querySelectorAll("section#count-time .container .time-buttons button")
  .forEach((item) => (item.style.backgroundColor = choosenColor));

  document.querySelector("section#tasks .container").style.borderColor = choosenColor;  
  document.querySelector("section#task-container .container").style.borderColor = choosenColor;  

document.querySelector("#task-input").style.backgroundColor = choosenColor; 
document.querySelector("#task-input").style.opacity = ".6"; 
document.querySelector("#task-add-btn").style.backgroundColor = choosenColor; 
document.querySelector(".active-task p").style.color = choosenColor; 


  document
  .querySelectorAll("section#count-time .container .time-buttons button")
  .forEach((item) => (item.style.color = "white"));
  
  
  document.querySelector("header").style.color = "white";


}









//save the tasks to local storage
const saveData = () => {
  localStorage.setItem("tasks", tasksContainer.innerHTML);
};


//bring task containers content form local storage
const getData = () => {
  tasksContainer.innerHTML = localStorage.getItem("tasks");
};
getData();



//drag and drop process
function dragStart(e) {
    this.classList.add("dragging");
  
    let allTasks = [...document.querySelectorAll(".draggable")];
    dragStartIndex = allTasks.indexOf(this);
  }
  function dragEnd() {
    this.classList.remove("dragging");
  }
  function dragOver(e) {
    e.preventDefault();
  }
  
  function dragEnter() {
    this.classList.add("over");
  }
  function dragLeave() {
    this.classList.remove("over");
  }
  function dragDrop(e) {
    console.log("drop event");
  
    let allTasks = [...document.querySelectorAll(".draggable")];
    dragEndIndex = allTasks.indexOf(this);
  
    swapItems(dragStartIndex, dragEndIndex, e);
  
    this.classList.remove("over");
  }
  function swapItems(fromIndex, toIndex, e) {
    let allTasks = [...document.querySelectorAll(".draggable")];
  
    // Swap items in the allTasks array
    [allTasks[fromIndex], allTasks[toIndex]] = [
      allTasks[toIndex],
      allTasks[fromIndex],
    ];
  
    // Update the DOM to reflect the new order (optional)
    const tasksContainer = document.querySelector("#task-container");
    tasksContainer.textContent = ""; // Clear the container
  
    allTasks.forEach((task) => {
      tasksContainer.appendChild(task);
    });
    console.log(allTasks);
  }
  
  const dragdropFunc = () => {
    const liTasks_fordragdrop = document.querySelectorAll(".draggable");
    const tasksContainer_fordragdrop = document.querySelector("#task-container");
  
    liTasks_fordragdrop.forEach((draggable, index, array) => {
      draggable.addEventListener("dragstart", dragStart);
      draggable.addEventListener("dragend", dragEnd);
      draggable.addEventListener("dragover", dragOver);
      draggable.addEventListener("drop", dragDrop);
      draggable.addEventListener("dragenter", dragEnter);
      draggable.addEventListener("dragleave", dragLeave);
    });
  };
  
  dragdropFunc();
  

  const AllLiTasks = document.querySelectorAll("#task-container li");

//at refresh screen the active task
AllLiTasks.forEach((item) => {
  if (item.classList.contains("active")) {
    console.log(item);
    activeTaskBelowTimer.textContent = item.getAttribute("data-task");
  }
});


//at refresh bring the color value from local storage
const allColorINputs = document.querySelectorAll(".color-span input")

tasksContainer.addEventListener("input", function(e) {
    if(e.target.id == "color-input"){
        localStorage.setItem(`${e.target.closest("li").getAttribute("data-task")}`, e.target.value );
    }

    setColorTheme(e.target.value);



})

const getColorValues = () => {
const allTasks_forGetColors = document.querySelectorAll("#task-container li");

allTasks_forGetColors.forEach(eachLi => {
    eachLi.querySelector("#color-input").value = localStorage.getItem(eachLi.getAttribute("data-task"));
})



}
getColorValues();

const editWindow = async(e) => {



const { value: text } = await Swal.fire({
    input: "textarea",
    inputLabel: "Edit your Task!",
    inputPlaceholder: e.target.parentElement.querySelector("p").textContent,
    inputAttributes: {
      "aria-label": "nevar"
    },
    showCancelButton: true
  });
  if (text) {
    Swal.fire('Success!!');
  }else{
    Swal.fire("Cancelled!!");
    return;
  }
  console.log(text);

  e.target.parentElement.querySelector("p").textContent = text;
  activeTaskBelowTimer.textContent = text;
    // localStorage.removeItem(`${e.target.closest("li").getAttribute("data-task")}`);
}

