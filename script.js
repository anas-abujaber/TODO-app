const input = document.getElementById("input-text");
const buttonAdd = document.getElementById("add");
const tasksList = document.getElementById("tasks-list");

buttonAdd.addEventListener("click", function () {
  if (input.value) {
    const task = document.createElement("li");
    task.textContent = input.value;
    task.classList.add("task");
    const completeButton = document.createElement("input");
    completeButton.type = "checkbox";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    const divTaskEdit = document.createElement("div");
    divTaskEdit.classList.add("divTaskEdit");
    divTaskEdit.append(completeButton, deleteButton);
    task.append(divTaskEdit);
    tasksList.append(task);
    input.value = "";
    input.focus();
  }
});
