document.addEventListener("DOMContentLoaded", showCart);

const cartContainer = document.querySelector(".cart-container");
const totalPriceContainer = document.querySelector(".total-price-container");
const cartCountContainer = document.querySelector("#cart-count");
let cart = {};

function showCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || {};

  let total = 0;
  let totalNumberOfProducts = 0;

  cartContainer.innerHTML = "";

  for (let id in cart) {
    cartContainer.innerHTML += `
      <div class="card-cart">
        <img width="50px" src="${cart[id].image}">
        <span>${cart[id].name}</span>
        <span>${cart[id].price}</span>
        <div>
          <button class="decrease" data-id="${id}">-</button>
          <span>${cart[id].quantity}</span>
          <button class="increase" data-id="${id}">+</button>
        </div>
        <span>${(cart[id].price * cart[id].quantity).toFixed(2)} lei</span>
        <button data-id="${id}" class="delete">Delete</button>
      </div>
    `;

    total += cart[id].price * cart[id].quantity;
    totalNumberOfProducts += cart[id].quantity;
  }

  totalPriceContainer.innerHTML =
    total === 0 ? "The cart is empty" : `Total: ${total.toFixed(2)} lei`;

  cartCountContainer.innerHTML = totalNumberOfProducts;
}

cartContainer.addEventListener("click", (e) => {
  const btn = e.target;
  const id = btn.dataset.id;

  if (!id) return; // prevenim clickuri pe alte elemente

  if (btn.classList.contains("increase")) {
    cart[id].quantity++;
  } else if (btn.classList.contains("decrease")) {
    if (cart[id].quantity > 1) {
      cart[id].quantity--;
    } else {
      delete cart[id];
    }
  } else if (btn.classList.contains("delete")) {
    delete cart[id];
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
});
