// Get the objects we need to modify
let addVehicleForm = document.getElementById('add-vehicle-form-ajax');

// Modify the objects we need
addVehicleForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputMake = document.getElementById("input-make");
    let inputModel = document.getElementById("input-model");
    let inputColor = document.getElementById("input-color");
    let inputYear = document.getElementById("input-year");


    // Get the values from the form fields
    let MakeValue = inputMake.value;
    let ModelValue = inputModel.value;
    let ColorValue = inputColor.value;
    let YearValue = inputYear.value;


    // Put our data we want to send in a javascript object
    let data = {
        make: MakeValue,
        model: ModelValue,
        color: ColorValue,
        year: YearValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-vehicle-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputMake.value = '';
            inputModel.value = '';
            inputColor.value = '';
            inputYear.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});


addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("vehicle-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let MakeCell = document.createElement("TD");
    let ModelCell = document.createElement("TD");
    let ColorCell = document.createElement("TD");
    let YearCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.v_id;
    MakeCell.innerText = newRow.make;
    ModelCell.innerText = newRow.model;
    ColorCell.innerText = newRow.color;
    YearCell.innerText = newRow.year;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onClick = function() {
        deleteVehicle(newRow.v_id);
    }

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(MakeCell);
    row.appendChild(ModelCell);
    row.appendChild(ColorCell);
    row.appendChild(YearCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.v_id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("idSelect");
    let option = document.createElement("option");
    option.text = newRow.v_id;
    option.value = newRow.v_id;
    selectMenu.add(option);
}