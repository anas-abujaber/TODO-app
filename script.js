const input = document.getElementById("input-text");
const buttonAdd = document.getElementById("add");
const tasksList = document.getElementById("tasks-list");

buttonAdd.addEventListener("click", addTask);

tasksList.addEventListener("change", toggleTaskComplete);
tasksList.addEventListener("click", deleteTask);

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTask();
});
function isDuplicateTask(text) {
  const target = text.toLowerCase();
  for (let task of tasksList.children) {
    const span = task.querySelector("span");
    if (span && span.textContent.trim().toLowerCase() === target) {
      return true;
    }
  }
  return false;
}
function addTaskToStorage({ title, completed }) {
  const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.push({ title, completed });
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function addTask() {
  const inputText = getInputText();
  if (!inputText) return;

  if (isDuplicateTask(inputText)) {
    alert("the task already exist");
    clearAndFocusInput();
    return;
  }

  const taskObj = { title: inputText, completed: false };
  const task = createTaskElement(taskObj);
  tasksList.append(task);
  addTaskToStorage(taskObj);
  clearAndFocusInput();
}
function getInputText() {
  return input.value.trim();
}
function clearAndFocusInput() {
  input.value = "";
  input.focus();
}
function createTaskElement(taskObj) {
  const task = document.createElement("li");
  task.classList.add("task");

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskObj.title;
  task.append(taskSpan);

  const completeButton = document.createElement("input");
  completeButton.type = "checkbox";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("btn-delete");

  const divTaskEdit = document.createElement("div");
  divTaskEdit.classList.add("divTaskEdit");
  divTaskEdit.append(completeButton, deleteButton);

  task.append(divTaskEdit);
  return task;
}
function updateTaskStatus(title, completed) {
  let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList = taskList.map((t) => {
    return t.title === title ? { ...t, completed } : t;
  });
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function toggleTaskComplete(e) {
  if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
    const task = e.target.closest(".task");
    if (task) task.classList.toggle("completed", e.target.checked);
    const title = task.querySelector("span").textContent.trim();
    updateTaskStatus(title, e.target.checked);
  }
}

function deleteTask(e) {
  if (e.target.matches("button.btn-delete")) {
    const task = e.target.closest(".task");
    if (task) task.remove();
  }
}
