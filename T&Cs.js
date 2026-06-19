function acceptTerms() {

    localStorage.setItem("acceptedTCs", "true");

    document.getElementById('tcs-message').textContent =
    '✅ Thank you! You have accepted the Terms & Conditions.';

    document.getElementById('tcs-message').style.color =
    'green';

    setTimeout(() => {
        window.location.href = "products.html";
    }, 2000);
}
function acceptTerms() {

    localStorage.setItem("acceptedTCs","true");

    alert("Terms & Conditions accepted");

    window.location.href = "cart.html";
} 