function addTask(){
	var task_name = document.getElementById('task-name').value;
	var editButton = document.createElement('input');
	editButton.type = "button";
	editButton.className = "btn";
	editButton.value = "Edit";
    var deleteButton = document.createElement('input');
	deleteButton.type = "button";
	deleteButton.className = "btn";
	deleteButton.value = "Delete";
    var task_list = document.getElementById('task-list');
    var new_row = task_list.insertRow(); 
    new_row.insertCell(0).innerHTML = task_name;
    new_row.insertCell(1).appendChild(editButton); 
    new_row.insertCell(2).appendChild(deleteButton); 
}