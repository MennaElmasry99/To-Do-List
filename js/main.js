document.addEventListener('DOMContentLoaded', () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  if (storedTasks.length) {
      tasks = storedTasks;
      updateTaskList();
      updateStats();
  }
});

let tasks = [];

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
      tasks.push({ text: text, completed: false });
      updateTaskList();
      updateStats();
      saveTasks();
      taskInput.value = ''; // Clear the input after adding the task
  }
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTasks();
};

const editTask = (index) => {
  const taskInput = document.getElementById('taskInput');
  taskInput.value = tasks[index].text;
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTasks();
};

const updateStats = () => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = (completedTasks / totalTasks) * 100;
  const progressBar = document.querySelector('.Progress');
  progressBar.style.width = `${progress}%`;
  document.getElementById('numbers').innerText = `${completedTasks}/${totalTasks}`;

  if (tasks.length && completedTasks === totalTasks) {
      triggerConfetti();
  }
};

const updateTaskList = () => {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
    <div class="taskItem">
      <div class="task ${task.completed ? "completed" : ""}">
          <input type="checkbox" class="checkbox" ${
            task.completed ? "checked" : ""
          } />
          <p>${task.text}</p>
      </div>
      <div class="icons">
      <button onclick="editTask(${index})">
          <i class="fa-regular fa-pen-to-square "></i>
      </button>
      <button onclick="deleteTask(${index})">
          <i class="fa-solid fa-trash-can"></i>
      </button>
      </div>
    </div>
      `;
      listItem.querySelector('.checkbox').addEventListener("change", () => toggleTaskCompletion(index));
      taskList.append(listItem);
  });
};

const toggleTaskCompletion = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateStats();
  updateTaskList();
  saveTasks();
};

document.getElementById("btn").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});

const triggerConfetti = () => {
  const count = 200;
  const defaults = { origin: { y: 0.7 } };

  function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
      }));
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
};
