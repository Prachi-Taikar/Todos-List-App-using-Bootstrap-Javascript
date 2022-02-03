
function getAndupdate(){
    console.log("Updating List...");

    tit = document.getElementById("title").value;

    desc = document.getElementById("description").value;

    if (localStorage.getItem('itemsJson') == null){
        itemJsonArray = [];
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    update();
}


function update() {

    if (localStorage.getItem('itemsJson') == null){
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }

    //populate the table
    let tableBody =document.getElementById("tableBody");
    let str = "";

    itemJsonArray.forEach((element, index) => {
        str += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button class="btn btn-primary" onclick = "del(${index})" >Delete</button></td>
                
              </tr>` ;
    });
    
    tableBody.innerHTML = str;
}

add = document.getElementById("add");
add.addEventListener("click", getAndupdate);
update();

function del(itemIndex){
    console.log("Deleted", itemIndex);

    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    
    //delete itemIndex element from the array

    itemJsonArray.splice(itemIndex, 1);

    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}

function clr(){
    if (confirm("Do you really want to clear list?")){
        console.log("clearing the storage");
        localStorage.clear();
        update();
    }
    
}