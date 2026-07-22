
// ==========================================
// Run this code when the form is submitted
// ==========================================
console.log("Product JS loaded");

const form = document.getElementById("productForm");``
form.addEventListener("submit", function (e) {

    e.preventDefault();// Prevent the default form submission behavior (page reload).
        console.log("Form submitted");


    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;

    fetch("http://localhost:4000/api/products", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            name,
            category,
            description,
            price,
            image

        })

    })
    .then(response => response.json())

    .then(data => {

        console.log(data);

        alert("Product added successfully!");

    })

    .catch(error => {

        console.error(error);

    });

});