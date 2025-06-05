let addTransactionDetailForm = document.getElementById('add-transaction-details-form-ajax');

addTransactionDetailForm.addEventListener("submit", function (e) {
    
    e.preventDefault();

    let inputTransactionsID = document.getElementById("input-transactionsID");
    let inputRepairID = document.getElementById("input-repairID");

    let TransactionIDValue = inputTransactionsID.value;
    let RepairIDValue = inputRepairID.value;
    
    let data = {
        transactionID: TransactionIDValue,
        repairID: RepairIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-transaction-detail-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputTransactionsID.value = '';
            inputRepairID.value.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});


addRowToTable = (data) => {

    let currentTable = document.getElementById("transaction-detail-table");

    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    let row = document.createElement("TR");
    let transactionDetailIDCell = document.createElement("TD");
    let transactionIDCell = document.createElement("TD");
    let repairIDCell = document.createElement("TD");
    let repairCostCell = document.createElement("TD");

    // Fill the cells with correct data
    transactionDetailIDCell.innerText = newRow.transactionDetailsID;
    transactionIDCell.innerText = newRow.transactionsID;
    repairIDCell.innerText = newRow.repairID;
    repairCostCell.innerText = newRow.repairCost;

    // Add the cells to the row 
    row.appendChild(transactionDetailIDCell);
    row.appendChild(transactionIDCell);
    row.appendChild(repairIDCell);
    row.appendChild(repairCostCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}