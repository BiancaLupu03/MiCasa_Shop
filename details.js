

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const URL = "https://68f207fab36f9750deeb2301.mockapi.io/products";

if (productId) {
fetch(`${URL}/${productId}`)
  .then((response) => response.json())
  .then((product) => {
    document.getElementById("details-image").src = product.imageURL;
    document.getElementById("details-name").textContent = product.name;
    document.getElementById("details-description").textContent =
      product.details;
    document.getElementById(
      "details-price"
    ).textContent = `${product.price} LEI`;
 

  const addBtn = document.querySelector(".cart-btn");
      addBtn.addEventListener("click", () => addToCart(product));
    })
    .catch((err) => console.error("Error loading product details:", err));
} else {
  console.error("No product ID found in URL.");
}

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};

  if (cart[product.id]) {
    cart[product.id].quantity++;
  } else {
    cart[product.id] = {
      quantity: 1,
      price: parseFloat(product.price) || 0,
      image: product.imageURL || "",
      name: product.name || "Product",
    };
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const badge = document.querySelector("#cart-count");
  if (!badge) return;
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  let totalItems = 0;
  for (let id in cart) {
    totalItems += cart[id].quantity || 0;
  }
  badge.textContent = totalItems;
}

// Actualizăm contorul coșului când se încarcă pagina
document.addEventListener("DOMContentLoaded", updateCartCount);