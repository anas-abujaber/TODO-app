const input = document.getElementById("input-text");
const buttonAdd = document.getElementById("add");
const tasksList = document.getElementById("tasks-list");

input.addEventListener("keydown", function (e) {
  const inputText = input.value.trim();
  if (e.key === "Enter" && inputText) {
    console.log(e.key);
    buttonAdd.click();
  }
});
buttonAdd.addEventListener("click", function () {
  const inputText = input.value.trim();
  if (inputText) {
    const task = document.createElement("li");
    task.classList.add("task");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = inputText;
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
    tasksList.append(task);
    input.value = "";
    input.focus();
  }
});
tasksList.addEventListener("change", function (e) {
  if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
    const task = e.target.closest(".task");
    if (task) task.classList.toggle("completed", e.target.checked);
  }
});

tasksList.addEventListener("click", function (e) {
  if (e.target.matches("button.btn-delete")) {
    const task = e.target.closest(".task");
    if (task) task.remove();
  }
});
