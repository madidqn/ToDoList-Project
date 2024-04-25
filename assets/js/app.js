// select DOMelements
const inputUser = document.querySelector("#userInput");
const btnSubmit = document.querySelector("#submit");
const ulToDoList = document.querySelector(".boxToDo");
const ulToDoDone = document.querySelector("#toDoDone");
const buttonElements = document.querySelector(".wrapperButtom");
const btnEdit = document.querySelector("#edit");
const url = "http://localhost:3000/";

btnSubmit.addEventListener("click", async (e) => {
  e.preventDefault();
  let inputValue = inputUser.value.trim();
  if (inputValue === "") {
    alert("PLEASE ENTER TODO");
  } else {
    let divItem = document.createElement("div");
    divItem.classList.add("toDoItem");
    ulToDoList.append(divItem);
    let liElement = document.createElement("li");
    liElement.classList.add("toDo");
    liElement.innerHTML = inputValue;
    divItem.append(liElement);
    let divElement = document.createElement("div");
    divElement.classList.add("boxIcon");
    divElement.innerHTML = ` <i class="bx bx-edit"></i><i class="bx bxs-trash-alt"></i>
    <i class="bx bx-check-double"</i>`;
    divItem.append(divElement);
  }
  inputUser.value = "";
});
