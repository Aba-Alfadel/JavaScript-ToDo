//Selectors
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoButton = document.querySelector('.todo-button');
const filterOption = document.querySelector('.filter-todo');


//Event listener
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deletcheck);
filterOption.addEventListener("click",filterTodo);
document.addEventListener("DOMContentLoaded",getTodos);

//Functions
function addTodo (Event) {
    //PREVENT FORM FROM SUBMITTING
    event.preventDefault();
    //Create Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create Li 
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //ADD TODO Local Storage 
    saveLocalTodos(todoInput.value);
    //Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn");
    completedButton.innerHTML = '<i class="fas fa-check" > </i>';
    todoDiv.appendChild(completedButton);
    //Trash Mark Button
    const trashButtonn = document.createElement("button");
    trashButtonn.classList.add("trash-btn");
    trashButtonn.innerHTML = '<i class="fas fa-trash" > </i>';
    todoDiv.appendChild(trashButtonn);
    // Append To List 
    todoList.appendChild(todoDiv);
    //Clear todo Input Value 
    todoInput.value = '';
}

function deletcheck (e) {
    const item = e.target;
    //Delete Todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
    //Animation
        todo.addEventListener('transitionend',function() {
            todo.remove();
        });
    }

    //Check Mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed"); 
    }
}

function filterTodo (e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
            break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
            break;
            case "uncompleted":
                    if(!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
            break;
        };
    });
}

function saveLocalTodos(todo) {
    //Check--- Do I Already Have thing in my tere
    let todos;
    if (localStorage.getItem("todos" === null)) {
        todos = []; 
    } else {
        todos = JSON.parse(localStorage.getItem(todos));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));

}

function getTodos() {
    //Check--- Do I Already Have thing in my tere
    let todos;
    if (localStorage.getItem("todos" === null)) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem(todos));
    }
    todos.forEach(function(todo) {
     //Create Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create Li 
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn");
    completedButton.innerHTML = '<i class="fas fa-check" > </i>';
    todoDiv.appendChild(completedButton);
    //Trash Mark Button
    const trashButtonn = document.createElement("button");
    trashButtonn.classList.add("trash-btn");
    trashButtonn.innerHTML = '<i class="fas fa-trash" > </i>';
    todoDiv.appendChild(trashButtonn);
    // Append To List 
    todoList.appendChild(todoDiv);
    });
}


function removeLocalTodos (todo) {
     //Check--- Do I Already Have thing in my tere
     let todos;
     if (localStorage.getItem("todos" === null)) {
         todos = [];
     } else {
         todos = JSON.parse(localStorage.getItem(todos));
     }
     const todoIndex = todo.children[0].innerText;
     todos.splice(todos.indexOf(todoIndex),1);
     localStorage.setItem("todos",JSON.stringify(todos));
}