var taskArray = [];

function callGoogleApi(item){
    if(item.length == 4){
        var displaySuggestions = function(predictions, status) {
            if (status != google.maps.places.PlacesServiceStatus.OK) {
                alert(status);
            }
            predictions.forEach(function(prediction) {
                var node = document.createElement('option'); 
                var val = document.createTextNode(prediction.description); 
                node.appendChild(val); 
                document.getElementById('task-datalist').appendChild(node); 
            });
        };
        var service = new google.maps.places.AutocompleteService();
        service.getQueryPredictions({ input: item}, displaySuggestions);
    }
}
function callTodoApi(){
    for (var i = 1; i <= 5; i++) {
        fetch('https://jsonplaceholder.typicode.com/todos/'+i)
          .then(response => response.json())
          .then(json => add1Task(json.title)
        );
    }
}
function add1Task(task){
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
    var task_list = document.getElementById('task-list');
    var new_row = task_list.insertRow(); 
    var val = document.createTextNode(task); 
    new_row.insertCell(0).appendChild(val); 
    new_row.insertCell(1).appendChild(editButton); 
    new_row.insertCell(2).appendChild(deleteButton); 
}
function addTask(){
    var task_name = document.getElementById('task-name').value;
    if(task_name == ""){    
        alert("Enter a value to search");
        return;
    }	
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
    var task_list = document.getElementById('task-list');
    var new_row = task_list.insertRow(); 
    var val = document.createTextNode(task_name); 
    new_row.insertCell(0).appendChild(val); 
    new_row.insertCell(1).appendChild(editButton); 
    new_row.insertCell(2).appendChild(deleteButton); 
    document.getElementById('task-name').value = '';
}
function searchTask(value) { 
    var table = document.getElementById('task-list');
    var tr = table.getElementsByTagName('tr');
    var str = document.getElementById('task-name').value.toUpperCase();
    document.getElementById('task-datalist').innerHTML = ''; 
    //callTodoApi(str);
    callGoogleApi(str);
    for(var i=0; i<tr.length; i++) {
        var td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          var txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(str) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
    }
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
    taskbtn.value = "Save";
    var task_name = taskbtn.parentNode.parentNode.getElementsByTagName('td')[0];
    task_name.innerHTML = '';
    var textbox = document.createElement('input');
    textbox.type = "text";
    textbox.size = 10;
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