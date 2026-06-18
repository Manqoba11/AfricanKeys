
function acceptTerms() {

    localStorage.setItem("termsAccepted", "true");

    document.getElementById('tcs-message').textContent =
    '✅ Thank you! You have accepted the Terms & Conditions.';

    document.getElementById('tcs-message').style.color = 'green';

    setTimeout(() => {
        window.location.href = "products.html";
    }, 2000);
}
}
function declineTerms() {

    localStorage.removeItem("acceptedTerms");

    document.getElementById('tcs-message').textContent =
    '❌ You must accept the Terms & Conditions to continue.';

    document.getElementById('tcs-message').style.color =
    'red';
}
