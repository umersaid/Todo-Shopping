import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://todo-app-e49ea-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListinDB = ref(database, "shoppingList");

let inputField = document.getElementById("input-field");
let addBtn = document.getElementById("add-btn");
let listEl = document.getElementById("shopping-list");


addBtn.addEventListener("click", function(){
    let value = inputField.value;
    push(shoppingListinDB, value);

    clearInputFieldValue();
    // appendItemToShoppingList(value);
})

onValue(shoppingListinDB, function(list){
    
    if (list.exists()) {

        let itemsArray = Object.entries(list.val());
        clearShoppingListEl();
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            let currentItemId = currentItem[0];
            let currentItemValue = currentItem[1];
                
            appendItemToShoppingList(currentItem);   
        }

    } else {
        listEl.innerText = "No items here ... yet ";
    }

})

function clearShoppingListEl(){
    listEl.innerHTML = "";
}
function clearInputFieldValue(){
    inputField.value = "";
}
function appendItemToShoppingList(item){
    let id = item[0];
    let value = item[1];

    let newEl = document.createElement('li');
    newEl.textContent = value;
    listEl.append(newEl);

    newEl.addEventListener("dblclick", function(){
        let location = ref(database, `shoppingList/${id}`);
        remove(location);
    })
    // listEl.innerHTML += `<li>${inputValue}</li>`;
}