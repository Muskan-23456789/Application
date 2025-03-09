const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    let taskText = inputBox.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

   
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
        li.classList.toggle("checked");
        saveData();
    });

    let taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
        li.remove();
        saveData();
    });

    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    listContainer.appendChild(li);

    inputBox.value = ""; 
    saveData();
}


function saveData() {
    let tasks = [];
    document.querySelectorAll("ul li").forEach(li => {
        let taskText = li.querySelector("span").textContent;
        let isChecked = li.classList.contains("checked");
        tasks.push({ text: taskText, checked: isChecked });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => {
        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.checked;
        if (task.checked) li.classList.add("checked");
        checkbox.addEventListener("change", function () {
            li.classList.toggle("checked");
            saveData();
        });

        let taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✖";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function () {
            li.remove();
            saveData();
        });

        li.appendChild(checkbox);
        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        listContainer.appendChild(li);
    });
}


inputBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});


loadTasks();
