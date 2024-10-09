document.addEventListener("DOMContentLoaded", function () {
  loadTasksFromLocalStorage();
  addCloseButtons();
  initializeDarkMode();
});

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskValue = taskInput.value.trim();

  if (taskValue === "") {
    alert("You must write something!");
    return;
  }

  const li = document.createElement("li");
  li.className = "task";
  li.textContent = taskValue;

  const closeSpan = createCloseButton();
  li.appendChild(closeSpan);

  document.getElementById("taskList").appendChild(li);
  taskInput.value = "";

  storeTaskInLocalStorage(taskValue, false);

  closeSpan.onclick = function () {
    const task = this.parentElement;
    removeTaskFromLocalStorage(task.textContent.slice(0, -1));
    task.style.display = "none";
  };
}

function storeTaskInLocalStorage(taskText, isChecked) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, checked: isChecked });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task";
    li.textContent = task.text;

    if (task.checked) {
      li.classList.add("checked");
    }

    const closeSpan = createCloseButton();
    li.appendChild(closeSpan);

    document.getElementById("taskList").appendChild(li);

    closeSpan.onclick = function () {
      const task = this.parentElement;
      removeTaskFromLocalStorage(task.textContent.slice(0, -1));
      task.style.display = "none";
    };
  });
}

function removeTaskFromLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatusInLocalStorage(taskText, isChecked) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((t) =>
    t.text === taskText ? { ...t, checked: isChecked } : t
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addCloseButtons() {
  const tasks = document.getElementsByClassName("task");
  for (let i = 0; i < tasks.length; i++) {
    const closeSpan = tasks[i].querySelector(".close");
    if (!closeSpan) {
      const span = createCloseButton();
      tasks[i].appendChild(span);
      span.onclick = function () {
        const task = this.parentElement;
        removeTaskFromLocalStorage(task.textContent.slice(0, -1));
        task.style.display = "none";
      };
    }
  }

  const closeButtons = document.getElementsByClassName("close");
  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function () {
      const task = this.parentElement;
      removeTaskFromLocalStorage(task.textContent.slice(0, -1));
      task.style.display = "none";
    };
  }
}

function createCloseButton() {
  const span = document.createElement("span");
  span.className = "close";
  span.textContent = "\u00D7";
  return span;
}


function initializeDarkMode() {
  const modeToggle = document.getElementById('modeToggle');
  if (modeToggle) {
    modeToggle.addEventListener('click', toggleDarkMode);
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      modeToggle.textContent = 'Light Mode';
    }
  }
}

function toggleDarkMode() {
  const modeToggle = document.getElementById('modeToggle');
  if (document.body.classList.toggle('dark-mode')) {
    modeToggle.textContent = 'Light Mode';
    localStorage.setItem('darkMode', 'enabled');
  } else {
    modeToggle.textContent = 'Dark Mode';
    localStorage.setItem('darkMode', null);
  }
}

document.addEventListener('DOMContentLoaded', initializeDarkMode);

  const list = document.getElementById("taskList");
  list.addEventListener(
    "click",
    function (ev) {
      if (ev.target.tagName === "LI") {
        ev.target.classList.toggle("checked");
        const isChecked = ev.target.classList.contains("checked");
        updateTaskStatusInLocalStorage(
          ev.target.textContent.slice(0, -1),
          isChecked
        );
      }
    },
    false
  );


