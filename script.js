// Initialize the to-do list by attaching event listeners to the close buttons
document.addEventListener('DOMContentLoaded', function () {
  addCloseButtons();
  toggleTaskStatus();
  initializeDarkMode();
});

// Function to create a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskValue = taskInput.value.trim();

  if (taskValue === '') {
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

  // Attach close button event to the new task
  closeSpan.onclick = function () {
    const task = this.parentElement;
    task.style.display = "none";
  };
}

// Function to add close buttons to each task
function addCloseButtons() {
  const tasks = document.getElementsByClassName("task");
  for (let i = 0; i < tasks.length; i++) {
    const closeSpan = tasks[i].querySelector('.close');
    if (!closeSpan) {
      const span = createCloseButton();
      tasks[i].appendChild(span);
      span.onclick = function () {
        const task = this.parentElement;
        task.style.display = "none";
      };
    }
  }

  const closeButtons = document.getElementsByClassName("close");
  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function () {
      const task = this.parentElement;
      task.style.display = "none";
    };
  }
}

// Helper function to create the close button element
function createCloseButton() {
  const span = document.createElement("span");
  span.className = "close";
  span.textContent = "\u00D7";
  return span;
}

// Toggle the checked status of tasks
function toggleTaskStatus() {
  const list = document.getElementById('taskList');
  list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  }, false);
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