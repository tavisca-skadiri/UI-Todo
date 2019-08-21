var taskArray = ["Sleep","Eat","Dance","Study"];

function callGoogleApi(item){
    var displaySuggestions = function(predictions, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            alert(status);
        }
        predictions.forEach(function(prediction) {
            taskArray.push(prediction.description);
        });
    };
    var service = new google.maps.places.AutocompleteService();
    service.getQueryPredictions({ input: item}, displaySuggestions);
}

function addTask(){
	var editButton = document.createElement('input');
	editButton.type = "button";
	editButton.value = "Edit";
    editButton.onclick = function() {
		editTask(this);
    }
    var deleteButton = document.createElement('input');
	deleteButton.type = "button";
	deleteButton.value = "Delete";
	deleteButton.onclick = function() {
		deleteTask(this);
    }
    var task_name = document.getElementById('task-name').value;
	var task_list = document.getElementById('task-list');
    var new_row = task_list.insertRow(); 
    var val = document.createTextNode(task_name); 
    new_row.insertCell(0).appendChild(val); 
    new_row.insertCell(1).appendChild(editButton); 
    new_row.insertCell(2).appendChild(deleteButton); 
    document.getElementById('task-name').value = '';
}
function searchTask(value) { 
    //callGoogleApi(value);
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
    console.log(taskbtn);
    taskbtn.value = "Save";
    var task_name = taskbtn.parentNode.parentNode.getElementsByTagName('td')[0];
    task_name.innerHTML = '';
    var textbox = document.createElement('input');
    textbox.type = "text";
    textbox.className = "btn";
    textbox.placeholder = "Edit task name";
    task_name.appendChild(textbox);
    taskbtn.onclick = function(){
        var val = document.createTextNode(textbox.value); 
        taskbtn.value = "Edit";
        task_name.appendChild(val); 
        task_name.removeChild(textbox);
        taskbtn.onclick = function() {
            editTask(this);
        }
    }
}
function deleteTask(taskbtn){
	var task_list = document.getElementById('task-list');
    var row_to_delete = taskbtn.parentNode.parentNode;
    task_list.deleteRow(row_to_delete.rowIndex);
}