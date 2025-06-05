// Get the objects we need to modify
let updateRepairForm = document.getElementById('update-repair-form-ajax');

// Modify the objects we need
updateRepairForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("idSelect");
    let inputTask = document.getElementById("input-task-update");
    let inputCost = document.getElementById("input-cost-update");

    // Get the values from the form fields
    let idValue = inputID.value;
    let TaskValue = inputTask.value;
    let CostValue = inputCost.value;

    if (TaskValue === null || CostValue === null) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        r_id: idValue,
        task: TaskValue,
        cost: CostValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-repair-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, idValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input. Status: ", xhttp.status)
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, repairID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("repair-table");

    for (let i = 0, row; row = table.rows[i]; i++) {

       if (table.rows[i].getAttribute("data-value") == repairID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let tdTask = updateRowIndex.getElementsByTagName("td")[1];
            tdTask.innerHTML = parsedData[0].task;

            let tdCost = updateRepairForm.getElementsByClassName("td")[2];
            tdCost.innerHTML = parsedData[0].cost;
       }
    }
}