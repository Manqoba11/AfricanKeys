const form = document.getElementById("checkoutForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    const fullname = document.getElementById("fullname").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
    });

    const order = {
        userId,
        fullname,
        phone,
        address,
        total,
        cart
    };

    try {

        const response = await fetch("http://localhost:4000/api/orders", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(order)

        });

        const data = await response.json();

        alert(data.message);

    } catch (err) {

        console.error(err);

        alert("Could not place order.");

    }

});