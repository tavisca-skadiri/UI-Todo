var taskArray = [];

function addTask(){
    taskArray.push(task_name);
	var editButton = document.createElement('input');
	editButton.type = "button";
	editButton.className = "btn";
	editButton.value = "Edit";
    editButton.onclick = function() {
		editTask(this);
    }
    var deleteButton = document.createElement('input');
	deleteButton.type = "button";
	deleteButton.className = "btn";
	deleteButton.value = "Delete";
	deleteButton.onclick = function() {
		deleteTask(this);
    }
    var task_name = document.getElementById('task-name').value;
	var task_list = document.getElementById('task-list');
    var new_row = task_list.insertRow(); 
    new_row.insertCell(0).innerHTML = task_name;
    new_row.insertCell(1).appendChild(editButton); 
    new_row.insertCell(2).appendChild(deleteButton); 
    document.getElementById('task-name').value = '';
}
function searchTask(value) { 
    document.getElementById('task-datalist').innerHTML = ''; 
 	for (var i = 0; i<taskArray.length; i++) { 
     	if(((taskArray[i].toLowerCase()).indexOf(value.toLowerCase()))>-1) { 
        	var node = document.createElement('option'); 
	        var val = document.createTextNode(taskArray[i]); 
    	    node.appendChild(val); 
            document.getElementById('task-datalist').appendChild(node);
        } 
    } 
}
function editTask(taskbtn){
}
function deleteTask(taskbtn){
	var task_list = document.getElementById('task-list');
	var row_to_delete = taskbtn.parentNode.parentNode;
	task_list.deleteRow(row_to_delete.rowIndex);
	var task_name = taskbtn.parentNode.parentNode.getElementsByTagName('td')[0];
	var index = taskArray.indexOf(task_name);
    if (index > -1) {
       taskArray.splice(index, 1);
    }
}