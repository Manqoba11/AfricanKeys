// ======================================
// Get the logged-in user's ID
// from localStorage.
// ======================================

const userId = localStorage.getItem("userId");//Go to the browser's local storage and get the ID of the logged-in user.

// If the user is not logged in,
// send them to the login page.

if (!userId) {

    alert("Please login first.");

    window.location.href = "login.html";

}
// ======================================
// Ask the server for this user's orders.
// ======================================

fetch(`http://localhost:4000/api/orders/user/${userId}`)

.then(response => response.json())

.then(orders => {

    console.log(orders);

});