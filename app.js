window.addEventListener("DOMContentLoaded", displayProducts);

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
              <img src="${product.imageURL}" alt="Product Image">
              <div class="product-info">
                <h3>${product.name}</h3>
                <div class="category">Category: ${product.category}</div>
                <div class="price">${product.price} LEI</div>
                <div class="buttons">
                  <button class="details-btn">Details</button>
                  <button data-id="${product.id}" class="cart-btn">Add to Cart</button>
                </div>
              </div>
            </div>
          `
        )
        .join("");
  
        document
          .querySelector(".products-container")
          .addEventListener("click", handleProductClick);
        updateCartCount();
     
      
        })
      
    .catch((error) => console.error(error));
      
}


function handleProductClick(e) {
  const btn = e.target.closest && e.target.closest(".cart-btn");
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


