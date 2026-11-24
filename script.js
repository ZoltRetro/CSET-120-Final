let usernames = JSON.parse(localStorage.getItem("usernames")) || [];
let passwords = JSON.parse(localStorage.getItem("passwords")) || [];

let manager = {
    username: "BigBoy67",
    badge: "00000001",
    password:"TheMan67!"
}


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

let loginForm = document.getElementById("customer-login");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let username = document.getElementById("login-username").value;
        let password = document.getElementById("login-password").value;

        for (let i = 0; i < usernames.length; i++) {
            if (usernames[i] === username && passwords[i] === password) {
                alert("Successfully logged in!");
                sessionStorage.setItem("customerLoggedIn", "true");
                window.location.href = "index.html"
                return;
            }
        }

        alert("Invalid username or password!");
    });
}

let managerLoginForm = document.getElementById("manager-login");

if (managerLoginForm) {
    managerLoginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let username = document.getElementById("manager-login-username").value;
        let password = document.getElementById("manager-login-password").value;
        let badge = document.getElementById("manager-login-badge").value;

        
        if (username === manager.username && password === manager.password && badge === manager.badge) {
             alert("Successfully logged in!");
             sessionStorage.setItem("managerLoggedIn", "true");
             window.location.href = "index.html"
            return;
        }
        else if(username !== manager.username){
            alert("Incorrect Username!")
        }
        else if(password !== manager.password){
            alert("Incorrect password")
        }
        else if(badge !== manager.badge){
            alert("Incorrect Badge Number!")
        }
        

        
    });
}

function managerLogOut(){
    sessionStorage.removeItem("managerLoggedIn");
    sessionStorage.removeItem("customerLoggedIn");

    alert("Successfully logged out!");

    window.location.href = "index.html";
}
function loginDisplay(type){
    let customer = document.getElementById("customer-login");
    let manager = document.getElementById("manager-login");
    console.log("Selected login:", type);

    if(type === "customer"){
        customer.style.display = "flex";
        manager.style.display = "none"
    }
    else if(type === "manager"){
        customer.style.display = "none";
        manager.style.display = "flex"
    }
     console.log("Customer:", getComputedStyle(customer).display);
     console.log("Manager:", getComputedStyle(manager).display);
}

let addedItem = [

]


/* ADD ITEM */

function addItem(button) {
    let menuItem = button.closest(".menu-item");

    changeQuantity(menuItem, 1);
}


/* INCREASE QUANTITY */

function increaseItem(button) {
    let menuItem = button.closest(".menu-item");

    let name = menuItem.querySelector("h3").textContent.trim();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.name === name);

    let quantity = existingItem ? existingItem.quantity : 0;

    changeQuantity(menuItem, quantity + 1);
}


/* DECREASE QUANTITY */

function subtractItem(button) {
    let menuItem = button.closest(".menu-item");

    let name = menuItem.querySelector("h3").textContent.trim();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.name === name);

    if (!existingItem) return;

    changeQuantity(menuItem, existingItem.quantity - 1);
}


/* UPDATE CART STORAGE */

