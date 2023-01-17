"use strict";

const body = document.querySelector("body");
const addTodo = document.querySelector(".add-todo");
const addTodoBtn1 = document.querySelector(".add-todo-img");
const todoInput = document.querySelector(".add-todo-input");
const listBox = document.querySelector(".todo-list-box");
const todoList = document.querySelector(".todo-list");
const todoListItm = document.querySelectorAll(".todo-list-item");
const checkbox = document.querySelectorAll(".todo-checkbox");
const checkboxTrigger = document.querySelectorAll(".todo-check-toogle");
const checkIcon = document.querySelectorAll(".todo-check-toogle-icon");
const todoText = document.querySelectorAll(".todo-check-text");
const addTodoBtn2 = document.querySelector(".todo-empty-btn");
const emptyTodo = document.querySelector(".todo-empty");
const emptyTodoIcon = document.querySelector(".todo-empty-icon");
const themeIcon = document.querySelector(".todo-head__theme-icon");
const todoFoot = document.querySelector(".todo-foot");
const todoFootList = document.querySelector(".todo-foot-nav__list");
const footListItem = document.querySelectorAll(".todo-foot-nav__list-item");
const clearTodo = document.querySelector(".todo-clear");
const instruction = document.querySelector(".reorder");
const itemNum = document.querySelector(".item-num span");

const inputValues = [];
const allTodo = [];
const activeTodo = [];
const completedTodo = [];
const listEl = [];
const todoObj = {
  completed: false,
  active: true,
};

const changeTheme = function (
  bg,
  icon,
  add,
  shad,
  bdyclr,
  genBg,
  listBg,
  clr1,
  clr2
) {
  body.style.backgroundImage = `url(../images/bg-desktop-${bg}.jpg)`;
  body.style.backgroundColor = `${genBg}`;
  body.style.color = `${bdyclr}`;
  themeIcon.src = `../images/icon-${icon}.svg`;
  emptyTodoIcon.src = `../images/${add}.svg`;
  listBox.style.boxShadow = `${shad}`;
  addTodo.style.backgroundColor = `${listBg}`;
  listBox.style.backgroundColor = `${listBg}`;
  addTodoBtn2.style.color = `${clr1}`;
  todoFoot.style.borderTopColor = themeIcon.className.includes("dark")
    ? `${clr2}`
    : `${clr1}`;
  todoFoot.style.color = themeIcon.className.includes("dark")
    ? `${clr2}`
    : `${clr1}`;
  todoList.style.color = `${clr2}`;
  instruction.style.color = `${clr2}`;
};
const footHover = function (evnt, clr) {
  footListItem.forEach((e) => {
    e.addEventListener(`mouse${evnt}`, () => {
      e.style.color = `${clr}`;
    });
  });

  clearTodo.addEventListener(`mouse${evnt}`, () => {
    clearTodo.style.color = `${clr}`;
  });
};

const completedStyle = function () {
  if (todoList.children.length > 2) {
    themeIcon.addEventListener("click", () => {
      if (themeIcon.className.includes("dark")) {
        todoText.forEach((e) => {
          e.style.color = "hsl(233, 14%, 35%)";
        });
      } else {
        todoText.forEach((e) => {
          e.style.color = "hsl(236, 33%, 92%)";
        });
      }
    });
  }
};

const addToList = function () {
  const id = Math.random();
  const item = `
    <li class="todo-list-item">
    <div class="todo-check">
      <input type="checkbox" name="" id=${id} class="todo-checkbox" />
      <label class="todo-check-toogle" for=${id}
        ><div class="todo-check-toogle-icon-box">
          <img
            src="./images/icon-check.svg"
            alt="check icon"
            class="todo-check-toogle-icon"
          />
        </div>
      </label>
      <p class="todo-check-text">${todoInput.value}</p>
    </div>
    <img
      src="./images/icon-cross.svg"
      alt="Cancel icon"
      class="todo-delete"
      id="${id}"
    />
  </li>
    `;

  emptyTodo.style.display = "none";
  allTodo.push(todoInput.value);
  activeTodo.push(todoInput.value);
  todoInput.value = "";
  console.log(allTodo);
  console.log(activeTodo);
  console.log(todoList.children);
  todoList.insertAdjacentHTML("afterbegin", item);
  todoList.children[0].style.color = themeIcon.className.includes("dark")
    ? "hsl(234, 39%, 85%)"
    : "hsl(235, 19%, 35%)";
  todoList.children[0].style.borderColor = themeIcon.className.includes("dark")
    ? "hsl(233, 14%, 35%)"
    : "hsl(233, 11%, 84%)";
  todoList.children[0].children[0].children[1].style.borderColor =
    themeIcon.className.includes("dark")
      ? "hsl(233, 14%, 35%)"
      : "hsl(233, 11%, 84%)";
  completedStyle();
};

