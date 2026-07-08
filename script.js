// =====================================================
//              TASK STORAGE ARRAY
// =====================================================
// This array stores all task objects
let tasks = [];


// Used for Edit functionality
let editMode = false;

let editId = null;




// =====================================================
//              SELECT HTML ELEMENTS
// =====================================================
// Form
const taskForm = document.getElementById("taskForm");

// Input fields
const taskId = document.getElementById("taskId");

const taskName = document.getElementById("taskName");

const description = document.getElementById("description");

const priority = document.getElementById("priority");

const category = document.getElementById("category");

const startDate = document.getElementById("startDate");

const dueDate = document.getElementById("dueDate");

const status = document.getElementById("status");



// Table body
const taskBody = document.getElementById("taskBody");


// Save button
const saveBtn = document.getElementById("saveBtn");


// =====================================================
//              DASHBOARD ELEMENTS
// =====================================================


// Total task count
const totalTasks = document.getElementById("totalTasks");

// Pending task count
const pendingTasks = document.getElementById("pendingTasks");

// Completed task count
const completedTasks = document.getElementById("completedTasks");

// =====================================================
//              GENERATE TASK ID
// =====================================================
// Create unique task ID
function generateTaskId(){

    return "TASK-" + Date.now() + "-" + Math.floor(Math.random()*100);

}

// =====================================================
//              LOCAL STORAGE FUNCTIONS
// =====================================================
// Load tasks from browser storage

function loadTasks(){

    // Get saved tasks
    let savedTasks = localStorage.getItem("tasks");


    // Check if tasks exist
    if(savedTasks){

        // Convert JSON string into array
        tasks = JSON.parse(savedTasks);

        // Display saved tasks
        displayTasks();

        // Update dashboard
        updateDashboard();

    }
}
// Save tasks into browser storage

function saveTasks(){
    localStorage.setItem(

        "tasks",

        JSON.stringify(tasks)
    );
}


// Runs when page loads
// =====================================================
//              PAGE LOAD
// =====================================================
window.onload = function(){
    // Generate task ID
    taskId.value = generateTaskId();

    // Load saved tasks
    loadTasks();
};

// =====================================================
//              CREATE / UPDATE TASK
// =====================================================
taskForm.addEventListener("submit", function(event){


    // Prevent page reload
    event.preventDefault();


    // Create task object
    let task = {

        // Task ID
        id: taskId.value,

        // Task Name
        name: taskName.value,

        // Description
        description: description.value,

        // Priority
        priority: priority.value,

        // Category
        category: category.value,

        // Start Date
        startDate: startDate.value,

        // Due Date
        dueDate: dueDate.value,

        // Status
        status: status.value

    };

    // Check edit mode

    if(editMode){



        // Find task position
        let index = tasks.findIndex(function(item){


            return item.id === editId;


        });




        // Update existing task
        tasks[index] = task;



        // Exit edit mode
        editMode = false;


        editId = null;
        // Change button text

        saveBtn.innerHTML = "➕ Add Task";

    }

    else{

        // Add new task

        tasks.push(task);
    }

    // Save data in LocalStorage

    saveTasks();

    // Display tasks
    displayTasks();

    // Update dashboard
    updateDashboard();

    // Clear form
    taskForm.reset();

    // Generate new ID
    taskId.value = generateTaskId();
});

// =====================================================
//              READ TASK (DISPLAY)
// =====================================================
// Display tasks in table
function displayTasks(taskList = tasks){

    // Clear old table data
    taskBody.innerHTML = "";

    // Loop through tasks array
    taskList.forEach(function(task){
        let row = `
        <tr>
            <td>

                <input 
                type="checkbox"
                class="selectTask"
                data-id="${task.id}">

            </td>
            <td>

                ${task.id}

            </td>
            <td>

                ${task.name}

            </td>
            <td>
                <span class="${task.priority.toLowerCase()}">

                    ${task.priority}

                </span>

            </td>
            <td>

                ${task.category}

            </td>
            <td>

                ${task.status}

            </td>
            <td>

                ${task.dueDate}

            </td>


        </tr>
        `;
        // Insert row

        taskBody.innerHTML += row;

    });
}


// =====================================================
//              UPDATE DASHBOARD
// =====================================================

