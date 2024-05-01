const cardList = document.querySelector("#card-list");

const trunc = (text, maxLenght) =>
    text?.length > maxLenght ? text?.substring(0, maxLenght - 3) + "..." : text;

const renderCards = (products) => {
    products.forEach((product) => {
        const cardHTML = ` 
            <div class="card" style="width: 18rem; height: 280px">
                <img src="${product.images[0]}" class="card-img-top" alt="${
            product.title
        }" />
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">
                       ${trunc(product.description, 100)}
                    </p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>`;

        cardList.insertAdjacentHTML("beforeend", cardHTML);
    });
};

fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=10")
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
