let addTransactionForm = document.getElementById('add-transaction-form-ajax');

addTransactionForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let inputAmount = document.getElementById("input-t_amount")
    let inputDate = document.getElementById("input-t_date");
    let inputV_ID = document.getElementById("input-t_v_id");
    let inputE_ID = document.getElementById("input-t_e_id");

    let AmountValue = inputAmount.value;
    let DateValue = inputDate.value;
    let V_IDValue = inputV_ID.value;
    let E_IDValue = inputE_ID.value;

    let data = {
        t_amount:AmountValue,
        t_date: DateValue,
        t_v_id: V_IDValue,
        t_e_id: E_IDValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-transaction-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputAmount.value = '';
            inputDate.value = '';
            inputV_ID.value = '';
            inputE_ID.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});

addRowToTable = (data) => {

    let currentTable = document.getElementById("transactions-table");

    let newRowIndex = currentTable.rows.length;

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    let row = document.createElement("TR");
    let transactionIDCell = document.createElement("TD");
    let amountCell = document.createElement("TD");
    let dateCell = document.createElement("TD");
    let vehicleIDCell = document.createElement("TD");
    let employeeIDCell = document.createElement("TD");

    // Fill the cells with correct data
    transactionIDCell.innerText = newRow.t_id;
    amountCell.innerText = newRow.t_amount;
    dateCell.innerText = newRow.t_date;
    vehicleIDCell.innerText = newRow.t_v_id;
    employeeIDCell.innerText = newRow.t_e_id;

    // Add the cells to the row 
    row.appendChild(transactionIDCell);
    row.appendChild(amountCell);
    row.appendChild(dateCell);
    row.appendChild(vehicleIDCell);
    row.appendChild(employeeIDCell);

    // Add the row to the table
    currentTable.appendChild(row);
}