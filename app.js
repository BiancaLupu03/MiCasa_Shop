window.addEventListener("DOMContentLoaded", () => {
  displayProducts(); // afișează produsele inițial
  const container = document.querySelector(".products-container");
  if (container) {
    container.addEventListener("click", handleProductClick); // listener-ul se adaugă o singură dată
  }
});

const URL = "https://68f207fab36f9750deeb2301.mockapi.io/products";

const categoryFilter = document.getElementById("category-filter");
categoryFilter.addEventListener("change", displayProducts);

function displayProducts() {
  fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Error");
      }
      return response.json();
    })
    .then((products) => {
      const selectedCategory = categoryFilter.value;

      const filteredProducts = selectedCategory
        ? products.filter((product) => product.category === selectedCategory)
        : products;

      document.querySelector(".products-container").innerHTML = filteredProducts
        .map(
          (product) => `
            <div class="product-card">
              <div class="category">Category: ${product.category}</div>
              <img src="${product.imageURL}" alt="Product Image">
              <div class="product-info">
                <h3>${product.name}</h3>
                
                <div class="price">${product.price} LEI</div>
                <div class="buttons">
                  <button class="details-btn" data-id="${product.id}" onclick="window.location.href='details.html?id=${product.id}'">Details</button>
                  <button class="cart-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
          </div>
          `
        )
        .join("");
    })

    .catch((error) => console.error(error));
}

function handleProductClick(e) {
  const btn = e.target.closest(".cart-btn");
  if (!btn) return;

  const productId = btn.dataset.id;
  if (!productId) return;

  fetch(`${URL}/${productId}`)
    .then((resp) => resp.json())
    .then((product) => {
      const cart = JSON.parse(localStorage.getItem("cart")) || {};

      if (cart[productId]) {
        cart[productId].quantity++;
      } else {
        cart[productId] = {
          quantity: 1,
          price: parseFloat(product.price) || 0,
          image: product.imageURL || "",
          name: product.name || "Product",
        };
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
    })
    .catch((err) => console.error("Add to cart error:", err));
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

document.addEventListener("DOMContentLoaded", updateCartCount);
