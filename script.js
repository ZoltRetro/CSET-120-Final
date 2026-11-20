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