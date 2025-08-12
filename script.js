const input = document.getElementById("input-text");
const buttonAdd = document.getElementById("add");
const tasksList = document.getElementById("tasks-list");

buttonAdd.addEventListener("click", function () {
  if (input.value) {
    const task = document.createElement("li");
    task.textContent = input.value;
    task.classList.add('task')
    tasksList.append(task)
  }
});
