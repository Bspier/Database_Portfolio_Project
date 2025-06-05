let addRepairForm = document.getElementById('add-repair-form-ajax');

addRepairForm.addEventListener("submit", function (e) {
    
    e.preventDefault();

    let inputTask = document.getElementById("input-task");
    let inputCost = document.getElementById("input-cost");

    let TaskValue = inputTask.value;
    let CostValue = inputCost.value;

    let data = {
        task: TaskValue,
        cost: CostValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-repair-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputTask.value = '';
            inputCost.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});


addRowToTable = (data) => {

    let currentTable = document.getElementById("repair-table");

    let newRowIndex = currentTable.rows.length;

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let TaskCell = document.createElement("TD");
    let CostCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    idCell.innerText = newRow.r_id;
    TaskCell.innerText = newRow.task;
    CostCell.innerText = newRow.cost;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onClick = function() {
        deleteRepair(newRow.r_id);
    }

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(TaskCell);
    row.appendChild(CostCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.r_id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("idSelect");
    let option = document.createElement("option");
    option.text = newRow.r_id;
    option.value = newRow.r_id;
    selectMenu.add(option);
}