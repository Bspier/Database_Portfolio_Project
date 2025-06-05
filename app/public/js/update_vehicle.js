// Get the objects we need to modify
let updateVehicleForm = document.getElementById('update-vehicle-form-ajax');

// Modify the objects we need
updateVehicleForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("idSelect");
    let inputMake = document.getElementById("input-make-update");
    let inputModel = document.getElementById("input-model-update");
    let inputColor = document.getElementById("input-color-update");
    let inputYear = document.getElementById("input-year-update");

    // Get the values from the form fields
    let idValue = inputID.value;
    let MakeValue = inputMake.value;
    let ModelValue = inputModel.value;
    let ColorValue = inputColor.value;
    let YearValue = inputYear.value;
    
    if (MakeValue === null || ModelValue === null || ColorValue === null || isNaN(YearValue)) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        v_id: idValue,
        make: MakeValue,
        model: ModelValue,
        color: ColorValue,
        year: YearValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-vehicle-ajax", true);
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
});


function updateRow(data, vehicleID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("vehicle-table");

    for (let i = 0, row; row = table.rows[i]; i++) {

       if (table.rows[i].getAttribute("data-value") == vehicleID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let tdMake = updateRowIndex.getElementsByTagName("td")[1];
            tdMake.innerHTML = parsedData[0].make;

            let tdModel = updateRowIndex.getElementsByTagName("td")[2];
            tdModel.innerHTML = parsedData[0].model;

            let tdColor = updateRowIndex.getElementsByTagName("td")[3];
            tdColor.innerHTML = parsedData[0].color;

            let tdYear = updateRowIndex.getElementsByTagName("td")[4];
            tdYear.innerHTML = parsedData[0].year;
       }
    }
}