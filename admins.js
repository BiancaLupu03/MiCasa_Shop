window.addEventListener("DOMContentLoaded", renderTable);

const URL = "https://68f207fab36f9750deeb2301.mockapi.io/products";

const tableBody = document.querySelector("#products-table tbody");
const addOrEditBtn = document.querySelector("#add-or-edit-btn");
let isEditMode = false;
let productId;

const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const imageURLInput = document.getElementById("imageURL");
const descriptionInput = document.getElementById("description");
const categoryInput = document.getElementById("category");

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
               <td class="cell-category">
                  ${product.category}
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

addOrEditBtn.addEventListener("click", addOrEditNewProduct);

function addOrEditNewProduct(e) {
  e.preventDefault();

  const name = nameInput.value;
  const price = priceInput.value;
  const imageURL = imageURLInput.value;
  const description = descriptionInput.value;
  const category = categoryInput.value;

  const newProduct = {
    name: name,
    price: price,
    imageURL: imageURL,
    details: description,
    category: category,
  };

  const method = isEditMode ? "PUT" : "POST";
  const newURL = isEditMode ? `${URL}/${productId}` : URL;

  fetch(newURL, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  }).then((response) => {
    renderTable();
    resetForm();
  });
}

function resetForm() {
  nameInput.value = "";
  priceInput.value = "";
  imageURLInput.value = "";
  descriptionInput.value = "";
  categoryInput.value = "";

  if (isEditMode) {
    isEditMode = false;
    addOrEditBtn.innerHTML = "Add Product";
  }
}

tableBody.addEventListener("click", handleActions);

function handleActions(e) {
  const clickedElement = e.target;
  if (clickedElement.parentElement.classList.contains("edit")) {
    productId = getTableRow(clickedElement).dataset.id;
    console.log(getTableRow(clickedElement));
    console.log(productId);
    fetch(`${URL}/${productId}`)
      .then((response) => response.json())
      .then((product) => {
        console.log(product);
        nameInput.value = product.name;
        priceInput.value = product.price;
        imageURLInput.value = product.imageURL;
        descriptionInput.value = product.details;
        categoryInput.value = product.category;
      });
    isEditMode = true;
    console.log(addOrEditBtn, isEditMode);
    addOrEditBtn.innerHTML = "Save";
  } else if (clickedElement.parentElement.classList.contains("delete")) {
    productId = getTableRow(clickedElement).dataset.id;
    fetch(`${URL}/${productId}`),
      {
        method: "DELETE",
      }.then((response) => {
        renderTable();
      });
  }
}

function getTableRow(editIcon) {
  return editIcon.parentElement.parentElement.parentElement.parentElement;
}





//butonul de add se transforma in add or edit si schimbam si id-ul
// cream o variabila de mod edit in care stocam true daca editam sau false daca adaugam (default value)
// in momenntul in care punem in input datele dintr u produs care urm sa fie editat, atunci variabila de edit mode se duce la true si i se schimba continutul din add product in save
// metodele si numele de variabile pt addNewProduct se transforma in ceva care sa ne duca cu gandul ca si editam
// la metoda care facea post trebuie sa adaugam o variabila method care va fi fie POST fie PUT in functie de valoarea lui isEditMode folosind ternary operaror.

// adauga formularul de inregistrare, ai facut un cont nou pe mockapi cu contul de s.fpse, pentru baza de date pentru users
// autentificare si inregistrare
// HASH the password
// look-up tables pentru parole
