let addedItem = [

]





function addItem(button) {
    let menuItem = button.parentElement;
    let paragraphs = menuItem.querySelectorAll("p");
    let name = paragraphs[0].textContent;
    let price = parseFloat(
        paragraphs[2].textContent.replace("Price: $", "")
    );
    let item = {
        name: name,
        price: price
    };
    addedItem.push(item);
    console.log(addedItem);
    const newItemAdded = document.createElement("div");
    newItemAdded.classList.add("item");
    newItemAdded.textContent = `${name} - $${price}`;
    let itemCont = document.querySelector("itemContainer");
    console.log(itemCont); 

    itemCont.appendChild(newItemAdded);
    


}