// const allTodo = function () {

// }

const itemColor = function (itmBor, txtClr) {
  const checkToogle = document.querySelectorAll(".todo-check-toogle");
  const todoItem = document.querySelectorAll(".todo-list-item");
  checkToogle.forEach((e) => {
    e.style.borderColor = `${itmBor}`;
  });
  todoItem.forEach((e) => {
    e.style.borderColor = `${itmBor}`;
    e.style.color = `${txtClr}`;
  });
};

const deleteTodo = function () {
  const delTodo = document.querySelectorAll(".todo-delete");

  const idArr = [...delTodo].map((e) => e.id);

  delTodo.forEach((e, i) => {
    e.addEventListener("click", () => {
      e.parentElement.remove();
      if (todoList.children.length == 1) {
        emptyTodo.style.display = "flex";
      }
      if (e.id === idArr[0]) countItems("sub");
    });
  });
};

const countItems = function (func) {
  if (func === "add")
    itemNum.textContent = `${Number(itemNum.textContent) + 1}`;
  else if (func === "sub")
    itemNum.textContent = `${Number(itemNum.textContent) - 1}`;
  console.log(itemNum.textContent);
};

// const allActiveComplete = function () {
//   const idArr = [...checkboxTrigger].map((e) => e.id);

//   checkboxTrigger.forEach((el) => {
//     el.addEventListener("click", (e) => {
//       console.log("wwewe");
//       console.log(e.target);
//     });
//   });
// };
// allActiveComplete();

todoInput.addEventListener("keydown", (e) => {
  console.log(e);
  if (e.key === "Enter") {
    if (themeIcon.className.includes("dark")) {
      itemColor("hsl(233, 14%, 35%)", "hsl(234, 39%, 85%)");
      addToList();
    } else {
      itemColor("hsl(233, 11%, 84%)", "hsl(235, 19%, 35%)");
      addToList();
    }
    countItems("add");
    deleteTodo();
  }
});

addTodoBtn1.addEventListener("click", () => {
  addToList();
  countItems("add");
  deleteTodo();
});

themeIcon.addEventListener("click", () => {
  if (themeIcon.className.includes("dark")) {
    changeTheme(
      "light",
      "moon",
      "Add2",
      "0 0.5rem 2rem 0.2rem rgba(197, 197, 197, 0.258)",
      "hsl(235, 19%, 35%)",
      "hsl(236, 33%, 92%)",
      "hsl(0, 0%, 98%)",
      "hsl(233, 11%, 84%)",
      "hsl(236, 9%, 61%)"
    );
    themeIcon.classList.toggle("dark");
    footHover("over", "hsl(235, 19%, 35%)");
    footHover("leave", "hsl(236, 9%, 61%)");
    footListItem.forEach((e) => (e.style.color = "inherit"));
    clearTodo.style.color = `inherit`;

    if (allTodo.length > 0)
      itemColor("hsl(233, 11%, 84%)", "hsl(235, 19%, 35%)");
  } else {
    changeTheme(
      "dark",
      "sun",
      "Add",
      "0 0.5rem 2rem 0.2rem rgba(0, 0, 0, 0.343)",
      "hsl(234, 39%, 85%)",
      "hsl(235, 21%, 11%)",
      "#25273c",
      "hsl(233, 14%, 35%)",
      "hsl(234, 11%, 52%)"
    );
    themeIcon.classList.toggle("dark");
    footHover("over", "hsl(0, 0%, 98%)");
    footHover("leave", "hsl(233, 14%, 35%)");
    footListItem.forEach((e) => (e.style.color = "inherit"));
    clearTodo.style.color = `inherit`;

    if (allTodo.length > 0)
      itemColor("hsl(233, 14%, 35%)", "hsl(234, 39%, 85%)");
  }
});
