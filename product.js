// Product Database


const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`http://localhost:4000/api/products/${id}`)
    .then(response => response.json())
    .then(product => {

        document.getElementById("productName").textContent = product.name;

        document.getElementById("productPrice").textContent =
            "From R" + Number(product.price).toLocaleString();

        document.getElementById("productDescription").textContent =
            product.description;

        document.getElementById("productImage").src =
            product.image;

        document.getElementById("productImage").alt =
            product.name;

        const btn = document.getElementById("addCartBtn");

        if (btn) {

            btn.onclick = function () {

                addToCart(
                    product.id,
                    product.name,
                    product.image,
                    Number(product.price)
                );

                alert(product.name + " added to cart!");

            };

        }

    })
    .catch(() => {

        document.querySelector(".product-details").innerHTML =
            "<h2>Product not found.</h2>";

    });