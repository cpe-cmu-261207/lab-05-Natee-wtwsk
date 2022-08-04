const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") return;

  //your code here
  if(inputAdd.value == ''){
    alert("Todo cannot be empty");
    return;
  }
  else{
    addTodo(inputAdd.value, false);
    inputAdd.value = '';
  }
  saveTodo();
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";

  //your code here
  doneBtn.style.display = "none";
  deleteBtn.style.display = "none";
  div.appendChild(span);
  div.appendChild(doneBtn);
  div.appendChild(deleteBtn);
  //append todo to HTML...
  todoCtn.insertBefore(div, todoCtn.children[0]);
  //define buttons event...
  div.onmouseover = () => {
    div.children[1].style.display = "";
    div.children[2].style.display = "";
  };
  div.onmouseout = () => {
    div.children[1].style.display = "none";
    div.children[2].style.display = "none";
  };
  doneBtn.onclick = () => {
    if(div.children[0].style.textDecoration != "line-through"){
      div.children[0].style.textDecoration = "line-through";
      saveTodo();
    }
    else{
      div.children[0].style.textDecoration = "";
      saveTodo();
    }
  }
  deleteBtn.onclick = () => {
    todoCtn.removeChild(div);
    saveTodo();
  }
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    //your code here
    const arr = {title: todoDiv.children[0].innerText, completed: false};
    if(todoDiv.children[0].style.textDecoration == "line-through") arr.completed = true;
    data.push(arr);
  }
  //your code here
  localStorage.clear();
  data.reverse();
  const dataStr = JSON.stringify(data);
  localStorage.setItem("todoListData", dataStr);
}

function loadTodo() {
  //your code here
  const dataStr = localStorage.getItem("todoListData");
  const data = JSON.parse(dataStr);

  for(const todoObj of data){
    addTodo(todoObj.title, todoObj.completed);
  }
}

loadTodo();
