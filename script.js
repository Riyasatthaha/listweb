let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const info = document.createElement("div");
    info.className = "task-info";
    info.innerHTML = `<strong>${task.text}</strong> 
      <small>Due: ${task.due || "None"} | Priority: ${task.priority}</small>`;

    const controls = document.createElement("div");
    controls.className = "task-controls";

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✔️";
    doneBtn.onclick = () => toggleDone(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.onclick = () => deleteTask(index);

    controls.appendChild(doneBtn);
    controls.appendChild(delBtn);

    li.appendChild(info);
    li.appendChild(controls);
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const dueDate = document.getElementById("dueDate");
  const priority = document.getElementById("priority");

  const text = taskInput.value.trim();
  if (!text) return;

  const task = {
    text,
    due: dueDate.value,
    priority: priority.value,
    done: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  taskInput.value = "";
  dueDate.value = "";
  priority.value = "medium";
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

renderTasks();
