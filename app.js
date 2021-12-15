// selector
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".todos-filter");
const resetOption = document.querySelector(".reset-btn");
const pendingTNums = document.querySelector(".pendingTodos");

// event lisntener

document.addEventListener("DOMContentLoaded", getTodos);

todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteComplete);
filterOption.addEventListener("click", filterTodo);
resetOption.addEventListener("click", resetTodo);

//Functions
function addTodo(event) {
  event.preventDefault(); // prevent form from submitting

  if (document.getElementById("inputText").value === "") {
    document.getElementById("addTODO").disabled = true;

  } else {
    document.getElementById("addTODO").disabled = false;
    const todoDiv = document.createElement("div"); // create a todo div
    todoDiv.classList.add("todo"); // add class to todo div
    const newTodo = document.createElement("li"); // create a li newTodo, add class and append li in div
    newTodo.innerText = todoInput.value;
    // console.log(newTodo.innerText);
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    saveLocalMyTodos(todoInput.value); // add todo in local storage

    // create a complete- check btn, add class and append it in div
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn);

    // create a delete- trash btn, add class and append it in div
    const deletedBtn = document.createElement("button");
    deletedBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deletedBtn.classList.add("delete-btn");
    todoDiv.appendChild(deletedBtn);
    todoList.appendChild(todoDiv);
    todoInput.value = ""; //clear todo input field
  }
}

function deleteComplete(e) {
  // console.log(e.target);
  // dele todo
  const item = e.target;
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    // animation
    todo.classList.add("fall");
    removelocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // for check mark for completed task
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");

  }
}

function filterTodo(e) {
  // const todos = todoList.childNodes;
  const todos = [...todoList.children];
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
          console.log("compted");
          // pendingTNums.textContent = todo.length; // passing lenth of todo array
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function push(todo) {}

function saveLocalMyTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
  console.log("save todos at get", todos.length);
  pendingTNums.textContent = todos.length; // passing lenth of todo array
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    // add class to todo div
    todoDiv.classList.add("todo");
    // create a li newTodo, add class and append li in div
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // create a complete- check btn, add class and append it in div
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn);
    // create a delete- trash btn, add class and append it in div
    const deletedBtn = document.createElement("button");
    deletedBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deletedBtn.classList.add("delete-btn");
    todoDiv.appendChild(deletedBtn);
    //  append  list
    todoList.appendChild(todoDiv);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log("gettodos at get", todos.length);
  pendingTNums.textContent = todos.length; // passing lenth of todo array
}

function removelocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // console.log(todo);
  // console.log(todo.children);
  // console.log(todo.children[0].innerText);

  const gettodoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(gettodoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log("removetods", todos.length);
  pendingTNums.textContent = todos.length; // passing lenth of todo array
}

function resetTodo() {
  // console.log(e.target);
  // remove todolist on reset btn click

  localStorage.clear();
  window.location.reload();

  // var toDoList = document.querySelectorAll("#todoList");
  // for (var i = 0; (li = toDoList[i]); i++) {
  //   li.parentNode.removeChild(li);
  // }
}
