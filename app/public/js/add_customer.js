let addCustomerForm = document.getElementById('add-customer-form-ajax');

addCustomerForm.addEventListener("submit", function (e) {
    
    e.preventDefault();

    let inputName = document.getElementById("input-name");
    let inputEmail = document.getElementById("input-email");

    let NameValue = inputName.value;
    let EmailValue = inputEmail.value;

    let data = {
        c_name: NameValue,
        c_email: EmailValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputEmail.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});


addRowToTable = (data) => {

    let currentTable = document.getElementById("customer-table");

    let newRowIndex = currentTable.rows.length;

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let NameCell = document.createElement("TD");
    let EmailCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    idCell.innerText = newRow.c_id;
    NameCell.innerText = newRow.c_name;
    EmailCell.innerText = newRow.c_email;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onClick = function() {
        deleteCustomer(newRow.c_id);
    }

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(NameCell);
    row.appendChild(EmailCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.c_id);
    
    currentTable.appendChild(row);

    // modify the Update dropdown
    let selectMenu = document.getElementById("idSelect");
    let option = document.createElement("option");
    option.text = newRow.c_name;
    option.value = newRow.c_id;
    selectMenu.add(option);
}