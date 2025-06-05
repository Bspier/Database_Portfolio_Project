let addCustomerVehicleForm = document.getElementById('add-intersect-form-ajax');

addCustomerVehicleForm.addEventListener("submit", function (e) {
    
    e.preventDefault();

    let inputCustomer = document.getElementById("input-customer");
    let inputVehicle = document.getElementById("input-vehicle");

    let CustomerValue = inputCustomer.value;
    let VehicleValue = inputVehicle.value;

    let data = {
        c_id: CustomerValue,
        v_id: VehicleValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-intersect-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);
            
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});


addRowToTable = (data) => {

    let currentTable = document.getElementById("customer-vehicle-table");

    let newRowIndex = currentTable.rows.length;

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    let row = document.createElement("TR");
    let intersectIDCell = document.createElement("TD");
    let CustomerCell = document.createElement("TD");
    let VehicleCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    intersectIDCell.innerText = newRow.intersect_id;
    CustomerCell.innerText = newRow.c_id;
    VehicleCell.innerText = newRow.v_id;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onClick = function() {
        deleteCustomerVehicle(newRow.intersect_id);
    }

    // Add the cells to the row 
    row.appendChild(intersectIDCell);
    row.appendChild(CustomerCell);
    row.appendChild(VehicleCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.intersect_id);
    
    currentTable.appendChild(row);
}