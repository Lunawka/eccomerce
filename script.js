const cardList = document.querySelector("#card-list");
let deleteBtns = [];
let deleteBtnsNew = [];

const trunc = (text, maxLenght) =>
  text?.length > maxLenght ? text?.substring(0, maxLenght - 3) + "..." : text;

const renderCards = (products) => {
  products.forEach((product) => {
    const cardHTML = ` 
            <div class="card" style="width: 18rem; height: 330px">
                <img src="header.png" class="card-img-top" alt="${
      product.title
    }" />
                <div class="card-body">
                    <p class="card-id">Card №${product.id}</p>
                    <h5 class="card-title">${
                      product.title
                    } </h5>                 
                    <p class="card-text">
                       ${trunc(product.description, 100)}
                    </p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                    <a href="#" id="deleteBtn" class="btn btn-danger">Delete</a>
                </div>
            </div>`;

    cardList.insertAdjacentHTML("beforeend", cardHTML);
    deleteBtnsNew.push(product.id);
  });
  deleteBtns = document.querySelectorAll("#deleteBtn");
  deleteBtns.forEach((deleteBtn, key) => {
    deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        deleteProduct(deleteBtnsNew[key]);
      });
  });
};

fetch("https://api.escuelajs.co/api/v1/products?offset=80&limit=10")
  .then((response) => response.json())
  .then((data) => {
    renderCards(data);
  });

const addBtn = document.querySelector("#add-btn");
const addProductForm = document.querySelector("#add-product-form");

const addProduct = () => {
  const title = document.querySelector("#product-title").value;
  const description = document.querySelector("#product-descr").value;
  const price = +document.querySelector("#product-price").value;
  const categoryId = +document.querySelector("#product-category").value;

  const productToAdd = {
    title,
    description,
    price,
    categoryId,
    images: ["https://placeimg.com/640/480/any"],
  };

  fetch("https://api.escuelajs.co/api/v1/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productToAdd),
  });
};

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addProduct();
});


const deleteProduct = (id) => {
  fetch("https://api.escuelajs.co/api/v1/products/"+id, {
    method: "DELETE",
    headers: {
      "accept": "*/*",
    },
  });
  setTimeout(() => {
    window.location.reload();
  }, 500);
};

