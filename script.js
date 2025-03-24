document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput").value;
    let dueDateInput = document.getElementById("dueDateInput").value;
    
    if (taskInput.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");
    li.innerHTML = `
        ${taskInput} <small>(Due: ${dueDateInput || "No deadline"})</small>
        <button class="delete-btn" onclick="deleteTask(this)">X</button>
    `;

    taskList.appendChild(li);
    saveTasks();
    
    document.getElementById("taskInput").value = "";
    document.getElementById("dueDateInput").value = "";
}

function deleteTask(element) {
    element.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push(li.innerHTML);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    tasks.forEach(taskHTML => {
        let li = document.createElement("li");
        li.innerHTML = taskHTML;
        taskList.appendChild(li);
    });
}
