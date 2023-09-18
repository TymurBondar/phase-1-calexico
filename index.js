const menuContainer = document.getElementById("menu-items");
const image = document.getElementById("dish-image");
const dishName = document.getElementById("dish-name");
const dishDesc = document.getElementById("dish-description");
const dishPrice = document.getElementById("dish-price");
const cart = document.getElementById("cart-form");
const numberToAdd = document.getElementById("cart-amount");
const displayedPrice = document.getElementById("price");
let numberInCart = document.getElementById("number-in-cart");
let selectedId = 1;
let totalCost = 0;

//challenges 1, 2, 3
fetch("http://localhost:3000/menu")
    .then(res => res.json())
    .then(menu => {
        for (let i = 0; i < menu.length; i++) {
            let newItem = document.createElement("span");
            newItem.textContent = menu[i].name;
            newItem.addEventListener("click", (e) => {
                image.setAttribute("src", menu[i].image);
                dishName.textContent = menu[i].name;
                dishDesc.textContent = menu[i].description;
                dishPrice.textContent = "$" + menu[i].price;
                numberInCart.textContent = menu[i].number_in_bag;
            })
            document.getElementById("menu-items").appendChild(newItem);
        };
        menu.forEach(item => {
            totalCost += item.price * item.number_in_bag;
        });
        image.setAttribute("src", menu[0].image);
        dishName.textContent = menu[0].name;
        dishDesc.textContent = menu[0].description;
        dishPrice.textContent = "$" + menu[0].price;
        numberInCart.textContent = menu[0].number_in_bag;
        displayedPrice.textContent = ("Price $" + totalCost);
    })

//challenge 4 + bonus
cart.addEventListener("submit", (event) => {
    event.preventDefault();
    let newValue = parseInt(numberToAdd.value)
    if (Number.isInteger(newValue) && newValue > 0) {
        fetch(`http://localhost:3000/menu/${selectedId}`)
            .then(response => response.json())
            .then(menuitem => {
                let currentValue = menuitem.number_in_bag;
                let incrementedValue = currentValue + newValue;
                numberInCart.textContent = incrementedValue;
                totalCost += newValue * menuitem.price;
                displayedPrice.textContent = ("Price $" + totalCost);
                return fetch(`http://localhost:3000/menu/${selectedId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        number_in_bag: incrementedValue
                    })
                });
            })
    }
    else{
        alert("Please, enter a positive number");
    }
})

