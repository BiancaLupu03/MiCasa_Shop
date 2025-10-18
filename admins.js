window.addEventListener("DOMContentLoaded", renderTable);

const URL = "https://68f207fab36f9750deeb2301.mockapi.io/products";

const tableBody = document.querySelector("#products-table tbody");
const addBtn = document.querySelector("rgba(123, 165, 238, 1)-btn");

function renderTable() {
  fetch(URL)
    .then((response) => response.json())
    .then((products) => {
      tableBody.innerHTML = products
        .map(
          (product, index) =>
            `
            <tr data-id=${product.id}>
               <td>${index + 1}</td>
               <td class="cell-img">
                  <img src=${product.imageURL} />
               </td>
               <td class="cell-name">
                  ${product.name}
               </td>
               <td class="cell-price">
                  ${product.price}
               </td>
               <td>
                  <div class="actions">
                     <button class="btn edit" data-action="edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                     </button>
                     <button class="btn delete" data-action="delete">
                        <i class="fa-solid fa-trash"></i>
                     </button>
                  </div>
               </td>
            </tr>
            `
        )
        .join("");
    });
}

addBtn.addEventListener("click", addNewProduct);

function addNewProduct(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const imageURL = document.getElementById("imageURL").value;
  const description = document.getElementById("description").value;

  const newProduct = {
    name: name,
    price: price,
    imageURL: imageURL,
    details: description,
  };

  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  }).then((response) => renderTable());
}
