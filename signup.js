const form = document.getElementById("signupForm");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const fullname =
        document.getElementById("name").value + " " +
        document.getElementById("surname").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {

        const response = await fetch("http://localhost:3000/api/auth/signup", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                fullname,
                email,
                password
            })

        });

        const data = await response.json();

        alert(data.message);

        if (response.ok) {
            window.location.href = "login.html";
        }

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

});