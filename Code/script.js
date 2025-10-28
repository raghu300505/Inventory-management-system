document.addEventListener("DOMContentLoaded", function () {
    loadInventory();
});

function showSection(sectionId) {
    document.querySelectorAll("section").forEach(section => {
        section.classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");
}

function loadInventory() {
    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    let tableBody = document.getElementById("inventoryTable");
    tableBody.innerHTML = "";

    inventory.forEach((item, index) => {
        let row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>
                    <button class="edit-btn" onclick="editItem(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

document.getElementById("addItemForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let name = document.getElementById("itemName").value;
    let quantity = document.getElementById("itemQuantity").value;

    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    inventory.push({ name, quantity });
    localStorage.setItem("inventory", JSON.stringify(inventory));

    alert("Item Added Successfully!");
    document.getElementById("addItemForm").reset();
    showSection('inventory');
    loadInventory();
});

function deleteItem(index) {
    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    inventory.splice(index, 1);
    localStorage.setItem("inventory", JSON.stringify(inventory));
    loadInventory();
}

function editItem(index) {
    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    document.getElementById("updateItemName").value = inventory[index].name;
    document.getElementById("updateItemQuantity").value = inventory[index].quantity;

    showSection("updateItem");

    document.getElementById("updateItemForm").onsubmit = function (event) {
        event.preventDefault();
        inventory[index] = {
            name: document.getElementById("updateItemName").value,
            quantity: document.getElementById("updateItemQuantity").value
        };
        localStorage.setItem("inventory", JSON.stringify(inventory));
        alert("Item Updated Successfully!");
        showSection('inventory');
        loadInventory();
    };
}
