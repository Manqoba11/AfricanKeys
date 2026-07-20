fetch("http://localhost:4000/api/products")
    .then(response => response.json())
    .then(products => {

        const container = document.getElementById("productContainer");

        products.forEach(product => {

            container.innerHTML += `

            <div class="product-card searchable" data-category="">

                <img src="${product.image}" alt="${product.name}">

                <div class="product-card-body">

                    <h3>${product.name}</h3>

                    <p class="price">
                        From R${Number(product.price).toLocaleString()}
                    </p>

                    <p>${product.description}</p>

                </div>

                <div class="product-card-actions">

                    <button
                        class="addCartBtn"
                        onclick="addToCart(
                            ${product.id},
                            '${product.name}',
                            '${product.image}',
                            ${product.price}
                        )">

                        🛒 Add to Cart

                    </button>

                    <a href="product.html?id=${product.id}" class="view-btn">

                        View Details

                    </a>

                </div>

            </div>

            `;

        });

    });