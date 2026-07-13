// Product Database

const products = {
    1: {
        id: 1,
        name: "Sliding Door",
        price: 4800,
        image: "images/sliding-door.jpg",
        description: "High-quality aluminium sliding door suitable for homes and offices."
    },

    2: {
        id: 2,
        name: "Casement Window",
        price: 2100,
        image: "images/casement-window.jpg",
        description: "Strong aluminium casement window with excellent ventilation."
    },

    3: {
        id: 3,
        name: "Pivot Door",
        price: 6500,
        image: "images/pivot-door.jpg",
        description: "Modern aluminium pivot door with premium finish."
    },

    4: {
        id: 4,
        name: "Awning Window",
        price: 2800,
        image: "images/awning-window.jpg",
        description: "Functional aluminium awning window."
    },

    5: {
        id: 5,
        name: "French Door",
        price: 7500,
        image: "images/french-door.jpg",
        description: "Elegant aluminium French door."
    },

    6: {
        id: 6,
        name: "Fixed Panel",
        price: 1500,
        image: "images/fixed-panel.jpg",
        description: "Simple aluminium fixed panel."
    },

    7: {
        id: 7,
        name: "Garden Door",
        price: 5000,
        image: "images/garden-door.jpg",
        description: "Durable aluminium garden door."
    },

    8: {
        id: 8,
        name: "Security Door",
        price: 8000,
        image: "images/security-door.jpg",
        description: "High-security aluminium door."
    },

    9: {
        id: 9,
        name: "Louvre Window",
        price: 3200,
        image: "images/louvre-window.jpg",
        description: "Elegant aluminium louvre window."
    },

    10: {
        id: 10,
        name: "Bi-Fold Door",
        price: 9000,
        image: "images/bi-fold-door.jpg",
        description: "Premium aluminium bi-fold door."
    },

    11: {
        id: 11,
        name: "Tilt & Turn Window",
        price: 3500,
        image: "images/tilt-and-turn-window.jpg",
        description: "Modern aluminium tilt-and-turn window."
    }
};


// Get product ID from URL

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const product = products[id];

if (product) {

    document.getElementById("productName").textContent = product.name;

    document.getElementById("productPrice").textContent =
        "From R" + product.price.toLocaleString();

    document.getElementById("productDescription").textContent =
        product.description;

    document.getElementById("productImage").src = product.image;

    document.getElementById("productImage").alt = product.name;

    // Add To Cart

    const btn = document.getElementById("addCartBtn");

    if(btn){

        btn.onclick = function(){

            addToCart(
                product.name,
                product.image,
                product.price
            );

            alert(product.name + " added to cart!");

        };

    }

}else{

    document.querySelector(".product-details").innerHTML =
    "<h2>Product not found.</h2>";

}