function deleteRepair(repairID) {
    // Put our data we want to send in a javascript object
    let data = {
        r_id: repairID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-repair-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(repairID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(repairID){

    let table = document.getElementById("repair-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == repairID) {
            table.deleteRow(i);
            deleteDropDownMenu(repairID);
            break;
       }
    }
}

function deleteDropDownMenu(repairID){
    let selectMenu = document.getElementById("idSelect");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(repairID)){
            selectMenu[i].remove();
            break;
        }
    }
}