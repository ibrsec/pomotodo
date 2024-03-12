
import {dragdropFunc} from './dragdrop.js';
import {saveData} from './localStorage.js';
import {setColorTheme} from './setgetColors.js';




const welcomeP = document.querySelector(".welcome p");
const welcomeLine = document.querySelector(".welcome p span");
const timeContainer = document.querySelector("#count-time .container");





const taskInput = document.getElementById("task-input");
taskInput.focus();
const taskAddBtn = document.getElementById("task-add-btn");
const tasksContainer = document.getElementById("task-container");

const activeTaskBelowTimer = document.querySelector(".active-task p");



//todo tasks part
taskAddBtn.addEventListener("click", () => {
    if (!taskInput.value.trim()) {
      return;
    }
    const value = taskInput.value.trim();
    let li = document.createElement("li");
    li.setAttribute("data-task", value);
    li.setAttribute("draggable", true);
    li.setAttribute("data-task-pomo", 0);
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
    spanTime.textContent = "00:00";
    li.appendChild(spanTime);
  
    let spanPomo = document.createElement("span");
    spanPomo.classList.add("pomo-span");
    spanPomo.textContent = "0";
    li.appendChild(spanPomo);
  
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
    
      e.target.parentElement.querySelector("p").textContent = text;
      e.target.parentElement.setAttribute("data-task", text);
      if(e.target.parentElement.classList.contains("active")){
        activeTaskBelowTimer.textContent = text;
    
      }


    saveData();
        // localStorage.removeItem(`${e.target.closest("li").getAttribute("data-task")}`);
    }
  
  