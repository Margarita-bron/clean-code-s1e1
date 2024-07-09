var taskInput = document.getElementById("new-task");
var addButton = document.querySelector(".add-button");
var incompleteTaskHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var createNewTaskElement = function(taskString){

  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  listItem.className = "item unordered-list__item";

  label.innerText = taskString;
  label.className = "task label label-item";

  checkBox.type = "checkbox";
  checkBox.className = "input input_type-checkbox";

  editInput.type = "text";
  editInput.className = "task input input_type-text unordered-list__input_type-text";

  editButton.innerText = "Edit"; 
  editButton.className = "button button-edit";

  deleteButton.className = "button button-delete";

  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "delete-img";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask = function(){
    console.log("Add Task...");

    if (!taskInput.value) return;

    var listItem=createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

var editTask = function(){
    console.log("Edit Task...");


    var listItem = this.parentNode;

    var editInput = listItem.querySelector(".input_type-text");
    var label = listItem.querySelector(".label");
    var editBtn = listItem.querySelector(".button-edit");
    var containsClass = listItem.classList.contains("edit-mode");

    if(containsClass){
        label.innerText = editInput.value;

        label.classList.remove("label_display-none");
        editInput.classList.remove("edit-mode__input_type-text");
        listItem.classList.remove("edit-mode");
        editBtn.innerText = "Edit";
    }else{
        editInput.value = label.innerText;

        label.classList.toggle("label_display-none");
        editInput.classList.toggle("edit-mode__input_type-text");
        listItem.classList.toggle("edit-mode");
        editBtn.innerText = "Save";
    }
};

var deleteTask = function(){
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}

var taskCompleted = function(){
    console.log("Complete Task...");

    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    var label = listItem.querySelector(".label");
    label.classList.toggle("completed-tasks__label");
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function(){
    console.log("Incomplete Task...");

    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    var label = listItem.querySelector(".label");
    label.classList.remove("completed-tasks__label");
    bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest = function(){
    console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents = function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");

    var checkBox = taskListItem.querySelector(".input_type-checkbox");
    var editButton = taskListItem.querySelector(".button-edit");
    var deleteButton = taskListItem.querySelector(".button-delete");

    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

for (var i=0; i<incompleteTaskHolder.children.length; i++){
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i = 0; i<completedTasksHolder.children.length; i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

