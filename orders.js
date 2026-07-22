// ======================================
// Get the logged-in user's ID
// from localStorage.
// ======================================

const userId = localStorage.getItem("userId");// check if userId has logged in using id saved in local storage. If not, redirect to login page.

// If there is no logged-in user,
// send them to the login page.

if (!userId) {

    alert("Please login first.");

    window.location.href = "login.html";

}

// ======================================
// Get the container where the orders
// will be displayed.
// ======================================

const container = document.getElementById("ordersContainer");

// ======================================
// Ask the server for this user's orders.
// ======================================

fetch(`http://localhost:4000/api/orders/user/${userId}`)

.then(response => response.json())

.then(orders => {

    console.log(orders);

    // If the user has never placed an order
    if (orders.length === 0) {

        container.innerHTML = "<h3>No orders found.</h3>";

        return;

    }

    // Loop through every order
    orders.forEach(order => {

        container.innerHTML += `

        <div class="order-card">

            <h3>Order #${order.id}</h3>

            <p><strong>Total:</strong> R${order.total}</p>

            <p><strong>Date:</strong> ${order.created_at}</p>

        </div>

        `;

    });

})

.catch(err => {

    console.error(err);

});