function changeQuantity(menuItem, newQuantity) {
    let name = menuItem.querySelector("h3").textContent.trim();

    let price = parseFloat(
        menuItem.querySelector(".item-meta span").textContent.replace("$", "")
    );

    let image = menuItem.querySelector("img")?.src || "";

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(item => item.name === name);

    if (newQuantity <= 0) {
        cart = cart.filter(item => item.name !== name);
    }
    else if (existingItem) {
        existingItem.quantity = newQuantity;
        existingItem.image = image;
    }
    else {
        cart.push({
            name: name,
            price: price,
            quantity: newQuantity,
            image: image
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateMenuQuantities();
}
function checkout() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (sessionStorage.getItem("customerLoggedIn") !== "true") {

        alert("Please log in before checking out!");
        window.location.href = "login.html";
        return;

    }

    if (cart.length === 0) {

        let uhOh = confirm("Uh Oh! There's nothing in your cart. Would you like to add some items?");

        if (uhOh) {
            window.location.href = "index.html";
        }

        return;
    }

    window.location.href = "checkout.html";
}

/* UPDATE MENU BUTTONS */

function updateMenuQuantities() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.querySelectorAll(".menu_items").forEach(menuItem => {

        let name = menuItem.querySelector("h3").textContent.trim();

        let item = cart.find(item => item.name === name);

        let container = menuItem.querySelector(".addQuantContainer");

        if (!container) return;

        if (item && item.quantity > 0) {

            container.innerHTML = `
                <button class="subtractItem"
                    onclick="subtractItem(this)">−</button>

                <div class="quantity">${item.quantity}</div>

                <button class="addItem"
                    onclick="increaseItem(this)">+</button>
            `;

        } else {

            container.innerHTML = `
                <button class="addItem"
                    onclick="addItem(this)">+</button>
            `;

        }

    });
}


/* REMOVE ITEM FROM CART PAGE */


/* CART PAGE QUANTITY CONTROLS */

function increaseCartItem(itemName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(item => item.name === itemName);

    if (item) {
        item.quantity++;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    cartBoi();
}

function decreaseCartItem(itemName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(item => item.name === itemName);

    if (item) {
        item.quantity--;

        if (item.quantity <= 0) {
            cart = cart.filter(cartItem => cartItem.name !== itemName);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    cartBoi();
}

/* REMOVE ITEM COMPLETELY */

function removeCartItem(itemName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter(item => item.name !== itemName);

    localStorage.setItem("cart", JSON.stringify(cart));
    cartBoi();
}

/* DISPLAY CART */

function cartBoi() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let itemCont = document.querySelector(".cartContainer");
    let subTotal = document.querySelector(".subtotal");

    if (!itemCont || !subTotal) return;

    itemCont.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        let newItemAdded = document.createElement("div");
        newItemAdded.classList.add("cart-item");

        let imageContainer = document.createElement("div");
        imageContainer.classList.add("cart-image");

        if (item.image) {
            let image = document.createElement("img");
            image.src = item.image;
            image.alt = item.name;
            imageContainer.appendChild(image);
        } else {
            imageContainer.textContent = "No Image";
        }

        let itemInfo = document.createElement("div");
        itemInfo.classList.add("cart-item-info");

        let itemName = document.createElement("h3");
        itemName.textContent = item.name;

        let itemPrice = document.createElement("p");
        let itemTotal = item.price * item.quantity;
        itemPrice.textContent = `$${itemTotal.toFixed(2)}`;

        itemInfo.appendChild(itemName);
        itemInfo.appendChild(itemPrice);

        let controls = document.createElement("div");
        controls.classList.add("cart-controls");

        let subtractButton = document.createElement("button");
        subtractButton.textContent = "−";
        subtractButton.classList.add("cart-quantity-button");
        subtractButton.onclick = () => decreaseCartItem(item.name);

        let quantity = document.createElement("span");
        quantity.textContent = item.quantity;
        quantity.classList.add("cart-quantity");

        let addButton = document.createElement("button");
        addButton.textContent = "+";
        addButton.classList.add("cart-quantity-button");
        addButton.onclick = () => increaseCartItem(item.name);

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("cart-remove-button");
        removeButton.onclick = () => removeCartItem(item.name);

        controls.appendChild(subtractButton);
        controls.appendChild(quantity);
        controls.appendChild(addButton);

        newItemAdded.appendChild(imageContainer);
        newItemAdded.appendChild(itemInfo);
        newItemAdded.appendChild(controls);
        newItemAdded.appendChild(removeButton);

        itemCont.appendChild(newItemAdded);

        total += item.price * item.quantity;
    });

    subTotal.textContent = `$${total.toFixed(2)}`;
}


function clearCart() {

    let answer = confirm("Are you sure you want to clear your cart?");

    if (answer) {

        console.log("Cart cleared");

        localStorage.removeItem("cart");

        cartBoi();

    } 
    else {

        console.log("Cart Not Cleared");

    }

}
let johnson = document.getElementsByClassName("active")
document.addEventListener("DOMContentLoaded", function() {
    
    cartBoi();

});


function managerAdd(){
    let grid = document.getElementsByClassName("food-grid");
    
}

function managerRemove(){
    
}



document.addEventListener("DOMContentLoaded", function() {

    let account = document.querySelector(".account");
    let login = document.querySelector(".login");

    let managerLoggedIn = sessionStorage.getItem("managerLoggedIn");
    let customerLoggedIn = sessionStorage.getItem("customerLoggedIn");

    if (managerLoggedIn === "true") {

        account.style.display = "block";
        login.style.display = "none";

        document.querySelectorAll(".add-menu-item").forEach(button => {
            button.style.display = "block";
        });
        document.querySelectorAll(".remove-menu-item").forEach(button => {
            button.style.display = "block";
        });

    }

    else if (customerLoggedIn === "true") {

        account.style.display = "block";
        login.style.display = "none";

    }

    else {

        account.style.display = "none";
        login.style.display = "block";

    }

    loginDisplay("customer");

});

