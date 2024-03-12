



const tasksContainer = document.getElementById("task-container");


//save the tasks to local storage
export const saveData = () => {
    localStorage.setItem("tasks", tasksContainer.innerHTML);
  };
  
  
  //bring task containers content form local storage
 export const getData = () => {
    tasksContainer.innerHTML = localStorage.getItem("tasks");
  };