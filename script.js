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
    li.classList.add("task-item"); // Add a class for styling

    li.innerHTML = `
        <span class="task-text">${taskInput}</span>
        <small>(Due: ${dueDateInput || "No deadline"})</small>
        <button class="complete-btn" onclick="completeTask(this)">✅</button>
        <button class="delete-btn" onclick="deleteTask(this)">❌</button>
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

function completeTask(element) {
    let taskItem = element.parentElement;
    taskItem.classList.toggle("completed"); // Toggle completed class
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
