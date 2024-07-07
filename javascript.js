const addTodoForm = document.querySelector(".addTodoForm");
const addTodoInput = document.querySelector(".addTodoInput");
const todoList = document.querySelector(".todoList ul");
const todoCount = document.querySelector(".todo-count");
const themeColorButton = document.querySelector(".theme-color");

// Listeleme Butonları
const allListButton = document.querySelector(".all-todo");
const completedListButton = document.querySelector(".completed-button-todo");
const activeListButton = document.querySelector(".active-button-todo");
// Tamamlanan Todoları Temizleme butonu
const clearCompletedTodo = document.querySelector(".clear-completed-button");

let todos = [
  {
    todo: "Complete online JavaScript course",
    isComplete: true,
  },
  {
    todo: "Jog around the park 3x",
    isComplete: false,
  },
  {
    todo: "10 minutes meditation",
    isComplete: false,
  },
  {
    todo: "Read for 1 hour",
    isComplete: false,
  },
  {
    todo: "Pick up groceries",
    isComplete: false,
  },
  {
    todo: "Complete Todo App on Frontend Mentor",
    isComplete: false,
  },
];

//! Arayüze Ekleme Fonksiyonu
const writeTodoUI = (todos) => {
  todoList.innerHTML = "";
  todos.map((item) => {
    const todoLi = document.createElement("li");
    todoLi.className = item.isComplete === true ? "complete" : "";
    // Complete button
    const todoCompleteDiv = document.createElement("div");
    todoCompleteDiv.className = "todo-complete-button";
    const todoCompleteButton = document.createElement("button");
    todoCompleteButton.addEventListener("click", completeTodoButton);
    todoCompleteDiv.appendChild(todoCompleteButton);
    todoLi.appendChild(todoCompleteDiv);
    // Text Todo
    const todoText = document.createElement("p");
    todoText.innerText = item.todo;
    todoText.className = "todo-text";
    todoLi.appendChild(todoText);
    // Delete button
    const todoDeleteButton = document.createElement("button");
    todoDeleteButton.className = "todo-delete-button";
    todoLi.appendChild(todoDeleteButton);
    todoDeleteButton.addEventListener("click", deleteTodoButton);
    todoList.appendChild(todoLi);
  });

  todoCount.innerText = `${todoList.childElementCount} items left`;
};

//! Tamamlanma Durumlarına Göre Filtreleme Fonksiyonu
const isCompleteFiltered = (filterValue) => {
  const filterTodo = [];
  Object.values(todos).filter((item) => {
    if (item.isComplete === filterValue) {
      filterTodo.push(item);
    }
  });
  return filterTodo;
};

//! Tamamlananları Listeleme Fonksiyonu
const completedListFunction = () => {
  writeTodoUI(isCompleteFiltered(true));
};
completedListButton.addEventListener("click", completedListFunction);

//! Tümünü Listeleme Fonksiyonu
const allListFunction = () => {
  writeTodoUI(todos);
};
allListButton.addEventListener("click", allListFunction);

//! Aktif Olanları Listeleme Fonksiyonu
const activeListFunction = () => {
  writeTodoUI(isCompleteFiltered(false));
};
activeListButton.addEventListener("click", activeListFunction);

//! Tamamlananların Tümünü Silme Fonksiyonu
const clearCompletedFunction = () => {
  todos = isCompleteFiltered(false);
  writeTodoUI(todos);
};
clearCompletedTodo.addEventListener("click", clearCompletedFunction);

//! Complete Butonuna Ait Fonksiyon
const completeTodoButton = (event) => {
  const eventText =
    event.target.parentElement.parentElement.querySelector("p").innerText;
  event.target.parentElement.parentElement.classList.toggle("complete");

  todos.filter((item) => {
    if (item.todo === eventText) {
      item.isComplete === true
        ? (item.isComplete = false)
        : (item.isComplete = true);
    }
  });
};

//! Delete Butonuna Ait Fonksiyon
const deleteTodoButton = (event) => {
  const filterTodos = [];
  todos.filter((item) => {
    if (item.todo !== event.target.parentElement.querySelector("p").innerText) {
      filterTodos.push(item);
    }
  });
  todos = filterTodos;
  writeTodoUI(filterTodos);
};

//! Todo ekleme
const addTodoFunction = (e) => {
  e.preventDefault();
  const value = addTodoInput.value.trim();
  if (value !== "" && value.length < 35) {
    todoList.innerHTML = "";
    const newTodo = {
      todo: `${addTodoInput.value}`,
      isComplete: false,
    };
    todos.push(newTodo);
    writeTodoUI(todos);
    addTodoInput.value = "";
    addTodoInput.focus();
  } else {
    alert(
      "Error: Enter at least one character and use a maximum of 35 characters!"
    );
  }
};

addTodoForm.addEventListener("submit", addTodoFunction);

//! Tema Renk Seçimi
themeColorButton.addEventListener("click", () => {
  const isTheme = document.querySelector("body");
  if (isTheme.className === "dark-theme") {
    isTheme.className = "light-theme";
  } else {
    isTheme.className = "dark-theme";
  }
});

//! Aktif buton seçimi
const detailsWrapper = document.querySelector(".details-wrapper");
const detailsButton = detailsWrapper.querySelectorAll("button");
for (let index = 0; index < detailsButton.length; index++) {
  detailsButton[index].addEventListener("click", (e) => {
    for (let index = 0; index < detailsButton.length; index++) {
      detailsButton[index].id = "";
    }
    e.target.id = "active";
  });
}

document.addEventListener("DOMContentLoaded", writeTodoUI(todos));
