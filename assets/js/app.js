// select DOMelements
const inputUser = document.querySelector("#userInput");
const btnSubmit = document.querySelector("#submit");
const ulTodoList = document.querySelector(".boxToDo");
const ulTodoDone = document.querySelector("#toDoDone");
const buttonElements = document.querySelector(".wrapperButtom");
const btnEdit = document.querySelector("#edit");
const url = "http://localhost:3000/";

//post tasks
const postTasks = async (task, arrayApi) => {
  await fetch(url + `${arrayApi}`, {
    method: "POST",
    body: JSON.stringify({
      todo: task,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
};

// get all the todos and show on the web
const getTasks = async (arrayApi, ul) => {
  const response = await fetch(url + `${arrayApi}`);
  const todos = await response.json();
  for (let todo of todos) {
    let divItem = document.createElement("div");
    divItem.classList.add("toDoItem");
    ul.append(divItem);
    let liElement = document.createElement("li");
    liElement.classList.add("toDo");
    liElement.innerHTML = todo.todo;
    divItem.append(liElement);
    let divElement = document.createElement("div");
    divElement.classList.add("boxIcon");
    if (arrayApi == "todo") {
      divElement.innerHTML = ` <i class="bx bx-edit" data-edit="${todo.id}"></i><i class="bx bxs-trash-alt" data-delete="${todo.id}"></i>
          <i class="bx bx-check-double" data-done="${todo.id}"></i>`;
    } else if (arrayApi == "tododone") {
      divElement.innerHTML = `<i class="bx bx-revision" data-return="${todo.id}"></i><i class="bx bxs-trash-alt" data-trash="${todo.id}"></i>`;
    }
    divItem.append(divElement);
  }
};
getTasks("todo", ulTodoList);
getTasks("tododone", ulTodoDone);

//@@@@@@@@@@@ TODOLIST @@@@@@@@@@@//

// submit and add todo to the backend
btnSubmit.addEventListener("click", async (e) => {
  e.preventDefault();
  let inputValue = inputUser.value.trim();
  if (inputValue === "") {
    alert("Please Enter Todo");
  } else {
    await postTasks(inputValue, "todo");
    inputUser.value = "";
  }
});

// edit todo from backend
const editToDo = async (id) => {
  let task = inputUser.value;
  await fetch(url + `todo/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ todo: task }),
    headers: {
      "Content-type": "application/json",
    },
  });
};

//delete task
const deleteTask = async (arrayApi, id) => {
  await fetch(url + `${arrayApi}/${id}`, {
    method: "DELETE",
  });
};

// get single todo
const getToDo = async (id) => {
  const res = await fetch(url + `todo/${id}`);
  const task = await res.json();
  inputUser.value = task.todo;
};

//Sending task
const sendTask = async (arrayApi1, arrayApi2, id) => {
  const res = await fetch(url + `${arrayApi1}/${id}`);
  const task = await res.json();
  let toDo = task.todo;
  postTasks(toDo, `${arrayApi2}`);
};

// submit delete and edit and done todo
ulTodoList.addEventListener("click", async (e) => {
  let clickElement = e.target;
  let idTodo;
  if (clickElement.classList.contains("bxs-trash-alt")) {
    if (confirm("Are You Sure?")) {
      idTodo = clickElement.dataset.delete;
      await deleteTask("todo", idTodo);
    }
  }
  if (clickElement.classList.contains("bx-edit")) {
    buttonElements.style.gridTemplateColumns = "repeat(2, 1fr)";
    btnEdit.style.display = "block";
    idTodo = clickElement.dataset.edit;
    await getToDo(idTodo);
    btnEdit.setAttribute("data-id", idTodo);
  }
  if (clickElement.classList.contains("bx-check-double")) {
    idTodo = clickElement.dataset.done;
    await sendTask("todo", "tododone", idTodo);
    await deleteTask("todo", idTodo);
  }
});

// submit edit todo
btnEdit.addEventListener("click", async function () {
  const id = this.dataset.id;
  await editToDo(id);
  this.style.display = "none";
  alert("Todo Was Edited");
});
