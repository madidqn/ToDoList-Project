// select DOMelements
const inputUser = document.querySelector("#userInput");
const btnSubmit = document.querySelector("#submit");
const ulToDoList = document.querySelector(".boxToDo");
const ulToDoDone = document.querySelector("#toDoDone");
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
getTasks("todo", ulToDoList);
getTasks("tododone", ulToDoDone);

//@@@@@@@@@@@ TODOLIST @@@@@@@@@@@//

// submit and add todo to the backend
btnSubmit.addEventListener("click", async (e) => {
  e.preventDefault();
  let inputValue = inputUser.value.trim();
  if (inputValue === "") {
    alert("PLEASE ENTER TODO");
  } else {
    await postTasks(inputValue, "todo");
    inputUser.value = "";
  }
});
