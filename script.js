let usernames = JSON.parse(localStorage.getItem("usernames")) || [];
let passwords = JSON.parse(localStorage.getItem("passwords")) || [];


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


function addItem(button) {
    let menuItem = button.closest(".menu_items");

    let name = menuItem.querySelector("h3").innerText;

    let priceText = menuItem.querySelector(".item-meta span").innerText;
    let price = parseFloat(priceText.replace("$", ""));

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateMenuQuantities();
}


function updateMenuQuantities() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.querySelectorAll(".menu_items").forEach(menuItem => {

        let name = menuItem.querySelector("h3").innerText;

        let item = cart.find(item => item.name === name);

        let quantity = menuItem.querySelector(".quantity");

        if (quantity) {
            quantity.innerText = item ? `× ${item.quantity}` : "";
        }

    });
}


function cartBoi() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let itemCont = document.querySelector(".cartContainer");
    let subTotal = document.querySelector(".subtotal");

    if (!itemCont || !subTotal) {
        return;
    }

    itemCont.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        let newItemAdded = document.createElement("div");

        newItemAdded.classList.add("item");

        newItemAdded.textContent =
            `${item.name} - $${item.price.toFixed(2)} Quantity: ${item.quantity}`;

        itemCont.appendChild(newItemAdded);

        total += item.price * item.quantity;

    });

    subTotal.innerHTML = `Subtotal: $${total.toFixed(2)}`;
}


function clearCart() {
    localStorage.removeItem("cart");

    updateMenuQuantities();
    cartBoi();
}


document.addEventListener("DOMContentLoaded", function() {
    updateMenuQuantities();
    cartBoi();
});
