let usernames = JSON.parse(localStorage.getItem("usernames")) || [];
let passwords = JSON.parse(localStorage.getItem("passwords")) || [];
let badge = JSON.parse(localStorage.getItem("badgeNumber")) || [];

let signupForm = document.getElementById("signup-form");

if (signupForm) {
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let username = document.getElementById("signup-username").value;
        let password = document.getElementById("signup-password").value;

        for (let i = 0; i < usernames.length; i++) {
            if (usernames[i] === username) {
                alert("Username already exists!");
                return;
            }
        }

        usernames.push(username);
        passwords.push(password);

        localStorage.setItem("usernames", JSON.stringify(usernames));
        localStorage.setItem("passwords", JSON.stringify(passwords));

        alert("Account created successfully!");
        signupForm.reset();
    });
}

let loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let username = document.getElementById("login-username").value;
        let password = document.getElementById("login-password").value;

        for (let i = 0; i < usernames.length; i++) {
            if (usernames[i] === username && passwords[i] === password) {
                alert("Successfully logged in!");
                return;
            }
        }

        alert("Invalid username or password!");
    });
}

let addedItem = [

]

function addItem(button) {
    let menuItem = button.closest(".menu-item");
    let name = menuItem.querySelector("h3").textContent.trim();
    let price = parseFloat(
        menuItem.querySelector(".item-meta span").textContent.replace("$", "")
    );
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } 
    else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
    updateMenuQuantities();
}
function updateMenuQuantities(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.querySelectorAll(".menu_items").forEach(menuItem => {

        let name = menuItem.querySelector("h3").innerText;

        let item = cart.find(item => item.name === name);

        let quantity = menuItem.querySelector(".quantity");

        quantity.innerText = item ? `× ${item.quantity}` : "";

    });
}

function removeCartItem(itemName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity--;
        if (existingItem.quantity <= 0) {
            cart = cart.filter(item => item.name !== itemName);
        }

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    cartBoi();
}

function cartBoi() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let itemCont = document.querySelector(".cartContainer");
    let subTotal = document.querySelector(".subtotal");

    itemCont.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        const newItemAdded = document.createElement("div");
        newItemAdded.classList.add("item");

        const itemInfo = document.createElement("p");
        itemInfo.textContent = `${item.name} - $${item.price.toFixed(2)} Quantity: ${item.quantity}`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("removeItem");

        removeButton.onclick = function() {
            removeCartItem(item.name);
        };

        newItemAdded.appendChild(itemInfo);
        newItemAdded.appendChild(removeButton);

        itemCont.appendChild(newItemAdded);

        total += item.price * item.quantity;

    });

    subTotal.textContent = `Subtotal: $${total.toFixed(2)}`;
}

function clearCart(){
    localStorage.removeItem("cart");
    location.reload();
}
let johnson = document.getElementsByClassName("active")
document.addEventListener("DOMContentLoaded", function() {
    
    cartBoi();

});


function managerAdd(){
    let grid = document.getElementsByClassName("food-grid");
    
}