function updateDashboard(){
    // Total tasks
    totalTasks.innerText = tasks.length;

    // Pending tasks
    let pending = tasks.filter(function(task){


        return task.status === "Pending";


    });

    pendingTasks.innerText = pending.length;


    // Completed tasks
    let completed = tasks.filter(function(task){


        return task.status === "Completed";


    });



    completedTasks.innerText = completed.length;
}

// =====================================================
//              VIEW ELEMENTS
// =====================================================
const viewBtn = document.getElementById("viewBtn");

const detailId = document.getElementById("detailId");

const detailName = document.getElementById("detailName");

const detailDescription = document.getElementById("detailDescription");

const detailPriority = document.getElementById("detailPriority");

const detailCategory = document.getElementById("detailCategory");

const detailStatus = document.getElementById("detailStatus");

const detailStart = document.getElementById("detailStart");

const detailDue = document.getElementById("detailDue");



// =====================================================
//              VIEW TASK DETAILS
// =====================================================
viewBtn.addEventListener("click", function(){

    // Find selected checkbox

    let selected = document.querySelector(
        ".selectTask:checked"
    );

    if(!selected){


        alert("Please select a task first");


        return;


    }

    // Get task ID
    let id = selected.getAttribute("data-id");

    // Find task
    let task = tasks.find(function(item){
        return item.id === id;
    });


    // Show details
    detailId.innerText = task.id;


    detailName.innerText = task.name;


    detailDescription.innerText = task.description;


    detailPriority.innerText = task.priority;


    detailCategory.innerText = task.category;


    detailStatus.innerText = task.status;


    detailStart.innerText = task.startDate;


    detailDue.innerText = task.dueDate;

});


// =====================================================
//              EDIT ELEMENT
// =====================================================
const editBtn = document.getElementById("editBtn");

// =====================================================
//              LOAD TASK FOR EDIT
// =====================================================
editBtn.addEventListener("click", function(){



    // Find selected checkbox

    let selected = document.querySelector(
        ".selectTask:checked"
    );

    if(!selected){


        alert("Please select a task to edit");


        return;
    }

    // Get task ID

    let id = selected.getAttribute("data-id");

    // Find task

    let task = tasks.find(function(item){


        return item.id === id;

    });


    // Enable edit mode
    editMode = true;


    editId = id;
    // Load data into form


    taskId.value = task.id;


    taskName.value = task.name;


    description.value = task.description;


    priority.value = task.priority;


    category.value = task.category;


    startDate.value = task.startDate;


    dueDate.value = task.dueDate;


    status.value = task.status;





    // Change button text
    saveBtn.innerHTML = "✏ Update Task";
});


// =====================================================
//              DELETE ELEMENT
// =====================================================
// Delete button
const deleteBtn = document.getElementById("deleteBtn");


// =====================================================
//              DELETE TASK
// =====================================================
deleteBtn.addEventListener("click", function(){

    // Find selected checkbox

    let selected = document.querySelector(
        ".selectTask:checked"
    );

    // Check if task is selected

    if(!selected){


        alert("Please select a task to delete");


        return;


    }

    // Confirmation before delete
    let confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );

    // If user cancels

    if(!confirmDelete){


        return;


    }
    // Get selected task ID
    let id = selected.getAttribute("data-id");

    // Remove task from array
    tasks = tasks.filter(function(task){

    return task.id !== id;

});


    // Save deleted data
    saveTasks();


    // Refresh table
    displayTasks();


    // Update dashboard count
    updateDashboard();


    // Clear detail card after delete
    detailId.innerText = "-";


    detailName.innerText = "-";


    detailDescription.innerText = "-";


    detailPriority.innerText = "-";


    detailCategory.innerText = "-";


    detailStatus.innerText = "-";


    detailStart.innerText = "-";


    detailDue.innerText = "-";
});

// =====================================================
//              SEARCH ELEMENT
// =====================================================
// Search input element
const searchTask = document.getElementById("searchTask");

// =====================================================
//              SEARCH TASK FUNCTION
// =====================================================
searchTask.addEventListener("keyup", function(){

    // Get search text
    let searchValue = searchTask.value.toLowerCase();


    // Filter tasks
    let filteredTasks = tasks.filter(function(task){

        return(

            task.name.toLowerCase().includes(searchValue)

            ||

            task.category.toLowerCase().includes(searchValue)

            ||

            task.priority.toLowerCase().includes(searchValue)

            ||

            task.status.toLowerCase().includes(searchValue)

        );

    });
    // Display filtered tasks

    displayTasks(filteredTasks);

});
