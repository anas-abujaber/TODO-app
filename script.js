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


function addTask() {
  const inputText = getInputText();
  if (!inputText) return;

  if (isDuplicateTask(inputText)) {
    alert("the task already exist");
    clearAndFocusInput();
    return;
  }

  const task = createTaskElement(inputText);
  tasksList.append(task);
  clearAndFocusInput();
}
function getInputText() {
  return input.value.trim();
}
function clearAndFocusInput() {
  input.value = "";
  input.focus();
}
function createTaskElement(text) {
  const task = document.createElement("li");
  task.classList.add("task");

  const taskSpan = document.createElement("span");
  taskSpan.textContent = text;
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
function toggleTaskComplete(e) {
  if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
    const task = e.target.closest(".task");
    if (task) task.classList.toggle("completed", e.target.checked);
  }
}

function deleteTask(e) {
  if (e.target.matches("button.btn-delete")) {
    const task = e.target.closest(".task");
    if (task) task.remove();
  }
}
