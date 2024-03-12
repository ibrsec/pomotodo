


export const setColorTheme = (choosenColor) => {
    //start button styles
    document.querySelector("header").style.backgroundColor = choosenColor;
    document.querySelector("#joke .container").style.backgroundColor = choosenColor;
    document.querySelector("#joke .container").style.color = choosenColor;
    document.querySelectorAll("main section .container").forEach(item => item.style.borderColor = choosenColor);
    document
    .querySelectorAll("section#count-time .container .time-buttons button")
    .forEach((item) => (item.style.backgroundColor = choosenColor));
  
    document.querySelector("section#count-time .container").style.borderColor = choosenColor;
      
    document.querySelector("section#tasks .container").style.borderColor = choosenColor;  
      
  
    document.querySelector("#task-input").style.backgroundColor = choosenColor; 
    document.querySelector("#task-input").style.opacity = ".6"; 
    document.querySelector("#task-add-btn").style.backgroundColor = choosenColor; 
    document.querySelector(".active-task p").style.color = choosenColor; 
  
  
    document
    .querySelectorAll("section#count-time .container .time-buttons button")
    .forEach((item) => (item.style.color = "white"));
    
    
    document.querySelector("header").style.color = "white";
  
  
  }

  export const getColorValues = () => {
    const allTasks_forGetColors = document.querySelectorAll("#task-container li");
    
    allTasks_forGetColors.forEach(eachLi => {
        eachLi.querySelector("#color-input").value = localStorage.getItem(eachLi.getAttribute("data-task"));
    })
    
    
    
    }