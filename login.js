const form = document.getElementById("loginForm");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const errEl = document.getElementById("login-error");
    const btn = document.getElementById("login-btn");

    errEl.textContent = "";

    btn.disabled = true;
    btn.textContent = "Logging in...";

    try {

        const response = await fetch("http://localhost:3000/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const text = await response.text();
console.log(text);

let data;

try {
    data = JSON.parse(text);
    console.log("Response:", data);
} catch (err) {
    console.error("Server returned:", text);
    throw new Error("Server did not return JSON.");
}

        if (!response.ok) {

            errEl.textContent = data.message;

            btn.disabled = false;
            btn.textContent = "Login";

            return;

        }
localStorage.setItem("userId", data.user.id);
console.log("Saved userId:", localStorage.getItem("userId"));
localStorage.setItem("userName", data.user.fullname);
localStorage.setItem("userEmail", data.user.email);
localStorage.setItem("loggedIn", "true");
       
        alert("Login successful!");

        const tcsKey = "tcsAccepted_" + data.user.email;

        if (localStorage.getItem(tcsKey) === "true") {
            window.location.href = "index.html";
        } else {
            window.location.href = "Ts&Cs.html";
        }

    } catch (error) {

        console.error(error);

        errEl.textContent = "Unable to connect to server.";

        btn.disabled = false;
        btn.textContent = "Login";

    }

});
