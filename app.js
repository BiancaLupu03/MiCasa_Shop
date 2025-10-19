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
              <button class="cart-btn">Add to Cart</button>
            </div>
          </div>
        </div>
      `
        )
        .join("");
    })
    .catch((error) => console.error(error));
}


