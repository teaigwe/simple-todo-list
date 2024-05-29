

let appendBtn = document.body.querySelector('.btn1');
let todo = document.body.querySelectorAll('input')[0];
let showTasks = document.body.querySelector('.showtodo');


function addTask (todoInput) {
   
    if (todoInput === ''){
   return; //to stop the executing of the function if the above condition is true cuz why bother?
    } 
    if (showTasks.style.display === 'none' || showTasks.style.display === '') {
        showTasks.style.display = 'block';
    } //making sure that section does not display on reload or loading of the page

    //creating all these elements for flexible appending sho get
    let todoDiv = document.createElement('div');
    todoDiv.className = 'tododiv'
    let todoPara = document.createElement('p');
    todoPara.textContent = todoInput;
    let doneBtn = document.createElement('button');
    doneBtn.className = 'btn2'
    doneBtn.textContent = 'Done';

    todoDiv.appendChild(todoPara);
    todoDiv.appendChild(doneBtn);
    showTasks.appendChild(todoDiv);


    todo.value = '' //to clear the input section after the appending

    doneBtn.addEventListener('click', ()=>{
       if (confirm('Would you like to clear this task off')){
        todoDiv.remove()
        removeTaskFromLocalStorage(todoInput);
        checkForTasks()
       } 

    })
}


//function for saving the tasks to the local storage
function saveTasks(task){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
localStorage.setItem('tasks', JSON.stringify(tasks));
}

//function for retrieving the tasks from the local storage
function loadTasks(){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task));
}

//function for removing done tasks from the local storage
function removeTaskFromLocalStorage(taskToRemove){
let tasks = JSON.parse(localStorage.getItem('tasks') || [])
tasks = tasks.filter(t => t !== taskToRemove);
localStorage.setItem('tasks', JSON.stringify(tasks))
}

//function to make sure nothing shows when all tasks are done and cleared
function checkForTasks(){
    if(showTasks.children.length === 0){ //.children will return a HTML collection of all the child elements
        showTasks.style.display = 'none';
    }
}
appendBtn.addEventListener('click', ()=>{
 let todoInput = todo.value.trim();
 addTask(todoInput);
 saveTasks(todoInput);
 if (todoInput===""){
    alert("please input task")
 }
}) //making the enter button work on click

todo.addEventListener('keydown', (event)=>{
    let todoInput = todo.value.trim();
    if (event.key === 'Enter'){
        addTask(todoInput);
        saveTasks(todoInput);
        event.preventDefault()
    }// making the enter key do the same function as the enter button
})
loadTasks();

// Things i learnt from this project:
// how to better manipulate the DOM
// forEach and filter array methods
// if conditional
// JS local storage
// dialogue boxes ie the difference between alert and confirm