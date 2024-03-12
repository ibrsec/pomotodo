

import {saveData} from './localStorage.js';


let dragStartIndex;
//drag and drop process
function dragStart(e) {
    this.classList.add("dragging");
  
    let allTasks = [...document.querySelectorAll(".draggable")];
    dragStartIndex = allTasks.indexOf(this);
  }
  function dragEnd() {
    this.classList.remove("dragging");

    saveData();
  }
  function dragOver(e) {
    e.preventDefault();
  }
  
  function dragEnter() {
    this.classList.add("over");
  }
  function dragLeave() {
    this.classList.remove("over");
    saveData();

  }
  function dragDrop(e) { 
  
    let allTasks = [...document.querySelectorAll(".draggable")];
    let dragEndIndex = allTasks.indexOf(this);
  
    swapItems(dragStartIndex, dragEndIndex, e);
  
    this.classList.remove("over");

    saveData();
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
  }
  
 export const dragdropFunc = () => {
    const liTasks_fordragdrop = document.querySelectorAll(".draggable");
    const tasksContainer_fordragdrop = document.querySelector("#task-container");
  
    liTasks_fordragdrop.forEach((draggable) => {
      draggable.addEventListener("dragstart", dragStart);
      draggable.addEventListener("dragend", dragEnd);
      draggable.addEventListener("dragover", dragOver);
      draggable.addEventListener("drop", dragDrop);
      draggable.addEventListener("dragenter", dragEnter);
      draggable.addEventListener("dragleave", dragLeave);
    });


  };
  