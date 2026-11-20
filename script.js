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

let addedItem = [

]

function addItem(button) {
    let menuItem = button.parentElement;
    let paragraphs = menuItem.querySelectorAll("p");
    let name = paragraphs[0].textContent;
    let price = parseFloat(
        paragraphs[2].textContent.replace("Price: $", "")
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

}


function cartBoi(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let itemCont = document.getElementsByClassName("cartContainer");
    let subTotal = document.getElementsByClassName("subtotal")
    itemCont[0].innerHTML = "";
    let total = 0;
    cart.forEach(item => {

        console.log(item.name);
        console.log(item.price);
        console.log(item.quantity);

    
    const newItemAdded = document.createElement("div");
    newItemAdded.classList.add("item");
    newItemAdded.textContent = `${item.name} - $${item.price} Quantity: ${item.quantity}`;
    console.log(itemCont); 
    

    itemCont[0].appendChild(newItemAdded);
    let subtotal = item.price * item.quantity;
    total += subtotal;
    });
    subTotal[0].innerHTML = `Subtotal: $${total.toFixed(2)}`
}

function clearCart(){
    localStorage.removeItem("cart");
}
document.addEventListener("DOMContentLoaded", function() {

    cartBoi();

});